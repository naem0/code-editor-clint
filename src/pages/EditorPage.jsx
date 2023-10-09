import { useState, useRef, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
// import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import {
    useNavigate,
    useParams,
    useLoaderData,
    Link,
} from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import Client from '../components/Client';
import logo from "../assets/logo-3.svg";

const EditorPage = () => {
    const socketRef = useRef(null);
    const codeRef = useRef(null);
    const { roomId } = useParams();
    const reactNavigator = useNavigate();
    const [clients, setClients] = useState([]);
    const { user } = useContext(AuthContext);
    const { email, displayName, photoURL } = user
    const data = useLoaderData()

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(e) {
                console.log('socket error', e);
                toast.error('Socket connection failed, try again later.');
                reactNavigator('/');
            }

            socketRef.current.emit("JOIN", {
                roomId,
                username: displayName,
                email,
                photoURL

            });

            // Listening for joined event
            socketRef.current.on(
                'JOINED',
                ({ clients, username, socketId }) => {
                    if (username !== displayName) {
                        toast.success(`${username} joined the room.`);
                        console.log(`${username} joined`);
                    }
                    setClients(clients);
                    console.log(clients)
                    socketRef.current.emit("SYNC_CODE", {
                        code: codeRef.current,
                        socketId,
                        roomId
                    });
                }
            );

            // Listening for disconnected
            socketRef.current.on(
                "DISCONNECTED",
                ({ socketId, username }) => {
                    toast.success(`${username} left the room.`);
                    setClients((prev) => {
                        return prev.filter(
                            (client) => client.socketId !== socketId
                        );
                    });
                }
            );
        };
        init();
        return () => {
            socketRef.current.disconnect();
            socketRef.current.off("JOINED");
            socketRef.current.off("DISCONNECTED");
        };
    }, []);

    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID has been copied to your clipboard');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.error(err);
        }
    }

    function leaveRoom() {
        reactNavigator('/');
    }



    return (
        <div className="mainWrap">
            <div className="aside">
                <div className="asideInner">
                    <div className="logo">
                        <Link to={"/"}>
                            <img
                                className="logoImage"
                                src={logo}
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <h3 className='connected'>Connected</h3>
                    <div className="clientsList">
                        {
                            clients &&
                            clients.map((client) => (
                                <Client
                                    key={client.socketId}
                                    client={client}
                                />
                            ))
                        }

                    </div>
                </div>
                <button className="btn copyBtn" onClick={copyRoomId}>
                    Copy ROOM ID
                </button>
                <button className="btn leaveBtn" onClick={leaveRoom}>
                    Leave
                </button>
            </div>
            <div className="editorWrap">
                <Editor
                    socketRef={socketRef}
                    roomId={roomId}
                    data={data}
                    onCodeChange={(code) => {
                        codeRef.current = code;
                    }}
                />
            </div>
        </div>
    );
};

export default EditorPage;