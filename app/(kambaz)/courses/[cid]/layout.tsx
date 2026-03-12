'use client';
import { ReactNode, useState, useEffect } from 'react';
import CourseNavigation from './Navigation';
import { FaAlignJustify } from 'react-icons/fa';
import Breadcrumb from './Breadcrumb';
import { useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { RootState } from '../../store';

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
      <div className='d-flex align-items-center gap-3 text-danger'>
        <FaAlignJustify
          className='fs-4'
          style={{ cursor: 'pointer' }}
          onClick={() => setNavVisible(v => !v)}
        />
        {course?.name}
        <h2 className='m-0 fs-5'>
          <Breadcrumb course={course} />
        </h2>
      </div>
      <hr />
      <div className='d-flex'>
        {navVisible && (
          <div className='d-none d-md-block'>
            <CourseNavigation cid={cid as string} />
          </div>
        )}
        <div className='flex-fill'>{children}</div>
      </div>
    </div>
  );
}
