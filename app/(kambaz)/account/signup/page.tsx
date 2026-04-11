'use client';
import '../signin/signin.css';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { setCurrentUser } from '../reducer';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { FormControl } from 'react-bootstrap';
import * as client from '../client';

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const dispatch = useDispatch();

  const signup = async () => {
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    redirect('/account/profile');
  };

  return (
    <div className='wd-signup-screen kambaz-auth-screen'>
      <div className='kambaz-auth-card'>
        <div className='kambaz-auth-logo'>
          <img src='/images/NEU.png' width='50px' alt='Northeastern University' />
        </div>
        <h1 className='kambaz-auth-brand'>Kambaz</h1>
        <p className='kambaz-auth-subtitle'>Create your account</p>

        <div className='kambaz-auth-field'>
          <label htmlFor='wd-signup-username'>Username</label>
          <FormControl
            id='wd-signup-username'
            value={user.username}
            onChange={e => setUser({ ...user, username: e.target.value })}
            className='wd-username'
            placeholder='Choose a username'
          />
        </div>
        <div className='kambaz-auth-field'>
          <label htmlFor='wd-signup-password'>Password</label>
          <FormControl
            id='wd-signup-password'
            value={user.password}
            onChange={e => setUser({ ...user, password: e.target.value })}
            className='wd-password'
            placeholder='Choose a password'
            type='password'
          />
        </div>

        <button
          onClick={signup}
          className='wd-signup-btn btn btn-danger kambaz-auth-submit'>
          Create Account
        </button>

        <p className='kambaz-auth-link'>
          Already have an account?{' '}
          <Link href='/account/signin' className='wd-signin-link'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
