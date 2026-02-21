'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { BsGripVertical, BsPlus } from 'react-icons/bs';
import { IoEllipsisVertical, IoSearchOutline } from 'react-icons/io5';
import { LuNotebookPen } from 'react-icons/lu';
import { ListGroup, ListGroupItem, Button, Form, InputGroup, Badge } from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/InputGroupText';
import { FaCheckCircle } from 'react-icons/fa';
import * as db from '../../../database';

export default function Assignments() {
  const { cid } = useParams() as { cid: string };
  const assignments = db.assignments;
  const courseAssignments = assignments.filter((a: any) => a.course === cid);

  return (
    <div id='wd-assignments'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <InputGroup style={{ width: '300px' }}>
          <InputGroupText className='bg-white'>
            <IoSearchOutline />
          </InputGroupText>
          <Form.Control
            type='text'
            placeholder='Search for Assignment'
            className='border-start-0'
          />
        </InputGroup>

        <div className='d-flex gap-2'>
          <Button variant='secondary'>
            <BsPlus className='fs-4' /> Group
          </Button>
          <Button variant='danger'>
            <BsPlus className='fs-4' /> Assignment
          </Button>
        </div>
      </div>

      <ListGroup className='rounded-0'>
        <ListGroupItem className='p-3 ps-2 bg-secondary border-secondary'>
          <div className='d-flex justify-content-between align-items-center'>
            <div>
              <BsGripVertical className='me-2 fs-3' />
              <strong>ASSIGNMENTS</strong>
            </div>
            <div>
              <Badge bg='secondary' className='me-2 text-dark border border-dark'>
                40% of Total
              </Badge>
              <BsPlus className='fs-4' />
              <IoEllipsisVertical className='fs-5' />
            </div>
          </div>
        </ListGroupItem>

        {courseAssignments.map((assignment: any) => (
          <ListGroupItem
            key={assignment._id}
            className='p-3 ps-1 border-start border-success border-5 border-top-0 border-end-0 border-bottom-0'>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items-start'>
                <BsGripVertical className='me-2 fs-3 text-secondary' />
                <LuNotebookPen className='me-2 fs-4 text-success' />
                <div className='ms-2'>
                  <Link
                    href={`/courses/${cid}/assignments/${assignment._id}`}
                    className='text-dark text-decoration-none fw-bold'>
                    {assignment.title}
                  </Link>
                  <div className='text-muted small'>
                    <span className='text-danger'>Multiple Modules</span> |{' '}
                    <strong>Not available until</strong> {assignment.availableFrom} at 12:00am |
                  </div>
                  <div className='text-muted small'>
                    <strong>Due</strong> {assignment.dueDate} at 11:59pm | {assignment.points} pts
                  </div>
                </div>
              </div>
              <div className='d-flex align-items-center gap-2'>
                <FaCheckCircle className='text-success fs-5' />
                <IoEllipsisVertical className='fs-5' />
              </div>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
