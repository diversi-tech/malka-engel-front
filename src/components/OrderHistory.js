// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css'; // יבוא קובץ CSS של Bootstrap

// export const OrderHistory = () => {
//     const userId = 1; 

// const orders=
//     useEffect(() => {
//         fetchUserOrders();
//     }, [userId]); // הוספת userId כתלות לעדכון האפקט

//     const fetchUserOrders = async () => {
//         try {
//             const response = await axios.get(`/api/orders/GetOrdersByUserId${userId}`);
//             setOrders(response.data);
//         } catch (error) {
//             console.error('Error fetching user orders:', error);
//         }
//     };

//     return (
//         <div className="container mt-4">
//             <h2>Orders History</h2>
//             <table className="table">
//                 <thead>
//                     <tr>
//                         <th>Product Name</th>
//                         <th>Order Date</th>
//                         <th>Price</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {orders.map(order => (
//                         <tr key={order.id}>
//                             <td>{order.productName}</td>
//                             <td>{order.orderDate}</td>
//                             <td>${order.price}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default OrderHistory;

// import { Collapse } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCommonQuestions } from "../axios/CommonQuestionsAxios";
import { setFAQlist } from "../redux/DataActions/DataActions.FAQ"
import { getUserHistory } from "../axios/UserOrdersHistoryAxios";

//FAQ page

export const OrderHistory = () => {

  //Translate  
  const { t, i18n } = useTranslation();
  //List of FAQ questions from redux
  let UHistorylist = useSelector(s => s.DataReducer_UHistory.UHistorylist)
  //List of FAQ questions for search filter - Initialize with the complete list of questions
  let [currentHistory, setCurrentHistory] = useState(UHistorylist);
  //יצירת משנה שישמש לשיגור
  const dispatch = useDispatch()

  // A function that retrieves from the server if the redex is empty  
  async function fetchData() {

    //check if it is empty   
    if (UHistorylist.length == 0) {
      //Retrieval from server
      let c = await getUserHistory()
      //  FAQlist = c
      setCurrentHistory(c)
      //place in redex - שיגור                        
      dispatch(setFAQlist(c)) //+t('CommonQuestionsPage.language')(myFAQlist.data))
    }
  }
  // קריאה לפונקצית שליפה מהשרת
  useEffect(x => {
    fetchData();
  }, [])


  // A function to handle the search   
  // const handleChange = (event) => {
  //   //Filter the questions by text of the search field.
  //   setCurrentHistory(UHistorylist.filter(q => q.question.toLowerCase().includes(event.target.value.toLowerCase())))
  // };




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
}





