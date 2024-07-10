// import { useTranslation } from 'react-i18next';
// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';

// const ScrollToTopButton = styled.button`
//   position: fixed;
//   bottom: 20px;
//   right: 20px;
//   background-color: #000;
//   color: #fff;
//   border: none;
//   padding: 10px 20px;
//   cursor: pointer;
//   display: ${(props) => (props.isVisible ? 'block' : 'none')};
//   border-radius: 50%; /* הופך את הכפתור לעגול */
//   width: 70px; /* רוחב הכפתור */
//   height: 70px; /* גובה הכפתור */
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 18px;
//  `;

// const Categories = styled.section`
//   display: flex;
//   padding: 10px;
//   justify-content: space-around;
//   flex-wrap: wrap;
// `;

// const Category = styled.div`
//   flex: 1 1 calc(33% - 20px);
//   margin: 10px;
//   height: 300px;
//   background-size: cover;
//   background-position: center;
//   border-radius: 5px;
//   display: flex;
//   align-items: flex-end;
//   justify-content: center;
//   position: relative;
//   overflow: hidden;
// `;

// const CategoryLink = styled.a`
//   text-decoration: none;
//   color: #fff;
//   background-color: rgba(0, 0, 0, 0.5);
//   padding: 10px;
//   border-radius: 5px;
//   font-size: 1.2em;
//   z-index: 1;
//   position: relative;
// `;

// const CategoryOverlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   z-index: 0;
// `;

// // const RecommendedProducts = styled.section`
// //   display: flex;
// //   overflow-x: auto;
// //   padding: 10px;
// // `;

// // const Product = styled.div`
// //   flex: 0 0 auto;
// //   margin-right: 10px;
// //   padding: 20px;
// //   background-color: #eee;
// //   border-radius: 5px;
// // `;

// const ShortInfo = styled.section`
// text-align: center;
// padding: 20px;
// `;

// const ImageContainer = styled.div`
// position: relative;
// display: inline-block;

// img {
//   max-width: 100%;
//   height: auto;
//   opacity: 0.5; /* שקיפות לתמונה */
// }

// p {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   margin: 0;
//   color: #fff; /* צבע הטקסט */
//   background-color: rgba(0, 0, 0, 0.5); /* רקע שקוף לטקסט */
//   padding: 10px;
//   border-radius: 5px;
// }
// `;

// const StayUpdated = styled.section`
//   background-color: #f0f0f0;
//   padding: 20px;
//   text-align: center;
// `;

// export const Home = () => {
//     const { t, i18n } = useTranslation();
//     const [isVisible, setIsVisible] = useState(false);

//     useEffect(() => {
//         const toggleVisibility = () => {
//             if (window.pageYOffset > 20) {
//                 setIsVisible(true);
//             } else {
//                 setIsVisible(false);
//             }
//         };

//         window.addEventListener('scroll', toggleVisibility);

//         return () => window.removeEventListener('scroll', toggleVisibility);
//     }, []);

//     const scrollToTop = () => {
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth',
//         });
//     };

//     return (
//         <div className="Home">
//             {/* מידע קצר */}
//             <ShortInfo id="short-info">
//                 <ImageContainer>
//                     <img src="path/to/image.jpg" alt="תמונה" />
//                     <p>כאן יכנס המלל</p>
//                 </ImageContainer>
//             </ShortInfo>
//             {/* כפתור לעלייה לראש הדף */}
//             <ScrollToTopButton onClick={scrollToTop} isVisible={isVisible}>
//                 {t('homePage.up')}
//             </ScrollToTopButton>

//             {/* קטגוריות */}
//             <Categories id="categories">
//                 <Category style={{ backgroundImage: 'url(path/to/image1.jpg)' }}>
//                     <CategoryOverlay />
//                     <CategoryLink href="#category1">קטגוריה 1</CategoryLink>
//                 </Category>
//                 <Category style={{ backgroundImage: 'url(path/to/image2.jpg)' }}>
//                     <CategoryOverlay />
//                     <CategoryLink href="#category2">קטגוריה 2</CategoryLink>
//                 </Category>
//                 <Category style={{ backgroundImage: 'url(path/to/image3.jpg)' }}>
//                     <CategoryOverlay />
//                     <CategoryLink href="#category3">קטגוריה 3</CategoryLink>
//                 </Category>
//                 <Category style={{ backgroundImage: 'url(path/to/image4.jpg)' }}>
//                     <CategoryOverlay />
//                     <CategoryLink href="#category4">קטגוריה 4</CategoryLink>
//                 </Category>
//                 <Category style={{ backgroundImage: 'url(path/to/image5.jpg)' }}>
//                     <CategoryOverlay />
//                     <CategoryLink href="#category5">קטגוריה 5</CategoryLink>
//                 </Category>
//                 <Category style={{ backgroundImage: 'url(path/to/image6.jpg)' }}>
//                     <CategoryOverlay />
//                     <CategoryLink href="#category6">קטגוריה 6</CategoryLink>
//                 </Category>
//             </Categories>

//             {/* מוצרים מומלצים */}
//             {/* <RecommendedProducts id="recommended-products"> */}
//                 {/* כאן יש לטעון את קומפוננטת המוצרים המומלצים */}
//                 {/* <Product className="product">מוצר 1</Product>
//                 <Product className="product">מוצר 2</Product>
//                 <Product className="product">מוצר 3</Product>
//                 <Product className="product">מוצר 4</Product>
//                 <Product className="product">מוצר 1</Product>
//                 <Product className="product">מוצר 2</Product>
//                 <Product className="product">מוצר 3</Product>
//                 <Product className="product">מוצר 4</Product><Product className="product">מוצר 1</Product>
//                 <Product className="product">מוצר 2</Product>
//                 <Product className="product">מוצר 3</Product>
//                 <Product className="product">מוצר 4</Product><Product className="product">מוצר 1</Product>
//                 <Product className="product">מוצר 2</Product>
//                 <Product className="product">מוצר 3</Product>
//                 <Product className="product">מוצר 4</Product><Product className="product">מוצר 1</Product>
//                 <Product className="product">מוצר 2</Product>
//                 <Product className="product">מוצר 3</Product>
//                 <Product className="product">מוצר 4</Product>
//             </RecommendedProducts> */}
//             <br></br>


//             {/* הישארו מעודכנים */}
//             <StayUpdated id="stay-updated">
//                 {/* כאן יש לטעון את קומפוננטת הישארו מעודכנים */}
//                 <div>טופס להרשמה לניוזלטר</div>
//             </StayUpdated>

//         </div>
//     );
// }

// export default Home;

// import { useTranslation } from 'react-i18next';
// import React, { useEffect, useState, useRef } from 'react';
// import styled from 'styled-components';

// const ScrollToTopButton = styled.button`
//   position: fixed;
//   bottom: 20px;
//   right: 20px;
//   background-color: #000;
//   color: #fff;
//   border: none;
//   padding: 10px 20px;
//   cursor: pointer;
//   display: ${(props) => (props.isVisible ? 'block' : 'none')};
//   border-radius: 50%;
//   width: 70px;
//   height: 70px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 18px;
// `;

// const Categories = styled.section`
//   display: flex;
//   padding: 10px;
//   justify-content: space-around;
//   flex-wrap: wrap;
// `;

// const Category = styled.div`
//   flex: 1 1 calc(33% - 20px);
//   margin: 10px;
//   height: 300px;
//   background-size: cover;
//   background-position: center;
//   border-radius: 5px;
//   display: flex;
//   align-items: flex-end;
//   justify-content: center;
//   position: relative;
//   overflow: hidden;
// `;

// const CategoryLink = styled.a`
//   text-decoration: none;
//   color: #fff;
//   background-color: rgba(0, 0, 0, 0.5);
//   padding: 10px;
//   border-radius: 5px;
//   font-size: 1.2em;
//   z-index: 1;
//   position: relative;
// `;

// const CategoryOverlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   z-index: 0;
// `;

// const RecommendedProducts = styled.section`
//   position: relative;
//   display: flex;
//   overflow: hidden;
//   padding: 10px;

//   .arrow {
//     position: absolute;
//     top: 50%;
//     transform: translateY(-50%);
//     background-color: rgba(0, 0, 0, 0.5);
//     color: white;
//     border: none;
//     cursor: pointer;
//     padding: 10px;
//     z-index: 1;
//   }

//   .left-arrow {
//     left: 0;
//   }

//   .right-arrow {
//     right: 0;
//   }
// `;

// const ProductsContainer = styled.div`
//   display: flex;
//   transition: transform 0.5s ease-in-out;
// `;

// const Product = styled.div`
//   flex: 0 0 auto;
//   margin-right: 10px;
//   padding: 20px;
//   background-color: #eee;
//   border-radius: 5px;
//   min-width: 200px;
// `;

// const ShortInfo = styled.section`
//   text-align: center;
//   padding: 20px;
// `;

// const ImageContainer = styled.div`
//   position: relative;
//   display: inline-block;

//   img {
//     max-width: 100%;
//     height: auto;
//     opacity: 0.5;
//   }

//   p {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     margin: 0;
//     color: #fff;
//     background-color: rgba(0, 0, 0, 0.5);
//     padding: 10px;
//     border-radius: 5px;
//   }
// `;

// const StayUpdated = styled.section`
//   background-color: #f0f0f0;
//   padding: 20px;
//   text-align: center;
// `;

// export const Home = () => {
//   const { t, i18n } = useTranslation();
//   const [isVisible, setIsVisible] = useState(false);
//   const [index, setIndex] = useState(0);
//   const productsContainerRef = useRef();

//   const products = Array.from({ length: 12 }, (_, i) => `מוצר ${i + 1}`);

//   useEffect(() => {
//     const toggleVisibility = () => {
//       if (window.pageYOffset > 20) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener('scroll', toggleVisibility);
//     return () => window.removeEventListener('scroll', toggleVisibility);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   const nextProduct = () => {
//     setIndex((prevIndex) => (prevIndex + 1) % products.length);
//   };

//   const prevProduct = () => {
//     setIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
//   };

//   useEffect(() => {
//     const interval = setInterval(nextProduct, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const container = productsContainerRef.current;
//     container.style.transform = `translateX(-${index * 220}px)`;
//   }, [index]);

//   return (
//     <div className="Home">
//       <ShortInfo id="short-info">
//         <ImageContainer>
//           <img src="path/to/image.jpg" alt="תמונה" />
//           <p>כאן יכנס המלל</p>
//         </ImageContainer>
//       </ShortInfo>
//       <ScrollToTopButton onClick={scrollToTop} isVisible={isVisible}>
//         {t('homePage.up')}
//       </ScrollToTopButton>
//       <Categories id="categories">
//         <Category style={{ backgroundImage: 'url(path/to/image1.jpg)' }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category1">קטגוריה 1</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: 'url(path/to/image2.jpg)' }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category2">קטגוריה 2</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: 'url(path/to/image3.jpg)' }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category3">קטגוריה 3</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: 'url(path/to/image4.jpg)' }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category4">קטגוריה 4</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: 'url(path/to/image5.jpg)' }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category5">קטגוריה 5</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: 'url(path/to/image6.jpg)' }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category6">קטגוריה 6</CategoryLink>
//         </Category>
//       </Categories>
//       <RecommendedProducts id="recommended-products">
//         <button className="arrow left-arrow" onClick={prevProduct}>
//           &lt;
//         </button>
//         <ProductsContainer ref={productsContainerRef}>
//           {products.map((product, i) => (
//             <Product key={i}>{product}</Product>
//           ))}
//         </ProductsContainer>
//         <button className="arrow right-arrow" onClick={nextProduct}>
//           &gt;
//         </button>
//       </RecommendedProducts>
//       <StayUpdated id="stay-updated">
//         <div>טופס להרשמה לניוזלטר</div>
//       </StayUpdated>
//     </div>
//   );
// };
//2222222222222222222222222222222222222222222222222222222222222222222222222222222
// export default Home;
// import { useTranslation } from 'react-i18next';
// import React, { useEffect, useRef, useState } from 'react';
// import styled, { keyframes } from 'styled-components';

// // סגנון לכפתור החזרה למעלה
// const ScrollToTopButton = styled.button`
//   position: fixed;
//   bottom: 20px;
//   right: 20px;
//   background-color: #000;
//   color: #fff;
//   border: none;
//   padding: 10px 20px;
//   cursor: pointer;
//   display: ${(props) => (props.isVisible ? 'block' : 'none')};
//   border-radius: 50%;
//   width: 70px;
//   height: 70px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 18px;
// `;

// // סגנון לקטגוריות
// const Categories = styled.section`
//   display: flex;
//   padding: 10px;
//   justify-content: space-around;
//   flex-wrap: wrap;
// `;

// // סגנון לקטגוריה בודדת
// const Category = styled.div`
//   flex: 1 1 calc(33% - 20px);
//   margin: 10px;
//   height: 300px;
//   background-size: cover;
//   background-position: center;
//   border-radius: 5px;
//   display: flex;
//   align-items: flex-end;
//   justify-content: center;
//   position: relative;
//   overflow: hidden;
// `;

// // סגנון לקישור בתוך הקטגוריה
// const CategoryLink = styled.a`
//   text-decoration: none;
//   color: #fff;
//   background-color: rgba(0, 0, 0, 0.5);
//   padding: 10px;
//   border-radius: 5px;
//   font-size: 1.2em;
//   z-index: 1;
//   position: relative;
// `;

// // סגנון לרקע כהה על הקטגוריה
// const CategoryOverlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   z-index: 0;
// `;

// // סגנון למידע קצר
// const ShortInfo = styled.section`
//   text-align: center;
//   padding: 20px;
// `;

// // סגנון לתמונה עם טקסט מעליה
// const ImageContainer = styled.div`
//   position: relative;
//   display: inline-block;

//   img {
//     max-width: 100%;
//     height: auto;
//     opacity: 0.5;
//   }

//   p {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     margin: 0;
//     color: #fff;
//     background-color: rgba(0, 0, 0, 0.5);
//     padding: 10px;
//     border-radius: 5px;
//   }
// `;

// // סגנון לחלק הישארו מעודכנים
// const StayUpdated = styled.section`
//   background-color: #f0f0f0;
//   padding: 20px;
//   text-align: center;
// `;

// // יצירת אנימציה לתזוזה איטית של המוצרים
// const scrollAnimation = keyframes`
//   0% { transform: translateX(0); }
//   100% { transform: translateX(-50%); }
// `;

// // סגנון למוצרים מומלצים
// const RecommendedProducts = styled.section`
//   display: flex;
//   overflow: hidden;
//   padding: 10px;
//   position: relative;
//   width: 100%;

//   .arrow {
//     position: absolute;
//     top: 50%;
//     transform: translateY(-50%);
//     background-color: rgba(0, 0, 0, 0.5);
//     color: white;
//     border: none;
//     cursor: pointer;
//     padding: 10px;
//     z-index: 1;
//   }

//   .left-arrow {
//     left: 0;
//   }

//   .right-arrow {
//     right: 0;
//   }
// `;

// // סגנון למיכל המוצרים עם אנימציה מתמשכת
// const ProductsContainer = styled.div`
//   display: flex;
//   width: 200%; /* מאפשר תזוזה חלקה */
//   animation: ${scrollAnimation} 20s linear infinite; /* התאמת הזמן לפי הצורך */

//   &:hover {
//     animation-play-state: paused; /* עצירה של האנימציה בעת ריחוף */
//   }
// `;

// // סגנון למוצר בודד
// const Product = styled.div`
//   flex: 0 0 12.5%; /* התאמת הרוחב לפי מספר המוצרים */
//   margin-right: 10px;
//   padding: 20px;
//   background-color: #eee;
//   border-radius: 5px;
//   min-width: 200px; /* רוחב קבוע למוצרים */
// `;

// export const Home = () => {
//   const { t, i18n } = useTranslation();
//   const [isVisible, setIsVisible] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const productRefs = useRef([]);
//   const productCount = 18; // מספר המוצרים במערך
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const toggleVisibility = () => {
//       if (window.pageYOffset > 20) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener('scroll', toggleVisibility);
//     return () => window.removeEventListener('scroll', toggleVisibility);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === productCount * 2 -
//     prevIndex + 1
// );
// if (containerRef.current) {
//   containerRef.current.style.transition = 'transform 0.5s ease-in-out';
//   containerRef.current.style.transform = `translateX(-${
//     ((currentIndex + 1) % productCount) * (100 / productCount)
//   }%)`;
// }
// };

// const prevSlide = () => {
// setCurrentIndex((prevIndex) =>
//   prevIndex === 0 ? productCount * 2 - 1 : prevIndex - 1
// );
// if (containerRef.current) {
//   containerRef.current.style.transition = 'transform 0.5s ease-in-out';
//   containerRef.current.style.transform = `translateX(-${
//     ((currentIndex - 1 + productCount) % productCount) * (100 / productCount)
//   }%)`;
// }
// };

// useEffect(() => {
// const interval = setInterval(() => {
//   nextSlide();
// }, 3000); // זמן תזוזה אוטומטית (מילישניות)

// return () => clearInterval(interval);
// }, [currentIndex]);

// return (
// <div className="Home">
//   {/* מידע קצר */}
//   <ShortInfo id="short-info">
//     <ImageContainer>
//       <img src="path/to/image.jpg" alt="תמונה" />
//       <p>כאן יכנס המלל</p>
//     </ImageContainer>
//   </ShortInfo>

//   {/* כפתור לעלייה לראש הדף */}
//   <ScrollToTopButton onClick={scrollToTop} isVisible={isVisible}>
//     {t('homePage.up')}
//   </ScrollToTopButton>

//   {/* קטגוריות */}
//   <Categories id="categories">
//     <Category style={{ backgroundImage: 'url(path/to/image1.jpg)' }}>
//       <CategoryOverlay />
//       <CategoryLink href="#category1">קטגוריה 1</CategoryLink>
//     </Category>
//     <Category style={{ backgroundImage: 'url(path/to/image2.jpg)' }}>
//       <CategoryOverlay />
//       <CategoryLink href="#category2">קטגוריה 2</CategoryLink>
//     </Category>
//     <Category style={{ backgroundImage: 'url(path/to/image3.jpg)' }}>
//       <CategoryOverlay />
//       <CategoryLink href="#category3">קטגוריה 3</CategoryLink>
//     </Category>
//     <Category style={{ backgroundImage: 'url(path/to/image4.jpg)' }}>
//       <CategoryOverlay />
//       <CategoryLink href="#category4">קטגוריה 4</CategoryLink>
//     </Category>
//     <Category style={{ backgroundImage: 'url(path/to/image5.jpg)' }}>
//       <CategoryOverlay />
//       <CategoryLink href="#category5">קטגוריה 5</CategoryLink>
//     </Category>
//     <Category style={{ backgroundImage: 'url(path/to/image6.jpg)' }}>
//       <CategoryOverlay />
//       <CategoryLink href="#category6">קטגוריה 6</CategoryLink>
//     </Category>
//   </Categories>

//   {/* מוצרים מומלצים */}
//   <RecommendedProducts id="recommended-products">
//     <button className="arrow left-arrow" onClick={prevSlide}>
//       &lt;
//     </button>
//     <ProductsContainer ref={containerRef}>
//       {Array.from({ length: productCount * 2 }).map((_, index) => (
//         <Product key={index}>
//           {/* כאן ניתן לטעון את המוצר */}
//           {`מוצר ${index + 1}`}
//         </Product>
//       ))}
//     </ProductsContainer>
//     <button className="arrow right-arrow" onClick={nextSlide}>
//       &gt;
//     </button>
//   </RecommendedProducts>
// </div>
// );
// };






// import { useTranslation } from 'react-i18next';
// import React, { useEffect, useState, useRef } from 'react';
// import styled, { keyframes } from 'styled-components';
// import ilFlagImage from './il_flag.png'
// import { FaArrowUp } from 'react-icons/fa';

// const TextContainer = styled.div`
//   position: absolute;
//   padding: 100px;
//   border-radius: 5px;
//   color: #000;
//   max-width: 60%; /* רוחב מקסימלי למניעת חריגות */
//   z-index: 1;
//   `;

// const ScrollToTopButton = styled.button`
//   position: fixed;
//   bottom: 20px;
//   right: 20px;
//   background-color: #000;
//   color: #fff;
//   border: none;
//   padding: 10px;
//   cursor: pointer;
//   display: ${(props) => (props.isVisible ? 'block' : 'none')};
//   border-radius: 50%;
//   width: 70px;
//   height: 70px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 20px; /* גודל הגופן של האייקון */
//   z-index: 1000;
// `;

// const Categories = styled.section`
//   display: flex;
//   padding: 10px;
//   justify-content: space-around;
//   flex-wrap: wrap;
// `;

// const Category = styled.div`
//   flex: 1 1 calc(33% - 20px);
//   margin: 10px;
//   height: 300px;
//   background-size: cover;
//   background-position: center;
//   border-radius: 5px;
//   display: flex;
//   align-items: flex-end;
//   justify-content: center;
//   position: relative;
//   overflow: hidden;
// `;

// const CategoryLink = styled.a`
//   text-decoration: none;
//   color: #fff;
//   background-color: rgba(0, 0, 0, 0.5);
//   padding: 10px;
//   border-radius: 5px;
//   font-size: 1.2em;
//   z-index: 1;
//   position: relative;
// `;

// const CategoryOverlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   z-index: 0;
// `;

// const scroll = keyframes`
//   0% {
//     transform: translateX(0);
//   }
//   100% {
//     transform: translateX(-50%);
//   }
// `;

// const RecommendedProducts = styled.section`
//   display: flex;
//   overflow: hidden;
//   padding: 10px;
//   position: relative;
  
//   .arrow {
//     position: absolute;
//     top: 50%;
//     transform: translateY(-50%);
//     background-color: rgba(0, 0, 0, 0.5);
//     color: white;
//     border: none;
//     cursor: pointer;
//     padding: 10px;
//     z-index: 1;
//   }

//   .left-arrow {
//     left: 0;
//   }

//   .right-arrow {
//     right: 0;
//   }
// `;

// const ProductsContainer = styled.div`
//   display: flex;
//   width: 200%; /* Double the width to allow seamless scrolling */
//   animation: ${scroll} 20s linear infinite;
// `;

// const Product = styled.div`
//   flex: 0 0 10%; /* Adjust width of each product as needed */
//   margin-right: 10px;
// `;

// const ShortInfo = styled.section`
//   text-align: center;
//   padding: 20px;
// `;

// const ImageContainer = styled.div`
//   position: relative;
//   display: inline-block;

//   img {
//     max-width: 100%;
//     height: auto;
//     opacity: 0.5;
//   }
//     p {
//   position: absolute;
//   top: 25%;
//   left: 85%; 
//   transform: translate(-50%, -50%);
//   margin: 0;
//   color: #000;
//   background-color: rgba(0, 0 )
// }
// `;

// const StayUpdated = styled.section`
//   background-color: #f0f0f0;
//   padding: 20px;
//   text-align: center;
// `;

// export const Home = () => {
//   const { t, i18n } = useTranslation();
//   const [isVisible, setIsVisible] = useState(false);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const topButton = () => {
//       if (window.pageYOffset > 20) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener('scroll', topButton);

//     return () => window.removeEventListener('scroll', topButton);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   const nextSlide = () => {
//     if (containerRef.current) {
//       containerRef.current.style.transition = 'none';
//       containerRef.current.style.transform = `translateX(0)`;
//     }
//   };

//   const prevSlide = () => {
//     if (containerRef.current) {
//       containerRef.current.style.transition = 'none';
//       containerRef.current.style.transform = `translateX(-50%)`;
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 20000); // Adjust this value for slower or faster scroll

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="Home">
//       {/* מידע קצר */}
//       <ShortInfo id="short-info">
//         <ImageContainer>
//           <img src={ilFlagImage} alt="תמונה" />
//           <TextContainer style={{ 
//             top: '25%', 
//             [i18n.language === 'en' ? 'right' : 'left']: '70%', 
//             transform: 'translate(-50%, -50%)',
//           }}>
//             {t('homePage.information')}
//           </TextContainer>
//         </ImageContainer>
//       </ShortInfo>

//       {/* כפתור לעלייה לראש הדף */}
//       <ScrollToTopButton onClick={scrollToTop} isVisible={isVisible}>
//         {/* {t('homePage.up')} */}
//         <FaArrowUp /> 
//       </ScrollToTopButton>

//       {/* קטגוריות */}
//       <Categories id="categories">
//         <Category style={{ backgroundImage: 'url(path/to/image1.jpg)' }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category1">קטגוריה 1</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: 'url(path/to/image2.jpg)' }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category2">קטגוריה 2</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: 'url(path/to/image3.jpg)' }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category3">קטגוריה 3</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: 'url(path/to/image4.jpg)' }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category4">קטגוריה 4</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: 'url(path/to/image5.jpg)' }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category5">קטגוריה 5</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: 'url(path/to/image6.jpg)' }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category6">קטגוריה 6</CategoryLink>
//         </Category>
//       </Categories>

//       {/* מוצרים מומלצים */}
//       <RecommendedProducts id="recommended-products">
//         <button className="arrow left-arrow" onClick={prevSlide}>
//           &lt;
//         </button>
//         <ProductsContainer ref={containerRef}>
//           {Array.from({ length: 10 }).map((_, index) => (
//             <Product key={index}>
//               {/* כאן ניתן לטעון את המוצר */}
//               {`מוצר ${index + 1}`}
//             </Product>
//           ))}
//           {Array.from({ length: 10 }).map((_, index) => (
//             <Product key={index + 10}>
//               {/* שכפול המוצרים לגלילה חלקה */}
//               {`מוצר ${index + 1}`}
//             </Product>
//           ))}
//         </ProductsContainer>
//         <button className="arrow right-arrow" onClick={nextSlide}>
//           &gt;
//         </button>
//       </RecommendedProducts>

//       {/* הישארו מעודכנים */}
//       <StayUpdated id="stay-updated">
//         {/* כאן יש לטעון את קומפוננטת הישארו מעודכנים */}
//         <div>טופס להרשמה לניוזלטר</div>
//       </StayUpdated>
//     </div>
//   );
// };

// export default Home;






// import { useTranslation } from 'react-i18next';
// import React, { useEffect, useState, useRef } from 'react';
// import styled, { keyframes } from 'styled-components';
// import ilFlagImage from './il_flag.png'
// import ilFlagImage1 from './2.png'
// import ilFlagImage2 from './5.png'
// import ilFlagImage3 from './8.png'
// import ilFlagImage4 from './9.png'
// import ilFlagImage5 from './2.png'
// import { FaArrowUp } from 'react-icons/fa';

// const TextContainer = styled.div`
//   position: absolute;
//   padding: 100px;
//   border-radius: 5px;
//   color: #000;
//   max-width: 60%; /* רוחב מקסימלי למניעת חריגות */
//   z-index: 1;
// `;

// const ScrollToTopButton = styled.button`
//   position: fixed;
//   bottom: 20px;
//   right: 20px;
//   background-color: #000;
//   color: #fff;
//   border: none;
//   padding: 10px;
//   cursor: pointer;
//   display: ${(props) => (props.isVisible ? 'block' : 'none')};
//   border-radius: 50%;
//   width: 70px;
//   height: 70px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 20px; /* גודל הגופן של האייקון */
//   z-index: 1000;
// `;

// const Categories = styled.section`
//   display: flex;
//   padding: 10px;
//   justify-content: space-around;
//   flex-wrap: wrap;
// `;

// const Category = styled.div`
//   flex: 1 1 calc(33% - 20px);
//   margin: 10px;
//   height: 300px;
//   background-size: cover;
//   background-position: center;
//   border-radius: 5px;
//   display: flex;
//   align-items: flex-end;
//   justify-content: center;
//   position: relative;
//   overflow: hidden;
// `;

// const CategoryLink = styled.a`
//   text-decoration: none;
//   color: #fff;
//   background-color: rgba(0, 0, 0, 0.5);
//   padding: 10px;
//   border-radius: 5px;
//   font-size: 1.2em;
//   z-index: 1;
//   position: relative;
// `;

// const CategoryOverlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   //background: rgba(0, 0, 0, 0.5);
//   z-index: 0;
// `;

// const scroll = keyframes`
//   0% {
//     transform: translateX(0);
//   }
//   100% {
//     transform: translateX(-50%);
//   }
// `;

// const RecommendedProducts = styled.section`
//   display: flex;
//   overflow: hidden;
//   padding: 10px;
//   position: relative;
  
//   .arrow {
//     position: absolute;
//     top: 50%;
//     transform: translateY(-50%);
//     background-color: rgba(0, 0, 0, 0.5);
//     color: white;
//     border: none;
//     cursor: pointer;
//     padding: 10px;
//     z-index: 1;
//   }

//   .left-arrow {
//     left: 0;
//   }

//   .right-arrow {
//     right: 0;
//   }
// `;

// const ProductsContainer = styled.div`
//   display: flex;
//   width: 200%; /* Double the width to allow seamless scrolling */
//   animation: ${scroll} 20s linear infinite;
// `;

// const Product = styled.div`
//   flex: 0 0 10%; /* Adjust width of each product as needed */
//   margin-right: 10px;
// `;

// const ShortInfo = styled.section`
//   text-align: center;
//   padding: 20px;
// `;

// const ImageContainer = styled.div`
//   position: relative;
//   display: inline-block;

//   img {
//     max-width: 100%;
//     height: auto;
//     opacity: 0.5;
//   }
//   p {
//     position: absolute;
//     top: 25%;
//     left: 85%;
//     transform: translate(-50%, -50%);
//     margin: 0;
//     color: #000;
//     background-color: rgba(0, 0, 0, 0);
//   }
// `;

// const StayUpdated = styled.section`
//   background-color: #f0f0f0;
//   padding: 20px;
//   text-align: center;
// `;

// export const Home = () => {
//   const { t, i18n } = useTranslation();
//   const [isVisible, setIsVisible] = useState(false);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const topButton = () => {
//       if (window.pageYOffset > 20) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener('scroll', topButton);

//     return () => window.removeEventListener('scroll', topButton);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   const nextSlide = () => {
//     if (containerRef.current) {
//       containerRef.current.style.transition = 'none';
//       containerRef.current.style.transform = `translateX(0)`;
//     }
//   };

//   const prevSlide = () => {
//     if (containerRef.current) {
//       containerRef.current.style.transition = 'none';
//       containerRef.current.style.transform = `translateX(-50%)`;
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 20000); // Adjust this value for slower or faster scroll

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="Home">
//       {/* מידע קצר */}
//       <ShortInfo id="short-info">
//         <ImageContainer>
//           <img src={ilFlagImage} alt="תמונה" />
//           <TextContainer style={{ 
//             top: '25%', 
//             [i18n.language === 'en' ? 'right' : 'left']: '70%', 
//             transform: 'translate(-50%, -50%)',
//           }}>
//             {t('homePage.information')}
//           </TextContainer>
//         </ImageContainer>
//       </ShortInfo>

//       {/* כפתור לעלייה לראש הדף */}
//       <ScrollToTopButton onClick={scrollToTop} isVisible={isVisible}>
//         <FaArrowUp /> 
//       </ScrollToTopButton>

//       {/* קטגוריות */}
//       <Categories id="categories">
//         <Category style={{ backgroundImage: `url(${ilFlagImage})` }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category1">קטגוריה 1</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage1})` }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category2">קטגוריה 2</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage2})` }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category3">קטגוריה 3</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage3})` }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category4">קטגוריה 4</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage4})` }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category5">קטגוריה 5</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage5})` }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category6">קטגוריה 6</CategoryLink>
//         </Category>
//       </Categories>

//       {/* מוצרים מומלצים */}
//       <RecommendedProducts id="recommended-products">
//         <button className="arrow left-arrow" onClick={prevSlide}>
//           &lt;
//         </button>
//         <ProductsContainer ref={containerRef}>
//           {Array.from({ length: 10 }).map((_, index) => (
//             <Product key={index}>
//               {/* כאן ניתן לטעון את המוצר */}
//               {`מוצר ${index + 1}`}
//             </Product>
//           ))}
//           {Array.from({ length: 10 }).map((_, index) => (
//             <Product key={index + 10}>
//               {/* שכפול המוצרים לגלילה חלקה */}
//               {`מוצר ${index + 1}`}
//             </Product>
//           ))}
//         </ProductsContainer>
//         <button className="arrow right-arrow" onClick={nextSlide}>
//           &gt;
//         </button>
//       </RecommendedProducts>

//       {/* הישארו מעודכנים */}
//       <StayUpdated id="stay-updated">
//         <div>טופס להרשמה לניוזלטר</div>
//       </StayUpdated>
//     </div>
//   );
// };

// export default Home;



// import { useTranslation } from 'react-i18next';
// import React, { useEffect, useState, useRef } from 'react';
// import styled, { keyframes } from 'styled-components';
// import {RecommendedProducts} from '../product/RecommendedProducts'
// import { FaArrowUp } from 'react-icons/fa';
// import ilFlagImage from '../../assets/HomeImages/il_flag.png'
// import ilFlagImage0 from '../../assets/HomeImages/66.png'
// import ilFlagImage1 from '../../assets/HomeImages/22.png'
// import ilFlagImage2 from '../../assets/HomeImages/11.png'
// import ilFlagImage3 from '../../assets/HomeImages/33.png'
// import ilFlagImage4 from '../../assets/HomeImages/44.png'
// import ilFlagImage5 from '../../assets/HomeImages/55.png'
// import productImage1 from '../../assets/HomeImages/2.png'
// import productImage2 from '../../assets/HomeImages/2.png'
// import productImage3 from '../../assets/HomeImages/2.png'
// import { useNavigate, Link } from 'react-router-dom';


// const TextContainer = styled.div`
//   position: absolute;
//   padding: 100px;
//   border-radius: 5px;
//   color: #000;
//   max-width: 60%;
//   z-index: 1;
// `;

// const ScrollToTopButton = styled.button`
//   position: fixed;
//   bottom: 20px;
//   right: 20px;
//   background-color: #000;
//   color: #fff;
//   border: none;
//   padding: 10px;
//   cursor: pointer;
//   display: ${(props) => (props.isVisible ? 'block' : 'none')};
//   border-radius: 50%;
//   width: 70px;
//   height: 70px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 20px;
//   z-index: 1000;
// `;

// const Categories = styled.section`
//   display: flex;
//   padding: 10px;
//   justify-content: space-around;
//   flex-wrap: wrap;
// `;

// const Category = styled.div`
//   flex: 1 1 calc(33% - 20px);
//   margin: 10px;
//   height: 300px;
//   background-size: cover;
//   background-position: center;
//   border-radius: 5px;
//   display: flex;
//   align-items: flex-end;
//   justify-content: center;
//   position: relative;
//   overflow: hidden;
// `;

// const CategoryLink = styled(Link)`
//   text-decoration: none;
//   color: #fff;
//   background-color: rgba(0, 0, 0, 0.5);
//   padding: 10px;
//   border-radius: 5px;
//   font-size: 1.2em;
//   z-index: 1;
//   position: relative;
// `;

// const CategoryOverlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 0;
// `;

// const scrollLeft = keyframes`
//   0% {
//     transform: translateX(0);
//   }
//   100% {
//     transform: translateX(-50%);
//   }
// `;

// const scrollRight = keyframes`
//   0% {
//     transform: translateX(0);
//   }
//   100% {
//     transform: translateX(50%);
//   }
// `;

// const RecommendedProductsSection = styled.section`
//   display: flex;
//   overflow: hidden;
//   padding: 10px;
//   position: relative;
  
//   .arrow {
//     position: absolute;
//     top: 50%;
//     transform: translateY(-50%);
//     background-color: rgba(0, 0, 0, 0.5);
//     color: white;
//     border: none;
//     cursor: pointer;
//     padding: 10px;
//     z-index: 1;
//   }

//   .left-arrow {
//     left: 0;
//   }

//   .right-arrow {
//     right: 0;
//   }
// `;

// const ProductsContainer = styled.div`
//   display: flex;
//   width: 200%;
//   animation: ${(props) => (props.direction === 'right' ? scrollLeft : scrollRight)} 20s linear infinite;
// `;

// const ShortInfo = styled.section`
//   text-align: center;
//   padding: 20px;
// `;

// const ImageContainer = styled.div`
//   position: relative;
//   display: inline-block;

//   img {
//     max-width: 100%;
//     height: auto;
//     opacity: 0.5;
//   }
//   p {
//     position: absolute;
//     top: 25%;
//     left: 85%;
//     transform: translate(-50%, -50%);
//     margin: 0;
//     color: #000;
//     background-color: rgba(0, 0, 0, 0);
//   }
// `;

// const StayUpdated = styled.section`
//   background-color: #f0f0f0;
//   padding: 20px;
//   text-align: center;
// `;


// export const Home = () => {
//   const { t, i18n } = useTranslation();
//   const [isVisible, setIsVisible] = useState(false);
//   const containerRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const topButton = () => {
//       if (window.pageYOffset > 20) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener('scroll', topButton);

//     return () => window.removeEventListener('scroll', topButton);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   const nextSlide = () => {
//     if (containerRef.current) {
//       containerRef.current.style.transition = 'none';
//       containerRef.current.style.transform = `translateX(0)`;
//     }
//   };

//   const prevSlide = () => {
//     if (containerRef.current) {
//       containerRef.current.style.transition = 'none';
//       containerRef.current.style.transform = `translateX(-50%)`;
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 20000); // Adjust this value for slower or faster scroll

//     return () => clearInterval(interval);
//   }, []);


//   const direction = i18n.language === 'en' ? 'left' : 'right';
//   const reverseDirection = i18n.language === 'en' ? 'right' : 'left';

//   return (
//     <div className="Home">
//       {/* מידע קצר */}
//       <ShortInfo id="short-info">
//         <ImageContainer>
//           <img src={ilFlagImage} alt="תמונה" />
//           <TextContainer style={{ 
//             top: '25%', 
//             [i18n.language === 'en' ? 'right' : 'left']: '70%', 
//             transform: 'translate(-50%, -50%)',
//           }}>
//             {t('homePage.information')}
//           </TextContainer>
//         </ImageContainer>
//       </ShortInfo>

//       {/* כפתור לעלייה לראש הדף */}
//       <ScrollToTopButton onClick={scrollToTop} isVisible={isVisible}>
//         <FaArrowUp /> 
//       </ScrollToTopButton>

//       {/* קטגוריות */}
//       <Categories id="categories">
//         <Category style={{ backgroundImage: `url(${ilFlagImage0})` }}>
//           <CategoryOverlay />
//           <CategoryLink as={Link} to="/myCategoriesManager">קטגוריה 1</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage1})` }}>
//           <CategoryOverlay />
//           {/* //לבדוק!!!!!! myProductByCategoryשורה טובה לאחר הוספת הדף  */}
//           {/* <CategoryLink as={Link}  to={`/myProductByCategory/${category.categoryID}`}>קטגוריה 2</CategoryLink> */}
//           <CategoryLink as={Link}  to="/myCategoriesManager">קטגוריה 2</CategoryLink>

//           {/* <CategoryLink href={()=>{navigate('/myProduct/1')}}>קטגוריה 2</CategoryLink> */}
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage2})` }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category3">קטגוריה 3</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage3})` }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category4">קטגוריה 4</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage4})` }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category5">קטגוריה 5</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage5})` }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category6">קטגוריה 6</CategoryLink>
//         </Category>
//       </Categories>

// <h1>{t('recommendedProducts.title')}</h1>
//     <RecommendedProductsSection id="recommended-products">
//         <ProductsContainer ref={containerRef} direction={direction}>
//           <RecommendedProducts />
//         </ProductsContainer>
//       </RecommendedProductsSection>
         
//           {/* הישארו מעודכנים */}
//           <StayUpdated id="stay-updated">
//             <div>טופס להרשמה לניוזלטר</div>
//           </StayUpdated>


//         </div>
//       );
//     };
    
//     export default Home;
    

// import { useTranslation } from 'react-i18next';
// import React, { useEffect, useState, useRef } from 'react';
// import styled, { keyframes } from 'styled-components';
// import { FaArrowUp, FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // ייבוא של כל החיצים
// import { useNavigate, Link } from 'react-router-dom';
// import { RecommendedProducts } from '../product/RecommendedProducts';
// import ilFlagImage from '../../assets/HomeImages/il_flag.png';
// import ilFlagImage0 from '../../assets/HomeImages/66.png';
// import ilFlagImage1 from '../../assets/HomeImages/22.png';
// import ilFlagImage2 from '../../assets/HomeImages/11.png';
// import ilFlagImage3 from '../../assets/HomeImages/33.png';
// import ilFlagImage4 from '../../assets/HomeImages/44.png';
// import ilFlagImage5 from '../../assets/HomeImages/55.png';


// const TextContainer = styled.div`
//   position: absolute;
//   padding: 100px;
//   border-radius: 5px;
//   color: #000;
//   max-width: 60%;
//   z-index: 1;
// `;

// const ScrollToTopButton = styled.button`
//   position: fixed;
//   bottom: 20px;
//   right: 20px;
//   background-color: #000;
//   color: #fff;
//   border: none;
//   padding: 10px;
//   cursor: pointer;
//   display: ${(props) => (props.isVisible ? 'block' : 'none')};
//   border-radius: 50%;
//   width: 70px;
//   height: 70px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 20px;
//   z-index: 1000;
// `;

// const Categories = styled.section`
//   display: flex;
//   padding: 10px;
//   justify-content: space-around;
//   flex-wrap: wrap;
// `;

// const Category = styled.div`
//   flex: 1 1 calc(33% - 20px);
//   margin: 10px;
//   height: 300px;
//   background-size: cover;
//   background-position: center;
//   border-radius: 5px;
//   display: flex;
//   align-items: flex-end;
//   justify-content: center;
//   position: relative;
//   overflow: hidden;
// `;

// const CategoryLink = styled(Link)`
//   text-decoration: none;
//   color: #fff;
//   background-color: rgba(0, 0, 0, 0.5);
//   padding: 10px;
//   border-radius: 5px;
//   font-size: 1.2em;
//   z-index: 1;
//   position: relative;
// `;

// const CategoryOverlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 0;
// `;

// const scrollLeft = keyframes`
//   0% {
//     transform: translateX(0);
//   }
//   100% {
//     transform: translateX(-50%);
//   }
// `;

// const scrollRight = keyframes`
//   0% {
//     transform: translateX(0);
//   }
//   100% {
//     transform: translateX(50%);
//   }
// `;

// const RecommendedProductsSection = styled.section`
//   display: flex;
//   overflow: hidden;
//   padding: 10px;
//   position: relative;
// `;

// const ProductsContainer = styled.div`
//   display: flex;
//   width: 200%;
//   animation: ${(props) => (props.direction === 'right' ? scrollLeft : scrollRight)} 20s linear infinite;
// `;

// const ShortInfo = styled.section`
//   text-align: center;
//   padding: 20px;
// `;

// const ImageContainer = styled.div`
//   position: relative;
//   display: inline-block;

//   img {
//     max-width: 100%;
//     height: auto;
//     opacity: 0.5;
//   }
// `;

// const StayUpdated = styled.section`
//   background-color: #f0f0f0;
//   padding: 20px;
//   text-align: center;
// `;

// const ArrowButton = styled.button`
//   position: absolute;
//   top: 50%;
//   background-color: rgba(0, 0, 0, 0.5);
//   color: white;
//   border: none;
//   cursor: pointer;
//   padding: 10px;
//   z-index: 1;
//   font-size: 1.5em;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 50%;
//   ${(props) => (props.direction === 'left' ? 'left: 0;' : 'right: 0;')}
// `;

// export const Home = () => {
//   const { t, i18n } = useTranslation();
//   const [isVisible, setIsVisible] = useState(false);
//   const containerRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const topButton = () => {
//       if (window.pageYOffset > 20) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener('scroll', topButton);

//     return () => window.removeEventListener('scroll', topButton);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   const scrollToNextSlide = () => {
//     if (containerRef.current) {
//       containerRef.current.style.transition = 'transform 0.5s ease-in-out';
//       containerRef.current.style.transform = `translateX(-50%)`;
//     }
//   };

//   const scrollToPrevSlide = () => {
//     if (containerRef.current) {
//       containerRef.current.style.transition = 'transform 0.5s ease-in-out';
//       containerRef.current.style.transform = `translateX(0)`;
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       scrollToNextSlide();
//     }, 20000); // Adjust this value for slower or faster scroll

//     return () => clearInterval(interval);
//   }, []);

//   const direction = i18n.language === 'en' ? 'left' : 'right';

//   return (
//     <div className="Home">
//       {/* מידע קצר */}
//       <ShortInfo id="short-info">
//         <ImageContainer>
//           <img src={ilFlagImage} alt="תמונה" />
//           <TextContainer style={{ 
//             top: '25%', 
//             [i18n.language === 'en' ? 'right' : 'left']: '70%', 
//             transform: 'translate(-50%, -50%)',
//           }}>
//             {t('homePage.information')}
//           </TextContainer>
//         </ImageContainer>
//       </ShortInfo>

//       {/* כפתור לעלייה לראש הדף */}
//       <ScrollToTopButton onClick={scrollToTop} isVisible={isVisible}>
//         <FaArrowUp /> 
//       </ScrollToTopButton>

//       {/* קטגוריות */}
//       <Categories id="categories">
//         <Category style={{ backgroundImage: `url(${ilFlagImage0})` }}>
//           <CategoryOverlay />
//           <CategoryLink as={Link} to="/myCategoriesManager">קטגוריה 1</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage1})` }}>
//           <CategoryOverlay />
//           <CategoryLink as={Link}  to="/myCategoriesManager">קטגוריה 2</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage2})` }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category3">קטגוריה 3</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage3})` }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category4">קטגוריה 4</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage4})` }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category5">קטגוריה 5</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage5})` }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category6">קטגוריה 6</CategoryLink>
//         </Category>
//       </Categories>

//       {/* מוצרים מומלצים */}
//       <h1>{t('recommendedProducts.title')}</h1>
//       <RecommendedProductsSection id="recommended-products">
//         <ArrowButton className="arrow left-arrow" direction="left" onClick={scrollToPrevSlide}>
//           <FaArrowLeft />
//         </ArrowButton>
//         <ProductsContainer ref={containerRef} direction={direction}>
//         <RecommendedProducts />
//         </ProductsContainer>
//         <ArrowButton className="arrow right-arrow" direction="right" onClick={scrollToNextSlide}>
//           <FaArrowRight />
//         </ArrowButton>
//       </RecommendedProductsSection>

//       {/* להישאר מעודכן
//       <StayUpdated id="stay-updated">
//         {t('stayUpdated.text')} <a href="#">{t('stayUpdated.link')}</a>
//       </StayUpdated> */}

//          {/* הישארו מעודכנים */}
//            <StayUpdated id="stay-updated">
//              <div>טופס להרשמה לניוזלטר</div>
//            </StayUpdated>
//     </div>
//   );
// };

// export default Home;




// import { useTranslation } from 'react-i18next';
// import React, { useEffect, useState, useRef } from 'react';
// import styled, { keyframes } from 'styled-components';
// import { FaArrowUp, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import { useNavigate, Link } from 'react-router-dom';
// import { RecommendedProducts } from '../product/RecommendedProducts';
// import ilFlagImage0 from '../../assets/HomeImages/66.png';
// import ilFlagImage1 from '../../assets/HomeImages/22.png';
// import ilFlagImage2 from '../../assets/HomeImages/11.png';
// import ilFlagImage3 from '../../assets/HomeImages/33.png';
// import ilFlagImage4 from '../../assets/HomeImages/44.png';
// import ilFlagImage5 from '../../assets/HomeImages/55.png';

// const ScrollToTopButton = styled.button`
//   position: fixed;
//   bottom: 20px;
//   right: 20px;
//   background-color: #000;
//   color: #fff;
//   border: none;
//   padding: 10px;
//   cursor: pointer;
//   display: ${(props) => (props.isVisible ? 'block' : 'none')};
//   border-radius: 50%;
//   width: 70px;
//   height: 70px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 20px;
//   z-index: 1000;
// `;

// const Categories = styled.section`
//   display: flex;
//   padding: 10px;
//   justify-content: space-around;
//   flex-wrap: wrap;
// `;

// const Category = styled.div`
//   flex: 1 1 calc(33% - 20px);
//   margin: 10px;
//   height: 300px;
//   background-size: cover;
//   background-position: center;
//   border-radius: 5px;
//   display: flex;
//   align-items: flex-end;
//   justify-content: center;
//   position: relative;
//   overflow: hidden;
// `;

// const CategoryLink = styled(Link)`
//   text-decoration: none;
//   color: #fff;
//   background-color: rgba(0, 0, 0, 0.5);
//   padding: 10px;
//   border-radius: 5px;
//   font-size: 1.2em;
//   z-index: 1;
//   position: relative;
// `;

// const RecommendedProductsSection = styled.section`
//   display: flex;
//   overflow: hidden;
//   padding: 10px;
//   position: relative;
// `;

// const ProductsContainer = styled.div`
//   display: flex;
//   width: 200%;
//   transition: transform 0.5s ease-in-out;
//   transform: ${(props) => (props.direction === 'right' ? 'translateX(-50%)' : 'translateX(0%)')};
// `;

// const ShortInfo = styled.section`
//   text-align: center;
//   padding: 20px;
// `;

// const ImageContainer = styled.div`
//   position: relative;
//   display: inline-block;

//   img {
//     max-width: 100%;
//     height: auto;
//     opacity: 0.5;
//   }
// `;

// const ArrowButton = styled.button`
//   position: absolute;
//   top: 50%;
//   background-color: rgba(0, 0, 0, 0.5);
//   color: white;
//   border: none;
//   cursor: pointer;
//   padding: 10px;
//   z-index: 1;
//   font-size: 1.5em;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 50%;
//   ${(props) => (props.direction === 'left' ? 'left: 0;' : 'right: 0;')}
// `;

// export const Home = () => {
//   const { t, i18n } = useTranslation();
//   const [isVisible, setIsVisible] = useState(false);
//   const containerRef = useRef(null);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   const handleNextSlide = () => {
//     if (containerRef.current) {
//       containerRef.current.style.transition = 'transform 0.5s ease-in-out';
//       containerRef.current.style.transform = 'translateX(-50%)';
//     }
//   };

//   const handlePrevSlide = () => {
//     if (containerRef.current) {
//       containerRef.current.style.transition = 'transform 0.5s ease-in-out';
//       containerRef.current.style.transform = 'translateX(0)';
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       handleNextSlide();
//     }, 20000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="Home">
//       {/* Scroll to top button */}
//       <ScrollToTopButton onClick={scrollToTop} isVisible={isVisible}>
//         <FaArrowUp />
//       </ScrollToTopButton>

//       {/* Categories */}
//       <Categories>
//         <Category style={{ backgroundImage: `url(${ilFlagImage0})` }}>
//           <CategoryLink to="/myCategoriesManager">קטגוריה 1</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage1})` }}>
//           <CategoryLink to="/myCategoriesManager">קטגוריה 2</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage2})` }}>
//           <CategoryLink href="#category3">קטגוריה 3</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage3})` }}>
//           <CategoryLink href="#category4">קטגוריה 4</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage4})` }}>
//           <CategoryLink href="#category5">קטגוריה 5</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage5})` }}>
//           <CategoryLink href="#category6">קטגוריה 6</CategoryLink>
//         </Category>
//       </Categories>

//       {/* Recommended Products */}
//       <h1>{t('recommendedProducts.title')}</h1>
//       <RecommendedProductsSection>
//         <ArrowButton direction="left" onClick={handlePrevSlide}>
//           <FaArrowLeft />
//         </ArrowButton>
//         <ProductsContainer ref={containerRef} direction={i18n.language === 'en' ? 'left' : 'right'}>
//           <RecommendedProducts />
//         </ProductsContainer>
//         <ArrowButton direction="right" onClick={handleNextSlide}>
//           <FaArrowRight />
//         </ArrowButton>
//       </RecommendedProductsSection>
//     </div>
//   );
// };

// export default Home;

// import { useTranslation } from 'react-i18next';
// import React, { useEffect, useState, useRef } from 'react';
// import styled, { keyframes } from 'styled-components';
// import { FaArrowUp, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import { useNavigate, Link } from 'react-router-dom';
// import { RecommendedProducts } from '../product/RecommendedProducts';
// import ilFlagImage0 from '../../assets/HomeImages/66.png';
// import ilFlagImage1 from '../../assets/HomeImages/22.png';
// import ilFlagImage2 from '../../assets/HomeImages/11.png';
// import ilFlagImage3 from '../../assets/HomeImages/33.png';
// import ilFlagImage4 from '../../assets/HomeImages/44.png';
// import ilFlagImage5 from '../../assets/HomeImages/55.png';

// const ScrollToTopButton = styled.button`
//   position: fixed;
//   bottom: 20px;
//   right: 20px;
//   background-color: #000;
//   color: #fff;
//   border: none;
//   padding: 10px;
//   cursor: pointer;
//   display: ${(props) => (props.isVisible ? 'block' : 'none')};
//   border-radius: 50%;
//   width: 70px;
//   height: 70px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 20px;
//   z-index: 1000;
// `;

// const Categories = styled.section`
//   display: flex;
//   padding: 10px;
//   justify-content: space-around;
//   flex-wrap: wrap;
// `;

// const Category = styled.div`
//   flex: 1 1 calc(33% - 20px);
//   margin: 10px;
//   height: 300px;
//   background-size: cover;
//   background-position: center;
//   border-radius: 5px;
//   display: flex;
//   align-items: flex-end;
//   justify-content: center;
//   position: relative;
//   overflow: hidden;
// `;

// const CategoryLink = styled(Link)`
//   text-decoration: none;
//   color: #fff;
//   background-color: rgba(0, 0, 0, 0.5);
//   padding: 10px;
//   border-radius: 5px;
//   font-size: 1.2em;
//   z-index: 1;
//   position: relative;
// `;

// const scrollAnimation = keyframes`
//   0% {
//     transform: translateX(0);
//   }
//   100% {
//     transform: translateX(-50%);
//   }
// `;

// const RecommendedProductsSection = styled.section`
//   display: flex;
//   overflow: hidden;
//   padding: 10px;
//   position: relative;
// `;

// const ProductsContainer = styled.div`
//   display: flex;
//   width: 200%;
//   animation: ${scrollAnimation} 40s linear infinite;
// `;

// const ArrowButton = styled.button`
//   position: absolute;
//   top: 50%;
//   background-color: rgba(0, 0, 0, 0.5);
//   color: white;
//   border: none;
//   cursor: pointer;
//   padding: 10px;
//   z-index: 1;
//   font-size: 1.5em;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 50%;
//   ${(props) => (props.direction === 'left' ? 'left: 0;' : 'right: 0;')}
// `;

// export const Home = () => {
//   const { t, i18n } = useTranslation();
//   const [isVisible, setIsVisible] = useState(false);
//   const containerRef = useRef(null);
//   const productCount = 10; // Adjust according to the actual number of products
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   const handleNextSlide = () => {
//     if (containerRef.current) {
//       let newIndex = (currentIndex + 1) % productCount;
//       setCurrentIndex(newIndex);
//       containerRef.current.style.transition = 'transform 0.5s ease-in-out';
//       containerRef.current.style.transform = `translateX(-${newIndex * 100 / productCount}%)`;
//     }
//   };

//   const handlePrevSlide = () => {
//     if (containerRef.current) {
//       let newIndex = (currentIndex - 1 + productCount) % productCount;
//       setCurrentIndex(newIndex);
//       containerRef.current.style.transition = 'transform 0.5s ease-in-out';
//       containerRef.current.style.transform = `translateX(-${newIndex * 100 / productCount}%)`;
//     }
//   };

//   useEffect(() => {
//     const topButton = () => {
//       if (window.pageYOffset > 20) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener('scroll', topButton);

//     return () => window.removeEventListener('scroll', topButton);
//   }, []);

//   return (
//     <div className="Home">
//       <ScrollToTopButton onClick={scrollToTop} isVisible={isVisible}>
//         <FaArrowUp />
//       </ScrollToTopButton>

//       <Categories>
//         <Category style={{ backgroundImage: `url(${ilFlagImage0})` }}>
//           <CategoryLink to="/myCategoriesManager">קטגוריה 1</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage1})` }}>
//           <CategoryLink to="/myCategoriesManager">קטגוריה 2</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage2})` }}>
//           <CategoryLink href="#category3">קטגוריה 3</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage3})` }}>
//           <CategoryLink href="#category4">קטגוריה 4</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage4})` }}>
//           <CategoryLink href="#category5">קטגוריה 5</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage5})` }}>
//           <CategoryLink href="#category6">קטגוריה 6</CategoryLink>
//         </Category>
//       </Categories>

//       <h1>{t('recommendedProducts.title')}</h1>
//       <RecommendedProductsSection>
//         <ArrowButton direction="left" onClick={handlePrevSlide}>
//           <FaArrowLeft />
//         </ArrowButton>
//         <ProductsContainer ref={containerRef}>
//           <RecommendedProducts />
//         </ProductsContainer>
//         <ArrowButton direction="right" onClick={handleNextSlide}>
//           <FaArrowRight />
//         </ArrowButton>
//       </RecommendedProductsSection>
//     </div>
//   );
// };

// export default Home;

// import { useTranslation } from 'react-i18next';
// import React, { useEffect, useState, useRef } from 'react';
// import styled, { keyframes } from 'styled-components';
// import { FaArrowUp, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import { useNavigate, Link } from 'react-router-dom';
// import { RecommendedProducts } from '../product/RecommendedProducts';
// import ilFlagImage from '../../assets/HomeImages/il_flag.png';
// import ilFlagImage0 from '../../assets/HomeImages/66.png';
// import ilFlagImage1 from '../../assets/HomeImages/22.png';
// import ilFlagImage2 from '../../assets/HomeImages/11.png';
// import ilFlagImage3 from '../../assets/HomeImages/33.png';
// import ilFlagImage4 from '../../assets/HomeImages/44.png';
// import ilFlagImage5 from '../../assets/HomeImages/55.png';

// const TextContainer = styled.div`
//   position: absolute;
//   padding: 100px;
//   border-radius: 5px;
//   color: #000;
//   max-width: 60%;
//   z-index: 1;
// `;

// const ScrollToTopButton = styled.button`
//   position: fixed;
//   bottom: 20px;
//   right: 20px;
//   background-color: #000;
//   color: #fff;
//   border: none;
//   padding: 10px;
//   cursor: pointer;
//   display: ${(props) => (props.isVisible ? 'block' : 'none')};
//   border-radius: 50%;
//   width: 70px;
//   height: 70px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 20px;
//   z-index: 1000;
// `;

// const Categories = styled.section`
//   display: flex;
//   padding: 10px;
//   justify-content: space-around;
//   flex-wrap: wrap;
// `;

// const Category = styled.div`
//   flex: 1 1 calc(33% - 20px);
//   margin: 10px;
//   height: 300px;
//   background-size: cover;
//   background-position: center;
//   border-radius: 5px;
//   display: flex;
//   align-items: flex-end;
//   justify-content: center;
//   position: relative;
//   overflow: hidden;
// `;

// const CategoryLink = styled(Link)`
//   text-decoration: none;
//   color: #fff;
//   background-color: rgba(0, 0, 0, 0.5);
//   padding: 10px;
//   border-radius: 5px;
//   font-size: 1.2em;
//   z-index: 1;
//   position: relative;
// `;

// const CategoryOverlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 0;
// `;

// const scrollLeft = keyframes`
//   0% {
//     transform: translateX(0);
//   }
//   100% {
//     transform: translateX(-50%);
//   }
// `;

// const scrollRight = keyframes`
//   0% {
//     transform: translateX(0);
//   }
//   100% {
//     transform: translateX(50%);
//   }
// `;

// const RecommendedProductsSection = styled.section`
//   display: flex;
//   overflow: hidden;
//   padding: 10px;
//   position: relative;
// `;

// const ProductsContainer = styled.div`
//   display: flex;
//   width: 200%;
//   animation: ${(props) => (props.direction === 'right' ? scrollLeft : scrollRight)} 20s linear infinite;
// `;

// const ShortInfo = styled.section`
//   text-align: center;
//   padding: 20px;
// `;

// const ImageContainer = styled.div`
//   position: relative;
//   display: inline-block;

//   img {
//     max-width: 100%;
//     height: auto;
//     opacity: 0.5;
//   }
// `;

// const StayUpdated = styled.section`
//   background-color: #f0f0f0;
//   padding: 20px;
//   text-align: center;
// `;

// const ArrowButton = styled.button`
//   position: absolute;
//   top: 50%;
//   background-color: rgba(0, 0, 0, 0.5);
//   color: white;
//   border: none;
//   cursor: pointer;
//   padding: 10px;
//   z-index: 1;
//   font-size: 1.5em;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 50%;
//   ${(props) => (props.direction === 'left' ? 'left: 0;' : 'right: 0;')}
// `;

// export const Home = () => {
//   const { t, i18n } = useTranslation();
//   const [isVisible, setIsVisible] = useState(false);
//   const containerRef = useRef(null);
//   const isInteracting = useRef(false);
//   const navigate = useNavigate();
//   const direction = i18n.language === 'en' ? 'left' : 'right';

//   useEffect(() => {
//     const topButton = () => {
//       if (window.pageYOffset > 20) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener('scroll', topButton);

//     return () => window.removeEventListener('scroll', topButton);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   const handleNextSlide = () => {
//     if (containerRef.current) {
//       containerRef.current.style.transition = 'transform 0.5s ease-in-out';
//       containerRef.current.style.transform = `translateX(-50%)`;
//     }
//   };

//   const handlePrevSlide = () => {
//     if (containerRef.current) {
//       containerRef.current.style.transition = 'transform 0.5s ease-in-out';
//       containerRef.current.style.transform = `translateX(0)`;
//     }
//   };

//   useEffect(() => {
//     let start = null;
//     let animationFrameId;

//     const step = (timestamp) => {
//       if (!start) start = timestamp;
//       const elapsed = timestamp - start;

//       if (elapsed >= 4000) { // Adjust this value for faster or slower scroll
//         handleNextSlide();
//         start = timestamp;
//       }

//       animationFrameId = requestAnimationFrame(step);
//     };

//     animationFrameId = requestAnimationFrame(step);

//     return () => cancelAnimationFrame(animationFrameId);
//   }, []);

//   const handleArrowClick = (direction) => {
//     isInteracting.current = true;
//     if (direction === 'next') {
//       handleNextSlide();
//     } else {
//       handlePrevSlide();
//     }
//     setTimeout(() => {
//       isInteracting.current = false;
//     }, 500); // Adjust this value to match the slide transition duration
//   };

//   return (
//     <div className="Home">
//       {/* מידע קצר */}
//       <ShortInfo id="short-info">
//         <ImageContainer>
//           <img src={ilFlagImage} alt="תמונה" />
//           <TextContainer style={{ 
//             top: '25%', 
//             [i18n.language === 'en' ? 'right' : 'left']: '70%', 
//             transform: 'translate(-50%, -50%)',
//           }}>
//             {t('homePage.information')}
//           </TextContainer>
//         </ImageContainer>
//       </ShortInfo>

//       {/* כפתור לעלייה לראש הדף */}
//       <ScrollToTopButton onClick={scrollToTop} isVisible={isVisible}>
//         <FaArrowUp /> 
//       </ScrollToTopButton>

//       {/* קטגוריות */}
//       <Categories id="categories">
//         <Category style={{ backgroundImage: `url(${ilFlagImage0})` }}>
//           <CategoryOverlay />
//           <CategoryLink as={Link} to="/myCategoriesManager">קטגוריה 1</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage1})` }}>
//           <CategoryOverlay />
//           <CategoryLink as={Link}  to="/myCategoriesManager">קטגוריה 2</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage2})` }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category3">קטגוריה 3</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage3})` }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category4">קטגוריה 4</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage4})` }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category5">קטגוריה 5</CategoryLink>
//         </Category>
//         <Category style={{ backgroundImage: `url(${ilFlagImage5})` }}>
//           <CategoryOverlay />
//           <CategoryLink href="#category6">קטגוריה 6</CategoryLink>
//         </Category>
//       </Categories>

//       {/* מוצרים מומלצים */}
//       <h1>{t('recommendedProducts.title')}</h1>
//       <RecommendedProductsSection id="recommended-products">
//         <ArrowButton className="arrow left-arrow" direction="left" onClick={() => handleArrowClick('prev')}>
//           <FaArrowLeft />
//         </ArrowButton>
//         <ProductsContainer ref={containerRef} direction={direction}>
//           <RecommendedProducts />
//         </ProductsContainer>
//         <ArrowButton className="arrow right-arrow" direction="right" onClick={() => handleArrowClick('next')}>
//           <FaArrowRight />
//         </ArrowButton>
//       </RecommendedProductsSection>

//       {/* להישאר מעודכן */}
//       <StayUpdated id="stay-updated">
//         <div>טופס להרשמה לניוזלטר</div>
//       </StayUpdated>
//     </div>
//   );
// };

// export default Home;

import { useTranslation } from 'react-i18next';
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { FaArrowUp, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { RecommendedProducts } from '../product/RecommendedProducts';
import ilFlagImage from '../../assets/HomeImages/il_flag.png';
import ilFlagImage0 from '../../assets/HomeImages/66.png';
import ilFlagImage1 from '../../assets/HomeImages/22.png';
import ilFlagImage2 from '../../assets/HomeImages/11.png';
import ilFlagImage3 from '../../assets/HomeImages/33.png';
import ilFlagImage4 from '../../assets/HomeImages/44.png';
import ilFlagImage5 from '../../assets/HomeImages/55.png';

const TextContainer = styled.div`
  position: absolute;
  padding: 100px;
  border-radius: 5px;
  color: #000;
  max-width: 60%;
  z-index: 1;
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

const Categories = styled.section`
  display: flex;
  padding: 10px;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Category = styled.div`
  flex: 1 1 calc(33% - 20px);
  margin: 10px;
  height: 300px;
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const CategoryLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;
  font-size: 1.2em;
  z-index: 1;
  position: relative;
`;

const CategoryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
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

const ImageContainer = styled.div`
  position: relative;
  display: inline-block;

  img {
    max-width: 100%;
    height: auto;
    opacity: 0.5;
  }
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

  useEffect(() => {
    let start = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      if (elapsed >= 4000) { // Adjust this value for faster or slower scroll
        handleNextSlide();
        start = timestamp;
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleArrowClick = (direction) => {
    if (direction === 'next') {
      handleNextSlide();
    } else {
      handlePrevSlide();
    }
  };

  return (
    <div className="Home">
      {/* מידע קצר */}
      <ShortInfo id="short-info">
        <ImageContainer>
          <img src={ilFlagImage} alt="תמונה" />
          <TextContainer style={{ 
            top: '25%', 
            [i18n.language === 'en' ? 'right' : 'left']: '70%', 
            transform: 'translate(-50%, -50%)',
          }}>
            {t('homePage.information')}
          </TextContainer>
        </ImageContainer>
      </ShortInfo>

      {/* כפתור לעלייה לראש הדף */}
      <ScrollToTopButton onClick={scrollToTop} isVisible={isVisible}>
        <FaArrowUp /> 
      </ScrollToTopButton>

      {/* קטגוריות */}
      <Categories id="categories">
        <Category style={{ backgroundImage: `url(${ilFlagImage0})` }}>
          <CategoryOverlay />
          <CategoryLink as={Link} to="/myCategoriesManager">קטגוריה 1</CategoryLink>
        </Category>
        <Category style={{ backgroundImage: `url(${ilFlagImage1})` }}>
          <CategoryOverlay />
          <CategoryLink as={Link}  to="/myCategoriesManager">קטגוריה 2</CategoryLink>
        </Category>
        <Category style={{ backgroundImage: `url(${ilFlagImage2})` }}>
          <CategoryOverlay />
          <CategoryLink href="#category3">קטגוריה 3</CategoryLink>
        </Category>
        <Category style={{ backgroundImage: `url(${ilFlagImage3})` }}>
          <CategoryOverlay />
          <CategoryLink href="#category4">קטגוריה 4</CategoryLink>
        </Category>
        <Category style={{ backgroundImage: `url(${ilFlagImage4})` }}>
          <CategoryOverlay />
          <CategoryLink href="#category5">קטגוריה 5</CategoryLink>
        </Category>
        <Category style={{ backgroundImage: `url(${ilFlagImage5})` }}>
          <CategoryOverlay />
          <CategoryLink href="#category6">קטגוריה 6</CategoryLink>
        </Category>
      </Categories>

      {/* מוצרים מומלצים */}
      <h1>{t('recommendedProducts.title')}</h1>
      <RecommendedProductsSection id="recommended-products">
        <ArrowButton className="arrow left-arrow" direction="left" onClick={() => handleArrowClick('prev')}>
          <FaArrowLeft />
        </ArrowButton>
        <ProductsContainer ref={containerRef} style={{ transform: `translateX(${translateX}px)` }}>
          <RecommendedProducts />
        </ProductsContainer>
        <ArrowButton className="arrow right-arrow" direction="right" onClick={() => handleArrowClick('next')}>
          <FaArrowRight />
        </ArrowButton>
      </RecommendedProductsSection>

      {/* להישאר מעודכן */}
      <StayUpdated id="stay-updated">
        <div>טופס להרשמה לניוזלטר</div>
      </StayUpdated>
    </div>
  );
};

export default Home;
