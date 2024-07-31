// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { GetOrderByOrderId } from '../../axios/OrderAxios';
// import { ListGroup, Alert } from 'react-bootstrap';

//  export const OrderDetails = () => {
//   const { orderId } = useParams();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         console.log(`Fetching details for order ID: ${orderId}`);
//         const data = await GetOrderByOrderId(orderId);
//         console.log('Fetched order details:', data);
//         setOrder(data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching order details:', err);
//         setError(err);
//         setLoading(false);
//       }
//     };

//     fetchOrderDetails();
//   }, [orderId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error fetching order details: {error.message}</div>;

//   return (
//     <div className="order-details">
//       <h2>Order Details for Order ID: {orderId}</h2>
//       {order ? (
//         <>
//           <ListGroup>
//             <ListGroup.Item>
//               <p><strong>Order ID:</strong> {order.orderId}</p>
//               <p><strong>Created At:</strong> {order.createdAt}</p>
//               <p><strong>Status:</strong> {order.status}</p>
//               <p><strong>Total Amount:</strong> {order.totalAmount}</p>
//             </ListGroup.Item>
//             {order.items.map(item => (
//               <ListGroup.Item key={item.itemId}>
//                 <img src={item.imageUrl} alt={item.name} width={100} />
//                 <p><strong>Item Name:</strong> {item.name}</p>
//                 <p><strong>Price:</strong> ${item.price}</p>
//                 <p><strong>Quantity:</strong> {item.quantity}</p>
//               </ListGroup.Item>
//             ))}
//           </ListGroup>
//         </>
//       ) : (
//         <div>No order details available.</div>
//       )}
//     </div>
//   );
// };

///////////////////////////////////////
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetOrderByOrderId } from '../../axios/UserOrdersHistoryAxios';
import { ListGroup, Alert } from 'react-bootstrap';

export const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        console.log(`Fetching details for order ID: ${orderId}`);
        const data = await GetOrderByOrderId(orderId);
        console.log('Fetched order details:', data);
        setOrder(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError(err.message); // Capture only the message
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching order details: {error}</div>;

  return (
    <div className="order-details">
      <h2>Order Details for Order ID: {orderId}</h2>
      {order ? (
        <>
          <ListGroup>
            <ListGroup.Item>
              <p><strong>Order ID:</strong> {order.orderId}</p>
              <p><strong>Created At:</strong> {order.createdAt}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total Amount:</strong> {order.totalAmount}</p>
            </ListGroup.Item>
            {order.items && order.items.map(item => (
              <ListGroup.Item key={item.itemId}>
                <img src={item.imageUrl} alt={item.name} width={100} />
                <p><strong>Item Name:</strong> {item.name}</p>
                <p><strong>Price:</strong> ${item.price}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      ) : (
        <div>No order details available.</div>
      )}
    </div>
  );
};
