import { Collapse } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

//FQA page
export const CommonQuestions = () => {
  const { t, i18n } = useTranslation();
  const FQAlist = useSelector(s => s.DataReducer_FQA.FQAlist)
    return (
        <div>
            <h1>{t('CommonQuestionsPage.title')}</h1>
           
            {FQAlist.map(x => <div>

              <div class="container mt-3">
 
 <div id="accordion">
   <div class="card">
     <div class="card-header">
       <a class="btn" data-bs-toggle="collapse" href="#collapseOne">{x.question}</a> 
     </div>
     <div id="collapseOne" class="collapse show" data-bs-parent="#accordion">
       <div class="card-body">{x.answer}</div>
       <div class="card-body">{x.Rating}</div>

     </div>
   </div>
 
   </div>
 </div>
   

              
             </div>
              )}

  </div>
    );
}