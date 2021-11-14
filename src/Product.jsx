import styled from "styled-components";
import { useLocation } from "react-router";
import { useState, useEffect } from 'react'
import { mobile } from "./responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  align-items: center;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  width: 100vw;
`;

const Image = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: contain;
  ${mobile({ height: "40vh" })}
`;


const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;


const Title = styled.h1`
  font-weight: 200;
`;



const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const Desc = styled.p`
margin: 20px 0;
`

const Product = () => {

  const location = useLocation();
  const productId = location.pathname.split("/")[2]

  const [product, setProduct] = useState({});

  useEffect(() => {
    (async () => {
      const getProduct = await fetch("http://localhost:5000/products/" + productId,
        {
          method: "GET"
        });
      let getProductBody = await getProduct.json();
      if (getProduct.ok) {
        setProduct(getProductBody)
      }
    })();
  }, [productId])

  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Image src={product.image} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.productName}</Title>
          <Desc>{product.description}</Desc>
          <Price>Price: ${product.price}</Price>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default Product;