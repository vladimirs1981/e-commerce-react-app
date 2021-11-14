import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from './context/UserContext';
import styled from "styled-components";
import { mobile } from "./responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1592578629295-73a151d69c96?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
  font-size: 12px;
`;

const Login = (props) => {
  var [email, setEmail] = useState('scott@test.com');
  var [password, setPassword] = useState('Scott123');
  let userContext = useContext(UserContext);

  let [dirty, setDirty] = useState({
    email: false,
    password: false,
  });

  let [errors, setErrors] = useState({
    email: [],
    password: [],
  });

  let [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    document.title = "Login - eCommerce"
  }, []);

  //validate email and password
  let validate = () => {
    let errorsData = {};

    //email
    errorsData.email = [];

    //email can't blank
    if (!email) {
      errorsData.email.push("Email can't be blank")
    }
    //email regex
    const validEmailRegex = /^\S+@\S+\.\S+$/;
    if (email) {
      if (!validEmailRegex.test(email)) {
        errorsData.email.push("Invalid email");
      }
    }

    //password
    errorsData.password = [];

    //password can't blank
    if (!password) {
      errorsData.password.push("Password can't be blank")
    }
    //password regex
    const validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,15}$/;
    if (password) {
      if (!validPasswordRegex.test(password)) {
        errorsData.password.push("Password should be at least 6 to 15 characters long, one uppercase, one lowercase, one digit")
      }
    }
    setErrors(errorsData);
  }

  useEffect(validate, [email, password]);

  //login button click
  let onLoginClick = async (e) => {
    e.preventDefault();
    //set all messages
    let dirtyData = dirty;
    Object.keys(dirty).forEach((control) => {
      dirtyData[control] = true;
    });
    setDirty(dirtyData);

    //call validate
    validate();

    if (isValid()) {
      let response = await fetch(`http://localhost:5000/users?email=${email}&password=${password}`,
        { method: "GET" }
      );
      if (response.ok) {
        let responseBody = await response.json();
        if (responseBody.length > 0) {
          //redirect to cart page

          props.history.replace("/store");
          //set context
          userContext.setUser({
            ...userContext.user,
            isLoggedIn: true,
            currentUserName: responseBody[0].name,
            currentUserId: responseBody[0].id,
          });
        } else {
          setLoginMessage(<Error>Invalid Login, please try again</Error>
          );
        }
      } else {
        setLoginMessage(<Error>Unable to connect to DB server</Error>);
      }
    }
  };

  let isValid = () => {
    let valid = true;

    //reading all inputs for errors
    for (let control in errors) {
      if (errors[control].length > 0) {
        valid = false;
      }
    }
    return valid;
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value); }}
            onBlur={() => {
              setDirty({ ...dirty, email: true });
              validate();
            }} />
          <Error>{dirty['email'] && errors['email'][0] ? errors['email'] : ''}</Error>
          <Input placeholder="password"
            value={password}
            type='password'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onBlur={() => {
              setDirty({ ...dirty, password: true });
              validate();
            }}
          />
          <Error>{dirty['password'] && errors['password'][0] ? errors['password'] : ''}</Error>
          <Button onClick={onLoginClick} >LOGIN</Button>
          <Error>{loginMessage}</Error>
          <Link>FORGOT PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;


