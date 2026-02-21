'use client';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'next/navigation';
import * as db from '../../../../database';

export default function AssignmentEditor() {
  const { aid } = useParams() as { aid: string };
  const assignment = db.assignments.find((a: any) => a._id === aid);

  if (!assignment) {
    return <div className='p-4'>Assignment not found.</div>;
  }

  return (
    <div id='wd-assignments-editor' className='p-4'>
      <Container fluid>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>
              <b>Assignment Name</b>
            </Form.Label>
            <Form.Control type='text' id='wd-name' defaultValue={assignment.title} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>
              <b>Description</b>
            </Form.Label>
            <Form.Control
              as='textarea'
              rows={6}
              id='wd-description'
              defaultValue={assignment.description}
            />
          </Form.Group>

          <Row className='mb-3'>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Points</Form.Label>
                <Form.Control type='number' id='wd-points' defaultValue={assignment.points} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className='mb-3'>
            <Form.Label>Assignment Group</Form.Label>
            <Form.Select id='wd-group-selector' defaultValue='Assignments'>
              <option value='Assignments'>ASSIGNMENTS</option>
              <option value='Quizzes'>QUIZZES</option>
              <option value='Exams'>EXAMS</option>
              <option value='Project'>PROJECT</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Display Grade As</Form.Label>
            <Form.Select id='wd-grade-display-type' defaultValue='Percentage'>
              <option value='Percentage'>Percentage</option>
              <option value='Points'>Points</option>
              <option value='Fraction'>Fraction</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Submission Type</Form.Label>
            <Form.Select id='wd-submission-type' defaultValue='Online'>
              <option value='Online'>Online</option>
              <option value='Physical'>Physical</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>
              <b>Online Entry Options</b>
            </Form.Label>
            <div className='border p-3 rounded bg-light'>
              <Form.Check type='checkbox' id='wd-chkbox-text-entry' label='Text Entry' />
              <Form.Check type='checkbox' id='wd-chkbox-web-url' label='Web URL' defaultChecked />
              <Form.Check type='checkbox' id='wd-chkbox-media-recording' label='Media Recording' />
              <Form.Check
                type='checkbox'
                id='wd-chkbox-student-annotation'
                label='Student Annotation'
              />
              <Form.Check type='checkbox' id='wd-chkbox-file-upload' label='File Upload' />
            </div>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Assign to</Form.Label>
            <Form.Select id='wd-assign-to' defaultValue='Everyone'>
              <option value='Everyone'>Everyone</option>
              <option value='TAs'>TAs</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>
              <b>Due</b>
            </Form.Label>
            <Form.Control type='date' id='wd-due-date' defaultValue={assignment.dueDate} />
          </Form.Group>

          <Row className='mb-3'>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Available From</Form.Label>
                <Form.Control
                  type='date'
                  id='wd-available-from'
                  defaultValue={assignment.availableFrom}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Until</Form.Label>
                <Form.Control
                  type='date'
                  id='wd-available-until'
                  defaultValue={assignment.availableUntil}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className='d-flex gap-2'>
            <Button
              variant='secondary'
              type='button'
              onClick={() => alert('Assignment cancelled.')}
              id='wd-cancel-assignment'>
              Cancel
            </Button>
            <Button
              variant='danger'
              type='button'
              onClick={() => alert('Assignment saved!')}
              id='wd-save-assignment'>
              Save
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}
