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
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE}/leads`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (data.status !== 'success') {
    throw new Error(data.message);
  }
  // Transform API response to match expected format
  return data.data.leads.map(lead => ({
    id: parseInt(lead.rank),
    age: parseInt(lead.age),
    job: lead.job,
    marital: lead.marital,
    education: lead.education,
    default: lead.default,
    balance: parseInt(lead.balance),
    housing: lead.housing,
    loan: lead.loan,
    contact: lead.contact,
    day: parseInt(lead.day),
    month: lead.month,
    duration: lead.duration ? parseInt(lead.duration) : 0, // Default if missing
    campaign: parseInt(lead.campaign),
    pdays: lead.pdays ? parseInt(lead.pdays) : -1, // Default if missing
    previous: lead.previous ? parseInt(lead.previous) : 0, // Default if missing
    poutcome: lead.poutcome,
    y: lead.y,
    score: parseFloat(lead.skor) / 100, // Assuming skor is percentage 0-100
  })).sort((a, b) => b.score - a.score);
}

export async function getLeadById(id) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE}/leads/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (data.status !== 'success') {
    throw new Error(data.message);
  }
  // Transform single lead response
  const lead = data.data;
  return {
    id: parseInt(lead.rank),
    age: parseInt(lead.age),
    job: lead.job,
    marital: lead.marital,
    education: lead.education,
    default: lead.default,
    balance: parseInt(lead.balance),
    housing: lead.housing,
    loan: lead.loan,
    contact: lead.contact,
    day: parseInt(lead.day),
    month: lead.month,
    duration: lead.duration ? parseInt(lead.duration) : 0,
    campaign: parseInt(lead.campaign),
    pdays: lead.pdays ? parseInt(lead.pdays) : -1,
    previous: lead.previous ? parseInt(lead.previous) : 0,
    poutcome: lead.poutcome,
    y: lead.y,
    score: parseFloat(lead.skor) / 100,
  };
}
