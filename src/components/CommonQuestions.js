// import { Collapse } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getCommonQuestions } from "../axios/CommonQuestionsAxios";
import { setFQAlist } from "../redux/DataActions/DataActions.FQA"



//FQA page

export const CommonQuestions = () => {
  //Translate  
  const { t, i18n } = useTranslation();
  //List of FQA questions from redux
  const FQAlist = useSelector(s => s.DataReducer_FQA.FQAlist)
  //List of FQA questions for search filter - Initialize with the complete list of questions
  const [currentQuestion, setCurrentQuestion] = useState(FQAlist);

  //יצירת משנה שישמש לשיגור
  const dispatch = useDispatch()



  // A function that retrieves from the server if the redex is empty  
  async function fetchData() {
    //check if it is empty   
    if (FQAlist.length == 0) {
      //Retrieval from server
      let myFQAlist = await getCommonQuestions() 
      //place in local variable
      FQAlist = myFQAlist
      //place in redex - שיגור                        
      dispatch(setFQAlist(myFQAlist.data))
    }
  }

  // A function to handle the search   
  const handleChange = (event) => {
//Filter the questions by text of the search field.
    setCurrentQuestion(FQAlist.filter(q => q.question.toLowerCase().includes(event.target.value.toLowerCase())))
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

      <h1>{t('CommonQuestionsPage.title')}</h1>     
      {currentQuestion.map(x => <div>

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





