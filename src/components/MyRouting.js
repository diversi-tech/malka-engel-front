import { BrowserRouter, Route, Routes,Switch } from "react-router-dom";
import { Home } from "./Home";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { MyAccount } from "./MyAccount";
import { CommonQuestions } from "./CommonQuestions";
import { Contact } from "./Contact";
import { AuthProvider } from './ClientApi.js/AuthContext';
import { LoginForm } from "./ClientApi.js/LoginForm";
import UserProfile from './ClientApi.js/UserProfile';
// import { Switch, Route } from 'react-router-dom';




export const MyRouting = () => {
    return (
        <BrowserRouter>
            <Nav></Nav>
            <Routes>
                <Route path="/myHome" element={<Home></Home>}></Route>
                <Route path="/Contact" element={<Contact></Contact>}></Route>
                <Route path="/CommonQuestions" element={<CommonQuestions></CommonQuestions>}></Route>
                <Route path="/MyAccount" element={<MyAccount></MyAccount>}></Route>
                <Route path="/myLoginForm" element={<LoginForm></LoginForm>}></Route>
                <AuthProvider>
                    <Switch>
                        <Route path="/Login" component={LoginForm} />
                        <Route path="/Profile" component={UserProfile} />
                    </Switch>
                </AuthProvider>
            </Routes>
            <Footer></Footer>


        </BrowserRouter>
    );
}