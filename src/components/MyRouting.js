import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { MyAccount } from "./MyAccount";
import { CommonQuestions } from "./CommonQuestions";
import { Contact} from "./Contact";


// Routing page
export const MyRouting = () => {
    return (
        <BrowserRouter>
            <Nav></Nav>
            <Routes>
                <Route path="/myHome" element={<Home></Home>}></Route>
                <Route path="/Contact" element={<Contact></Contact>}></Route>
                <Route path="/CommonQuestions" element={<CommonQuestions></CommonQuestions>}></Route>
                <Route path="/MyAccount" element={<MyAccount></MyAccount>}></Route>

            </Routes>
            <Footer></Footer>
                
            
        </BrowserRouter>
    );
}