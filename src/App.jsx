import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'
import NoMatchPage from './NoMatchPage'
import Cart from './Cart'
import { HashRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import Navbar from './components/Navbar'
import { UserContext } from './context/UserContext'
import Store from './Store'
import Product from './Product'


const App = () => {

    let [user, setUser] = useState({
        isLoggedIn: false,
        currentUserId: null,
        currentUserName: null,
    });

    return (
        <UserContext.Provider value={{ user, setUser }} >
            <HashRouter>
                <Navbar />
                <Switch>
                    <Route path="/" exact={true} component={Login} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/register" component={Register} />
                    <Route path="/store" component={Store} />
                    <Route path="/product/:id" component={Product} />
                    <Route path="*" component={NoMatchPage} />
                </Switch>
            </HashRouter>
        </UserContext.Provider>
    );
}

export default App
