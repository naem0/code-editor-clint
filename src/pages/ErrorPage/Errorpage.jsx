import { useEffect, useState } from "react";
import "./errorPage.css"
import { Link } from "react-router-dom";

const Errorpage = () => {
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    useEffect(() => {
        const handleMouseMove = (event) => {
            const pageX = window.innerWidth;
            const pageY = window.innerHeight;
            const mouseY = event.pageY;
            const mouseX = event.pageX;

            const yAxis = ((pageY / 2 - mouseY) / pageY) * 300;
            const xAxis = (-mouseX / pageX) * -200 -100;

            setMouseX(xAxis);
            setMouseY(yAxis);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
    return (
        <div className="box">
            <div className="box__ghost">
                {/* Your HTML structure goes here */}
                <div className="box__ghost-container">
                    <div
                        className="box__ghost-eyes"
                        style={{
                            transform: `translate(${mouseX}%, -${mouseY}%)`,
                        }}
                    >
                        <div className="box__eye-left"></div>
                        <div className="box__eye-right"></div>
                    </div>
                    <div className="box__ghost-bottom">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className="box__ghost-shadow"></div>
            </div>

            <div className="box__description">
                <div className="box__description-container">
                    <div className="box__description-title"><h2>404</h2></div>
                    <div className="box__description-title">Whoops!</div>
                    <div className="box__description-text">
                        It seems like we couldn't find the page you were looking for
                    </div>
                </div>

                <Link
                    to={'/'}
                    className="box__button" rel="noreferrer"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}


export default Errorpage;