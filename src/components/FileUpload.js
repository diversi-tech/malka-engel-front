import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:44314/api/fileupload/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setFileUrl(response.data.fileUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {fileUrl && (
        <div>
          <p>File uploaded successfully: <a href={fileUrl}>{fileUrl}</a></p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
