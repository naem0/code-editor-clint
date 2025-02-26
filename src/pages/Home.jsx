import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo-3.svg";
import Footer from '../components/Footer';
import HomeAsid from '../components/HomeAsid';
import shortid from 'shortid';

const Home = () => {
    const navigate = useNavigate();
    const id = shortid.generate();
    const [roomId, setRoomId] = useState(id);
    

    const createNewRoom = () => {
        setRoomId(id);
        if (roomId) {
            fetch('https://code-editor-server-cba3.onrender.com/room', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: "",
                    roomId: roomId,
                    created: new Date(),
                    modifi: new Date()
                })
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(() => {
                    // Handle the response data if needed
                    navigate(`/editor/${roomId}`);
                    toast.success('Created a new room');
                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                    toast.error("Server Error, Try Again");
                });
        }
    };


    const joinRoom = () => {
        if (!roomId) {
            toast.error('Please enter a room ID');
            return;
        }
        navigate(`/editor/${roomId}`);
    };

    const handleInputEnter = (e) => {
        if (e.code === 'Enter') {
            joinRoom();
        }
    };
    return (
        <div className="mainWrap-home">
            <HomeAsid></HomeAsid>
            <div className="homePageWrapper">
                <div className="formWrapper">
                    <img
                        className="homePageLogo"
                        src={logo}
                        alt="code-flow-logo"
                    />
                    <h4 className="mainLabel">Paste invitation ROOM ID</h4>
                    <div className="inputGroup">
                        <input
                            type="text"
                            className="inputBox"
                            placeholder="ROOM ID"
                            onChange={(e) => setRoomId(e.target.value)}
                            onKeyUp={handleInputEnter}
                        />
                        <button className="btn joinBtn" onClick={joinRoom}>
                            Join
                        </button>
                        <span className="createInfo">
                            If you don&apos;t have an invite then create &nbsp;
                            <Link
                                onClick={createNewRoom}
                                className="createNewBtn"
                            >
                                new room
                            </Link>
                        </span>
                    </div>
                </div>
                <Footer />
            </div>
        </div>

    );
};

export default Home;