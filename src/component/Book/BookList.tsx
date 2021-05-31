import React from "react";
import {Col, Row} from "react-bootstrap";
import {IBook} from "../../types/LibraryTypes";
import Book from "./Book";

type BookListProps = {
    books: IBook[]
    updateBook: (id:number) => void
}

const BookList: React.FC<BookListProps> = (props) => {
    const {books,updateBook} =props;

    const renderBookList = () =>{
        if(books.length===0){
            return;
        }
        return books.map((book:IBook,index:number)=>{
            return <Book books={book} key={book.id} index={index+1} updateBook={updateBook}/>
        });
    }

    return (
        <Row className="book-list">
            <Col xs={12} >
                {books.length===0 && <label className="empty-list">No books listed here</label>}
            </Col>

            <ul className='book-ul pl-3 pt-3'>
                {renderBookList()}
            </ul>
        </Row>
    );
}

export default BookList;