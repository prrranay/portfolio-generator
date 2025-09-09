import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProfile } from '../api';
import TemplateA from '../components/TemplateA';
import TemplateB from '../components/TemplateB';

export default function Portfolio(){
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(()=> {
    getProfile(id).then(setProfile).catch(e => {
      console.error(e);
      setProfile(null);
    });
  }, [id]);

  if (!profile) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      {profile.template === 'template2' ? <TemplateB profile={profile} /> : <TemplateA profile={profile} />}
    </div>
  );
}
