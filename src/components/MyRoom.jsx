import { Link } from "react-router-dom";
import photo from "../assets/10782405.png";
import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { FaTrashAlt } from "react-icons/fa";

const MyRoom = ({ room, handleDeleteMember }) => {
    const { user } = useContext(AuthContext)
    const { time, roomId, roomName, created, modifi } = room;
    const [modifiTime, setModifiTime] = useState(moment(modifi).fromNow());

    useEffect(() => {
        // Create an interval to update the modifiTime every one second
        const intervalId = setInterval(() => {
            setModifiTime(moment(modifi).fromNow());
        }, 60000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [modifi]);

    return (
        <div className="my-room flex">
            <Link to={`/editor/${roomId}`} className="client">
                <div className="client-img-continar">
                    <img className="my-room-img" src={photo} alt="" />
                </div>
                <div className="client-text-continar">
                    <h5 className="userName">
                        <span >{roomName ? roomName : moment(created).format('lll')}</span>
                    </h5>
                    <p className="client-email">Last Update: {modifiTime}</p>
                </div>
            </Link>
            <div>
                <button 
                    className="btn delet-btn"
                    onClick={() => handleDeleteMember(roomId, user.email)}
                >
                    <FaTrashAlt/>
                </button>
            </div>
        </div>
    );
};

export default MyRoom;