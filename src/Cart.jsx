// import React, { useState, useEffect, useContext, useCallback } from 'react'
// import { UserContext } from './context/UserContext';
// import { ShoppingCartOutlined } from "@material-ui/icons";
// import { Badge } from "@material-ui/core";
// import styled from "styled-components";
// import Order from './components/Order'
// import { OrdersService, ProductsService } from './Service';
// import { Link } from 'react-router-dom'
// import { mobile } from "./responsive";
// import data from './data/ecommerce-db.json'

// const Container = styled.div``;

// const Wrapper = styled.div`
//   padding: 20px;
//   ${mobile({ padding: "10px" })}
// `;

// const CartDiv = styled.div`
//   display: flex;
//   align-items: flex-start;
//   justify-content: space-between;
// `;

// const Title = styled.h1`
//   font-weight: 300;
//   text-align: center;
// `;

// const Top = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 20px;
// `;

// const TopButton = styled.button`
//   padding: 10px;
//   font-weight: 600;
//   cursor: pointer;
//   border: ${(props) => props.type === "filled" && "none"};
//   background-color: ${(props) =>
//     props.type === "filled" ? "black" : "transparent"};
//   color: ${(props) => props.type === "filled" && "white"};
// `;



// const Bottom = styled.div`
//   flex:1;
//   margin-top: 20px;
//   border-top: 1px solid black;
// `;

// const PreviousOrders = styled.div`
//   flex:1;
//   margin-top: 20px;
//   border-top: 1px solid black;
// `;

// const TopText = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 20px;
// `;


// const Cart = () => {
//   const [orders, setOrders] = useState([]);
//   const [cartArray, setCartArray] = useState([]);
//   //get context
//   const userContext = useContext(UserContext)


//   let newData = localStorage.getItem('order');

//   let jsonData = JSON.parse(newData);

//   console.log(jsonData);

//   //loadDataFromDatabase and fetch data from orders array
//   let loadData = useCallback(
//     () => {
//       const ordersArray = data.orders;

//       const products = data.products;




//       //read orders data
//       ordersArray.forEach((order) => {
//         order.product = ProductsService.getProductsByProductId(products, order.productId);
//       });
//       setOrders(ordersArray);

//     },
//     [],
//   )





//   useEffect(() => {


//     // let ordersResponse =

//     document.title = "Cart - eCommerce";
//     loadData()
//   }
//     , []);


//   // //buy now click
//   let onBuyNowClick = useCallback(
//     async (orderId, userId, productId, quantity) => {
//       //     if (window.confirm("Do you want to place order for this product?")) {
//       //       let updateOrder = {
//       //         id: orderId,
//       //         productId: productId,
//       //         userId: userId,
//       //         quantity: quantity,
//       //         isPaymentCompleted: true,
//       //       };

//       //       //   let orderResponse = await fetch(
//       //       //     `http://localhost:5000/orders/${orderId}`,
//       //       //     {
//       //       //       method: "PUT",
//       //       //       body: JSON.stringify(updateOrder),
//       //       //       headers: { "Content-type": "application/json" },
//       //       //     }
//       //       //   );

//       //       //   let orderResponseBody = await orderResponse.json();
//       //       //   if (orderResponse.ok) {
//       //       //     console.log(orderResponseBody);
//       //       //     loadDataFromDatabase();
//       //       //   }
//       //       // }
//     },
//     []
//   );

//   //When the user clicks on Delete button
//   let onDeleteClick = useCallback(
//     // async (orderId) => {
//     //   if (window.confirm("Are you sure to delete this item from cart?")) {
//     //     let orderResponse = await fetch(
//     //       `http://localhost:5000/orders/${orderId}`,
//     //       {
//     //         method: "DELETE",
//     //       }
//     //     );
//     //     if (orderResponse.ok) {
//     //       let orderResponseBody = await orderResponse.json();
//     //       console.log(orderResponseBody);
//     //       loadDataFromDatabase();
//     //     }
//     //   }
//     // },
//     // [loadDataFromDatabase]
//   );

//   return (
//     <Container>
//       <Wrapper>
//         <Title>YOUR CART  <Badge badgeContent={OrdersService.getCart(orders).length} color="primary">
//           <ShoppingCartOutlined />
//         </Badge></Title>
//         <Top>
//           <Link to="/">
//             <TopButton>CONTINUE SHOPPING</TopButton>
//           </Link>
//         </Top>
//         <TopText>

//           {/* <Title>Cart{""}: ({cart.length})</Title> */}
//         </TopText>
//         {/* <CartDiv>
//           {cart.map((prod) => (
//             <Product key={prod.id} product={prod}
//               onAddToCartClick={onAddToCartClick} />
//           ))}

//         </CartDiv> */}
//       </Wrapper>
//     </Container>
//   );
// };


// export default Cart;
