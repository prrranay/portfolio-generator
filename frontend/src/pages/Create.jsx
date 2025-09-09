import React from 'react';
import MultiStepForm from '../components/MultiStepForm';
import { useNavigate } from 'react-router-dom';

export default function Create(){
  const nav = useNavigate();
  return (
    <div className="container">
      <h2>Create Profile</h2>
      <MultiStepForm onFinish={(profile) => {
        // redirect to portfolio
        nav(`/portfolio/${profile.id}`);
      }} />
    </div>
  );
}
