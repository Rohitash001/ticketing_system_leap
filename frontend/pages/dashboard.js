import useSWR from 'swr';
import { authHeader } from '../lib/api';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const fetcher = url => fetch(url,{headers:{...authHeader()}}).then(r=>r.json());

export default function Dashboard(){
  const router = useRouter();
  useEffect(()=>{ if(!localStorage.getItem('token')) router.push('/'); },[]);
  const { data: tickets } = useSWR('http://localhost:8080/api/tickets', fetcher);

  return (<div className='container'>
    <div className='nav'>
      <button onClick={()=>router.push('/new')}>New Ticket</button>
      <button onClick={()=>router.push('/admin')}>Admin Panel</button>
      <button onClick={()=>{ localStorage.removeItem('token'); router.push('/'); }}>Logout</button>
    </div>
    <h2>My Tickets</h2>
    {!tickets && <div>Loading...</div>}
    {tickets && tickets.length===0 && <div>No tickets yet</div>}
    {tickets && tickets.map(t=>(
      <div key={t.id} className='ticket' onClick={()=>router.push('/ticket/'+t.id)}>
        <strong>{t.subject}</strong>
        <div>Status: {t.status} | Priority: {t.priority}</div>
        <div>Assigned: {t.assignee? t.assignee.username:'-'}</div>
      </div>
    ))}
  </div>);
}
