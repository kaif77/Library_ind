import React from "react";
import {Col, Image, Row} from "react-bootstrap";
import WelcomeImage from "../assests/image/welcome-image.webp";

const WelcomeUX: React.FC = () => {
    return (
        <Row className='welcome-section'>
            <Col xs={12} className='welcome-title py-2'>
                <h2>My Library</h2>
            </Col>
            <Col xs={12} className="welcome-image px-0">
                <Image src={WelcomeImage} alt='welcome_image'/>
            </Col>
            <Col xs={12} className="photo-credits"> photo credits
                <a href="https://unsplash.com/@annahunko?
                utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                   rel="noreferrer" target="_blank"> Anna Hunko </a> on
                <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                   rel="noreferrer" target="_blank"> Unsplash </a>
            </Col>
        </Row>
    );
}

export default WelcomeUX;