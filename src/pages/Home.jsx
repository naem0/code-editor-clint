import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo-3.svg";
import Footer from '../components/Footer';
import HomeAsid from '../components/HomeAsid';
import shortid from 'shortid';

const Home = () => {
    const navigate = useNavigate();

    const [roomId, setRoomId] = useState('');
    const createNewRoom = () => {
        setRoomId(shortid.generate());
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
                    modifi : new Date()
                })
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    // Handle the response data if needed
                    navigate(`/editor/${roomId}`);
                    toast.success('Created a new room');
                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                });
        }
    };


    const joinRoom = () => {
        if (!roomId) {
            toast.error('ROOM ID required');
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
                            If you don't have an invite then create &nbsp;
                            <Link
                                onClick={createNewRoom}
                                className="createNewBtn"
                            >
                                new room
                            </Link>
                        </span>
                        <button className="btn joinBtn" onClick={createNewRoom}>
                            Create new room
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        </div>

    );
};

export default Home;