'use client';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useParams, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { RootState } from '../../../../store';
import { addAssignment, updateAssignment } from '../reducer';
import * as client from '../client';

export default function AssignmentEditor() {
  const { cid, aid } = useParams() as { cid: string; aid: string };
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments = [] } = useSelector((state: RootState) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountsReducer);
  const isFaculty = currentUser?.role === 'FACULTY';

  const isNew = aid === 'new';
  const existing = !isNew ? assignments.find((a: any) => a._id === aid) : null;

  const [title, setTitle] = useState(existing?.title ?? '');
  const [description, setDescription] = useState(existing?.description ?? '');
  const [points, setPoints] = useState<number>(existing?.points ?? 100);
  const [dueDate, setDueDate] = useState(existing?.dueDate ?? '');
  const [availableFrom, setAvailableFrom] = useState(existing?.availableFrom ?? '');
  const [availableUntil, setAvailableUntil] = useState(existing?.availableUntil ?? '');

  if (!isNew && !existing) {
    return <div className='p-4'>Assignment not found.</div>;
  }

  const handleSave = async () => {
    if (isNew) {
      const newAssignment = await client.createAssignment(cid, {
        course: cid,
        title,
        description,
        points,
        dueDate,
        availableFrom,
        availableUntil,
      });
      dispatch(addAssignment(newAssignment));
    } else {
      const updated = await client.updateAssignment({
        ...existing,
        title,
        description,
        points,
        dueDate,
        availableFrom,
        availableUntil,
      });
      dispatch(updateAssignment(updated));
    }
    router.push(`/courses/${cid}/assignments`);
  };

  const handleCancel = () => {
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id='wd-assignments-editor' className='p-4'>
      <Container fluid>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>
              <b>Assignment Name</b>
            </Form.Label>
            <Form.Control
              type='text'
              id='wd-name'
              value={title}
              onChange={e => setTitle(e.target.value)}
              disabled={!isFaculty}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>
              <b>Description</b>
            </Form.Label>
            <Form.Control
              as='textarea'
              rows={6}
              id='wd-description'
              value={description}
              onChange={e => setDescription(e.target.value)}
              disabled={!isFaculty}
            />
          </Form.Group>

          <Row className='mb-3'>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Points</Form.Label>
                <Form.Control
                  type='number'
                  id='wd-points'
                  value={points}
                  onChange={e => setPoints(Number(e.target.value))}
                  disabled={!isFaculty}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className='mb-3'>
            <Form.Label>Assignment Group</Form.Label>
            <Form.Select id='wd-group-selector' defaultValue='Assignments' disabled={!isFaculty}>
              <option value='Assignments'>ASSIGNMENTS</option>
              <option value='Quizzes'>QUIZZES</option>
              <option value='Exams'>EXAMS</option>
              <option value='Project'>PROJECT</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Display Grade As</Form.Label>
            <Form.Select id='wd-grade-display-type' defaultValue='Percentage' disabled={!isFaculty}>
              <option value='Percentage'>Percentage</option>
              <option value='Points'>Points</option>
              <option value='Fraction'>Fraction</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Submission Type</Form.Label>
            <Form.Select id='wd-submission-type' defaultValue='Online' disabled={!isFaculty}>
              <option value='Online'>Online</option>
              <option value='Physical'>Physical</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>
              <b>Online Entry Options</b>
            </Form.Label>
            <div className='border p-3 rounded bg-light'>
              <Form.Check type='checkbox' id='wd-chkbox-text-entry' label='Text Entry' disabled={!isFaculty} />
              <Form.Check type='checkbox' id='wd-chkbox-web-url' label='Web URL' defaultChecked disabled={!isFaculty} />
              <Form.Check type='checkbox' id='wd-chkbox-media-recording' label='Media Recording' disabled={!isFaculty} />
              <Form.Check
                type='checkbox'
                id='wd-chkbox-student-annotation'
                label='Student Annotation'
                disabled={!isFaculty}
              />
              <Form.Check type='checkbox' id='wd-chkbox-file-upload' label='File Upload' disabled={!isFaculty} />
            </div>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Assign to</Form.Label>
            <Form.Select id='wd-assign-to' defaultValue='Everyone' disabled={!isFaculty}>
              <option value='Everyone'>Everyone</option>
              <option value='TAs'>TAs</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>
              <b>Due</b>
            </Form.Label>
            <Form.Control
              type='date'
              id='wd-due-date'
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              disabled={!isFaculty}
            />
          </Form.Group>

          <Row className='mb-3'>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Available From</Form.Label>
                <Form.Control
                  type='date'
                  id='wd-available-from'
                  value={availableFrom}
                  onChange={e => setAvailableFrom(e.target.value)}
                  disabled={!isFaculty}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Until</Form.Label>
                <Form.Control
                  type='date'
                  id='wd-available-until'
                  value={availableUntil}
                  onChange={e => setAvailableUntil(e.target.value)}
                  disabled={!isFaculty}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className='d-flex gap-2'>
            <Button
              variant='secondary'
              type='button'
              onClick={handleCancel}
              id='wd-cancel-assignment'>
              Cancel
            </Button>
            {isFaculty && (
              <Button variant='danger' type='button' onClick={handleSave} id='wd-save-assignment'>
                Save
              </Button>
            )}
          </div>
        </Form>
      </Container>
    </div>
  );
}
