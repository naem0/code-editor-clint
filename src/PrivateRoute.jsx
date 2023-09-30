import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const PrivateRoute = ({ children }) => {
    const {loading, user}= useContext(AuthContext);
    console.log(loading, user)
    if (loading) {
        return <h1>loading....</h1>
    }
    if (user) {
        return children
    }
    if (!user) {
        return <Navigate to={'/loging'}></Navigate>
    }
};

export default PrivateRoute;