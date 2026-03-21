'use client';
import Link from 'next/link';
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Button,
  Row,
  Col,
  FormControl,
  Form,
} from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewCourse, deleteCourse, updateCourse, setCourses } from '../courses/reducer';
import { enroll, unenroll } from '../enrollments/reducer';
import { RootState } from '../store';
import * as client from '../courses/client';
import { useEffect } from 'react';

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
      const courses = await client.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    const status = await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter(course => course._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(
      setCourses(
        courses.map(c => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        }),
      ),
    );
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  const isEnrolled = (courseId: string) =>
    enrollments.some((e: any) => e.user === currentUser?._id && e.course === courseId);

  const visibleCourses = showAllCourses ? courses : courses.filter(c => isEnrolled(c._id));

  return (
    <div id='wd-dashboard'>
      <button
        onClick={onAddNewCourse}
        className='btn btn-primary float-end'
        id='wd-add-new-course-click'>
        Add
      </button>
      <div className='d-flex justify-content-between align-items-center'>
        <h1 id='wd-dashboard-title'>Dashboard</h1>
        <Button variant='primary' onClick={() => setShowAllCourses(prev => !prev)}>
          Enrollments
        </Button>
      </div>
      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className='btn btn-primary float-end'
              id='wd-add-new-course-click'
              onClick={() => dispatch(addNewCourse(course))}>
              Add
            </button>
            <button
              className='btn btn-warning float-end me-2'
              onClick={onUpdateCourse}
              id='wd-update-course-click'>
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className='mb-2'
            onChange={e => setCourse({ ...course, name: e.target.value })}
          />
          <Form.Control
            as='textarea'
            value={course.description}
            rows={3}
            onChange={e => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}

      <h2 id='wd-dashboard-published'>Published Courses ({courses.length})</h2>
      <hr />
      <div id='wd-dashboard-courses'>
        <Row xs={1} md={5} className='g-4'>
          {visibleCourses.map(course => (
            <Col key={course._id} className='wd-dashboard-course' style={{ width: '300px' }}>
              <Card>
                <Link
                  href={`/courses/${course._id}/home`}
                  className='wd-dashboard-course-link text-decoration-none text-dark'>
                  <CardImg src='/images/reactjs.jpg' variant='top' width='100%' height={160} />
                  <CardBody className='card-body'>
                    <CardTitle className='wd-dashboard-course-title text-nowrap overflow-hidden'>
                      {course.name}
                    </CardTitle>
                    <CardText
                      className='wd-dashboard-course-description overflow-hidden'
                      style={{ height: '100px' }}>
                      {course.description}
                    </CardText>
                    <Button variant='primary'>Go</Button>

                    {isFaculty ? (
                      <>
                        <button
                          onClick={event => {
                            event.preventDefault();
                            onDeleteCourse(course._id);
                          }}
                          className='btn btn-danger float-end'
                          id='wd-delete-course-click'>
                          Delete
                        </button>
                        <button
                          id='wd-edit-course-click'
                          onClick={event => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className='btn btn-warning me-2 float-end'>
                          Edit
                        </button>
                      </>
                    ) : isEnrolled(course._id) ? (
                      <button
                        onClick={event => {
                          event.preventDefault();
                          dispatch(unenroll({ userId: currentUser._id, courseId: course._id }));
                        }}
                        className='btn btn-danger float-end'>
                        Unenroll
                      </button>
                    ) : (
                      <button
                        onClick={event => {
                          event.preventDefault();
                          dispatch(enroll({ userId: currentUser._id, courseId: course._id }));
                        }}
                        className='btn btn-success float-end'>
                        Enroll
                      </button>
                    )}
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
