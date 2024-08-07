import React, { useEffect, useState } from 'react';
import { builder } from '@builder.io/react';

const fetchContent = async (model) => {
  const content = await builder.get(model).promise();
  return content;
};

const BuilderPage = ({ model }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      const data = await fetchContent(model);
      setContent(data);
    };

    loadContent();
  }, [model]);

  if (!content) return <div>טוען...</div>;

  return (
    <div>
      <BuilderComponent content={content} />
    </div>
  );
};

export default BuilderPage;
