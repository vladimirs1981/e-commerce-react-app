import React, { useState, useEffect, useContext } from 'react'
import styled from "styled-components";
import { UserContext } from './context/UserContext'
import { mobile } from "./responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 40%;
padding: 20px;background-color: white;
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
  min-width: 10%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Error = styled.span`
color: red;
font-size: 12px
`
const Register = (props) => {

    let [state, setState] = useState({
        name: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })


    let [errors, setErrors] = useState({
        name: [],
        lastName: [],
        username: [],
        email: [],
        password: [],
        confirmPassword: [],
    })

    let [dirty, setDirty] = useState({
        name: false,
        lastName: false,
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
    })

    let [message, setMessage] = useState("");

    let userContext = useContext(UserContext)

    //validate
    let validate = () => {
        let errorsData = {};

        //email
        errorsData.email = [];

        //email can't blank
        if (!state.email) {
            errorsData.email.push("Email can't be blank")
        }
        //email regex
        const validEmailRegex = /^\S+@\S+\.\S+$/;
        if (state.email) {
            if (!validEmailRegex.test(state.email)) {
                errorsData.email.push("Invalid email")
            }
        };

        //password
        errorsData.password = [];

        //password can't blank
        if (!state.password) {
            errorsData.password.push("Password can't be blank")
        };
        //password regex
        const validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,15}$/;
        if (state.password) {
            if (!validPasswordRegex.test(state.password)) {
                errorsData.password.push("Password should be at least 6 to 15 characters long, one uppercase, one lowercase, one digit")
            }
        };

        //name
        errorsData.name = [];

        //name can't blank
        if (!state.name) {
            errorsData.name.push("Name can't be blank")
        };

        //last Name
        errorsData.lastName = [];

        //last Name can't blank
        if (!state.lastName) {
            errorsData.lastName.push("Last Name can't be blank")
        };

        //username
        errorsData.username = [];

        //username can't blank
        if (!state.username) {
            errorsData.username.push("Username can't be blank")
        };

        //confirm password
        errorsData.confirmPassword = [];

        //password can't blank
        if (!state.password) {
            errorsData.confirmPassword.push("Enter matching password")
        };

        if (state.password !== state.confirmPassword) {
            errorsData.confirmPassword.push("Password not matching")
        };

        setErrors(errorsData)
    };

    useEffect(validate, [state]);


    useEffect(() => {
        document.title = "Register - eCommerce"
    }, []);

    //register button click
    let onRegisterClick = async (e) => {
        e.preventDefault()

        let dirtyData = dirty;
        Object.keys(dirty).forEach((control) => {
            dirtyData[control] = true;
        })
        setDirty(dirtyData);

        validate();

        if (isValid()) {

            let response = await fetch("http://localhost:5000/users", {
                method: "POST",
                body: JSON.stringify({
                    name: state.name,
                    lastName: state.lastName,
                    username: state.username,
                    email: state.email,
                    password: state.password,

                }),
                headers: {
                    "Content-type": "application/json",
                },
            });
            if (response.ok) {
                let responseBody = await response.json();
                //set context
                userContext.setUser({
                    ...userContext.user,
                    isLoggedIn: true,
                    currentUserName: responseBody.name,
                    currentUserId: responseBody.id,
                });
                setMessage(<span>Successfully Registered</span>);
                props.history.replace("/cart");
            } else {
                setMessage(<span>Error in DB connection</span>);
            }
        } else {
            setMessage(<span>Something Went Wrong</span>);
        }
    }

    let isValid = () => {
        let valid = true;

        //check all form filelds
        for (const control in errors) {
            if (errors[control].length > 0) {
                valid = false;
            }
        }
        return valid;
    }

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder="name"
                        value={state.name}
                        name="name"
                        onChange={(e) => {
                            setState({ ...state, [e.target.name]: e.target.value })
                        }}
                        onBlur={(e) => {
                            setDirty({ ...dirty, [e.target.name]: true });
                            validate();
                        }}
                    />
                    <Error>{dirty["name"] && errors["name"][0] ? errors["name"] : ""}</Error>
                    <Input placeholder="last name" value={state.lastName}
                        name="lastName"
                        onChange={(e) => {
                            setState({ ...state, [e.target.name]: e.target.value })
                        }}
                        onBlur={(e) => {
                            setDirty({ ...dirty, [e.target.name]: true });
                            validate();
                        }} />
                    <Error>{dirty["lastName"] && errors["lastName"][0] ? errors["lastName"] : ""}</Error>
                    <Input placeholder="username" value={state.username}
                        name="username"
                        onChange={(e) => {
                            setState({ ...state, [e.target.name]: e.target.value })
                        }}
                        onBlur={(e) => {
                            setDirty({ ...dirty, [e.target.name]: true });
                            validate();
                        }} />
                    <Error>{dirty["username"] && errors["username"][0] ? errors["username"] : ""}</Error>

                    <Input placeholder="email" value={state.email}
                        name="email"
                        onChange={(e) => {
                            setState({ ...state, [e.target.name]: e.target.value })
                        }}
                        onBlur={(e) => {
                            setDirty({ ...dirty, [e.target.name]: true });
                            validate();
                        }} />
                    <Error>{dirty["email"] && errors["email"][0] ? errors["email"] : ""}</Error>

                    <Input placeholder="password" value={state.password}
                        name="password"
                        type="password"
                        onChange={(e) => {
                            setState({ ...state, [e.target.name]: e.target.value })
                        }}
                        onBlur={(e) => {
                            setDirty({ ...dirty, [e.target.name]: true });
                            validate();
                        }} />
                    <Error>{dirty["password"] && errors["password"][0] ? errors["password"] : ""}</Error>

                    <Input placeholder="confirm password" value={state.confirmPassword}
                        name="confirmPassword"
                        type="password"
                        onChange={(e) => {
                            setState({ ...state, [e.target.name]: e.target.value })
                        }}
                        onBlur={(e) => {
                            setDirty({ ...dirty, [e.target.name]: true });
                            validate();
                        }} />
                    <Error>{dirty["confirmPassword"] && errors["confirmPassword"][0] ? errors["confirmPassword"] : ""}</Error>
                    <Agreement>
                        By creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button
                        onClick={onRegisterClick}
                    >CREATE</Button>
                    <Error>{message}</Error>
                </Form>
            </Wrapper>
        </Container >
    );
};

export default Register;

