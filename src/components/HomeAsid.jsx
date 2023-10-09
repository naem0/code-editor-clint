import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import MyRoom from "./MyRoom";
import photo from "../assets/user1.png"
import { FaSignOutAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const HomeAsid = () => {
    const { user, logOut } = useContext(AuthContext);
    const [datas, setDatas] = useState([]);
    const navigate = useNavigate();
    const { email, photoURL, displayName } = user;
    const hendelLogOut =() =>{
        logOut()
        .then((user) => {
                toast.success('Logout Successful')
                // navigate("/loging")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage)
            console.log(error)
        });
    }

    // Function to fetch my rooms
    const fetchMyRooms = () => {
        fetch(`https://code-editor-server-cba3.onrender.com/myrooms/${email}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setDatas(data);
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                toast.error("Server Error, Try Again");
            });
    };

    // useEffect to fetch my rooms initially
    useEffect(() => {
        fetchMyRooms();
    }, []);

    // Function to delete a member from a room
    const handleDeleteMember = async (roomId, email) => {
        try {
            const response = await fetch(`https://code-editor-server-cba3.onrender.com/room/${roomId}/member/${email}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                // Member deletion was successful, so fetch the rooms again
                fetchMyRooms();
                toast.success('Member deleted successfully')
                console.log('Member deleted successfully');
            } else {
                console.error('Failed to delete member');
                toast.error('Failed to delete member')
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to delete member')
        }
    };

    return (
        <div className="aside home-aside-bg">
            <div className="asideInner">
                <div className="user-profile">
                    <div onClick={hendelLogOut} className="logout btn">
                        <p title="Logout"><FaSignOutAlt/></p>
                    </div>
                    <img
                        className="logoImage"
                        src={photoURL ? photoURL : photo}
                        alt="Profile photo"
                    />
                    <h3>{displayName}</h3>
                    <p>{email}</p>
                </div>
                <h3 className='connected'>My Room</h3>
                <div className="clientsList">
                    {datas &&
                        datas.map((room) => (
                            <MyRoom
                                key={room.roomId}
                                room={room}
                                handleDeleteMember={handleDeleteMember}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default HomeAsid;
