import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { MyAccount } from "./MyAccount";
import { CommonQuestions } from "./CommonQuestions";
import { Contact } from "./Contact";
import { AuthProvider } from './ClientApi.js/AuthContext';
import { LoginForm } from "./LoginForm";
import UserProfile from './UserProfile';
import RegistrationForm from './RegistrationForm';



export const MyRouting = () => {
    return (
        <BrowserRouter>
            <Nav></Nav>
            <Routes>
                <Route path="/myHome" element={<Home></Home>}></Route>
                <Route path="/Contact" element={<Contact></Contact>}></Route>
                <Route path="/CommonQuestions" element={<CommonQuestions></CommonQuestions>}></Route>
                <Route path="/MyAccount" element={<MyAccount></MyAccount>}></Route>
                <AuthProvider>
                    <Route path="/Login" element={<LoginForm />} />
                    <Route path="/Profile" element={<UserProfile />} />
                    <Route path="/Register" element={<RegistrationForm />} />
                </AuthProvider>
            </Routes>
            <Footer></Footer>


        </BrowserRouter>
    );
}