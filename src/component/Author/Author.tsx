import React from "react";
import {Col, Row} from "react-bootstrap";
import {IAuthor} from "../../types/LibraryTypes";
import {Trash2, Edit} from 'react-feather';

type AuthorProps = {
    author: IAuthor
    index: number
    updateAuthor: (id: number) => void
    deleteAuthor: (id: number) => void
}

const Author: React.FC<AuthorProps> = (props) => {
    const {author, index, updateAuthor, deleteAuthor} = props;

    return (
        <li className="py-2">
            <Row className="authors py-0">
                <Col xs={8}>
                    <label>{index}. {author.name} </label>
                </Col>
                <Col xs={4} className="author-icons">
                    <i>
                        <Edit onClick={() => updateAuthor(author.id)} className='text-warning'/>
                    </i>
                    <i>
                        <Trash2 onClick={() => deleteAuthor(author.id)} className='text-danger'/>
                    </i>
                </Col>
            </Row>
        </li>
    )
}

export default Author;