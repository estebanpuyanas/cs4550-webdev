'use client';
import '../quizzes.css';
import { useParams, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaCheckCircle, FaBan } from 'react-icons/fa';
import { RootState } from '../../../../store';
import { updateQuiz } from '../reducer';
import * as client from '../client';

const QUIZ_TYPE_LABELS: Record<string, string> = {
  GRADED_QUIZ: 'Graded Quiz',
  PRACTICE_QUIZ: 'Practice Quiz',
  GRADED_SURVEY: 'Graded Survey',
  UNGRADED_SURVEY: 'Ungraded Survey',
};

const ASSIGNMENT_GROUP_LABELS: Record<string, string> = {
  QUIZZES: 'Quizzes',
  ESSAYS: 'Essays',
  ASSIGNMENTS: 'Assignments',
  PROJECT: 'Project',
};

const yesNo = (val: boolean) => (val ? 'Yes' : 'No');

export default function QuizDetails() {
  const { cid, qid } = useParams() as { cid: string; qid: string };
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountsReducer);
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const isFaculty = currentUser?.role === 'FACULTY';

  const [quiz, setQuiz] = useState<any>(null);
  const [lastAttempt, setLastAttempt] = useState<any>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    const fromStore = quizzes.find((q: any) => q._id === qid);
    if (fromStore) {
      setQuiz(fromStore);
    } else {
      client.findQuizById(qid).then(setQuiz);
    }
  }, [qid, quizzes]);

  useEffect(() => {
    if (!isFaculty && currentUser) {
      client.getMyLastAttempt(qid).then(({ attempt, attemptCount }) => {
        setLastAttempt(attempt);
        setAttemptCount(attemptCount);
      });
    }
  }, [qid, isFaculty, currentUser]);

  // Wait for quiz to load before any role-based check
  if (!quiz) return <div className='p-4'>Loading...</div>;

  if (!isFaculty) {
    if (!quiz.published) {
      return (
        <div className='p-4 text-center'>
          <h5 className='text-muted'>This quiz is not currently available.</h5>
        </div>
      );
    }

    const totalPoints =
      quiz.questions?.reduce((sum: number, q: any) => sum + (q.points || 0), 0) ?? quiz.points;

    const attemptsAllowed = quiz.multipleAttempts ? quiz.howManyAttempts : 1;
    const hasAttempts = attemptCount > 0;
    const canRetake = attemptCount < attemptsAllowed;

    return (
      <div id='wd-quiz-student-details' className='p-4'>
        <h3 className='mb-1'>{quiz.title}</h3>
        {quiz.description && <p className='text-muted mb-3'>{quiz.description}</p>}

        <hr />

        <table className='table table-borderless mb-4' style={{ width: 'auto' }}>
          <tbody>
            <tr>
              <td className='fw-bold pe-4 text-nowrap'>Points</td>
              <td>{totalPoints} pts</td>
            </tr>
            <tr>
              <td className='fw-bold pe-4 text-nowrap'>Questions</td>
              <td>{quiz.questions?.length ?? 0}</td>
            </tr>
            <tr>
              <td className='fw-bold pe-4 text-nowrap'>Time Limit</td>
              <td>{quiz.timeLimitEnabled ? `${quiz.timeLimit} Minutes` : 'No limit'}</td>
            </tr>
            <tr>
              <td className='fw-bold pe-4 text-nowrap'>Allowed Attempts</td>
              <td>{quiz.multipleAttempts ? quiz.howManyAttempts : 1}</td>
            </tr>
            <tr>
              <td className='fw-bold pe-4 text-nowrap'>Due</td>
              <td>{quiz.dueDate || '–'}</td>
            </tr>
            <tr>
              <td className='fw-bold pe-4 text-nowrap'>Available</td>
              <td>
                {quiz.availableFrom || '–'} – {quiz.availableUntil || '–'}
              </td>
            </tr>
          </tbody>
        </table>

        {hasAttempts && lastAttempt && (
          <div className='quiz-attempt-summary mb-3'>
            <div className='quiz-attempt-summary-score'>
              {lastAttempt.score} / {lastAttempt.totalPoints} pts
            </div>
            <div className='quiz-attempt-summary-meta'>
              {quiz.multipleAttempts
                ? `Attempt ${lastAttempt.attemptNumber} of ${attemptsAllowed}`
                : 'Completed'}{' '}
              &middot; {new Date(lastAttempt.submittedAt).toLocaleDateString()}
            </div>
          </div>
        )}

        <div className='d-flex gap-2 flex-wrap align-items-center'>
          {hasAttempts && (
            <Button
              variant='outline-secondary'
              onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/results`)}>
              View Last Attempt
            </Button>
          )}
          {canRetake && (
            <Button
              variant='danger'
              onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/preview`)}>
              {hasAttempts ? 'Retake Quiz' : 'Take Quiz'}
            </Button>
          )}
          {!canRetake && <p className='text-muted small mb-0'>No attempts remaining.</p>}
        </div>
      </div>
    );
  }

  const handlePublishToggle = async () => {
    const updated = await client.updateQuiz({ ...quiz, published: !quiz.published });
    dispatch(updateQuiz(updated));
    setQuiz(updated);
  };

  const totalPoints =
    quiz.questions?.reduce((sum: number, q: any) => sum + (q.points || 0), 0) ?? quiz.points;

  return (
    <div id='wd-quiz-details' className='p-4'>
      <div className='d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2'>
        <h3 className='mb-0' style={{ minWidth: 0 }}>
          {quiz.title}
        </h3>
        <div className='d-flex gap-2 flex-shrink-0 flex-wrap'>
          <Button
            variant={quiz.published ? 'success' : 'secondary'}
            onClick={handlePublishToggle}
            className='d-flex align-items-center gap-2'>
            {quiz.published ? (
              <>
                <FaCheckCircle /> Published
              </>
            ) : (
              <>
                <FaBan /> Unpublished
              </>
            )}
          </Button>
          <Button
            variant='secondary'
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/preview`)}>
            Preview
          </Button>
          <Button
            variant='danger'
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}>
            Edit
          </Button>
        </div>
      </div>

      <hr />

      <table className='table table-borderless mb-0' style={{ width: 'auto', minWidth: '500px' }}>
        <tbody>
          <tr>
            <td className='text-end fw-bold pe-4 text-nowrap'>Quiz Type</td>
            <td>{QUIZ_TYPE_LABELS[quiz.quizType] ?? quiz.quizType}</td>
          </tr>
          <tr>
            <td className='text-end fw-bold pe-4 text-nowrap'>Points</td>
            <td>{totalPoints} pts</td>
          </tr>
          <tr>
            <td className='text-end fw-bold pe-4 text-nowrap'>Assignment Group</td>
            <td>{ASSIGNMENT_GROUP_LABELS[quiz.assignmentGroup] ?? quiz.assignmentGroup}</td>
          </tr>
          <tr>
            <td className='text-end fw-bold pe-4 text-nowrap'>Shuffle Answers</td>
            <td>{yesNo(quiz.shuffleAnswers)}</td>
          </tr>
          <tr>
            <td className='text-end fw-bold pe-4 text-nowrap'>Time Limit</td>
            <td>{quiz.timeLimitEnabled ? `${quiz.timeLimit} Minutes` : 'No'}</td>
          </tr>
          <tr>
            <td className='text-end fw-bold pe-4 text-nowrap'>Multiple Attempts</td>
            <td>{yesNo(quiz.multipleAttempts)}</td>
          </tr>
          {quiz.multipleAttempts && (
            <tr>
              <td className='text-end fw-bold pe-4 text-nowrap'>How Many Attempts</td>
              <td>{quiz.howManyAttempts}</td>
            </tr>
          )}
          <tr>
            <td className='text-end fw-bold pe-4 text-nowrap'>Show Correct Answers</td>
            <td>{yesNo(quiz.showCorrectAnswers)}</td>
          </tr>
          <tr>
            <td className='text-end fw-bold pe-4 text-nowrap'>Access Code</td>
            <td>{quiz.accessCode || <span className='text-muted'>None</span>}</td>
          </tr>
          <tr>
            <td className='text-end fw-bold pe-4 text-nowrap'>One Question at a Time</td>
            <td>{yesNo(quiz.oneQuestionAtATime)}</td>
          </tr>
          <tr>
            <td className='text-end fw-bold pe-4 text-nowrap'>Webcam Required</td>
            <td>{yesNo(quiz.webcamRequired)}</td>
          </tr>
          <tr>
            <td className='text-end fw-bold pe-4 text-nowrap'>Lock Questions After Answering</td>
            <td>{yesNo(quiz.lockQuestionsAfterAnswering)}</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <table className='table table-borderless'>
        <thead>
          <tr className='border-bottom'>
            <th>Due</th>
            <th>Available From</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{quiz.dueDate || '–'}</td>
            <td>{quiz.availableFrom || '–'}</td>
            <td>{quiz.availableUntil || '–'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
