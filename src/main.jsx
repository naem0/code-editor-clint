
import ReactDOM from 'react-dom/client'
import './index.css'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PrivateRoute from './PrivateRoute.jsx';
import Home from './pages/Home.jsx';
import Loging from './pages/Loging.jsx';
import Register from './pages/Register.jsx';
import EditorPage from './pages/EditorPage.jsx';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './AuthProvider';


const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><Home /></PrivateRoute>,
    errorElement: <h1>Error</h1>,
  },
  {
    path: "/loging",
    element: <Loging />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/editor/:roomId",
    element: <PrivateRoute><EditorPage /></PrivateRoute>,
    loader: ({ params }) => fetch(`http://localhost:3000/room/${params.roomId}`)
  }

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  
    <AuthProvider>
      <>
        <div>
          <Toaster
            position="top-right"
            toastOptions={{
              success: {
                theme: {
                  primary: '#4aed88',
                },
              },
            }}
          ></Toaster>
        </div>
        <RouterProvider router={router} />
      </>
    </AuthProvider>
  ,
)
