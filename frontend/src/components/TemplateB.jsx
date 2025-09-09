import React from 'react';

export default function TemplateB({ profile }) {
  return (
    <div>
      <div className="card" style={{display:'flex', gap:16, alignItems:'center', padding:20, background:'#072146', color:'#fff', borderRadius:12}}>
        <div style={{flex:1}}>
          <h1 style={{margin:0, color:'#fff'}}>{profile.hero.name}</h1>
          <div className="small" style={{color:'rgba(255,255,255,0.85)'}}>{profile.hero.title}</div>
          <p style={{color:'rgba(255,255,255,0.9)'}}>{profile.hero.tagline}</p>
          <div className="small" style={{color:'rgba(255,255,255,0.7)'}}>Email: {profile.about.email} • {profile.about.phone}</div>
        </div>
        <img src={profile.hero.profileImageUrl || 'https://via.placeholder.com/160'} alt="" style={{width:160, height:160, objectFit:'cover', borderRadius:12, border:'3px solid rgba(255,255,255,0.14)'}} />
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:18}}>
        <div className="card" style={{background:'#fff', color:'#111'}}>
          <h3>About</h3>
          <p className="small">{profile.about.bio}</p>
        </div>
        <div className="card" style={{background:'#f4f8ff'}}>
          <h3>Skills & Services</h3>
          <div>{(profile.skills||[]).map(s => <div key={s} className="tag">{s}</div>)}</div>
          <div style={{marginTop:12}}>
            {(profile.services||[]).map((s,i)=> <div key={i}><strong>{s.title}</strong><div className="small">{s.description}</div></div>)}
          </div>
        </div>
      </div>

      <div style={{marginTop:18}}>
        <h3>Portfolio</h3>
        <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
          {(profile.portfolio||[]).map((p,i)=>(
            <div key={i} className="card" style={{width:300}}>
              <img src={p.imageUrl || 'https://via.placeholder.com/300x160'} alt="" style={{width:'100%', height:160, objectFit:'cover', borderRadius:8}} />
              <h4>{p.title}</h4>
              <p className="small">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
