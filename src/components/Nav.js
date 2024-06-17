import { Link, Outlet } from "react-router-dom"

// Nav page
export const Nav = () => {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                <h1 className="navbar-brand" to="/">Navbar page</h1>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/myHome">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/myContact">Contact</Link>
                        </li>
                    </ul>
                </div>
                <Outlet></Outlet>
            </nav>
        </div>
    );
}