import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import MyRoom from "./MyRoom";
import photo from "../../public/user1.png"
import { FaSignOutAlt } from "react-icons/fa";

const HomeAsid = () => {
    const { user } = useContext(AuthContext);
    const [datas, setDatas] = useState([]);
    const { email, photoURL, displayName } = user;

    // Function to fetch my rooms
    const fetchMyRooms = () => {
        fetch(`http://localhost:3000/myrooms/${email}`)
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
            });
    };

    // useEffect to fetch my rooms initially
    useEffect(() => {
        fetchMyRooms();
    }, []);

    // Function to delete a member from a room
    const handleDeleteMember = async (roomId, email) => {
        try {
            const response = await fetch(`http://localhost:3000/room/${roomId}/member/${email}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                // Member deletion was successful, so fetch the rooms again
                fetchMyRooms();
                console.log('Member deleted successfully');
            } else {
                console.error('Failed to delete member');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="aside home-aside-bg">
            <div className="asideInner">
                <div className="user-profile">
                    <div className="">
                        
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
