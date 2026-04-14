'use client';
import '../../quizzes.css';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { RootState } from '../../../../../store';
import * as client from '../../client';

export default function QuizResults() {
  const { cid, qid } = useParams() as { cid: string; qid: string };
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountsReducer);
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const isFaculty = currentUser?.role === 'FACULTY';

  const [quiz, setQuiz] = useState<any>(null);
  const [attempt, setAttempt] = useState<any>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fromStore = quizzes.find((q: any) => q._id === qid);
    const quizPromise = fromStore ? Promise.resolve(fromStore) : client.findQuizById(qid);

    quizPromise.then(setQuiz);
  }, [qid, quizzes]);

  useEffect(() => {
    if (currentUser && !isFaculty) {
      client.getMyLastAttempt(qid).then(({ attempt, attemptCount }) => {
        if (!attempt) {
          router.replace(`/courses/${cid}/quizzes/${qid}`);
          return;
        }
        setAttempt(attempt);
        setAttemptCount(attemptCount);
      });
    }
  }, [qid, currentUser, isFaculty]);

  if (!quiz || !attempt) return <div className='p-4'>Loading...</div>;

  const questions = quiz.questions ?? [];

  // Build lookup maps from the attempt data
  const answerMap: Record<string, any> = {};
  for (const a of attempt.answers ?? []) {
    answerMap[a.questionId] = a.answer;
  }

  const resultMap: Record<string, { isCorrect: boolean; pointsEarned: number }> = {};
  for (const r of attempt.results ?? []) {
    resultMap[r.questionId] = r;
  }

  const currentQuestion = questions[currentIndex];
  const currentResult = resultMap[currentQuestion?._id];
  const attemptsAllowed = quiz.multipleAttempts ? quiz.howManyAttempts : 1;

  const renderChoiceResult = (q: any) => {
    const studentAnswer = answerMap[q._id];
    const qResult = resultMap[q._id];

    if (q.type === 'MULTIPLE_CHOICE' || q.type === 'TRUE_FALSE') {
      const choices =
        q.type === 'TRUE_FALSE'
          ? [
              { _id: 'true', text: 'True', isCorrect: q.correctAnswer?.toLowerCase() === 'true' },
              {
                _id: 'false',
                text: 'False',
                isCorrect: q.correctAnswer?.toLowerCase() === 'false',
              },
            ]
          : q.choices;

      return choices.map((c: any) => {
        const isSelected = studentAnswer === c._id;
        const isCorrectChoice = c.isCorrect;

        let className = 'quiz-result-choice unselected';
        let icon = null;

        if (isSelected && qResult?.isCorrect) {
          className = 'quiz-result-choice selected-correct';
          icon = <FaCheckCircle className='text-success flex-shrink-0' />;
        } else if (isSelected && !qResult?.isCorrect) {
          className = 'quiz-result-choice selected-wrong';
          icon = <FaTimesCircle className='text-danger flex-shrink-0' />;
        } else if (!isSelected && isCorrectChoice && quiz.showCorrectAnswers) {
          className = 'quiz-result-choice reveal-correct';
          icon = <FaCheckCircle className='text-success flex-shrink-0' style={{ opacity: 0.6 }} />;
        }

        return (
          <div key={c._id} className={className}>
            {icon}
            <span>{c.text}</span>
          </div>
        );
      });
    }

    if (q.type === 'MULTIPLE_SELECT') {
      const selectedIds: string[] = Array.isArray(studentAnswer) ? studentAnswer : [];
      const correctIds = new Set(q.choices.filter((c: any) => c.isCorrect).map((c: any) => c._id));

      return q.choices.map((c: any) => {
        const isSelected = selectedIds.includes(c._id);
        const isCorrectChoice = correctIds.has(c._id);

        let className = 'quiz-result-choice unselected';
        let icon = null;

        if (isSelected && isCorrectChoice) {
          className = 'quiz-result-choice selected-correct';
          icon = <FaCheckCircle className='text-success flex-shrink-0' />;
        } else if (isSelected && !isCorrectChoice) {
          className = 'quiz-result-choice selected-wrong';
          icon = <FaTimesCircle className='text-danger flex-shrink-0' />;
        } else if (!isSelected && isCorrectChoice && quiz.showCorrectAnswers) {
          className = 'quiz-result-choice reveal-correct';
          icon = <FaCheckCircle className='text-success flex-shrink-0' style={{ opacity: 0.6 }} />;
        }

        return (
          <div key={c._id} className={className}>
            {icon}
            <span>{c.text}</span>
          </div>
        );
      });
    }

    if (q.type === 'FILL_IN_BLANK') {
      const isCorrect = qResult?.isCorrect;
      return (
        <div>
          <div
            className={`quiz-result-choice ${isCorrect ? 'selected-correct' : 'selected-wrong'}`}>
            {isCorrect ? (
              <FaCheckCircle className='text-success flex-shrink-0' />
            ) : (
              <FaTimesCircle className='text-danger flex-shrink-0' />
            )}
            <span>{studentAnswer || <em className='text-muted'>No answer</em>}</span>
          </div>
          {!isCorrect && quiz.showCorrectAnswers && q.correctAnswer && (
            <div className='quiz-result-choice reveal-correct mt-1'>
              <FaCheckCircle className='text-success flex-shrink-0' style={{ opacity: 0.6 }} />
              <span>
                Correct: <strong>{q.correctAnswer}</strong>
              </span>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const canRetake = !isFaculty && attemptCount < attemptsAllowed;

  return (
    <div id='wd-quiz-results' style={{ display: 'flex', minHeight: '600px' }}>
      {/* Sidebar — question list with correct/incorrect indicators */}
      <div className='border-end bg-light p-3' style={{ width: '180px', minWidth: '180px' }}>
        <p className='small fw-bold text-muted mb-2'>Questions</p>
        <ListGroup variant='flush'>
          {questions.map((q: any, i: number) => {
            const r = resultMap[q._id];
            const isCorrect = r?.isCorrect;
            return (
              <ListGroupItem
                key={q._id}
                action
                active={i === currentIndex}
                onClick={() => setCurrentIndex(i)}
                className='px-2 py-1 small border-0 rounded mb-1'
                style={{ cursor: 'pointer' }}>
                <span className='quiz-result-sidebar-item'>
                  <span
                    className={`quiz-result-sidebar-dot ${isCorrect ? 'correct' : 'incorrect'}`}
                  />
                  {i + 1}. {q.title}
                </span>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>

      {/* Main content */}
      <div className='flex-grow-1 p-4'>
        {/* Score banner */}
        <div className='quiz-result-score-banner'>
          <div>
            <div className='quiz-result-score-label'>Your Score</div>
            <div className='quiz-result-score-value'>
              {attempt.score} / {attempt.totalPoints} pts
            </div>
          </div>
          <div className='text-end'>
            <div className='quiz-result-attempt-badge'>
              {quiz.multipleAttempts
                ? `Attempt ${attempt.attemptNumber} of ${attemptsAllowed}`
                : 'Completed'}
            </div>
            <div className='quiz-result-attempt-badge'>
              {new Date(attempt.submittedAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Current question */}
        {currentQuestion && (
          <div
            className={`p-3 rounded mb-4 ${
              currentResult?.isCorrect ? 'quiz-result-q-correct' : 'quiz-result-q-incorrect'
            }`}>
            <div className='d-flex justify-content-between align-items-baseline mb-2'>
              <h6 className='mb-0'>
                Question {currentIndex + 1}{' '}
                <span className='text-muted fw-normal small'>of {questions.length}</span>
              </h6>
              <div className='d-flex align-items-center gap-2'>
                <span className='small text-muted'>{currentQuestion.points} pts</span>
                {currentResult?.isCorrect ? (
                  <FaCheckCircle className='text-success' />
                ) : (
                  <FaTimesCircle className='text-danger' />
                )}
              </div>
            </div>
            <p className='mb-3 small'>{currentQuestion.questionText}</p>
            {renderChoiceResult(currentQuestion)}
          </div>
        )}

        {/* Navigation */}
        <div className='d-flex justify-content-between align-items-center pt-3 border-top'>
          <Button
            variant='outline-secondary'
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(i => i - 1)}>
            ← Previous
          </Button>

          <div className='d-flex gap-2'>
            <Button
              variant='outline-secondary'
              onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}>
              Back to Quiz
            </Button>
            {canRetake && (
              <Button
                variant='danger'
                onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/preview`)}>
                Retake Quiz
              </Button>
            )}
          </div>

          <Button
            variant='outline-secondary'
            disabled={currentIndex === questions.length - 1}
            onClick={() => setCurrentIndex(i => i + 1)}>
            Next →
          </Button>
        </div>
      </div>
    </div>
  );
}
