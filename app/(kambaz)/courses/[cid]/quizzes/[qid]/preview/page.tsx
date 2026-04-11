'use client';
import '../../quizzes.css';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap';
import { RootState } from '../../../../../store';
import * as client from '../../client';

export default function QuizPreview() {
  const { cid, qid } = useParams() as { cid: string; qid: string };
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountsReducer);
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const isFaculty = currentUser?.role === 'FACULTY';

  const [quiz, setQuiz] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  useEffect(() => {
    const fromStore = quizzes.find((q: any) => q._id === qid);
    if (fromStore) {
      setQuiz(fromStore);
    } else {
      client.findQuizById(qid).then(setQuiz);
    }
  }, [qid, quizzes]);

  if (!quiz) return <div className='p-4'>Loading...</div>;

  if (!isFaculty && !quiz.published) {
    return (
      <div className='p-4 text-center'>
        <h5 className='text-muted'>This quiz is not currently available.</h5>
      </div>
    );
  }

  const questions = quiz.questions ?? [];

  if (questions.length === 0) {
    return (
      <div className='p-4 text-center'>
        <p className='text-muted'>This quiz has no questions yet.</p>
        {isFaculty && (
          <Button
            variant='outline-secondary'
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}>
            Add Questions
          </Button>
        )}
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const handleSingleAnswer = (qId: string, value: string) => {
    setAnswers({ ...answers, [qId]: value });
  };

  const handleMultiToggle = (qId: string, choiceId: string) => {
    const current: string[] = answers[qId] ?? [];
    const updated = current.includes(choiceId)
      ? current.filter(id => id !== choiceId)
      : [...current, choiceId];
    setAnswers({ ...answers, [qId]: updated });
  };

  return (
    <div id='wd-quiz-preview' style={{ display: 'flex', minHeight: '600px' }}>
      {/* Sidebar ── question list */}
      <div className='border-end bg-light p-3' style={{ width: '180px', minWidth: '180px' }}>
        <p className='small fw-bold text-muted mb-2'>Questions</p>
        <ListGroup variant='flush'>
          {questions.map((q: any, i: number) => (
            <ListGroupItem
              key={q._id}
              action
              active={i === currentIndex}
              onClick={() => setCurrentIndex(i)}
              className='px-2 py-1 small border-0 rounded mb-1'
              style={{ cursor: 'pointer' }}>
              {i + 1}. {q.title}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>

      <div className='flex-grow-1 p-4'>
        {isFaculty && (
          <div className='alert alert-info d-flex justify-content-between align-items-center py-2 mb-4'>
            <span className='small'>
              <strong>Preview Mode</strong> — students will see this quiz when it is published.
            </span>
            <Button
              size='sm'
              variant='outline-secondary'
              onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}>
              Back to Details
            </Button>
          </div>
        )}

        {/* Question header */}
        <div className='d-flex justify-content-between align-items-baseline mb-3'>
          <h5 className='mb-0'>
            Question {currentIndex + 1}{' '}
            <span className='text-muted fw-normal fs-6'>of {questions.length}</span>
          </h5>
          <span className='text-muted small'>{currentQuestion.points} pts</span>
        </div>

        <p className='mb-4 fs-6'>{currentQuestion.questionText}</p>

        {currentQuestion.type === 'MULTIPLE_CHOICE' && (
          <div>
            {currentQuestion.choices.map((c: any) => (
              <Form.Check
                key={c._id}
                type='radio'
                id={`mc-${c._id}`}
                name={`q-${currentQuestion._id}`}
                label={c.text}
                checked={answers[currentQuestion._id] === c._id}
                onChange={() => handleSingleAnswer(currentQuestion._id, c._id)}
                className='mb-2'
              />
            ))}
          </div>
        )}

        {currentQuestion.type === 'MULTIPLE_SELECT' && (
          <div>
            {currentQuestion.choices.map((c: any) => (
              <Form.Check
                key={c._id}
                type='checkbox'
                id={`ms-${c._id}`}
                label={c.text}
                checked={(answers[currentQuestion._id] ?? []).includes(c._id)}
                onChange={() => handleMultiToggle(currentQuestion._id, c._id)}
                className='mb-2'
              />
            ))}
          </div>
        )}

        {currentQuestion.type === 'TRUE_FALSE' && (
          <div>
            <Form.Check
              type='radio'
              id={`tf-true-${currentQuestion._id}`}
              name={`q-${currentQuestion._id}`}
              label='True'
              checked={answers[currentQuestion._id] === 'true'}
              onChange={() => handleSingleAnswer(currentQuestion._id, 'true')}
              className='mb-2'
            />
            <Form.Check
              type='radio'
              id={`tf-false-${currentQuestion._id}`}
              name={`q-${currentQuestion._id}`}
              label='False'
              checked={answers[currentQuestion._id] === 'false'}
              onChange={() => handleSingleAnswer(currentQuestion._id, 'false')}
              className='mb-2'
            />
          </div>
        )}

        {currentQuestion.type === 'FILL_IN_BLANK' && (
          <Form.Control
            type='text'
            placeholder='Your answer'
            value={answers[currentQuestion._id] ?? ''}
            onChange={e => handleSingleAnswer(currentQuestion._id, e.target.value)}
            style={{ maxWidth: '400px' }}
          />
        )}

        <div className='d-flex justify-content-between align-items-center mt-5 pt-3 border-top'>
          <Button
            variant='outline-secondary'
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(i => i - 1)}>
            ← Previous
          </Button>

          {!isLast ? (
            <Button variant='outline-secondary' onClick={() => setCurrentIndex(i => i + 1)}>
              Next →
            </Button>
          ) : (
            <Button variant='danger' onClick={() => router.push(`/courses/${cid}/quizzes`)}>
              {isFaculty ? 'Back to Quizzes' : 'Submit Quiz'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
