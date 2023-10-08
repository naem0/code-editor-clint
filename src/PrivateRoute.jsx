import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import Loading from './components/loading';

const PrivateRoute = ({ children }) => {
    const {loading, user}= useContext(AuthContext);
    console.log(loading, user)
    if (loading) {
        return <Loading/>
    }
    if (user) {
        return children
    }
    if (!user) {
        return <Navigate to={'/loging'}></Navigate>
    }
};

export default PrivateRoute;