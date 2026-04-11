'use client';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { BsGripVertical, BsPlus } from 'react-icons/bs';
import { IoEllipsisVertical, IoSearchOutline } from 'react-icons/io5';
import { LuClipboardList } from 'react-icons/lu';
import { FaCheckCircle, FaBan } from 'react-icons/fa';
import { ListGroup, ListGroupItem, Button, Form, InputGroup, Dropdown } from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/InputGroupText';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../../../store';
import { setQuizzes, addQuiz, deleteQuiz, updateQuiz } from './reducer';
import * as client from './client';

export default function Quizzes() {
  const { cid } = useParams() as { cid: string };
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountsReducer);
  const isFaculty = currentUser?.role === 'FACULTY';
  const visibleQuizzes = isFaculty ? quizzes : quizzes.filter((q: any) => q.published);

  useEffect(() => {
    client.findQuizzesForCourse(cid).then(data => dispatch(setQuizzes(data)));
  }, [cid]);

  const handleAddQuiz = async () => {
    const newQuiz = await client.createQuiz(cid, {
      title: 'New Quiz',
      description: '',
      points: 0,
      dueDate: '',
      availableFrom: '',
      availableUntil: '',
      published: false,
      shuffleAnswers: true,
      timeLimitEnabled: true,
      timeLimit: 20,
      questions: [],
    });
    dispatch(addQuiz(newQuiz));
    router.push(`/courses/${cid}/quizzes/${newQuiz._id}/edit`);
  };

  const handleDelete = async (quizId: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove "${title}"?`)) {
      await client.deleteQuiz(quizId);
      dispatch(deleteQuiz(quizId));
    }
  };

  const handlePublishToggle = async (quiz: any) => {
    const updated = await client.updateQuiz({ ...quiz, published: !quiz.published });
    dispatch(updateQuiz(updated));
  };

  const availabilityLabel = (quiz: any) => {
    const now = new Date();
    const from = quiz.availableFrom ? new Date(quiz.availableFrom) : null;
    const until = quiz.availableUntil ? new Date(quiz.availableUntil) : null;
    if (until && now > until) return <span className='text-danger fw-bold'>Closed</span>;
    if (from && now < from)
      return (
        <>
          <strong>Not available until</strong> {quiz.availableFrom}
        </>
      );
    return <span className='text-success fw-bold'>Available</span>;
  };

  return (
    <div id='wd-quizzes'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <InputGroup style={{ width: '300px' }}>
          <InputGroupText className='bg-white'>
            <IoSearchOutline />
          </InputGroupText>
          <Form.Control type='text' placeholder='Search for Quiz' className='border-start-0' />
        </InputGroup>

        {isFaculty && (
          <Button variant='danger' onClick={handleAddQuiz}>
            <BsPlus className='fs-4' /> Quiz
          </Button>
        )}
      </div>

      <ListGroup className='rounded-0'>
        <ListGroupItem className='p-3 ps-2 bg-secondary border-secondary'>
          <div className='d-flex justify-content-between align-items-center'>
            <div>
              <BsGripVertical className='me-2 fs-3' />
              <strong>QUIZZES</strong>
            </div>
            <div>
              <BsPlus className='fs-4' />
              <IoEllipsisVertical className='fs-5' />
            </div>
          </div>
        </ListGroupItem>

        {visibleQuizzes.map((quiz: any) => (
          <ListGroupItem
            key={quiz._id}
            className='p-3 ps-1 border-start border-success border-5 border-top-0 border-end-0 border-bottom-0'>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items-start'>
                <BsGripVertical className='me-2 fs-3 text-secondary' />
                <LuClipboardList className='me-2 fs-4 text-success mt-1' />
                <div className='ms-2'>
                  <Link
                    href={`/courses/${cid}/quizzes/${quiz._id}`}
                    className='text-dark text-decoration-none fw-bold'>
                    {quiz.title}
                  </Link>
                  <div className='text-muted small'>
                    {availabilityLabel(quiz)} | <strong>Due</strong> {quiz.dueDate || 'No due date'}{' '}
                    | {quiz.points} pts | {quiz.questions?.length ?? 0} Questions
                  </div>
                </div>
              </div>

              <div className='d-flex align-items-center gap-3'>
                {quiz.published ? (
                  <FaCheckCircle
                    className='text-success fs-5'
                    style={{ cursor: isFaculty ? 'pointer' : 'default' }}
                    onClick={() => isFaculty && handlePublishToggle(quiz)}
                    title='Published – click to unpublish'
                  />
                ) : (
                  <FaBan
                    className='text-secondary fs-5'
                    style={{ cursor: isFaculty ? 'pointer' : 'default' }}
                    onClick={() => isFaculty && handlePublishToggle(quiz)}
                    title='Unpublished – click to publish'
                  />
                )}

                {isFaculty && (
                  <Dropdown align='end'>
                    <Dropdown.Toggle
                      variant='white'
                      id={`quiz-menu-${quiz._id}`}
                      className='border-0 p-0 text-dark'
                      style={{ boxShadow: 'none' }}>
                      <IoEllipsisVertical className='fs-5' />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => router.push(`/courses/${cid}/quizzes/${quiz._id}/edit`)}>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handlePublishToggle(quiz)}>
                        {quiz.published ? 'Unpublish' : 'Publish'}
                      </Dropdown.Item>
                      <Dropdown.Item
                        className='text-danger'
                        onClick={() => handleDelete(quiz._id, quiz.title)}>
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
