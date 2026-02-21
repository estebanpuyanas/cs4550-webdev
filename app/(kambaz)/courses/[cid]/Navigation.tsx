'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CourseNavigation({ cid }: { cid: string }) {
  const links = ['Home', 'Modules', 'Piazza', 'Zoom', 'Assignments', 'Quizzes', 'People'];
  const pathname = usePathname();

  return (
    <div id='wd-courses-navigation' className='wd list-group fs-5 rounded-0'>
      {links.map(link => {
        const slug = link.toLowerCase();
        const href = `/courses/${cid}/${slug}`;
        const isActive = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={link}
            href={href}
            id={`wd-course-${slug}-link`}
            className={`list-group-item border-0 ${isActive ? 'active' : 'text-danger'}`}>
            {link}
          </Link>
        );
      })}
    </div>
  );
}
