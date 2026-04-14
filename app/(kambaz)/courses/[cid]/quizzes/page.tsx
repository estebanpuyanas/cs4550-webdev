'use client';
import './quizzes.css';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { BsGripVertical, BsPlus } from 'react-icons/bs';
import { IoEllipsisVertical, IoSearchOutline } from 'react-icons/io5';
import { LuClipboardList } from 'react-icons/lu';
import { FaCheckCircle, FaBan } from 'react-icons/fa';
import { Form, InputGroup, Button, Dropdown } from 'react-bootstrap';
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
  }, [cid, dispatch]);

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
    if (until && now > until) return <span className='quiz-meta-closed'>Closed</span>;
    if (from && now < from)
      return (
        <span className='quiz-meta-not-available'>Not available until {quiz.availableFrom}</span>
      );
    return <span className='quiz-meta-available'>Available</span>;
  };

  return (
    <div id='wd-quizzes'>
      <div className='quiz-toolbar'>
        <InputGroup style={{ width: '280px' }}>
          <InputGroupText>
            <IoSearchOutline />
          </InputGroupText>
          <Form.Control type='text' placeholder='Search quizzes…' className='border-start-0' />
        </InputGroup>
        {isFaculty && (
          <Button variant='danger' onClick={handleAddQuiz}>
            <BsPlus className='fs-5' /> Quiz
          </Button>
        )}
      </div>

      <div className='quiz-section-header'>
        <div className='quiz-section-header-label'>
          <BsGripVertical />
          Quizzes
        </div>
        <div className='quiz-section-header-actions'>
          <BsPlus style={{ fontSize: '1.2rem' }} />
          <IoEllipsisVertical />
        </div>
      </div>

      <div className='quiz-list'>
        {visibleQuizzes.map((quiz: any) => (
          <div key={quiz._id} className='quiz-item'>
            <div className='quiz-item-inner'>
              <div className='quiz-item-left'>
                <BsGripVertical className='quiz-item-grip' />
                <LuClipboardList className='quiz-item-icon' />
                <div className='quiz-item-body'>
                  <Link href={`/courses/${cid}/quizzes/${quiz._id}`} className='quiz-item-title'>
                    {quiz.title}
                  </Link>
                  <div className='quiz-item-meta'>
                    {availabilityLabel(quiz)}
                    <span className='quiz-item-meta-sep'>·</span>
                    <span>
                      <strong>Due</strong> {quiz.dueDate || 'No due date'}
                    </span>
                    <span className='quiz-item-meta-sep'>·</span>
                    <span>{quiz.points} pts</span>
                    <span className='quiz-item-meta-sep'>·</span>
                    <span>{quiz.questions?.length ?? 0} Q</span>
                  </div>
                </div>
              </div>

              <div className='quiz-item-right'>
                {quiz.published ? (
                  <FaCheckCircle
                    className='quiz-publish-icon text-success'
                    style={{ cursor: isFaculty ? 'pointer' : 'default' }}
                    onClick={() => isFaculty && handlePublishToggle(quiz)}
                    title='Published – click to unpublish'
                  />
                ) : (
                  <FaBan
                    className='quiz-publish-icon'
                    style={{
                      cursor: isFaculty ? 'pointer' : 'default',
                      color: 'var(--k-border-strong)',
                    }}
                    onClick={() => isFaculty && handlePublishToggle(quiz)}
                    title='Unpublished – click to publish'
                  />
                )}

                {isFaculty && (
                  <Dropdown align='end'>
                    <Dropdown.Toggle id={`quiz-menu-${quiz._id}`} className='quiz-menu-toggle'>
                      <IoEllipsisVertical />
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
          </div>
        ))}
      </div>
    </div>
  );
}
