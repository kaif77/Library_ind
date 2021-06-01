import React from "react";
import Author from "./Author";
import {IAuthor, IBook} from "../../types/LibraryTypes";
import {Col, Row} from "react-bootstrap";

type AuthorListProps = {
    authors: IAuthor[]
    updateAuthor: (id: number) => void
    deleteAuthor: (id: number) => void
    books: IBook[]
}

const AuthorList: React.FC<AuthorListProps> = (props) => {
    const {authors, updateAuthor, deleteAuthor, books} = props;
    const Swal = require('sweetalert2');

    const handleDeleteConfirm = (authorId: number) => {
        const inBook = books.find(({author}) => author === authorId);
        if (inBook) {
            Swal.fire({
                icon: 'error',
                title: 'Can not delete Author',
                text: 'Author is been assigned to a Book!',
            });
            return;
        }
        deleteAlert(authorId);
    }

    const deleteAlert = (authorId: number) => {
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
                deleteAuthor(authorId);
                Swal.fire({
                    title: 'Deleted!',
                    icon: 'success',
                    text: 'Author has been deleted',
                    showConfirmButton: false,
                    timer: 1200
                })
            }
        });
    }

    const renderAuthors = () => {
        if (authors.length === 0) {
            return;
        }
        return authors.map((author: IAuthor, index: number) => {
            return <Author author={author}
                           key={author.id}
                           index={index + 1}
                           updateAuthor={updateAuthor}
                           deleteAuthor={handleDeleteConfirm}
            />
        });
    }

    return (
        <Row className="author-list">
            <Col xs={12}>
                {authors.length === 0 && <label className='empty-list mb-2'>No authors listed here</label>}
            </Col>
            <ul className='author-ul pl-3 pt-3'>
                {renderAuthors()}
            </ul>
        </Row>
    );
}

export default AuthorList;