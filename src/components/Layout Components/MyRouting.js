import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./Footer.js";
import { Contact } from "../User/Contact.js";
import { DesignerBirkins } from "../Empty pages/DesignerBentcherss.js";
import { CongratulationsToTheDonors } from "../Empty pages/CongratulationsToTheDonors.js";
import { Events } from "../Empty pages/Events.js";
import AdminDashboard from "../AdminComponents/AdminDashboard.js";
import { SeEmails } from "../Email/SeEmails.js";
import { ProductList } from "../product/ProductList.js";
import { Nav } from "./Nav.js";
import { CommonQuestions } from "../Questions/CommonQuestions.js";
import { Joys } from "../Empty pages/Joys.js";
import UserProfile from "../User/UserProfile.js";
import { Product } from "../product/productDetail/Product.js";
import { OrderForm } from "../Order/OrderForm.js";
import { Review } from "../product/productDetail/review/Review.js";
import { ScrollToTop } from "./scrollToTop.js";
import { Home } from './Home.js';
import { ShoppingCart } from '../Cart/ShoppingCart.js';
import { Terms } from '../Empty pages/Terms.js';
import { ShowReviews } from '../product/productDetail/review/ShowReviews.js';
import { OrderHistory } from "../Order/OrderHistory.js";
import { Account } from "../User Forms/Account.js"
import { Login } from "../User Forms/SignIn.js";
import SignUp from "../User Forms/SignUp.js";
import { ResetPassword } from "../User Forms/ResetPassword.js";
import { ResetPasTakeCare } from "../User Forms/RestPasTakeCare.js";
import UserAdmin from "../AdminComponents/UserAdmin.js";
import ProductByCategory from "../product/ProductByCategory.js";
import { ToConnect } from "../User Forms/ToConnect.js";
import AllAdminPages from "../AdminComponents/AllAdminPages.js";
import AllCategories from "../AdminComponents/AllCategories.js";
import OrderManager from "../AdminComponents/OrderManager.js";
// import { UnconnectedUser } from "../User Forms/NotConnected.js";
import { RecommendedProducts } from "../product/RecommendedProducts.js";
import EmailForm from "../Email/EmailForm.js";
import MailingList from "../Email/MailingList.js";
import { useEffect } from "react";
import {useConnectUser} from "../User Forms/useConnectUser.js";
import { AddReview } from "../product/productDetail/review/AddReview.js";
import { Checkout } from "../Order/Checkout.js";
import { PayForm } from "../Order/PayForm.js";
import ErrorPage from "./ErrorPage.js";
import { PopUp } from "../Cart/popUp.js";
import PdfGenerator from "../Order/PdfGenerator.js";
import { OrderDetails } from "../Order/OrderDetails.js";

// Routing במקום 
// כי זה שם שמור
export const MyRouting = () => {
    const {ConnectMe} = useConnectUser()

    useEffect(() => {
      const fetchUser = async () => {
        ConnectMe()
      };
  
      fetchUser();
    }, []); // הרצה אחת בלבד כאשר הקומפוננטה נטענת
  

    return (
        <HashRouter>
            <ScrollToTop></ScrollToTop>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Nav></Nav>
                <Routes>
                    {/* basic pages */}
                    {/*  שימו לב שבגרסה הזאת אין צורך להשתמש בסוויטש אפשר ישר לשים בתוך תגית הראוט */}
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/myHome" element={<Home></Home>}></Route>
                                                                        
                    {/* user pages */}
                    <Route path="/myContact" element={<Contact></Contact>}></Route>
                    <Route path="/myAccount" element={<Account></Account>}></Route>
                    <Route path="/myLogin" element={<Login></Login>} />

                    <Route path="/myProfile" element={<UserProfile />} />
                    <Route path="/mySignUp" element={<SignUp />} />
                    <Route path="/myResetPassword" element={<ResetPassword />} />
                    <Route path="/myResetPasswordLink/:token" element={<ResetPasTakeCare />} />
                    <Route path="/myToConnect" element={<ToConnect></ToConnect>} />

                    {/* product pages */}
                    <Route path="/myProductList" element={<ProductList></ProductList>}></Route>
                    <Route path="/myProduct/:id" element={<Product></Product>} ></Route>
                    <Route path="/myRecommendedProducts" element={<RecommendedProducts></RecommendedProducts>} ></Route>
                    <Route path="/myShowReviews/:numStars" element={<ShowReviews></ShowReviews>}></Route>
                    <Route path="/myReview/:productId" element={<Review></Review>}></Route>
                    <Route path="/myAddReview/:productId" element={<AddReview></AddReview>}></Route>
                    <Route path="/myProductByCategory/:idCategory" element={<ProductByCategory></ProductByCategory>}></Route>
                    <Route path ="/myCategoriesManager" element={<AllCategories></AllCategories>}></Route>

                    {/* order pages */}
                    <Route path="/myOrderForm" element={<OrderForm />}></Route>
                    <Route path="/myOrderHistory/:CurrentUser" element={<OrderHistory />}></Route>
                    <Route path="/sendEmailsForOrder" element={<sendEmailsForOrder/>}></Route>
                    <Route path="/myOrderDetails/:orderId" element={<OrderDetails />}></Route>

                    {/* email page */}
                    <Route path="/mySendEmails" element={<SeEmails></SeEmails>}></Route>
                    <Route path="myEmailForm" element={<EmailForm></EmailForm>}></Route>
                    {/* <Route path="/myMailingList" element={<MailingList></MailingList>}></Route> */}
                    <Route path="myPdf" element={<PdfGenerator/>}></Route>

                    {/* cart pages */}
                    <Route path="/myShoppingCart" element={<ShoppingCart></ShoppingCart>}></Route>
                    <Route path="/myPayForm" element={<PayForm></PayForm>}></Route>
                    <Route path="/myCheckout" element={<Checkout></Checkout>}></Route>
                    <Route path="/myPopUp" element={<PopUp/>}></Route>

                    {/* questions pages */}
                    <Route path="/myCommonQuestions" element={<CommonQuestions></CommonQuestions>}></Route>

                    <Route path="/myErrorPage/:code/:message/:back" element={<ErrorPage/>}></Route>



                    {/* admin page */}
                    <Route path="/AllAdminPages/:token" element={<AllAdminPages></AllAdminPages>}></Route>
                    {/* <Route path="/myAdminDashboard" element={<AdminDashboard></AdminDashboard>}></Route> */}

                    {/* empty pages?? */}
                    <Route path="/mySimchos" element={<Joys></Joys>}></Route>
                    <Route path="/myDesignerBentchers" element={<DesignerBirkins></DesignerBirkins>}></Route>
                    <Route path="/myDonorsThank-Yous" element={<CongratulationsToTheDonors></CongratulationsToTheDonors>}></Route>
                    <Route path="myTerms" element={<Terms></Terms>} ></Route>
                    <Route path="/myEvents" element={<Events></Events>} ></Route>

                    {/* Later we will have to bring the variable really from other data at the moment it is something temporary */}
                    {/* <Route path="/myAdminDashboard" element={<AdminDashboard></AdminDashboard>}></Route>
                    <Route path="/myCategoriesManager" element={<AllCategories></AllCategories>}></Route>
                    <Route path="/myOrderManager" element={<OrderManager></OrderManager>}></Route> */}

                    <Route path="/UserAdmin" element={<UserAdmin></UserAdmin>}></Route>
                </Routes>
                <Footer></Footer>
                {/* <Route path="/myProfile" element={<UserProfile />} /> */}
                {/* <Route path="/myRegister" element={<RegistrationForm />} /> */}
                {/* </AuthProvider> */}
            </div>
        </HashRouter>
    );
}
export default MyRouting;