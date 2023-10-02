import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import logo from "../assets/logo-3.svg";

const Register = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const { createUser, googleSignIn, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const photoURL = "";

    const hendelLoging = () => {

        createUser(email, password)
            .then((userCredential) => {
                updateUserProfile(username, photoURL)
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
    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
                <img
                    className="homePageLogo"
                    src={logo}
                    alt="code-flow-logo"
                />
                <h4 className="mainLabel">Please sign in to join this webinar</h4>
                <div className="inputGroup">
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="USERNAME"
                        onChange={(e) => setUsername(e.target.value)}

                    />
                    <input
                        type="email"
                        className="inputBox"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}

                    />
                    <input
                        type="password"
                        className="inputBox"
                        placeholder="PASSWORD"
                        onChange={(e) => setPassword(e.target.value)}

                    />
                    <button className="btn joinBtn" onClick={hendelLoging}>
                        Sign in
                    </button>
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
            <footer>
                <h4>
                    Built with 💛 &nbsp; by &nbsp;
                    <a href="https://github.com/codersgyan">Coder's Gyan</a>
                </h4>
            </footer>
        </div>
    );
};

export default Register;