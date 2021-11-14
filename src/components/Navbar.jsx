import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined, Person } from "@material-ui/icons";
import React, { useContext, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom'
import { UserContext } from "../context/UserContext";
import { OrdersService, ProductsService } from '../Service';
import { mobile } from "../responsive";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: flex-start;
`;

const Center = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: flex-start;
`;

const Logo = styled.h1`
  font-weight: bold;
  text-decoration: none;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  cursor: pointer;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })} 
`;

const Navbar = () => {
  let [orders, setOrders] = useState([]);

  //get context
  let userContext = useContext(UserContext)

  //loadFataFromDatabase and fetch data from orders array
  let loadDataFromDatabase = useCallback(async () => {
    let ordersResponse =

      await fetch(`http://localhost:5000/orders?userid=${userContext.user.currentUserId}`,
        { method: "GET" }
      );
    if (ordersResponse.ok) {
      let ordersResponseBody = await ordersResponse.json();

      //get products data
      let productsResponse = await ProductsService.fetchProducts();
      if (productsResponse.ok) {
        let productsResponseBody = await productsResponse.json();

        //read orders data
        ordersResponseBody.forEach((order) => {
          order.product = ProductsService.getProductsByProductId(productsResponseBody, order.productId);
        });
        setOrders(ordersResponseBody);
      }
    }
  }, [userContext]);


  useEffect(() => {
    document.title = "Cart - eCommerce";
    loadDataFromDatabase();
  }
    , [userContext.user.currentUserId, loadDataFromDatabase]);

  let onLogoutClick = (e) => {
    e.preventDefault();
    userContext.setUser({
      isLoggedIn: false,
      currentUserId: null,
      currentUserName: null
    })

    window.location.hash = '/';
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <MenuItem>
            <Link to="/store">HOME</Link>
          </MenuItem>
        </Left>
        <Center>
          <Logo>STORE</Logo>
        </Center>
        <Right>
          {!userContext.user.isLoggedIn ? (<Link to="/register" ><MenuItem>REGISTER</MenuItem></Link>) : ('')}
          {!userContext.user.isLoggedIn ? (<Link to="/" ><MenuItem>LOG IN</MenuItem></Link>) : ('')}
          <Link to="/cart" ><MenuItem>
            <Badge badgeContent={OrdersService.getCart(orders).length} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem></Link>
          {userContext.user.isLoggedIn ? (<MenuItem><Person />{userContext.user.currentUserName}</MenuItem>
          ) : ('')}
          {userContext.user.isLoggedIn ? (<MenuItem
            onClick={onLogoutClick}
          >LOGOUT</MenuItem>) : ('')}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

