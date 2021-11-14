import React, { useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
font-size: 40px;
color: red;
`;

const NoMatchPage = () => {

    useEffect(() => {
        document.title = "Page Not Found - eCommerce"
    }, []);
    return (
        <Container>
            Page Not Found
        </Container>
    )
};

export default NoMatchPage
