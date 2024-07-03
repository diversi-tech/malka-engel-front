// import { Collapse } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCommonQuestions } from "../../axios/CommonQuestionsAxios";
import { setFAQlist } from "../../redux/DataActions/DataActions.FAQ"

//FAQ page

export const CommonQuestions = () => {
  debugger
  //Translate  
  const { t, i18n } = useTranslation();
  //List of FAQ questions from redux
  let FAQlist = useSelector(s =>s.DataReducer_FAQ.FAQlist)
  //List of FAQ questions for search filter - Initialize with the complete list of questions
  let [questionsList, setQuestionsList] = useState(FAQlist);
  const [openIndex, setOpenIndex] = useState(null);

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
      setQuestionsList(c)
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
  setQuestionsList(FAQlist.filter(q => q[t('CommonQuestionsPage.question')].toLowerCase().includes(event.target.value.toLowerCase())))
  };

  // פונקציה לטיפול בפתיחת ושמירת תשובות
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  return (
    <div>
       <form class="d-flex">
        <input class="form-control me-2" type="text" placeholder="Search" onChange={handleChange} />
      </form>
      <h1 title={t('CommonQuestionsPage.title')}></h1>

    {questionsList.map((item, index) => (
      <Card key={index} className="mb-3">
        <Card.Header>
          <Button
            variant="link"
            onClick={() => handleToggle(index)}
            aria-controls={`faq-collapse-${index}`}
            aria-expanded={openIndex === index}
            className="text-dark text-decoration-none w-100 text-right d-flex justify-content-between align-items-center"
          >
            {item[t('CommonQuestionsPage.question')]}
            <span>{openIndex === index ? '▲' : '▼'}</span>
          </Button>
        </Card.Header>
        <Collapse in={openIndex === index}>
          <div id={`faq-collapse-${index}`}>
            <Card.Body>
              {item[t('CommonQuestionsPage.answer')]}
            </Card.Body>
            <Card.Body>
              {item.rating}
            </Card.Body>
          </div>
        </Collapse>
      </Card>
    ))}
  </div>
  );
}






