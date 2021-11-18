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
justify-content: flex-end;
`;

const Logo = styled.h1`
font-weight: bold;
text-decoration: none;
margin-right: 10px;
${mobile({ fontSize: "24px" })}
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
      </Wrapper>
    </Container>
  );
};

export default Navbar;

