import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { MyAccount } from "./MyAccount";
import { CommonQuestions } from "./CommonQuestions";
import { Contact } from "./Contact";
import { AuthProvider } from './ClientApi.js/AuthContext';
import { LoginForm } from "./ClientApi.js/LoginForm";
import UserProfile from './ClientApi.js/UserProfile';


export const MyRouting = () => {
    return (
        <BrowserRouter>
            <Nav></Nav>
            <Routes>
                {/*  שימו לב שבגרסה הזאת אין צורך להשתמש בסוויטש אפשר ישר לשים בתוך תגית הראוט */} 
                <Route path="/myHome" element={<Home></Home>}></Route>
                <Route path="/myContact" element={<Contact></Contact>}></Route>
                <Route path="/myCommonQuestions" element={<CommonQuestions></CommonQuestions>}></Route>
                <Route path="/myAccount" element={<MyAccount></MyAccount>}></Route>
                <Route path="/myLoginForm" element={<LoginForm></LoginForm>}></Route>
                {/* אין צורך בזה  */}
                {/* <Switch> */}
                {/* <AuthProvider>
                        <Route path="/Login" component={LoginForm} />
                        <Route path="/Profile" component={UserProfile} />
                </AuthProvider> */}
                {/* </Switch> */}
            </Routes>
            <Footer></Footer>
        </BrowserRouter>
    );
}