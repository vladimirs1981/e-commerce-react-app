import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined, Person } from "@material-ui/icons";
import React, { useContext, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom'
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

  return (
    <Container>
      <Wrapper>
        <Left>
          <MenuItem>
            <Link to="/">HOME</Link>
          </MenuItem>
        </Left>
        <Center>
          <Logo>STORE</Logo>
        </Center>
        <Right>
          <Link to="/cart" ><MenuItem>
            <Badge color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem></Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

