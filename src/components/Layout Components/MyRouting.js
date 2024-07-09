import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./Footer.js";
import { Contact } from "../User/Contact.js";
import { DesignerBirkins } from "../Empty pages/DesignerBirkins.js";
import { CongratulationsToTheDonors } from "../Empty pages/CongratulationsToTheDonors.js";
import { Events } from "../Empty pages/Events.js";
import AdminDashboard from "../AdminComponents/AdminDashboard.js";
import  { AllCategories } from "../AdminComponents/AllCategories.js";
import { SeEmails } from "../Email/SeEmails.js";
import { ProductList } from "../product/ProductList.js";
import { Nav } from "./Nav.js";
import { CommonQuestions } from "../Questions/CommonQuestions.js";
import { Joys } from "../Empty pages/Joys.js";
import UserProfile from "../User/UserProfile.js";
import { Product } from "../product/productDetail/Product.js";
import { OrderForm } from "../Order/OrderForm.js";
import { Review } from "../product/productDetail/Review.js";
import { ScrollToTop } from "./scrollToTop.js";
import { Home } from './Home.js';
import { ShoppingCart } from '../Cart/ShoppingCart.js';
import { Terms } from '../Empty pages/Terms.js';
import { ShowReviews } from '../product/ShowReviews.js';
import { OrderHistory } from "../Order/OrderHistory.js";
import { Account } from "../User Forms/Account.js"
import { Login } from "../User Forms/SignIn.js";
import SignUp from "../User Forms/SignUp.js";
import { ResetPassword } from "../User Forms/ResetPassword.js";
import { ResetPasTakeCare } from "../User Forms/RestPasTakeCare.js";
import OrderManager from "../AdminComponents/OrderManager.js";

import UserAdmin from "../AdminComponents/UserAdmin.js";

// import { UnconnectedUser } from "../User Forms/NotConnected.js";
import ProductByCategory from "../product/ProductByCategory.js";
import { ToConnect } from "../User Forms/ToConnect.js";
import AllAdminPages from "../AdminComponents/AllAdminPages.js";

// Routing במקום 
// כי זה שם שמור

export const MyRouting = () => {
    return (
        <BrowserRouter>
            <ScrollToTop></ScrollToTop>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Nav></Nav>
                <Routes>
                    {/* basic pages */}
                    <Route path="/myHome" element={<Home></Home>}></Route>
                    <Route path="/myContact" element={<Contact></Contact>}></Route>
                    <Route path="/myCommonQuestions" element={<CommonQuestions></CommonQuestions>}></Route>
                    {/* <Route path="/myAccount" element={<MyAccount></MyAccount>}></Route> */}
                    <Route path="/myJoys" element={<Joys></Joys>}></Route>
                    <Route path="/myDesignerBirkins" element={<DesignerBirkins></DesignerBirkins>}></Route>
                    <Route path="/myCongratulationsToTheDonors" element={<CongratulationsToTheDonors></CongratulationsToTheDonors>}></Route>
                    <Route path="/myProductList" element={<ProductList></ProductList>}></Route>
                    <Route path="/myCommonQuestions" element={<CommonQuestions></CommonQuestions>}></Route>
                    <Route path="/myOrderForm" element={<OrderForm></OrderForm>}></Route>
                    {/* <Route path="/myAddProduct" element={<ProductForm></ProductForm>}></Route> */}
                    <Route path="/mySendEmails" element={<SeEmails></SeEmails>}></Route>
                    {/* Later we will have to bring the variable really from other data at the moment it is something temporary                               */}
                    <Route path="/myOrderHistory/:CurrentUser" element={<OrderHistory></OrderHistory>}></Route>
                    <Route path="/myAdminDashboard" element={<AdminDashboard></AdminDashboard>}></Route>
                    <Route path="/myCategoriesManager" element={<AllCategories></AllCategories>}></Route>
                    <Route path="/myOrderManager" element={<OrderManager></OrderManager>}></Route>
                    <Route path="/review" element={<Review></Review>}></Route>
                    <Route path="/myShoppingCart" element={<ShoppingCart></ShoppingCart>}></Route>
                                                                        
                    {/* user pages */}
                    <Route path="/myContact" element={<Contact></Contact>}></Route>
                    <Route path="/myAccount" element={<Account></Account>}></Route>
                    <Route path="/myLogin" element={<Login></Login>} />
                    <Route path="/myProfile" element={<UserProfile />} />
                    <Route path="/mySignUp" element={<SignUp />} />
                    <Route path="/myResetPassword" element={<ResetPassword />} />
                    <Route path="/myResetPasswordLink" element={<ResetPasTakeCare />} />
                    <Route path="/myToConnect" element={<ToConnect></ToConnect>} />

                    {/* product pages */}
                    <Route path="/myProductList" element={<ProductList></ProductList>}></Route>
                    <Route path="/myProduct/:id" element={<Product></Product>} ></Route>
                    <Route path="/review" element={<Review></Review>}></Route>
                    <Route path="/myShowReviews/:numStars" element={<ShowReviews></ShowReviews>}></Route>
                    <Route path="/myProductByCategory/:idCategory" element={<ProductByCategory></ProductByCategory>}></Route>

                    {/* order pages */}
                    <Route path="/myOrderForm" element={<OrderForm></OrderForm>}></Route>
                    <Route path="/myOrderHistory/:CurrentUser" element={<OrderHistory></OrderHistory>}></Route>

                    {/* cart pages */}
                    <Route path="/myShoppingCart" element={<ShoppingCart></ShoppingCart>}></Route>

                    {/* questions pages */}
                    <Route path="/myCommonQuestions" element={<CommonQuestions></CommonQuestions>}></Route>

                    {/* admin page */}
                    <Route path="/AllAdminPages" element={<AllAdminPages></AllAdminPages>}></Route>

                    {/* empty pages?? */}
                    <Route path="/myJoys" element={<Joys></Joys>}></Route>
                    <Route path="/myDesignerBirkins" element={<DesignerBirkins></DesignerBirkins>}></Route>
                    <Route path="/myCongratulationsToTheDonors" element={<CongratulationsToTheDonors></CongratulationsToTheDonors>}></Route>>
                    <Route path="myTerms" element={<Terms></Terms>} ></Route>
                    <Route path="/myEvents" element={<Events></Events>} ></Route>

                    {/* Later we will have to bring the variable really from other data at the moment it is something temporary                               */}
                    {/* <Route path="/myAdminDashboard" element={<AdminDashboard></AdminDashboard>}></Route>
                    <Route path="/myCategoriesManager" element={<AllCategories></AllCategories>}></Route>
                    <Route path="/myOrderManager" element={<OrderManager></OrderManager>}></Route> */}

                </Routes>
                <Footer></Footer>
            </div>
        </BrowserRouter>
    );
}
export default MyRouting;