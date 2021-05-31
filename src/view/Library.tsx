import React from 'react';
import {Container} from "react-bootstrap";
import WelcomeUX from "../component/WelcomeUX";
import LibraryArea from "../component/LibraryArea";

const Library: React.FC = () => {
    return (
        <Container fluid={true}>
            <WelcomeUX/>
            <LibraryArea/>
        </Container>
    );
}

export default Library;