import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import logo from "../assets/logo-3.svg";
import googleImg from "../assets/google.png"
import Footer from '../components/Footer';

const Register = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUsername] = useState('');
    const { createUser, googleSignIn, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const photoURL = "";

    const hendelSining = () => {
        if (!password || !email || !userName) {
            toast.error('Name & Email & Password is required');
            return;
        }
        createUser(email, password)
            .then((userCredential) => {
                updateUserProfile(userName, photoURL)
                    .then((updatUserCredential) => {
                        // Signed in 
                        toast.success('Registration Successful');
                        navigate('/')
                        console.log(updatUserCredential)

                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        toast.error(errorMessage)
                        console.log(error)
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage)
                console.log(error)
            });
    }
    const hendelGoogleLogin = () => {
        googleSignIn()
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                if (user) {
                    toast.success('Loging Successful')
                    navigate('/')
                }
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage)
                console.log(error)
            });
    }
    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
                <div className="flex">
                    <img
                        className="homePageLogo"
                        src={logo}
                        alt="code-flow-logo"
                    />
                    <h2>Sign-in</h2>
                </div>
                <h4 className="mainLabel">Please sign in to join this webinar</h4>
                <div className="inputGroup">
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="USERNAME"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        className="inputBox"
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="inputBox"
                        placeholder="PASSWORD"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="btn joinBtn" onClick={hendelSining}>
                        Sign in
                    </button>
                    <p className="or">____________________ <span> or </span> ____________________</p>
                    <Link className="google-login" ><img onClick={hendelGoogleLogin} src={googleImg} alt="" /></Link>

                    <span className="createInfo">
                        If you have an acount then please &nbsp;
                        <Link
                            to={"/loging"}
                            href=""
                            className="createNewBtn"
                        >
                            loging
                        </Link>
                    </span>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Register;