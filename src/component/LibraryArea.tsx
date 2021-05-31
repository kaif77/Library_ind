import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import AuthorSection from "./Author/AuthorSection";
import {IAuthor} from "../types/LibraryTypes";

const LibraryArea: React.FC = () => {
    /**
    Author Object {id: 1, name: 'Author 1'}
    */
    const authorList: IAuthor [] = [];
    const [author, setAuthor] = useState<IAuthor[]>(authorList);
    return (
        <Row className='library-area'>
            <Col xs={{span: 12, order: 2}} md={{span:6,order:1}} className="book-section">
                Books
            </Col>
            <Col xs={{span: 12, order: 1}} md={{span:6,order:1}}  className="author-section">
                <AuthorSection authors={author}/>
            </Col>
        </Row>
    );
}

export default LibraryArea;