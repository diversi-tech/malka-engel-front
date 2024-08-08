// BuilderComponent.js
import React from 'react';
import { BuilderComponent, builder } from '@builder.io/react';

// אתחל את Builder עם מפתח ה-API שלך
builder.init('ef9427277e264c8689653fe2edea2fbc');

const BuilderPage = ({ model }) => {
  return (
    <div>
      <BuilderComponent model={model} />
    </div>
  );
};

export default BuilderPage;
