import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { MyAccount } from "./MyAccount";
import { CommonQuestions } from "./CommonQuestions";
import { Contact } from "./Contact";
import { Joys } from "./Joys";
import { DesignerBirkins } from "./DesignerBirkins";
import { CongratulationsToTheDonors } from "./CongratulationsToTheDonors";
import { Details } from "./Details";

import { AuthProvider } from './ClientApi.js/AuthContext';
import { LoginForm } from "./LoginForm";
import UserProfile from './UserProfile';
import RegistrationForm from './RegistrationForm';
import { ProductList } from "./ProductList";





export const MyRouting = () => {
    return (
        <BrowserRouter>
            <Nav></Nav>
            <Routes>
                {/*  שימו לב שבגרסה הזאת אין צורך להשתמש בסוויטש אפשר ישר לשים בתוך תגית הראוט */}
                <Route path="/myHome" element={<Home></Home>}></Route>
                <Route path="/myProductList" element={<ProductList></ProductList>}></Route>
                <Route path="/myDetails/:id" element={<Details/>}></Route>

                <Route path="/Joys" element={<Joys></Joys>}></Route>
                <Route path="/designerBirkins" element={<DesignerBirkins></DesignerBirkins>}></Route>
                <Route path="/CongratulationsToTheDonors" element={<CongratulationsToTheDonors></CongratulationsToTheDonors>}></Route>

                <Route path="/myContact" element={<Contact></Contact>}></Route>
                <Route path="/myCommonQuestions" element={<CommonQuestions></CommonQuestions>}></Route>
                <Route path="/myAccount" element={<MyAccount></MyAccount>}></Route>
                {/* <AuthProvider>
                    <Route path="/Login" element={<LoginForm />} />
                    <Route path="/Profile" element={<UserProfile />} />
                    <Route path="/Register" element={<RegistrationForm />} />
                </AuthProvider> */}


            </Routes>
            <Footer></Footer>
        </BrowserRouter>
    );
}