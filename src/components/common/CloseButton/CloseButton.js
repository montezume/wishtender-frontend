import React from 'react';
import './CloseButton.css';

export default function CloseButton(props) {
  return (
    <div style={{ position: 'relative' }}>
      <button className="close-button" onClick={props.onClose}>
        X
      </button>
    </div>
  );
}
