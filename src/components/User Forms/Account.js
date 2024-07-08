import { useSelector } from "react-redux";
import { Profile } from "./Profile"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


export const Account = ()=>{
    const { t, i18n } = useTranslation();

    const connected = useSelector(s=>s.DataReducer_Users.connected);

    return<>
      {!connected ?(<div><br></br><h1>   {t('accountPage.errCon') }</h1> 
                <Link  to="/myLogin">{t('accountPage.signIn')}</Link> 


            </div>):(
        <Profile></Profile>)}
        </>
    
}