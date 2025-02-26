import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import MyRoom from "./MyRoom";
import photo from "../assets/user1.png";
import { FaSignOutAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const HomeAsid = () => {
    const { user, logOut } = useContext(AuthContext);
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(false);
    const { email, photoURL, displayName } = user;

    const handleLogOut = async () => {
        try {
            await logOut();
            toast.success('Logout Successful');
            // navigate("/login")
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };

    // Function to fetch my rooms
    const fetchMyRooms = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://code-editor-server-cba3.onrender.com/myrooms/${email}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            data.sort((a, b) => new Date(b.created) - new Date(a.created));
            setDatas(data);
        } catch (error) {
            console.error('Fetch error:', error);
            toast.error("Server Error, Try Again");
        } finally {
            setLoading(false);
        }
    };

    // useEffect to fetch my rooms initially
    useEffect(() => {
        fetchMyRooms();
    }, []);

    // Function to delete a member from a room
    const handleDeleteMember = async (roomId, email) => {
        setLoading(true);
        try {
            const response = await fetch(`https://code-editor-server-cba3.onrender.com/room/${roomId}/member/${email}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            
            if (response.ok) {
                fetchMyRooms();
                toast.success('Member deleted successfully');
            } else {
                throw new Error('Failed to delete member');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to delete member');
        } finally {
            setLoading(false);
        }
    };

    return (
        <aside className="aside home-aside-bg">
            <div className="asideInner">
                <div className="user-profile">
                    <div onClick={handleLogOut} className="logout btn">
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
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="clientsList">
                        {datas.map((room) => (
                            <MyRoom
                                key={room.roomId}
                                room={room}
                                handleDeleteMember={handleDeleteMember}
                            />
                        ))}
                    </div>
                )}
            </div>
        </aside>
    );
};

export default HomeAsid;
