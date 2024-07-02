import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { CommonQuestions } from "./CommonQuestions";
import { Contact } from "./Contact";
import { Joys } from "./Joys";
import { DesignerBirkins } from "./DesignerBirkins";
import { CongratulationsToTheDonors } from "./CongratulationsToTheDonors";
import ShoppingCart from "./ShoppingCart";
import { Terms } from "./Terms";
import { AuthProvider } from './ClientApi.js/AuthContext';
import { Login } from "./Login";
import UserProfile from './UserProfile';
import RegistrationForm from './RegistrationForm';
import { ProductList } from "./ProductList";
import { Account } from "./Account";
import { Events } from "./Events";
import { Product } from "./productDetail/Product";
import { OrderForm } from "./OrderForm";
import AdminDashboard from "./AdminComponents/AdminDashboard.js";
import CategoriesManager from "./AdminComponents/CategoriesManager.js";
import OrderManager from "./AdminComponents/OrderManager.js";

import { ShowReviews } from "./productDetail/ShowReviews";
import { Review } from "./productDetail/Review";
import ProductForm from "./addProduct.js";

// Routing במקום 
// כי זה שם שמור

export const MyRouting = () => {
    return (
        <BrowserRouter>
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

                    {/* <AuthProvider> */}
                    <Route path="/myLogin" element={<Login />} />
                    <Route path="/myProfile" element={<UserProfile />} />
                    <Route path="/myRegister" element={<RegistrationForm />} />
                    {/* </AuthProvider> */}
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