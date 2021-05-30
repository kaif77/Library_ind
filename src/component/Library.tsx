import React from 'react';
import {Container} from "react-bootstrap";
import WelcomeUX from "./WelcomeUX";

const Library: React.FC = () => {
    return (
        <Container fluid={true}>
            <WelcomeUX/>
        </Container>
    );
}

export default Library;