import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const ErrorPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f8f8;
  color: #333;
`;

const ErrorCode = styled.h1`
  font-size: 10rem;
  margin: 0;
  color: #ff6347;
`;

const ErrorMessage = styled.h2`
  font-size: 2rem;
  margin: 20px 0;
`;

const ErrorDescription = styled.p`
  font-size: 1.2rem;
  margin: 10px 0;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e5533d;
  }
`;

export const ErrorPage = () => {
 const {code, message, back} = useParams()
 const { t, i18n } = useTranslation();
 const navigate = useNavigate()
  const handleBack = () => {
    if(back === "back")
    navigate(-2)
  else  if(back === "close")
      window.close()
   };

  return (
    <ErrorPageContainer>
      <ErrorCode>{code}</ErrorCode>
      <ErrorMessage>Error</ErrorMessage>
      <ErrorDescription>{message}</ErrorDescription>
      <BackButton onClick={handleBack}>{t('errorPage.backButton')}</BackButton>
    </ErrorPageContainer>
  );
};

export default ErrorPage;
// 