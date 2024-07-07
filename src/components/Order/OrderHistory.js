import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCommonQuestions } from "../../axios/CommonQuestionsAxios";
import { setFAQlist } from "../../redux/DataActions/DataActions.FAQ"
import { getUserHistory } from "../../axios/UserOrdersHistoryAxios";
//this page not complete
export const OrderHistory = () => { 
  const { t, i18n } = useTranslation();
  let UHistorylist = useSelector(s => s.DataReducer_UHistory.UHistorylist)
  let [currentHistory, setCurrentHistory] = useState(UHistorylist);
  const dispatch = useDispatch()
  async function fetchData() {
    if (UHistorylist.length == 0) {
      let c = await getUserHistory()
      setCurrentHistory(c)
      dispatch(setFAQlist(c)) 
      if(!currentHistory){
        return <p>Loading...</p>
   } 
  else{
    return (
      <div className="container mt-4">
        <h2>Orders History</h2>
        <table className="table">
          <thead>
            <tr>
              <th>status</th>
              <th>Order Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {currentHistory.map(order => (
              <tr key={order.userID}>
                <td>{order.status}</td>
                <td>{order.createdAt}</td>
                <td> ₪{order.totalAmount}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }}
  }
  useEffect(x => {
    fetchData();
  }, [])
}





