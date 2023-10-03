import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import logo from "../assets/logo-3.svg";
import googleImg from "../assets/google.png"
import Footer from "../components/Footer";

const Loging = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { signIn, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const hendelLoging = () => {
        if (!password || !email) {
            toast.error('& Email & Password is required');
            return;
        }
        signIn(email, password)
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
                <img
                    className="homePageLogo"
                    src={logo}
                    alt="code-flow-logo"
                />
                <h4 className="mainLabel">Please login to your account</h4>
                <div className="inputGroup">
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="EMAIL"
                        onChange={(e) => setEmail(e.target.value)}

                    />
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="PASSWORD"
                        onChange={(e) => setPassword(e.target.value)}

                    />
                    <button className="btn joinBtn" onClick={hendelLoging}>
                        Loging
                    </button>

                    <p className="or">____________________ <span> or </span> ____________________</p>
                    <Link className="google-login" ><img onClick={hendelGoogleLogin} src={googleImg} alt="" /></Link>
                    <span className="createInfo">
                        If you don't have an acount then create &nbsp;
                        <Link
                            to={"/register"}
                            href=""
                            className="createNewBtn"
                        >
                            new acount
                        </Link>
                    </span>
                </div>

            </div>
            <Footer/>
        </div>
    );
};

export default Loging;