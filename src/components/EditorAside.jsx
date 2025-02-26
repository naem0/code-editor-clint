import toast from "react-hot-toast";
import Client from '../components/Client';
import logo from "../assets/logo-3.svg";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import photo from "../assets/user1.png"
import { FaCopy } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import logoMobile from "../assets/logo-1.svg";


const EditorAside = ({ clients, roomId }) => {
    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID has been copied to your clipboard');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.error(err);
        }
    }

    return (
        <aside className="aside">
            <div className="mobile-aside">
                <div className="asideInner">
                    <div className="logo ">
                        <Link to={"/"}>
                            <img
                                className="logoImage"
                                src={logoMobile}
                                alt="logo"
                            />
                        </Link>
                    </div>
                    {/* <h3 className='connected'><FaUser /></h3> */}
                    <div className="clientsList">
                        {
                            clients?.map((client, index) => (
                                <div key={index} className="client">
                                    <div className="client-img-continar">
                                        <img className="client-img" src={client?.photoURL || photo} alt={client?.username} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <button className="btn copyBtn" onClick={copyRoomId}>
                    <FaCopy />
                </button>
                <Link className="btn leaveBtn" to={"/"}>
                    <TbLogout2 />
                </Link>
            </div>

            <div className="desktop-aside">
                <div className="asideInner">
                    <div className="logo ">
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
                            clients?.map((client) => (
                                <Client
                                    key={client.socketId}
                                    client={client}
                                />
                            ))
                        }
                    </div>
                </div>
                <button className="btn copyBtn" onClick={copyRoomId}>
                    <FaCopy />  Copy ROOM ID
                </button>
                <Link className="btn leaveBtn" to={"/"}>
                    <TbLogout2 /> Leave
                </Link>
            </div>
        </aside>
    );
}
EditorAside.propTypes = {
    clients: PropTypes.arrayOf(
        PropTypes.shape({
            socketId: PropTypes.string.isRequired,
        })
    ).isRequired,
    roomId: PropTypes.string.isRequired,
};

export default EditorAside
