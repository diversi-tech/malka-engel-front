import { useSelector } from "react-redux";
import { Profile } from "./Profile"
import { useTranslation } from "react-i18next";


export const Account = ()=>{
    const { t, i18n } = useTranslation();

    const connected = useSelector(s=>s.DataReducer_Users.connected);

    return<>
      {!connected ?(<div><br></br><h1>   {t('accountPage.errCon') }</h1> 
                <a href="/myLogin" >{t('accountPage.signIn') }</a>

            </div>):(
        <Profile></Profile>)}
        </>
    
}