import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Contact } from "./Contact";
import { Home } from "./Home";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

// Routing page
export const MyRouting = () => {
    return (
        <BrowserRouter>
            <Nav></Nav>
            <Routes>
                <Route path="./myHome" element={<Home></Home>}></Route>
                <Route path="./myContact" element={<Contact></Contact>}></Route>
            </Routes>
            <Footer></Footer>
        </BrowserRouter>
    );
}