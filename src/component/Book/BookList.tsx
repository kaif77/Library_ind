import React from "react";
import {Col, Row} from "react-bootstrap";
import {IBook} from "../../types/LibraryTypes";
import Book from "./Book";

type BookListProps = {
    books: IBook[]
    updateBook: (id: number) => void
    deleteBook: (id: number) => void
}

const BookList: React.FC<BookListProps> = (props) => {
    const {books, updateBook, deleteBook} = props;
    const Swal = require('sweetalert2');

    const handleDeleteConfirm = (bookId: number) => {
        deleteAlert(bookId);
    }

    const deleteAlert = (bookId: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result: { isConfirmed: boolean; }) => {
            if (result.isConfirmed) {
                deleteBook(bookId);
                Swal.fire({
                    title: 'Deleted!',
                    icon: 'success',
                    text: 'Book has been deleted',
                    showConfirmButton: false,
                    timer: 1200
                })
            }
        });
    }

    const renderBookList = () => {
        if (books.length === 0) {
            return;
        }
        return books.map((book: IBook, index: number) => {
            return <Book books={book}
                         key={book.id}
                         index={index + 1}
                         updateBook={updateBook}
                         deleteBook={handleDeleteConfirm}
            />
        });
    }

    return (
        <Row className="book-list">
            <Col xs={12}>
                {books.length === 0 && <label className="empty-list">No books listed here</label>}
            </Col>

            <ul className='book-ul pl-3 pt-3'>
                {renderBookList()}
            </ul>
        </Row>
    );
}

export default BookList;