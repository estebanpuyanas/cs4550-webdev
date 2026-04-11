'use client';
import { AiOutlineDashboard } from 'react-icons/ai';
import { IoCalendarOutline } from 'react-icons/io5';
import { LiaBookSolid, LiaCogSolid } from 'react-icons/lia';
import { FaInbox, FaRegCircleUser } from 'react-icons/fa6';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navigation.css';

const NAV_ITEMS = [
  { href: '/account', Icon: FaRegCircleUser, label: 'Account', id: 'wd-account-link' },
  { href: '/dashboard', Icon: AiOutlineDashboard, label: 'Dashboard', id: 'wd-dashboard-link' },
  { href: '/courses', Icon: LiaBookSolid, label: 'Courses', id: 'wd-courses-link' },
  { href: '/calendar', Icon: IoCalendarOutline, label: 'Calendar', id: 'wd-calendar-link' },
  { href: '/inbox', Icon: FaInbox, label: 'Inbox', id: 'wd-inbox-link' },
  { href: '/labs', Icon: LiaCogSolid, label: 'Labs', id: 'wd-labs-link' },
] as const;

export default function KambazNavigation() {
  const pathname = usePathname();

  return (
    <nav
      id='wd-kambaz-navigation'
      className='position-fixed bottom-0 top-0 d-none d-md-flex flex-column'>
      <a
        href='https://www.northeastern.edu/'
        target='_blank'
        rel='noreferrer'
        id='wd-neu-link'
        className='kambaz-nav-logo'>
        <img src='/images/NEU.png' width='68px' alt='Northeastern University' />
      </a>

      <div className='kambaz-nav-links'>
        {NAV_ITEMS.map(({ href, Icon, label, id }) => {
          const isActive =
            pathname === href ||
            (href !== '/labs' && href !== '/account' && pathname?.startsWith(href + '/'));
          return (
            <Link
              key={href}
              href={href}
              id={id}
              className={`kambaz-nav-item${isActive ? ' kambaz-nav-active' : ''}`}>
              <Icon className='kambaz-nav-icon' />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
