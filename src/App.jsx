import NoMatchPage from './NoMatchPage'
import Cart from './Cart'
import { HashRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import Navbar from './components/Navbar'
import { UserContext } from './context/UserContext'
import Store from './Store'
import Product from './Product'


const App = () => {

    // let [user, setUser] = useState({
    //     isLoggedIn: false,
    //     currentUserId: null,
    //     currentUserName: null,
    // });

    //value={{ user, setUser }}

    return (
        <UserContext.Provider  >
            <HashRouter>
                <Navbar />
                <Switch>
                    <Route path="/cart" component={Cart} />
                    <Route path="/" component={Store} />
                    <Route path="/product/:id" component={Product} />
                    <Route path="*" component={NoMatchPage} />
                </Switch>
            </HashRouter>
        </UserContext.Provider>
    );
}

export default App
