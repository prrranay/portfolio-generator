import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileCard({ profile }) {
  const nav = useNavigate();
  return (
    <div className="card profile-card">
      <img src={profile.hero?.profileImageUrl || 'https://via.placeholder.com/120'} alt="" />
      <div style={{flex:1}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <strong style={{fontSize:18}}>{profile.hero?.name}</strong>
            <div className="small">{profile.hero?.title}</div>
          </div>
          <div>
            <button className="btn" onClick={() => nav(`/portfolio/${profile.id}`)}>View Portfolio</button>
          </div>
        </div>
        <p style={{marginTop:8}} className="small">{profile.about?.bio}</p>
        <div style={{marginTop:8}}>
          {(profile.skills||[]).slice(0,6).map(s => <span key={s} className="tag">{s}</span>)}
        </div>
      </div>
    </div>
  );
}
