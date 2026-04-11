'use client';
import { ReactNode, useState, useEffect } from 'react';
import CourseNavigation from './Navigation';
import { FaAlignJustify } from 'react-icons/fa';
import Breadcrumb from './Breadcrumb';
import { useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { RootState } from '../../store';
import './layout.css';

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const router = useRouter();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountsReducer as { currentUser: any },
  );
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const course = courses.find((course: any) => course._id === cid);
  const [navVisible, setNavVisible] = useState(true);

  const isFaculty = currentUser?.role === 'FACULTY';
  const isEnrolled = enrollments.some(
    (e: any) => e.user === currentUser?._id && e.course === cid,
  );

  useEffect(() => {
    if (!isFaculty && !isEnrolled) {
      router.push('/dashboard');
    }
  }, [isFaculty, isEnrolled, router]);

  if (!isFaculty && !isEnrolled) {
    return null;
  }

  return (
    <div id='wd-courses'>
      <div className='course-layout-header'>
        <span
          className='course-layout-toggle'
          onClick={() => setNavVisible(v => !v)}
          title='Toggle navigation'>
          <FaAlignJustify />
        </span>
        <span className='course-layout-name'>{course?.name}</span>
        <span className='course-layout-breadcrumb'>
          <Breadcrumb course={course} />
        </span>
      </div>

      <div className='course-layout-body'>
        {navVisible && (
          <div className='d-none d-md-block'>
            <CourseNavigation cid={cid as string} />
          </div>
        )}
        <div className='course-layout-content'>{children}</div>
      </div>
    </div>
  );
}
