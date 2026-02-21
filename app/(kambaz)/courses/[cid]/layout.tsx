import { ReactNode } from 'react';
import CourseNavigation from './Navigation';
import { FaAlignJustify } from 'react-icons/fa';
import { courses } from '../../database';
import Breadcrumb from './Breadcrumb';

export default async function CoursesLayout({
  children,
  params,
}: Readonly<{ children: ReactNode; params: Promise<{ cid: string }> }>) {
  const { cid } = await params;
  const course = courses.find(course => course._id === cid);

  return (
    <div id='wd-courses'>
      <div className='d-flex align-items-center gap-3 text-danger'>
        <FaAlignJustify className='fs-4' />
        <h2 className='m-0 fs-5'>
          <Breadcrumb course={course} />
        </h2>
      </div>
      <hr />
      <div className='d-flex'>
        <div className='d-none d-md-block'>
          <CourseNavigation cid={cid} />
        </div>
        <div className='flex-fill'>{children}</div>
      </div>
    </div>
  );
}
