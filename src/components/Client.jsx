// import Avatar from 'react-avatar';
import photo from "../../public/user1.png"


const Client = ({client }) => {
    const{username, email, photoURL} = client;
    return (
        <div className="client">
            
                <div className="client-img-continar">
                    <img src= {photoURL ? photoURL : photo} alt="" />
                    {/* <Avatar name={username} size={50} round="14px" /> */}
                </div>
                <div className="client-text-continar">
                    <h4 className="userName"><span >{username ? username : "Unknown user"}</span></h4>
                    <p className="client-email">{email ? email : ''}</p>
                </div>
                <div className="">
                    <p></p>
                </div>
        </div>
    );
};

export default Client;