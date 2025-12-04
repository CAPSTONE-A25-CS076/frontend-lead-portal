import { LEADS } from './dummyData';

const API_BASE = 'https://capstone-asah-production.up.railway.app';

export async function login(credentials) {
  const response = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (data.status !== 'success') {
    throw new Error(data.message);
  }
  return data.data;
}

export async function getMe() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE}/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (data.status !== 'success') {
    throw new Error(data.message);
  }
  return data.data;
}

export async function getLeads() {
// simulate latency
await new Promise(r => setTimeout(r, 200));
// sorted by score desc by default
return [...LEADS].sort((a,b)=>b.score-a.score);
}


export async function getLeadById(id){
await new Promise(r => setTimeout(r, 150));
return LEADS.find(x=>x.id===id);
}
