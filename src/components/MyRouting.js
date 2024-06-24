import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { MyAccount } from "./MyAccount";
import { CommonQuestions } from "./CommonQuestions";
import { Contact} from "./Contact";
import {Joys} from "./Joys";
import {DesignerBirkins} from "./DesignerBirkins";
import {CongratulationsToTheDonors} from "./CongratulationsToTheDonors";
import ShoppingCart from "./Cart/ShoppingCart";
import { AuthProvider } from './ClientApi.js/AuthContext';
import { LoginForm } from "./LoginForm";
import UserProfile from './UserProfile';
import RegistrationForm from './RegistrationForm';





export const MyRouting = () => {
    return (
        <BrowserRouter>
            <Nav></Nav>
            <Routes>
                {/*  שימו לב שבגרסה הזאת אין צורך להשתמש בסוויטש אפשר ישר לשים בתוך תגית הראוט */} 
                <Route path="/myHome" element={<Home></Home>}></Route>

                
                <Route path="/Joys" element={<Joys></Joys>}></Route>
                <Route path="/designerBirkins" element={<DesignerBirkins></DesignerBirkins>}></Route>
                <Route path="/CongratulationsToTheDonors" element={<CongratulationsToTheDonors></CongratulationsToTheDonors>}></Route>

                <Route path="/myContact" element={<Contact></Contact>}></Route>
                <Route path="/myCommonQuestions" element={<CommonQuestions></CommonQuestions>}></Route>
                <Route path="/myAccount" element={<MyAccount></MyAccount>}></Route>
                <Route path="/myShoppingCart" element={<ShoppingCart></ShoppingCart>}></Route>

                {/* <AuthProvider> */}
                    <Route path="/myLogin" element={<LoginForm />} />
                    <Route path="/myProfile" element={<UserProfile />} />
                    <Route path="/myRegister" element={<RegistrationForm />} />
                {/* </AuthProvider> */}


            </Routes>
            <Footer></Footer>
        </BrowserRouter>
    );
}