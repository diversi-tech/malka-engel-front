import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { CommonQuestions } from "./CommonQuestions";
import { Contact } from "./Contact";
import { Joys } from "./Joys";
import { DesignerBirkins } from "./DesignerBirkins";
import { CongratulationsToTheDonors } from "./CongratulationsToTheDonors";
import { Details } from "./Details";

import { AuthProvider } from './ClientApi.js/AuthContext';
import { Login } from "./Login";
import UserProfile from './UserProfile';
import RegistrationForm from './RegistrationForm';
import { ProductList } from "./ProductList";
import { Account } from "./Account";

// MyRouting רשמתי 
// Routing במקום 
// כי זה שם שמור

export const MyRouting = () => {
    return (
        <BrowserRouter>
            <Nav></Nav>
            <Routes>
                {/*  שימו לב שבגרסה הזאת אין צורך להשתמש בסוויטש אפשר ישר לשים בתוך תגית הראוט */}
                <Route path="/myHome" element={<Home></Home>}></Route>



                <Route path="/myJoys" element={<Joys></Joys>}></Route>
                <Route path="/myDesignerBirkins" element={<DesignerBirkins></DesignerBirkins>}></Route>
                <Route path="/myCongratulationsToTheDonors" element={<CongratulationsToTheDonors></CongratulationsToTheDonors>}></Route>

                <Route path="/myContact" element={<Contact></Contact>}></Route>
                <Route path="/myCommonQuestions" element={<CommonQuestions></CommonQuestions>}></Route>
                <Route path="/myAccount" element={<Account></Account>}></Route>
                {/* <AuthProvider> */}
                    <Route path="/myLogin" element={<Login />} />
                    <Route path="/myProfile" element={<UserProfile />} />
                    <Route path="/myRegister" element={<RegistrationForm />} />
                {/* </AuthProvider> */}


            </Routes>
            <Footer></Footer>
        </BrowserRouter>
    );
}
export default MyRouting;