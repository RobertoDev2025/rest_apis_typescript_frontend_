import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import Products, {loader as productsLoader, action as updateAvailabilityAction} from './views/Products'
import NewProduct,{action as newProductAction} from './views/NewProduct'
import EditProduct, {loader as editProductLoader, action as editProductAction} from './views/EditProduct'
import { action as deleteProductAction } from './components/ProductDetail'

export const router = createBrowserRouter([
    {
        ////Múltiples rutas
        path: '/',
        element:<Layout/>,
        children:[
            {
                index:true,
                element: <Products/>,
                loader:productsLoader,
                action: updateAvailabilityAction
            },
            {
                path: 'productos/nuevo',
                element:<NewProduct/>,
                action: newProductAction
            },
            {
                path:'productos/:id/editar', //ROA Pattern - Resource - Oriented design
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path:'productos/:id/eliminar', //ROA Pattern - Resource - Oriented design
                action: deleteProductAction

            }
        ]
    }
])