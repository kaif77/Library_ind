import React from "react";
import Author from "./Author";
import {IAuthor} from "../../types/LibraryTypes";
import {Col, Row} from "react-bootstrap";

type AuthorListProps = {
    authors: IAuthor[]
    updateAuthor: (id:number) => void
}

const AuthorList: React.FC<AuthorListProps> = (props) => {
    const {authors,updateAuthor} = props;

    const renderAuthors = () => {
        if (authors.length === 0) {
            return;
        }
        return authors.map((author: IAuthor, index: number) => {
            return <Author author={author} key={author.id} index={index + 1} updateAuthor={updateAuthor}/>
        })

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