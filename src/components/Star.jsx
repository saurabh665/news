// Star.jsx
import React, { useState } from 'react';

const Star = ({ glow, onClick }) => (
  <span
    style={{ color: glow ? 'gold' : 'gray', cursor: 'pointer' }}
    onClick={onClick}
  >
    ★
  </span>
);

export default Star;
