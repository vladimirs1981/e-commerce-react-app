import React from 'react'
import styled from "styled-components";


const Product = styled.div`
display: flex;
justify-content: space-between;
position: relative;
`;

const ProductDetail = styled.div`
flex: 2;
display: flex;
`;

const Image = styled.img`
width: 200px;
`;

const Details = styled.div`
padding: 10px;
display: flex;
flex-direction: column;
justify-content: space-around;
`;

const ProductQuantity = styled.span``;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductSize = styled.span``;

const ProductStatus = styled.div`
position: absolute;
top: 5px;
right: 5px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const BuyNowButton = styled.button`
cursor: pointer;
margin-bottom: 10px;
border: none;
background-color: black;
color: white;
border-radius: 10px;
padding: 5px;
`;

const DeleteButton = styled.button`
cursor: pointer;
border: none;
background-color: red;
color: white;
padding: 5px;
border-radius: 10px;
`;


const Order = (props) => {
    //     let [orders, setOrders] = useState([]);

    //     //get context
    //     let userContext = useContext(UserContext)

    //     //loadFataFromDatabase and fetch data from orders array
    //     let loadDataFromDatabase = useCallback(async () => {
    //         let ordersResponse =

    //             await fetch(`http://localhost:5000/orders?userid=${userContext.user.currentUserId}`,
    //                 { method: "GET" }
    //             );
    //         if (ordersResponse.ok) {
    //             let ordersResponseBody = await ordersResponse.json();

    //             //get products data
    //             let productsResponse = await ProductsService.fetchProducts();
    //             if (productsResponse.ok) {
    //                 let productsResponseBody = await productsResponse.json();
    //                 //read orders data
    //                 ordersResponseBody.forEach((order) => {
    //                     order.product = ProductsService.getProductsByProductId(productsResponseBody, order.productId);
    //                 });
    //                 console.log(ordersResponseBody);
    //                 setOrders(ordersResponseBody);
    //             }
    //         }
    //     }, [userContext.user.currentUserId]);

    return (
        <Product>
            <ProductDetail>
                <Image src={props.image} />
                <Details>
                    <ProductName>
                        <b>Product: {props.productName}</b>
                    </ProductName>
                    <ProductId>
                        <b>ID:</b> {props.productId}
                    </ProductId>
                    <ProductQuantity>
                        <b>Quantity:</b> {props.quantity}
                    </ProductQuantity>
                    <ProductSize>
                        <b>Price: </b> ${props.price}
                    </ProductSize>
                </Details>
            </ProductDetail>
            {props.isPaymentCompleted === false ?
                (<ProductStatus>
                    <BuyNowButton onClick={() => {
                        props.onBuyNowClick(props.orderId, props.userId, props.productId, props.quantity)
                    }} >
                        Buy Now
                    </BuyNowButton>
                    <DeleteButton onClick={() => {
                        props.onDeleteClick(props.orderId);
                    }} >
                        <i className="fa fa-trash-o"></i>
                    </DeleteButton>
                </ProductStatus>) : ('')
            }
        </Product >


    )
}

export default React.memo(Order)
