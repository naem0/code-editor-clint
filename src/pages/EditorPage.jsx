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
import EditorAside from '../components/EditorAside';

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

    console.log(clients);
    

    return (
        <div className="mainWrap">
            <EditorAside clients={clients} roomId={roomId}/>
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