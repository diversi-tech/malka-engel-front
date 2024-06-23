import { Link, Outlet } from "react-router-dom"
import { useTranslation } from 'react-i18next';
// Nav page
export const Nav = () => {
    const { t, i18n } = useTranslation();
    return (
        <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
            <div class="container-fluid">

                <h1 className="navbar-brand" to="/">Designery</h1>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link className="nav-link" to="./myHome">{t('navPage.linkHome')}</Link> </li>
                        <li className="nav-item"><Link className="nav-link" to="./myContact">{t('navPage.linkContact')}</Link> </li>
                        <li className="nav-item"><Link className="nav-link" to="./myCommonQuestions">{t('navPage.linCommonQuestions')}</Link> </li>

                    </ul>
                </div>
                <div>
                    <button onClick={() => i18n.changeLanguage('en')}>English</button>
                    <button onClick={() => i18n.changeLanguage('he')}>עברית</button>
                </div>

                {/* <Outlet></Outlet> */}
            </div> </nav>
    );
}