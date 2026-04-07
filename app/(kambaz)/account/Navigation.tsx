'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Nav, NavItem, NavLink } from 'react-bootstrap';
import { RootState } from '../store';

export default function AccountNavigation() {
  const pathname = usePathname();
  const { currentUser } = useSelector((state: RootState) => state.accountsReducer);
  const links = currentUser ? ['profile'] : ['signin', 'signup'];

  const linkClass = (href: string) =>
    `text-danger text-decoration-none mb-2 ps-2 ${
      pathname.endsWith(href) ? 'border-start border-3 border-dark' : ''
    }`;
  return (
    <Nav variant='pills'>
      {currentUser && currentUser.role === 'ADMIN' && (
        <NavLink as={Link} href={`/account/users`} active={pathname.endsWith('users')}>
          {' '}
          Users{' '}
        </NavLink>
      )}
      {links.map(link => (
        <NavItem key={link}>
          <NavLink as={Link} href={link} active={pathname.endsWith(link)}>
            {link}{' '}
          </NavLink>{' '}
        </NavItem>
      ))}
    </Nav>
  );
}
