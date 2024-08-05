import { useTranslation } from 'react-i18next';
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { FaArrowUp, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { RecommendedProducts } from '../product/RecommendedProducts';
import { StayTuned } from '../User Forms/StayTuned';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllCategories } from '../../axios/CategoryAxios';
import { setCategoryList } from '../../redux/DataActions/DataAction.Category';
import ilFlagImage from '../../assets/HomeImages/לוגו.png';
import { Card } from 'react-bootstrap';

const ImageContainer1 = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 550px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.1;
  }
`;

const TextContainer = styled.div`
  position: absolute;
  padding: 10px;
  border-radius: 5px;
  color: #000;
  max-width: 100%;
  text-align: center;
  font-size: 1.5rem;
  font-family: 'Arial', sans-serif;
  z-index: 1;
  left: 50%;
  top: 70%;
  transform: translateX(-50%);
  line-height: 1.5;
  margin-top: 70px;
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #000;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  z-index: 1000;
`;

const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
`;

const CategoryContainer = styled.div`
  flex: 1 1 calc(33% - 20px);
  margin: 10px;
  position: relative;
  overflow: hidden;
`;

const CategoryCard = styled(Card)`
  border: none;
  transition: transform 0.2s;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const CategoryImage = styled(Card.Img)`
  height: 350px;
  object-fit: cover;
  transition: transform 0.3s;
`;

const CategoryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  ${CategoryContainer}:hover & {
    opacity: 1;
  }
`;

const CategoryLink = styled.div`
  text-decoration: none;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  font-size: 1.2em;
`;

const RecommendedProductsSection = styled.section`
  display: flex;
  overflow: hidden;
  padding: 10px;
  position: relative;
`;

const ProductsContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

const ShortInfo = styled.section`
  text-align: center;
  padding: 20px;
`;

const StayUpdated = styled.section`
  background-color: #f0f0f0;
  padding: 20px;
  text-align: center;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1;
  font-size: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  ${(props) => (props.direction === 'left' ? 'left: 0;' : 'right: 0;')}
`;

export const Home = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const topButton = () => {
      if (window.pageYOffset > 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', topButton);

    return () => window.removeEventListener('scroll', topButton);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const [translateX, setTranslateX] = useState(0);

  const handleNextSlide = () => {
    if (containerRef.current) {
      const newTranslateX = translateX - containerRef.current.clientWidth / 2;
      setTranslateX(newTranslateX);
      containerRef.current.style.transform = `translateX(${newTranslateX}px)`;
    }
  };

  const handlePrevSlide = () => {
    if (containerRef.current) {
      const newTranslateX = translateX + containerRef.current.clientWidth / 2;
      setTranslateX(newTranslateX);
      containerRef.current.style.transform = `translateX(${newTranslateX}px)`;
    }
  };

  const handleArrowClick = (direction) => {
    if (direction === 'next') {
      handleNextSlide();
    } else {
      handlePrevSlide();
    }
  };


  const handleCategoryClick = (idCategory) => {
    debugger
    navigate(`/myProductByCategory/${idCategory}`);
  };
  const categories = useSelector(state => state.DataReducer_Categry.Categorylist);
  const dispatch = useDispatch();
  const [categorysl, setCategorysl] = useState(categories);

  useEffect(() => {
    debugger
    const fetchcategory = async () => {
      if (categories.length > 0) {
        setCategorysl(categories);
      }
      else {
        try {
          const data = await GetAllCategories();
          debugger

          setCategorysl(data);
          dispatch(setCategoryList(data));
        }
        catch (error) {
          console.error(error);
        }

      }
    }
    fetchcategory();
  }, [categories, dispatch]);

  return (
    <div className="Home">
      <ShortInfo id="short-info">
        <ImageContainer1>
          <img src={ilFlagImage} alt="תמונה" />
          <TextContainer
            dangerouslySetInnerHTML={{ __html: t('homePage.information') }}
            style={{
              top: '25%',
              left: i18n.language === 'he' ? '50%' : '70%',
              right: i18n.language === 'he' ? 'auto' : '70%',
              transform: 'translate(-50%, -50%)',
              textAlign: i18n.language === 'he' ? 'center' : 'right',
            }}
          />
        </ImageContainer1>
      </ShortInfo>

      <ScrollToTopButton onClick={scrollToTop} isVisible={isVisible}>
        <FaArrowUp />
      </ScrollToTopButton>
<div>
  <Categories>
        {categories.filter(category => !category.upCategory || category.upCategory === 0).map(category => (
          <CategoryContainer key={category.categoryID}>
            <CategoryCard>
              <CategoryImage src={`${process.env.REACT_APP_API_URL}${category.imageURL}`} />
              <CategoryOverlay>
                <CategoryLink onClick={() => handleCategoryClick(category.categoryID)}>
                  {category.nameHe}
                </CategoryLink>
              </CategoryOverlay>
            </CategoryCard>
          </CategoryContainer>
        ))}
      </Categories>
  </div>
      <RecommendedProductsSection id="recommended-products">
        <ArrowButton direction="left" onClick={() => handleArrowClick('prev')}>
          <FaArrowLeft />
        </ArrowButton>
        <ProductsContainer ref={containerRef}>
          <RecommendedProducts />
        </ProductsContainer>
        <ArrowButton direction="right" onClick={() => handleArrowClick('next')}>
          <FaArrowRight />
        </ArrowButton>
      </RecommendedProductsSection>
      <StayUpdated id="stay-updated">
        <StayTuned />
      </StayUpdated>
    </div>
  );
};

export default Home;