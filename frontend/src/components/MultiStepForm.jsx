import React, { useState } from 'react';
import { uploadImage, createProfile, updateProfile } from '../api';

export default function MultiStepForm({ initial = {}, onFinish }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    template: initial.template || 'template1',
    hero: initial.hero || { name:'', title:'', tagline:'', profileImageUrl:'' },
    about: initial.about || { bio:'', email:'', phone:'', location:'', socials: {} },
    skills: initial.skills || [],
    services: initial.services || [{title:'',description:''},{title:'',description:''},{title:'',description:''}],
    portfolio: initial.portfolio || [{title:'',imageUrl:'',description:''},{title:'',imageUrl:'',description:''},{title:'',imageUrl:'',description:''}],
    testimonials: initial.testimonials || [],
    blog: initial.blog || [],
    contact: initial.contact || {}
  });

  function update(path, value) {
    setData(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let cur = copy;
      for (let i=0;i<keys.length-1;i++) cur = cur[keys[i]];
      cur[keys[keys.length-1]] = value;
      return copy;
    });
  }

  async function handleImageUpload(file, pathToSet) {
    if (!file) return;
    const url = await uploadImage(file);
    update(pathToSet, url);
  }

  async function submit() {
    try {
      const saved = await createProfile(data);
      onFinish(saved);
    } catch(e) {
      alert('Failed to create profile: ' + (e.message||e));
    }
  }

  return (
    <div>
      <div style={{display:'flex', gap:8, marginBottom:12}}>
        {['Template','Hero','About','Skills','Services','Portfolio','Finish'].map((t,i)=>(
          <div key={t} style={{padding:'6px 10px', borderRadius:8, background: step===i ? '#ffecec' : '#fff' }}>{t}</div>
        ))}
      </div>

      {step===0 && (
  <div className="card">
    <h3>Choose Template</h3>
    <div style={{display:'flex', gap:12}}>
      <div
        style={{
          flex:1,
          cursor:'pointer',
          padding:16,
          borderRadius:12,
          boxShadow: data.template === 'template1' ? '0 10px 30px rgba(255,85,0,0.12)' : 'none',
          border: data.template === 'template1' ? '2px solid rgba(255,85,0,0.18)' : '1px solid #eee',
          background: data.template === 'template1' ? '#fff7ef' : '#fff'
        }}
        onClick={() => update('template','template1')}
      >
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <h4 style={{margin:'0 0 6px 0'}}>Template 1</h4>
            <p className="small" style={{margin:0}}>Warm, yellow hero — card-heavy layout.</p>
          </div>
          {data.template === 'template1' && <div style={{fontSize:18}}>✔</div>}
        </div>
        <div style={{marginTop:12}}>
          <button className="btn">Select</button>
        </div>
      </div>

      <div
        style={{
          flex:1,
          cursor:'pointer',
          padding:16,
          borderRadius:12,
          boxShadow: data.template === 'template2' ? '0 10px 30px rgba(20,90,255,0.12)' : 'none',
          border: data.template === 'template2' ? '2px solid rgba(20,90,255,0.18)' : '1px solid #eee',
          background: data.template === 'template2' ? '#eff6ff' : '#fff'
        }}
        onClick={() => update('template','template2')}
      >
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <h4 style={{margin:'0 0 6px 0'}}>Template 2</h4>
            <p className="small" style={{margin:0}}>Cool, blue split-layout — sidebar + content.</p>
          </div>
          {data.template === 'template2' && <div style={{fontSize:18}}>✔</div>}
        </div>
        <div style={{marginTop:12}}>
          <button className="btn">Select</button>
        </div>
      </div>
    </div>
  </div>
)}


      {step===1 && (
        <div className="card">
          <h3>Hero</h3>
          <div className="form-row">
            <input className="input" placeholder="Name" value={data.hero.name} onChange={e => update('hero.name', e.target.value)} />
          </div>
          <div className="form-row">
            <input className="input" placeholder="Title" value={data.hero.title} onChange={e => update('hero.title', e.target.value)} />
          </div>
          <div className="form-row">
            <input className="input" placeholder="Tagline" value={data.hero.tagline} onChange={e => update('hero.tagline', e.target.value)} />
          </div>
          <div className="form-row">
            <label className="small">Profile image</label><br/>
            <input type="file" onChange={e => handleImageUpload(e.target.files[0], 'hero.profileImageUrl')} />
            {data.hero.profileImageUrl && <img src={data.hero.profileImageUrl} alt="" style={{width:120, height:120, marginTop:8, objectFit:'cover'}} />}
          </div>
        </div>
      )}

      {step===2 && (
        <div className="card">
          <h3>About</h3>
          <div className="form-row">
            <textarea className="input" placeholder="Bio" rows={4} value={data.about.bio} onChange={e=> update('about.bio', e.target.value)} />
          </div>
          <div className="form-row">
            <input className="input" placeholder="Email" value={data.about.email} onChange={e=> update('about.email', e.target.value)} />
          </div>
          <div className="form-row">
            <input className="input" placeholder="Phone" value={data.about.phone} onChange={e=> update('about.phone', e.target.value)} />
          </div>
          <div className="form-row">
            <input className="input" placeholder="Location" value={data.about.location} onChange={e=> update('about.location', e.target.value)} />
          </div>
        </div>
      )}

      {step===3 && (
        <div className="card">
          <h3>Skills</h3>
          <small className="small">Add skill and press Enter</small>
          <SkillInput skills={data.skills} onChange={s => update('skills', s)} />
        </div>
      )}

      {step===4 && (
        <div className="card">
          <h3>Services (3)</h3>
          {data.services.map((s,i)=>(
            <div key={i} style={{marginBottom:8}}>
              <input className="input" placeholder={`Service ${i+1} title`} value={s.title} onChange={e => {
                const arr = [...data.services]; arr[i].title = e.target.value; update('services', arr);
              }} />
              <textarea className="input" placeholder={`Service ${i+1} description`} rows={2} value={s.description} onChange={e=> {
                const arr = [...data.services]; arr[i].description = e.target.value; update('services', arr);
              }} />
            </div>
          ))}
        </div>
      )}

      {step===5 && (
        <div className="card">
          <h3>Portfolio (3)</h3>
          {data.portfolio.map((p,i)=>(
            <div key={i} style={{marginBottom:8}}>
              <input className="input" placeholder={`Project ${i+1} title`} value={p.title} onChange={e=> {
                const arr = [...data.portfolio]; arr[i].title = e.target.value; update('portfolio', arr);
              }} />
              <input type="file" onChange={e => {
                const file = e.target.files[0];
                (async ()=> {
                  const url = await uploadImage(file);
                  const arr = [...data.portfolio]; arr[i].imageUrl = url; update('portfolio', arr);
                })();
              }} />
              {p.imageUrl && <img src={p.imageUrl} alt="" style={{width:160, height:90, objectFit:'cover', marginTop:8}} />}
              <textarea className="input" rows={2} placeholder={`Project ${i+1} description`} value={p.description} onChange={e=> {
                const arr = [...data.portfolio]; arr[i].description = e.target.value; update('portfolio', arr);
              }} />
            </div>
          ))}
        </div>
      )}

      {step===6 && (
        <div className="card">
          <h3>Finish</h3>
          <p className="small">Review then submit. You can always edit later.</p>
          <div style={{marginTop:10}}>
            <div className="preview-hero">
              <img className="hero-img" src={data.hero.profileImageUrl || 'https://via.placeholder.com/120'} alt="" />
              <div>
                <h2>{data.hero.name}</h2>
                <div className="small">{data.hero.title}</div>
                <div className="small">{data.about.bio}</div>
                <div style={{marginTop:8}}>
                  {(data.skills||[]).map(s => <span key={s} className="tag">{s}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{display:'flex', gap:8, marginTop:12}}>
        {step>0 && <button className="btn" onClick={() => setStep(s => s-1)} style={{background:'#ddd', color:'#111'}}>Back</button>}
        {step < 6 && <button className="btn" onClick={() => setStep(s => s+1)}>Next</button>}
        {step === 6 && <button className="btn" onClick={submit}>Create Profile</button>}
      </div>
    </div>
  );
}

function SkillInput({ skills, onChange }) {
  const [val, setVal] = React.useState('');
  function onKey(e) {
    if (e.key === 'Enter' && val.trim()) {
      onChange([...skills, val.trim()]);
      setVal('');
    }
  }
  return (
    <div>
      <div>
        {skills.map((s,i)=> <span key={s} className="tag">{s} <button onClick={() => {
          const copy = [...skills]; copy.splice(i,1); onChange(copy);
        }} style={{marginLeft:6}}>x</button></span>)}
      </div>
      <input className="input" placeholder="Type skill and press Enter" value={val} onChange={e=> setVal(e.target.value)} onKeyDown={onKey} />
    </div>
  );
}
