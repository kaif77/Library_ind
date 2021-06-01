import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import AuthorSection from "./Author/AuthorSection";
import {IAuthor, IBook} from "../types/LibraryTypes";
import BookSection from "./Book/BookSection";

const LibraryArea: React.FC = () => {
    /**
     Author Object {id: 1, name: 'Author 1'},{id: 2, name: 'Author 2'}
     Book Object {id:1,name:'Book 1',price:100,author:1},{id:2,name:'Book 2',price:100,author:2}
     */
    const authorList: IAuthor [] = [];
    const bookList: IBook [] = [];
    const [author, setAuthor] = useState(authorList);
    const [book, setBook] = useState(bookList)

    return (
        <Row className='library-area'>
            <Col xs={{span: 12, order: 2}} md={{span: 6, order: 1}} className="book-section">
                <BookSection books={book}
                             authors={author}
                             setBook={setBook}
                />
            </Col>
            <Col xs={{span: 12, order: 1}} md={{span: 6, order: 1}} className="author-section">
                <AuthorSection authors={author}
                               setAuthors={setAuthor}
                               books={book}
                />
            </Col>
        </Row>
    );
}

export default LibraryArea;