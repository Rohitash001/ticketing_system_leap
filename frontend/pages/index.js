import { useState } from 'react';
import { login } from '../lib/api';
import { useRouter } from 'next/router';

export default function Login(){
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const router = useRouter();

  async function submit(e){
    e.preventDefault();
    const r = await login(username,password);
    if(r.token){
      localStorage.setItem('token', r.token);
      router.push('/dashboard');
    }else{
      alert('Login failed');
    }
  }

  return (<div className='container'>
    <h1>Ticketing System - Login</h1>
    <form onSubmit={submit}>
      <div><input placeholder='username' value={username} onChange={e=>setUsername(e.target.value)} /></div>
      <div><input placeholder='password' type='password' value={password} onChange={e=>setPassword(e.target.value)} /></div>
      <div><button type='submit'>Login</button></div>
    </form>
    <p>Use admin/adminpass to login as admin (backend creates it).</p>
  </div>);
}
