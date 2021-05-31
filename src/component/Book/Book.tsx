import React from "react";
import {IBook} from "../../types/LibraryTypes";
import {Col, Row} from "react-bootstrap";
import {Edit, Trash2} from "react-feather";

type BookProps ={
    books:IBook
    index:number
    updateBook: (id:number) => void
}

const Book: React.FC<BookProps> = (props) => {
    const {books,index,updateBook} = props;

    return (
        <li className="py-2">
            <Row className="books py-0">
                <Col xs={8}>
                    <label>{index}. {books.name}</label>
                </Col>
                <Col xs={4} className="books-icons">
                    <i onClick={()=> updateBook(books.id)}>
                        <Edit className='text-warning'/>
                    </i>
                    <i>
                        <Trash2 className='text-danger'/>
                    </i>
                </Col>
            </Row>
        </li>
    );
}

export default Book;