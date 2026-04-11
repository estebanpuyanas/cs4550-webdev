'use client';
import './assignments.css';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { BsGripVertical, BsPlus } from 'react-icons/bs';
import { IoEllipsisVertical, IoSearchOutline } from 'react-icons/io5';
import { LuNotebookPen } from 'react-icons/lu';
import { Form, InputGroup, Button, Badge } from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/InputGroupText';
import { FaCheckCircle, FaTrash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../../../store';
import { setAssignments, deleteAssignment } from './reducer';
import * as client from './client';

export default function Assignments() {
  const { cid } = useParams() as { cid: string };
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountsReducer);
  const isFaculty = currentUser?.role === 'FACULTY';
  const courseAssignments = assignments;

  const fetchAssignments = async () => {
    const data = await client.findAssignmentsForCourse(cid);
    dispatch(setAssignments(data));
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const handleDelete = async (assignmentId: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove "${title}"?`)) {
      await client.deleteAssignment(assignmentId);
      dispatch(deleteAssignment(assignmentId));
    }
  };

  return (
    <div id='wd-assignments'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <InputGroup style={{ width: '280px' }}>
          <InputGroupText>
            <IoSearchOutline />
          </InputGroupText>
          <Form.Control
            type='text'
            placeholder='Search assignments…'
            className='border-start-0'
          />
        </InputGroup>
        {isFaculty && (
          <div className='d-flex gap-2'>
            <Button variant='secondary'>
              <BsPlus className='fs-5' /> Group
            </Button>
            <Button
              variant='danger'
              onClick={() => router.push(`/courses/${cid}/assignments/new`)}>
              <BsPlus className='fs-5' /> Assignment
            </Button>
          </div>
        )}
      </div>

      <div className='assignment-section-header'>
        <div className='assignment-section-header-label'>
          <BsGripVertical />
          Assignments
        </div>
        <div className='assignment-section-header-actions'>
          <Badge
            bg=''
            style={{
              background: 'var(--k-divider)',
              color: 'var(--k-text-sub)',
              border: '1px solid var(--k-border)',
            }}>
            40% of Total
          </Badge>
          <BsPlus style={{ fontSize: '1.2rem', color: 'var(--k-text-muted)' }} />
          <IoEllipsisVertical style={{ color: 'var(--k-text-muted)' }} />
        </div>
      </div>

      <div className='assignment-list'>
        {courseAssignments.map((assignment: any) => (
          <div key={assignment._id} className='assignment-item'>
            <div className='assignment-item-inner'>
              <div className='assignment-item-left'>
                <BsGripVertical className='assignment-item-grip' />
                <LuNotebookPen className='assignment-item-icon' />
                <div className='assignment-item-body'>
                  <Link
                    href={`/courses/${cid}/assignments/${assignment._id}`}
                    className='assignment-item-title'>
                    {assignment.title}
                  </Link>
                  <div className='assignment-item-meta'>
                    <span className='assignment-meta-modules'>Multiple Modules</span>
                    {' · '}
                    <strong>Not available until</strong> {assignment.availableFrom} at 12:00am
                    <br />
                    <strong>Due</strong> {assignment.dueDate} at 11:59pm
                    {' · '}
                    {assignment.points} pts
                  </div>
                </div>
              </div>
              <div className='assignment-item-right'>
                <FaCheckCircle
                  style={{ color: 'var(--k-emerald)', fontSize: '1rem', flexShrink: 0 }}
                />
                {isFaculty && (
                  <FaTrash
                    style={{
                      color: 'var(--k-crimson)',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                    onClick={() => handleDelete(assignment._id, assignment.title)}
                  />
                )}
                <IoEllipsisVertical style={{ color: 'var(--k-text-muted)', flexShrink: 0 }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
