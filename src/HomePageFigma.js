import React from 'react';
import { BuilderComponent, builder } from '@builder.io/react';

// החלף את 'YOUR_API_KEY' במפתח ה-API שלך
builder.init('bpk-b574c3baf5dd4330854176487c8ae71b');

// צור את הקומפוננטה שלך
const Page = ({ content }) => {
  return (
    <BuilderComponent model="page" content={content} />
  );
};

export async function getStaticProps() {
  // אם אתה משתמש ב-next.js, השתמש בקוד הבא כדי לקבל את התוכן
  const content = await builder.get('page', { 'limit': 1 }).promise();
  return {
    props: {
      content: content || {},
    },
  };
}

export default Page;