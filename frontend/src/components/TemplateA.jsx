import React from 'react';

export default function TemplateA({ profile }) {
  return (
    <div>
      <div className="card" style={{background:'#ffd66b', borderRadius:16}}>
        <div style={{display:'flex', gap:12, alignItems:'center', padding:20}}>
          <img src={profile.hero.profileImageUrl || 'https://via.placeholder.com/160'} alt="" style={{width:160, height:160, borderRadius:12, objectFit:'cover', border:'4px solid #fff'}} />
          <div>
            <h1 style={{margin:0}}>{profile.hero.name}</h1>
            <div className="small">{profile.hero.title}</div>
            <p style={{marginTop:8}}>{profile.hero.tagline}</p>
            <div style={{marginTop:8, fontSize:13, color:'#5b3b00'}}>Professional • {profile.about?.location || '—'}</div>
          </div>
        </div>
      </div>

      <div style={{display:'flex', gap:16, marginTop:18}}>
        <div style={{flex:1}}>
          <div className="card">
            <h3>About</h3>
            <p className="small">{profile.about.bio}</p>
            <div className="small">Email: {profile.about.email} • Phone: {profile.about.phone}</div>
          </div>

          <div className="card" style={{marginTop:12}}>
            <h3>Services</h3>
            <div className="services">
              {(profile.services||[]).map((s,i)=> <div className="service" key={i}><strong>{s.title}</strong><p className="small">{s.description}</p></div>)}
            </div>
          </div>
        </div>

        <div style={{width:360}}>
          <div className="card" style={{background:'#fff9f2'}}>
            <h3 style={{marginTop:0}}>Skills</h3>
            <div>{(profile.skills||[]).map(s => <span key={s} className="tag">{s}</span>)}</div>
          </div>

          <div className="card" style={{marginTop:12}}>
            <h3>Contact</h3>
            <div className="small">Location: {profile.about.location}</div>
            <div className="small">Email: {profile.about.email}</div>
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
