import {
  Delete,
  SearchOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mobile } from "../responsive";


const ItemContainer = styled.div`
border-top: 1px solid gray;
margin-top: 20px;
display: flex;
align-items: center;
justify-content: center;
width:50%;
padding: 5px;
${mobile({ width: "100%", marginTop: "30px" })}
`;

const Image = styled.img`
width:100%;
height: 90%auto;
`;

const Icon = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
background-color: white;
display: flex;
align-items: center;
justify-content: center;
transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Title = styled.p`  
`;

const Price = styled.p`
color: gray;
padding: 5px;
`;

const InputDiv = styled.div``;

const Input = styled.input`
width: 50px;
`;

const Left = styled.div`
width:50%;
`;

const Right = styled.div`
width:50%;
display: flex;
flex-direction:column;
align-items: flex-start;
justify-content: center;
`;

const IconDiv = styled.div`
display: flex;
justify-content: flex-start;
align-items: flex-start;
`;



const Product = (props) => {
  let [prod] = useState(props.product);
  return (
    <ItemContainer>
      <Left>
        <Image src={prod.image} />
      </Left>
      <Right>
        <Title><b>Name:</b> {prod.productName}</Title>
        <Price><b>Price:</b> ${prod.price.toFixed(2)}</Price>
        <InputDiv>
          <Input value={prod.quantity} onChange={(e) =>
            props.setQuantity(prod,
              parseInt(e.target.value))
          } />
        </InputDiv>
        <IconDiv>
          <Icon onClick={() => {
            props.removeFromCart(prod)
          }} >
            <Delete />
          </Icon>
          <Link to={`/product/${prod.id}`}>
            <Icon>
              <SearchOutlined />
            </Icon>
          </Link>
        </IconDiv>
      </Right>
    </ItemContainer >
  );
};

export default Product;