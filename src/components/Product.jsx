import {
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { useState } from 'react'
import { Link } from 'react-router-dom'


const Info = styled.div`
opacity: 0;
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
background-color: rgba(0, 0, 0, 0.2);
z-index: 3;
display: flex;
align-items: center;
justify-content: center;
transition: all 0.5s ease;
cursor: pointer;
`;

const Container = styled.div`
flex: 1;
margin: 5px;
min-width: 280px;
height: 350px;
display: flex;
align-items: center;
justify-content: center;
background-color: #f5fbfd;
position: relative;
  &:hover ${Info}{
     opacity: 1;
  }
`;

const Circle = styled.div`
width: 200px;height: 200px;
border-radius: 50%;
background-color: white;
position: absolute;
`;

const Image = styled.img`
height: 75%;
width: 90%;
z-index: 2;
`;

const Icon = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
background-color: white;
display: flex;
align-items: center;
justify-content: center;
margin: 10px;
transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Title = styled.p`
z-index: 3;
position: absolute;
top:0;
left: 0;
padding: 10px;
`;

const Price = styled.p`
color: gray;
position: absolute;
z-index: 3;
bottom: 0;
right: 0;
padding: 5px;
`;

const Brand = styled.p`
color: gray;
position: absolute;
z-index: 3;
bottom: 0;
left: 0;
padding: 10px;
padding: 5px;
`;

const Product = (props) => {
  let [prod] = useState(props.product);
  return (
    <Container>
      <Title>{prod.productName}</Title>
      <Brand>#{prod.brand.brandName}# {prod.category.categoryName}</Brand>
      <Circle />
      <Image src={prod.image} />
      <Info>
        <Icon onClick={() => {
          props.onAddToCartClick(prod)
        }} >
          <ShoppingCartOutlined />
        </Icon>
        <Link to={`/product/${prod.id}`}>
          <Icon>
            <SearchOutlined />
          </Icon>
        </Link>
        <Price>${prod.price.toFixed(2)}</Price>
      </Info >
    </Container >
  );
};

export default Product;