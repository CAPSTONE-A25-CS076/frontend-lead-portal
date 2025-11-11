import { LEADS } from './dummyData';


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