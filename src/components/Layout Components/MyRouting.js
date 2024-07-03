import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./Footer.js";
import { Contact } from "../User/Contact.js";
import { DesignerBirkins } from "../Empty pages/DesignerBirkins.js";
import { CongratulationsToTheDonors } from "../Empty pages/CongratulationsToTheDonors.js";
import { AuthProvider } from '../ClientApi.js/AuthContext.js';
import { Events } from "../Empty pages/Events.js";
import AdminDashboard from "../AdminComponents/AdminDashboard.js";
import CategoriesManager from "../AdminComponents/CategoriesManager.js";
import OrderManager from "../AdminComponents/OrderManager.js";

import { ProductList } from "../product/ProductList.js";
import { Nav } from "./Nav.js";
import { CommonQuestions } from "../Questions/CommonQuestions.js";
import { Joys } from "../Empty pages/Joys.js";
import UserProfile from "../User/UserProfile.js";
import RegistrationForm from "../User/RegistrationForm.js";
import { Account } from "../User/Account.js";
import { Product } from "../product/productDetail/Product.js";
import { OrderForm } from "../Order/OrderForm.js";
import { Review } from "../product/productDetail/Review.js";
import { ScrollToTop } from "./scrollToTop.js";
import {Home} from './Home.js';
import {ProductForm} from '../product/addProduct.js'
import { ShoppingCart } from '../Cart/ShoppingCart.js';
import { Login} from '../User/Login.js';
import {Terms} from '../Empty pages/Terms.js';
import {ShowReviews} from '../product/ShowReviews.js'
// Routing במקום 
// כי זה שם שמור

export const MyRouting = () => {
    return (
        <BrowserRouter>
        <ScrollToTop></ScrollToTop>
            <div  style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Nav></Nav>
                <Routes>
                    {/*  שימו לב שבגרסה הזאת אין צורך להשתמש בסוויטש אפשר ישר לשים בתוך תגית הראוט */}
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
                    <Route path="/myAddProduct" element={<ProductForm></ProductForm>}></Route>

                    <Route path="/myAdminDashboard" element={<AdminDashboard></AdminDashboard>}></Route>
                    <Route path="/myCategoriesManager" element={<CategoriesManager></CategoriesManager>}></Route>
                    <Route path="/myOrderManager" element={<OrderManager></OrderManager>}></Route>





                    <Route path="/review" element={<Review></Review>}></Route>

                    <Route path="/myShoppingCart" element={<ShoppingCart></ShoppingCart>}></Route>

                    <Route path="/myAccount" element={<Account></Account>}></Route>
                    <Route path="/myLogin" element={<Login></Login>} />
                    <Route path="/myProfile" element={<UserProfile />} />
                    <Route path="/myRegister" element={<RegistrationForm />} />
                    <Route path="myTerms" element={<Terms></Terms>} ></Route>
                    <Route path="/myEvents" element={<Events></Events>} ></Route>
                    <Route path="/myProduct/:id" element={<Product></Product>} ></Route>
                    <Route path="/myShowReviews/:numStars" element={<ShowReviews></ShowReviews>}></Route>

                </Routes>
                <Footer></Footer>
            </div>
        </BrowserRouter>
    );
}
export default MyRouting;