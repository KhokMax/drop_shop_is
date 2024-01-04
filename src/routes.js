import { ACCOUNT_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, NEWPRODUCT_ROUTE, MAKEORDER_ROUTE } from "./utils/consts";
import Login from  './components/Login'
import MainPage from  './components/MainPage'
import Account from  './components/Account'
import NewProduct from "./components/NewProduct";
import MakeOrder from "./components/MakeOrder";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    },

    {
        path: MAIN_ROUTE,
        Component: MainPage
    },

]

export const privateRoutes = [
    {
        path: ACCOUNT_ROUTE,
        Component: Account
    },

    {
        path: MAIN_ROUTE,
        Component: MainPage
    },

    {
        path: NEWPRODUCT_ROUTE,
        Component: NewProduct
    },

    {
        path: MAKEORDER_ROUTE,
        Component: MakeOrder
    },
]