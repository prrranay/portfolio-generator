import React, { useEffect, useState } from 'react';
import { getProfiles } from '../api';
import ProfileCard from '../components/ProfileCard';

export default function Home(){
  const [profiles, setProfiles] = useState([]);
  const [q, setQ] = useState('');

  useEffect(()=> {
    fetchList();
  }, []);

  async function fetchList() {
    try {
      const res = await getProfiles();
      setProfiles(res);
    } catch(e) {
      console.error(e);
    }
  }

  async function doSearch() {
    const res = await getProfiles(q);
    setProfiles(res);
  }

  return (
    <div className="container">
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:12}}>
        <div style={{flex:1}}>
          <input className="input" placeholder="Search name or bio" value={q} onChange={e=>setQ(e.target.value)} />
        </div>
        <div style={{marginLeft:12}}>
          <button className="btn" onClick={doSearch}>Search</button>
        </div>
      </div>

      <div className="grid">
        {profiles.length===0 && <div className="card">No profiles yet. Create one.</div>}
        {profiles.map(p => <ProfileCard key={p.id} profile={p} />)}
      </div>
    </div>
  );
}
