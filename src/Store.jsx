import React, { useEffect, useState } from 'react'
import { BrandsService, CategoriesService } from "./Service";

import { Search } from "@material-ui/icons";


import styled from "styled-components";

import Product from './components/Product';
import CartProduct from './components/CartProduct'

import data from './data/ecommerce-db.json'
import { mobile } from "./responsive";




const PAGE_PRODUCTS = 'products';
const PAGE_CART = 'cart';

const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');

const Container = styled.div`
display: flex;
${mobile({ flexDirection: "column", })}
`;

const Right = styled.div`
display: flex;
flex-direction: column;
flex: 3;
`;

const FilterContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
flex: 1;
`;

const Filter = styled.div`
margin: 20px;
${mobile({ margin: "5px", width: "100%" })}
`;

const FilterText = styled.span`
font-size: 20px;
font-weight: 600;
margin-right: 20px;
${mobile({ marginRight: "5px", fontSize: "15px" })}

`;

const Select = styled.ul`
padding: 10px;
margin-right: 20px;
list-style: none;
${mobile({ marginRight: "5px", padding: "10px" })}
`;

const Option = styled.li`
margin-bottom: 10px;
border-bottom: 1px solid grey;
padding: 3px;
${mobile({ marginRight: "5px", padding: "1px" })}
`;

const FormDiv = styled.div``;

const Checkbox = styled.input`
margin-right: 10px;
`;

const CheckboxLabel = styled.label`
font-size: 18px;
${mobile({ fontSize: "15px" })}
`;

const ProductsDiv = styled.div`
padding: 20px;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`;

const SearchContainer = styled.div`
height: 30px;
border: 0.5px solid lightgray;
display: flex;
align-items: center;
margin-bottom: 15px;
padding: 5px;
`;

const Input = styled.input`
border: none;
outline: none;
width: 100%;
`;

const CartButtonDiv = styled.div`
align-self: flex-end;
margin-right: 25px;

`;

const CartButton = styled.button`
border: none;
padding: 10px;
border-radius: 8px;
cursor: pointer;
background: #a9b4eb;
color: white;
font-weight: 700;
&:hover {
    background: #5b6fd4;
}
`;

//////////// CART //////////////
const Wrapper = styled.div`
  padding: 20px;
  width: 100%;
  height: 100%; 
  display: flex;
  flex-direction: column;
  ${mobile({ padding: "10px", height: "100%" })}
`;

const CartDiv = styled.div`
  ${mobile({ width: "100%" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: 2px solid black;
  background-color: transparent;
  color: black;
`;

const TopText = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 20px;
`;

const Total = styled.h1`
font-weight: 300;
text-align: center;
margin-left: 30px;
`;

const ClearCartButton = styled.button`
padding: 10px;
font-weight: 600;
cursor: pointer;
background: red;
margin-left: 30px;
`;

const TextDiv = styled.div``;


const Store = () => {
    //state
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [productsToShow, setProductsToShow] = useState([]);
    const [search, setSearch] = useState('');
    const [cart, setCart] = useState(cartFromLocalStorage);
    const [page, setPage] = useState(PAGE_PRODUCTS);

    useEffect(() => {

        localStorage.setItem('cart', JSON.stringify(cart));

        const brandsArray = data.brands;

        brandsArray.forEach((brand) => {
            brand.isChecked = true;
        });
        setBrands(brandsArray);

        const categoriesArray = data.categories;

        categories.forEach((category) => {
            category.isChecked = true;
        });
        setCategories(categoriesArray);

        const productsArray = data.products;

        const newList = productsArray.filter((prod) =>
            prod.productName.toLowerCase().includes(search.toLowerCase())
        );

        newList.forEach((product) => {
            product.brand = BrandsService.getBrandByBrandId(
                brandsArray,
                product.brandId
            );
            product.category = CategoriesService.getCategoryByCategoryId(
                categoriesArray,
                product.categoryId
            );

            product.isOrdered = false;
        });

        setProducts(newList);
        setProductsToShow(newList);

        document.title = "Store - eCommerce";

    }, [search, cart])

    //updateBrandIsChecked
    let updateBrandIsChecked = (id) => {
        let brandsData = brands.map((brd) => {
            if (brd.id === id) brd.isChecked = !brd.isChecked;
            return brd;
        });

        setBrands(brandsData);
        updateProductsToShow();
    };

    //updateCategoryIsChecked
    let updateCategoryIsChecked = (id) => {
        let categoryData = categories.map((cat) => {
            if (cat.id === id) cat.isChecked = !cat.isChecked;
            return cat;
        });

        setCategories(categoryData);
        updateProductsToShow();
    };

    //update products to show
    let updateProductsToShow = () => {
        setProductsToShow(products.filter((prod) => {
            return categories.filter(
                (category) =>
                    category.id === prod.categoryId && category.isChecked
            ).length > 0
        })
            .filter(prod => {
                return brands.filter(
                    (brand) => brand.id === prod.brandId && brand.isChecked
                ).length > 0
            })
        )
    }
    //When the user clicks on Add to Cart function
    const onAddToCartClick = (product) => {
        let newCart = [...cart];
        let itemInCart = newCart.find(
            (item) => product.productName === item.productName
        );

        if (itemInCart) {
            itemInCart.quantity++;
        } else {
            itemInCart = {
                ...product,
                quantity: 1,
            }
            newCart.push(itemInCart);
        }
        setCart(newCart);
    };

    const removeFromCart = (productToRemove) => {
        setCart(
            cart.filter((product) => product !== productToRemove)
        );
    };

    const clearCart = () => {
        setCart([]);
    }

    const navigateTo = (nextPage) => {
        setPage(nextPage);
    }

    const getTotalSum = () => {
        return cart.reduce((sum, { price, quantity }) => sum + price * quantity, 0);
    }

    const getCartTotal = () => {
        return cart.reduce(
            (sum, { quantity }) => sum + quantity, 0
        ) + '';
    };

    const setQuantity = (product, amount) => {
        const newCart = [...cart];
        newCart.find(
            (item) => item.productName === product.productName
        ).quantity = amount;
        setCart(newCart);
    };

    const renderProducts = () => (
        <>
            <FilterContainer>
                <Filter>
                    <SearchContainer>
                        <Input placeholder="Search" type="search" value={search}
                            autoFocus="autoFocus"
                            onChange={(e) => {
                                setSearch(e.target.value)
                            }}
                        />
                        <Search style={{ color: "gray", fontSize: 16 }} />
                    </SearchContainer>
                    <FilterText>Brands: </FilterText>
                    <Select>
                        {brands.map((brand) => (
                            <Option key={brand.id}>
                                <FormDiv>
                                    <Checkbox type="checkbox" value="true"
                                        checked={brand.isChecked}
                                        id={`brand${brand.id}`}
                                        onChange={() => {
                                            updateBrandIsChecked(brand.id);
                                        }} />
                                    <CheckboxLabel
                                        htmlFor={`brand${brand.id}`}>{brand.brandName}</CheckboxLabel>
                                </FormDiv>
                            </Option>
                        ))}
                    </Select>
                    <FilterText>Categories: </FilterText>
                    <Select>
                        {categories.map((category) => (
                            <Option key={category.id}>
                                <FormDiv>
                                    <Checkbox type="checkbox" value="true"
                                        checked={category.isChecked}
                                        id={`category${category.id}`}
                                        onChange={() => {
                                            updateCategoryIsChecked(category.id);
                                        }} />
                                    <CheckboxLabel
                                        htmlFor={`category${category.id}`}> {category.categoryName}
                                    </CheckboxLabel>
                                </FormDiv>
                            </Option>
                        ))}
                    </Select>
                </Filter>
            </FilterContainer>
            <Right>
                <CartButtonDiv>
                    <CartButton onClick={() => navigateTo(PAGE_CART)} >Go To Cart ({getCartTotal()})</CartButton>
                </CartButtonDiv>
                <ProductsDiv>

                    {productsToShow.map((prod) => (
                        <Product key={prod.id} product={prod}
                            onAddToCartClick={onAddToCartClick}
                        />
                    ))}
                </ProductsDiv>
            </Right>
        </>
    );

    const renderCart = () => (
        <>
            <Wrapper>
                <TextDiv>
                    <Title>YOUR CART
                    </Title>
                    <Top>
                        <TopButton onClick={() => navigateTo(PAGE_PRODUCTS)}>CONTINUE SHOPPING</TopButton>
                        {cart.length > 0 && (<ClearCartButton onClick={clearCart} >Clear Cart</ClearCartButton>)}
                    </Top>
                    <TopText>
                        <Title>Cart{""}: ({getCartTotal()})</Title>
                        <Total>Total: ${getTotalSum()}</Total>
                    </TopText>
                </TextDiv>
                <CartDiv>
                    {cart.map((prod) => (
                        <CartProduct key={prod.id} product={prod}
                            removeFromCart={removeFromCart}
                            setQuantity={setQuantity} />
                    ))}

                </CartDiv>
            </Wrapper>
        </>
    );

    return (
        <Container>
            {page === PAGE_PRODUCTS && renderProducts()}
            {page === PAGE_CART && renderCart()}
        </Container >)
};

export default Store;








