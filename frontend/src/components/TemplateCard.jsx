import React from 'react';

export default function TemplateCard({ id, title, description, selected, onSelect }) {
  return (
    <div className="card template-card" onClick={() => onSelect(id)} style={{ border: selected ? '2px solid #ffdede' : 'none' }}>
      <h3>{title}</h3>
      <p className="small">{description}</p>
      <div style={{marginTop:12}}>
        <button className="btn">Choose</button>
      </div>
    </div>
  );
}
