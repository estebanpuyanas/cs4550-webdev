'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PeopleTable from './Table';
import { findUsersForCourse } from '../../client';

export default function PeoplePage() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    const data = await findUsersForCourse(cid as string);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return <PeopleTable users={users} fetchUsers={fetchUsers} />;
}
