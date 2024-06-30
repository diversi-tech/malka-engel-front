// import { Collapse } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCommonQuestions } from "../axios/CommonQuestionsAxios";
import { setFAQlist } from "../redux/DataActions/DataActions.FAQ"

//FAQ page

export const CommonQuestions = () => {
  debugger
  //Translate  
  const { t, i18n } = useTranslation();
  //List of FAQ questions from redux
  let FAQlist = useSelector(s =>s.DataReducer_FAQ.FAQlist)
  //List of FAQ questions for search filter - Initialize with the complete list of questions
  let [currentQuestion, setCurrentQuestion] = useState(FAQlist);
  //יצירת משנה שישמש לשיגור
  const dispatch = useDispatch()

  // A function that retrieves from the server if the redex is empty  
async function fetchData() {
    debugger
    //check if it is empty   
    if (FAQlist.length == 0) { 
      //Retrieval from server
         let c = await getCommonQuestions() 
      //  FAQlist = c
         setCurrentQuestion(c)
      //place in redex - שיגור                        
      dispatch(setFAQlist(c)) 
    }
  }
// קריאה לפונקצית שליפה מהשרת
 useEffect(x=>{
  fetchData(); 
},[])


// A function to handle the search   
  const handleChange = (event) => {
//Filter the questions by text of the search field.
    setCurrentQuestion(FAQlist.filter(q => q[t('CommonQuestionsPage.answer')].toLowerCase().includes(event.target.value.toLowerCase())))
  };




  return (
    <div>
      <form class="d-flex">
        <input class="form-control me-2" type="text" placeholder="Search" onChange={handleChange} />
      </form>
      {/* <div class="card">
      <div class="card-header">
        <a class="collapsed btn" data-bs-toggle="Collapse" href="#collapseTwo">
        Collapsible Group Item #2
      </a>
      </div>
      <div id="collapseTwo" class="collapse" data-bs-parent="#accordion">
        <div class="card-body">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </div>
      </div>
    </div> */}
       <div>
          <h1 title={t('CommonQuestionsPage.title')}></h1>
       </div>
      {currentQuestion.map(x => <div>

        <div class="container mt-3">

          <div id="accordion">
            <div class="card">
              <div class="card-header">
                <button class="btn"   data-bs-toggle="collapse" data-bs-target="#demo">{x[t('CommonQuestionsPage.question')]}</button>
              
              <div id="demo" class="collapse"></div>
                <div class="card-body">{x[t('CommonQuestionsPage.answer')]}
                <div class="card-body">{x.rating}</div>

              </div>
            </div>
</div>
          </div>
        </div>



      </div>
      )}

    </div>
  );
}





