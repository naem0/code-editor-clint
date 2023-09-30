import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";


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
                    navigate('/')
                }
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
            });
    }
    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
                <img
                    className="homePageLogo"
                    src="/code-sync.png"
                    alt="code-sync-logo"
                />
                <h4 className="mainLabel">Paste invitation ROOM ID</h4>
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
                        Join
                    </button>
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
            <footer>
                <h4>
                    Built with 💛 &nbsp; by &nbsp;
                    <a href="https://github.com/codersgyan">Coder's Gyan</a>
                </h4>
            </footer>
        </div>
    );
};

export default Loging;