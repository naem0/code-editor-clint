import photo from "../assets/user1.png"


const Client = ({ client }) => {
    console.log(client)
    
    const { username, email, photoURL, time } = client;
    return (
        <div className="client">
            <div className="client-img-continar">
                <img className="client-img" src={photoURL ? photoURL : photo} alt="" />
            </div>
            <div className="client-text-continar">
                <div className="flex">
                    <h4 className="userName"><span >{username ? username : "Unknown user"}</span></h4>
                </div>
                <p className="client-email">{email ? email : ''}</p>
            </div>

        </div>
    );
};

export default Client;