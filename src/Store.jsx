import React, { useContext, useEffect, useState } from 'react'
import styled from "styled-components";
import { UserContext } from './context/UserContext';
import { BrandsService, CategoriesService } from "./Service";
import Product from './components/Product';
import { Search } from "@material-ui/icons";
import data from './data/ecommerce-db.json'
import { mobile } from "./responsive";

const Container = styled.div`
display: flex;
${mobile({ flexDirection: "column" })}
`;


const Right = styled.div`
display: flex;
flex: 3;
`;


const FilterContainer = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
justify-content: flex-start;
flex: 1;
${mobile({})}
`;

const Filter = styled.div`
margin: 20px;
${mobile({ margin: "5px", width: "140px", })}

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





const Store = () => {
    //state
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [productsToShow, setProductsToShow] = useState([]);
    const [search, setSearch] = useState('');

    //get user context
    const userContext = useContext(UserContext);

    useEffect(() => {


        const brandsArray = data.brands;

        brandsArray.forEach((brand) => {
            brand.isChecked = true;
        })
        setBrands(brandsArray);

        const categoriesArray = data.categories;

        categories.forEach((category) => {
            category.isChecked = true;
        })
        setCategories(categoriesArray);

        const productsArray = data.products;

        const newList = productsArray.filter((prod) =>
            prod.productName.toLowerCase().includes(search.toLowerCase())
        )

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

    }, [search])

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
    let onAddToCartClick = (prod) => {

        let newOrder = {
            //userId: userContext.user.currentUserId,
            productId: prod.id,
            quantity: 1,
            isPaymentCompleted: false,
        };

        //     let orderResponse = await fetch(`http://localhost:5000/orders`, {
        //         method: "POST",
        //         body: JSON.stringify(newOrder),
        //         headers: { "Content-Type": "application/json" },
        //     });

        localStorage.setItem('order', JSON.stringify(newOrder));
        let prods = products.map((p) => {
            if (p.id === prod.id) p.isOrdered = true;
            return p;

        });
        // console.log(order);
        setProducts(prods);
        updateProductsToShow();

    };
    return (
        <Container>
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
                <ProductsDiv>
                    {productsToShow.map((prod) => (
                        <Product key={prod.id} product={prod}
                            onAddToCartClick={onAddToCartClick} />
                    ))}
                </ProductsDiv>
            </Right>
        </Container >)
};

export default Store;








