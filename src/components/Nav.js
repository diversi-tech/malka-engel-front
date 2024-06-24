import { Link, Outlet } from "react-router-dom"
import { useTranslation } from 'react-i18next';
// Nav page
export const Nav = () => {
    const { t, i18n } = useTranslation();
    return (

        <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
            <div class="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <h1 className="navbar-brand" to="/">Designery</h1>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link className="nav-link" to="./myHome">{t('navPage.linkHome')}</Link> </li>
                        {/* <li className="nav-item"><Link className="nav-link" to="./myContact">{t('navPage.linkContact')}</Link> </li> */}
                        <li className="nav-item"><Link className="nav-link" to="./myCommonQuestions">{t('navPage.linCommonQuestions')}</Link> </li>
                        <li className="nav-item"> <Link className="nav-link" to="./Login">{t('navPage.linkLogin')}</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="./myProductList">{t('navPage.linkProduct')}</Link> </li>
                    </ul>
                </div>
                <div className="d-flex">
                    <button onClick={() => i18n.changeLanguage('en')}>English</button>
                    <button onClick={() => i18n.changeLanguage('he')}>עברית</button>
                </div>

                {/* <Outlet></Outlet> */}
            </div> </nav>

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