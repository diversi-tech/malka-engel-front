import { Link, Outlet } from "react-router-dom"
import { useTranslation } from 'react-i18next';
// Nav page
export const Nav = () => {
    const { t, i18n } = useTranslation();
    return (    
        <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
            <Link className="navbar-brand" to="/">Navbar page</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/myHome">{t('navPage.linkHome')}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/myContact">{t('navPage.linkContact')}</Link>
                    </li>
                </ul>
                <div className="d-flex">
                    <button className="btn btn-outline-warning me-2" onClick={() => i18n.changeLanguage('en')}>English</button>
                    <button className="btn btn-outline-warning" onClick={() =>  i18n.changeLanguage('he')}>עברית</button>
                </div>
            </div>
        </div>
    </nav>
</div>
    );
}
//     <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        //         <h1 className="navbar-brand" to="/">Navbar page</h1>
        //         <div className="collapse navbar-collapse" id="navbarNav">
        //             <ul className="navbar-nav">
        //                 <li className="nav-item">
        //                     <Link className="nav-link" to="./myHome">{t('navPage.linkHome')}</Link>
        //                 </li>
        //                 <li className="nav-item">
        //                     <Link className="nav-link" to="./myContact">{t('navPage.linkContact')}</Link>
        //                 </li>
        //             </ul>
        //         </div>
        //         <div>
        //             <div className="container">
        //                 <button type="button" class="btn btn-outline-warning" onClick={() => i18n.changeLanguage('en')}>English</button>
        //                 <button type="button" class="btn btn-outline-warning" onClick={() => i18n.changeLanguage('he')}>עברית</button>
        //             </div>
        //         </div>
        //     </nav>

// import { Link } from 'react-router-dom';