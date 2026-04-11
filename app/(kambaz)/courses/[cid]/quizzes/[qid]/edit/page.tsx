'use client';
import '../../quizzes.css';
import { useParams, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button, Form, Nav, Row, Col } from 'react-bootstrap';
import { RootState } from '../../../../../store';
import { updateQuiz } from '../../reducer';
import * as client from '../../client';
import QuizQuestions from './QuizQuestions';

export default function QuizEditor() {
  const { cid, qid } = useParams() as { cid: string; qid: string };
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountsReducer);

  const isFaculty = currentUser?.role === 'FACULTY';

  const [activeTab, setActiveTab] = useState('details');
  const [loaded, setLoaded] = useState(false);

  const [title, setTitle] = useState('New Quiz');
  const [description, setDescription] = useState('');
  const [quizType, setQuizType] = useState('GRADED_QUIZ');
  const [assignmentGroup, setAssignmentGroup] = useState('QUIZZES');
  const [shuffleAnswers, setShuffleAnswers] = useState(true);
  const [timeLimitEnabled, setTimeLimitEnabled] = useState(true);
  const [timeLimit, setTimeLimit] = useState(20);
  const [multipleAttempts, setMultipleAttempts] = useState(false);
  const [howManyAttempts, setHowManyAttempts] = useState(1);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(true);
  const [accessCode, setAccessCode] = useState('');
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(false);
  const [webcamRequired, setWebcamRequired] = useState(false);
  const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [availableFrom, setAvailableFrom] = useState('');
  const [availableUntil, setAvailableUntil] = useState('');
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    const fromStore = quizzes.find((q: any) => q._id === qid);
    if (fromStore) {
      populate(fromStore);
      setLoaded(true);
    } else {
      client.findQuizById(qid).then(data => {
        if (data) populate(data);
        setLoaded(true);
      });
    }
  }, [qid]);

  function populate(q: any) {
    setTitle(q.title ?? 'New Quiz');
    setDescription(q.description ?? '');
    setQuizType(q.quizType ?? 'GRADED_QUIZ');
    setAssignmentGroup(q.assignmentGroup ?? 'QUIZZES');
    setShuffleAnswers(q.shuffleAnswers ?? true);
    setTimeLimitEnabled(q.timeLimitEnabled ?? true);
    setTimeLimit(q.timeLimit ?? 20);
    setMultipleAttempts(q.multipleAttempts ?? false);
    setHowManyAttempts(q.howManyAttempts ?? 1);
    setShowCorrectAnswers(q.showCorrectAnswers ?? true);
    setAccessCode(q.accessCode ?? '');
    setOneQuestionAtATime(q.oneQuestionAtATime ?? false);
    setWebcamRequired(q.webcamRequired ?? false);
    setLockQuestionsAfterAnswering(q.lockQuestionsAfterAnswering ?? false);
    setDueDate(q.dueDate ?? '');
    setAvailableFrom(q.availableFrom ?? '');
    setAvailableUntil(q.availableUntil ?? '');
    setQuestions(q.questions ?? []);
  }

  if (!isFaculty) {
    return (
      <div className='p-4 text-center'>
        <h4 className='text-danger'>Access Denied</h4>
        <p>Only faculty can edit quizzes.</p>
      </div>
    );
  }

  if (!loaded) return <div className='p-4'>Loading...</div>;

  const totalPoints = questions.reduce((sum: number, q: any) => sum + (q.points || 0), 0);

  const buildPayload = (published?: boolean) => ({
    _id: qid,
    course: cid,
    title,
    description,
    quizType,
    assignmentGroup,
    points: totalPoints,
    shuffleAnswers,
    timeLimitEnabled,
    timeLimit,
    multipleAttempts,
    howManyAttempts,
    showCorrectAnswers,
    accessCode,
    oneQuestionAtATime,
    webcamRequired,
    lockQuestionsAfterAnswering,
    dueDate,
    availableFrom,
    availableUntil,
    questions: questions.map(({ editing, isNew, ...q }: any) => q),
    ...(published !== undefined && { published }),
  });

  const handleSave = async () => {
    const updated = await client.updateQuiz(buildPayload());
    dispatch(updateQuiz(updated));
    router.push(`/courses/${cid}/quizzes/${qid}`);
  };

  const handleSaveAndPublish = async () => {
    const updated = await client.updateQuiz(buildPayload(true));
    dispatch(updateQuiz(updated));
    router.push(`/courses/${cid}/quizzes`);
  };

  const handleCancel = () => {
    router.push(`/courses/${cid}/quizzes`);
  };

  return (
    <div id='wd-quiz-editor'>
      {/* Tabs */}
      <Nav
        variant='tabs'
        className='mb-0'
        activeKey={activeTab}
        onSelect={k => setActiveTab(k || 'details')}>
        <Nav.Item>
          <Nav.Link eventKey='details'>Details</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='questions'>Questions</Nav.Link>
        </Nav.Item>
      </Nav>

      <div className='border border-top-0 p-4'>
        {activeTab === 'details' && (
          <Form>
            {/* Title */}
            <Form.Group className='mb-4'>
              <Form.Control
                type='text'
                id='wd-quiz-title'
                value={title}
                onChange={e => setTitle(e.target.value)}
                className='fs-5'
              />
            </Form.Group>

            {/* Description */}
            <Form.Group className='mb-4'>
              <Form.Label>
                <b>Quiz Instructions</b>
              </Form.Label>
              <Form.Control
                as='textarea'
                id='wd-quiz-description'
                rows={6}
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Form.Group>

            {/* Settings */}
            <table className='table table-borderless' style={{ maxWidth: '680px' }}>
              <tbody>
                <tr>
                  <td
                    className='text-end fw-bold pe-4 text-nowrap align-middle'
                    style={{ width: '240px' }}>
                    Quiz Type
                  </td>
                  <td>
                    <Form.Select
                      id='wd-quiz-type'
                      value={quizType}
                      onChange={e => setQuizType(e.target.value)}>
                      <option value='GRADED_QUIZ'>Graded Quiz</option>
                      <option value='PRACTICE_QUIZ'>Practice Quiz</option>
                      <option value='GRADED_SURVEY'>Graded Survey</option>
                      <option value='UNGRADED_SURVEY'>Ungraded Survey</option>
                    </Form.Select>
                  </td>
                </tr>

                <tr>
                  <td className='text-end fw-bold pe-4 text-nowrap align-middle'>Points</td>
                  <td>
                    <Form.Control
                      type='number'
                      id='wd-quiz-points'
                      value={totalPoints}
                      readOnly
                      className='bg-light'
                    />
                    <Form.Text className='text-muted'>Calculated from question points</Form.Text>
                  </td>
                </tr>

                <tr>
                  <td className='text-end fw-bold pe-4 text-nowrap align-middle'>
                    Assignment Group
                  </td>
                  <td>
                    <Form.Select
                      id='wd-assignment-group'
                      value={assignmentGroup}
                      onChange={e => setAssignmentGroup(e.target.value)}>
                      <option value='QUIZZES'>Quizzes</option>
                      <option value='ESSAYS'>Essays</option>
                      <option value='ASSIGNMENTS'>Assignments</option>
                      <option value='PROJECT'>Project</option>
                    </Form.Select>
                  </td>
                </tr>

                <tr>
                  <td className='text-end fw-bold pe-4 text-nowrap align-middle'>
                    Shuffle Answers
                  </td>
                  <td className='align-middle'>
                    <Form.Check
                      type='checkbox'
                      id='wd-shuffle-answers'
                      label='Shuffle Answers'
                      checked={shuffleAnswers}
                      onChange={e => setShuffleAnswers(e.target.checked)}
                    />
                  </td>
                </tr>

                <tr>
                  <td className='text-end fw-bold pe-4 text-nowrap align-middle'>Time Limit</td>
                  <td>
                    <div className='d-flex align-items-center gap-3'>
                      <Form.Check
                        type='checkbox'
                        id='wd-time-limit-enabled'
                        label='Enable'
                        checked={timeLimitEnabled}
                        onChange={e => setTimeLimitEnabled(e.target.checked)}
                      />
                      {timeLimitEnabled && (
                        <div className='d-flex align-items-center gap-2'>
                          <Form.Control
                            type='number'
                            id='wd-time-limit'
                            value={timeLimit}
                            onChange={e => setTimeLimit(Number(e.target.value))}
                            style={{ width: '80px' }}
                            min={1}
                          />
                          <span>Minutes</span>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='text-end fw-bold pe-4 text-nowrap align-middle'>
                    Multiple Attempts
                  </td>
                  <td>
                    <div className='d-flex align-items-center gap-3'>
                      <Form.Check
                        type='checkbox'
                        id='wd-multiple-attempts'
                        label='Allow Multiple Attempts'
                        checked={multipleAttempts}
                        onChange={e => setMultipleAttempts(e.target.checked)}
                      />
                      {multipleAttempts && (
                        <div className='d-flex align-items-center gap-2'>
                          <Form.Label className='mb-0 text-nowrap'>How many:</Form.Label>
                          <Form.Control
                            type='number'
                            id='wd-how-many-attempts'
                            value={howManyAttempts}
                            onChange={e => setHowManyAttempts(Number(e.target.value))}
                            style={{ width: '80px' }}
                            min={1}
                          />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='text-end fw-bold pe-4 text-nowrap align-middle'>
                    Show Correct Answers
                  </td>
                  <td className='align-middle'>
                    <Form.Check
                      type='checkbox'
                      id='wd-show-correct-answers'
                      label='Show correct answers to students'
                      checked={showCorrectAnswers}
                      onChange={e => setShowCorrectAnswers(e.target.checked)}
                    />
                  </td>
                </tr>

                <tr>
                  <td className='text-end fw-bold pe-4 text-nowrap align-middle'>Access Code</td>
                  <td>
                    <Form.Control
                      type='text'
                      id='wd-access-code'
                      value={accessCode}
                      onChange={e => setAccessCode(e.target.value)}
                      placeholder='Leave blank for no passcode'
                    />
                  </td>
                </tr>

                <tr>
                  <td className='text-end fw-bold pe-4 text-nowrap align-middle'>
                    One Question at a Time
                  </td>
                  <td className='align-middle'>
                    <Form.Check
                      type='checkbox'
                      id='wd-one-question-at-a-time'
                      label='Show one question at a time'
                      checked={oneQuestionAtATime}
                      onChange={e => setOneQuestionAtATime(e.target.checked)}
                    />
                  </td>
                </tr>

                <tr>
                  <td className='text-end fw-bold pe-4 text-nowrap align-middle'>
                    Webcam Required
                  </td>
                  <td className='align-middle'>
                    <Form.Check
                      type='checkbox'
                      id='wd-webcam-required'
                      label='Require webcam during quiz'
                      checked={webcamRequired}
                      onChange={e => setWebcamRequired(e.target.checked)}
                    />
                  </td>
                </tr>

                <tr>
                  <td className='text-end fw-bold pe-4 text-nowrap align-middle'>
                    Lock Questions After Answering
                  </td>
                  <td className='align-middle'>
                    <Form.Check
                      type='checkbox'
                      id='wd-lock-questions'
                      label='Lock questions after answering'
                      checked={lockQuestionsAfterAnswering}
                      onChange={e => setLockQuestionsAfterAnswering(e.target.checked)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Dates */}
            <div className='border rounded p-3 mt-2' style={{ maxWidth: '680px' }}>
              <Row className='mb-3'>
                <Col md={3} className='text-end fw-bold pt-2'>
                  Due
                </Col>
                <Col md={9}>
                  <Form.Control
                    type='date'
                    id='wd-due-date'
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className='mb-3'>
                <Col md={3} className='text-end fw-bold pt-2'>
                  Available From
                </Col>
                <Col md={9}>
                  <Form.Control
                    type='date'
                    id='wd-available-from'
                    value={availableFrom}
                    onChange={e => setAvailableFrom(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={3} className='text-end fw-bold pt-2'>
                  Until
                </Col>
                <Col md={9}>
                  <Form.Control
                    type='date'
                    id='wd-available-until'
                    value={availableUntil}
                    onChange={e => setAvailableUntil(e.target.value)}
                  />
                </Col>
              </Row>
            </div>
          </Form>
        )}

        {activeTab === 'questions' && (
          <QuizQuestions questions={questions} setQuestions={setQuestions} />
        )}
      </div>

      {/* Action buttons */}
      <hr />
      <div className='d-flex justify-content-end gap-2'>
        <Button variant='secondary' onClick={handleCancel} id='wd-cancel-quiz'>
          Cancel
        </Button>
        <Button variant='outline-danger' onClick={handleSaveAndPublish} id='wd-save-publish-quiz'>
          Save &amp; Publish
        </Button>
        <Button variant='danger' onClick={handleSave} id='wd-save-quiz'>
          Save
        </Button>
      </div>
    </div>
  );
}
