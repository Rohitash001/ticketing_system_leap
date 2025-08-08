const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function login(username,password){
  const res = await fetch(`${API}/api/auth/login`,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({username,password})
  });
  return res.json();
}

export function authHeader(){
  if(typeof window === 'undefined') return {};
  const token = localStorage.getItem('token');
  if(!token) return {};
  return { 'Authorization': 'Bearer ' + token };
}
