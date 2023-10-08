
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
import Errorpage from './pages/ErrorPage/Errorpage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><Home /></PrivateRoute>,
    errorElement: <Errorpage/>,
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
    loader: ({ params }) => fetch(`https://code-editor-server-cba3.onrender.com/room/${params.roomId}`)
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
