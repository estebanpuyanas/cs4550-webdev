'use client';
import './signin.css';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { setCurrentUser } from '../reducer';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import * as client from '../client';
import { FormControl } from 'react-bootstrap';

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();

  const signin = async () => {
    const user = await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    redirect('/dashboard');
  };

  return (
    <div id='wd-signin-screen' className='kambaz-auth-screen'>
      <div className='kambaz-auth-card'>
        <div className='kambaz-auth-logo'>
          <img src='/images/NEU.png' width='50px' alt='Northeastern University' />
        </div>
        <h1 className='kambaz-auth-brand'>Kambaz</h1>
        <p className='kambaz-auth-subtitle'>Sign in to continue</p>

        <div className='kambaz-auth-field'>
          <label htmlFor='wd-username'>Username</label>
          <FormControl
            id='wd-username'
            defaultValue={credentials.username}
            onChange={e => setCredentials({ ...credentials, username: e.target.value })}
            placeholder='Enter your username'
          />
        </div>
        <div className='kambaz-auth-field'>
          <label htmlFor='wd-password'>Password</label>
          <FormControl
            id='wd-password'
            defaultValue={credentials.password}
            onChange={e => setCredentials({ ...credentials, password: e.target.value })}
            placeholder='Enter your password'
            type='password'
          />
        </div>

        <button
          onClick={signin}
          id='wd-signin-btn'
          className='btn btn-danger kambaz-auth-submit'>
          Sign In
        </button>

        <p className='kambaz-auth-link'>
          Don't have an account?{' '}
          <Link id='wd-signup-link' href='/account/signup'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
