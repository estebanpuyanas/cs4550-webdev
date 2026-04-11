'use client';
import './dashboard.css';
import Link from 'next/link';
import { Button, Row, Col, FormControl, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCourses } from '../courses/reducer';
import { setEnrollments, enroll, unenroll } from '../enrollments/reducer';
import { RootState } from '../store';
import * as coursesClient from '../courses/client';
import * as enrollmentsClient from '../enrollments/client';

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountsReducer as { currentUser: any },
  );
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const dispatch = useDispatch();

  const isFaculty = currentUser?.role === 'FACULTY';
  const [showAllCourses, setShowAllCourses] = useState(false);

  const [course, setCourse] = useState<any>({
    _id: '0',
    name: 'New Course',
    number: 'New Number',
    startDate: '2023-09-10',
    endDate: '2023-12-15',
    image: '/images/reactjs.jpg',
    description: 'New Description',
  });

  const fetchCourses = async () => {
    try {
      const allCourses = await coursesClient.fetchAllCourses();
      dispatch(setCourses(allCourses));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const myEnrollments = await enrollmentsClient.findMyEnrollments();
      dispatch(setEnrollments(myEnrollments));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
    if (currentUser) fetchEnrollments();
  }, [currentUser]);

  const onAddNewCourse = async () => {
    const newCourse = await coursesClient.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await coursesClient.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await coursesClient.updateCourse(course);
    dispatch(setCourses(courses.map((c: any) => (c._id === course._id ? course : c))));
  };

  const isEnrolled = (courseId: string) =>
    enrollments.some((e: any) => e.user === currentUser?._id && e.course === courseId);

  const onEnroll = async (courseId: string) => {
    const enrollment = await enrollmentsClient.enrollInCourse(courseId);
    dispatch(enroll(enrollment));
  };

  const onUnenroll = async (courseId: string) => {
    await enrollmentsClient.unenrollFromCourse(courseId);
    dispatch(unenroll({ userId: currentUser._id, courseId }));
  };

  const visibleCourses =
    isFaculty || showAllCourses ? courses : courses.filter((c: any) => isEnrolled(c._id));

  return (
    <div id='wd-dashboard'>
      <div className='dashboard-header'>
        <h1 className='dashboard-title' id='wd-dashboard-title'>
          Dashboard
        </h1>
        <Button
          variant='outline-secondary'
          size='sm'
          onClick={() => setShowAllCourses(prev => !prev)}>
          {showAllCourses ? 'My Courses' : 'All Courses'}
        </Button>
      </div>
      <hr />

      {isFaculty && (
        <div className='dashboard-new-course'>
          <div className='dashboard-new-course-title'>
            New Course
            <div className='d-flex gap-2'>
              <button
                className='btn btn-warning btn-sm'
                onClick={onUpdateCourse}
                disabled={course._id === '0'}
                id='wd-update-course-click'>
                Update
              </button>
              <button
                className='btn btn-danger btn-sm'
                id='wd-add-new-course-click'
                onClick={onAddNewCourse}>
                Add
              </button>
            </div>
          </div>
          <FormControl
            value={course.name}
            className='mb-2'
            placeholder='Course name'
            onChange={e => setCourse({ ...course, name: e.target.value })}
          />
          <Form.Control
            as='textarea'
            value={course.description}
            rows={2}
            placeholder='Course description'
            onChange={e => setCourse({ ...course, description: e.target.value })}
          />
        </div>
      )}

      <p className='dashboard-section-title' id='wd-dashboard-published'>
        Published Courses ({courses.length})
      </p>

      <div id='wd-dashboard-courses'>
        <Row xs={1} md={4} className='g-4'>
          {visibleCourses.map((c: any) => (
            <Col key={c._id} className='wd-dashboard-course' style={{ maxWidth: '320px' }}>
              <Link
                href={`/courses/${c._id}/home`}
                className='wd-dashboard-course-link text-decoration-none text-dark'>
                <div className='course-card'>
                  <div className='course-card-image-wrap'>
                    <img src='/images/reactjs.jpg' alt={c.name} />
                  </div>
                  <div className='course-card-body'>
                    <div className='course-card-title wd-dashboard-course-title'>{c.name}</div>
                    <div className='course-card-description wd-dashboard-course-description'>
                      {c.description}
                    </div>
                    <div className='course-card-actions'>
                      <Button variant='outline-secondary' size='sm'>
                        Go
                      </Button>
                      {isFaculty ? (
                        <>
                          <button
                            id='wd-edit-course-click'
                            onClick={event => {
                              event.preventDefault();
                              setCourse(c);
                            }}
                            className='btn btn-warning btn-sm'>
                            Edit
                          </button>
                          <button
                            onClick={event => {
                              event.preventDefault();
                              onDeleteCourse(c._id);
                            }}
                            className='btn btn-danger btn-sm'
                            id='wd-delete-course-click'>
                            Delete
                          </button>
                        </>
                      ) : isEnrolled(c._id) ? (
                        <button
                          onClick={event => {
                            event.preventDefault();
                            onUnenroll(c._id);
                          }}
                          className='btn btn-danger btn-sm'>
                          Unenroll
                        </button>
                      ) : (
                        <button
                          onClick={event => {
                            event.preventDefault();
                            onEnroll(c._id);
                          }}
                          className='btn btn-success btn-sm'>
                          Enroll
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
