import React from 'react';
import {Container} from "react-bootstrap";
import WelcomeUX from "../component/WelcomeUX";
import LibraryArea from "../component/LibraryArea";
import Footer from "../component/Footer";

const Library: React.FC = () => {
    return (
        <React.Fragment>
            <Container fluid={true}>
                <WelcomeUX/>
                <LibraryArea/>
            </Container>
            <Footer/>
        </React.Fragment>
    );
}

export default Library;