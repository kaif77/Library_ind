import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {XCircle} from "react-feather";
import {IAuthor} from "../../types/LibraryTypes";

type CreateAuthorProps = {
    onFormClose: () => void
    authorToUpdate: IAuthor | null
    authors: IAuthor[]
    onAuthorAdded: (author: IAuthor) => void
    onAuthorUpdate: (author: IAuthor) => void
}

const CreateAuthor: React.FC<CreateAuthorProps> = (props) => {
    const {onFormClose, authorToUpdate, authors, onAuthorAdded, onAuthorUpdate} = props;
    const [validated, setValidated] = useState(false);
    const [authorName, setAuthorName] = useState<string | null>(null);
    const Swal = require('sweetalert2');

    const handleOnAuthorNameChanged = (name: string) => {
        setAuthorName(name);
    }

    useEffect(() => {
        if (!authorToUpdate) {
            setAuthorName('');
            return;
        }
        setAuthorName(authorToUpdate.name);
    }, [authorToUpdate])

    const handleOnSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        if (!authorName || authorName.trim() === '') {
            return;
        }

        if (authorToUpdate) {
            const updatedAuthor: IAuthor = {...authorToUpdate, name: authorName};
            onAuthorUpdate(updatedAuthor);
            setAuthorName(null);
            updateAlert();
            return;
        }

        let newID: number;
        if (authors.length === 0) {
            newID = 1;
        } else {
            newID = authors[authors.length - 1].id + 1;
        }

        const newAuthor: IAuthor = {id: newID, name: authorName};
        onAuthorAdded(newAuthor);

        Swal.fire({
            title: 'Success!',
            icon: 'success',
            text: 'New Author Added',
            showConfirmButton: false,
            timer: 1500
        });
        setValidated(true);
        setAuthorName(null);
        onFormClose();
    }

    const updateAlert = () => {
        Swal.fire({
            title: 'Updated!',
            icon: 'success',
            text: 'Author Updated',
            showConfirmButton: false,
            timer: 1500
        });
        onFormClose();
    }

    return (
        <Row className="create-author pt-5">
            <Col xs={12} md={11} lg={10}>
                <Row>
                    <Col className="create-author-title" xs={9}>
                        <h4>Create Author</h4>
                    </Col>
                    <Col className='text-right' xs={3}>
                        <i onClick={onFormClose}><XCircle/></i>
                    </Col>
                </Row>

                <Row>
                    <Col className="my-3">
                        <Form className='form-inputs' noValidate validated={validated} onSubmit={handleOnSubmit}>
                            <Form.Group controlId="authorName">
                                <Form.Label>Name of Author</Form.Label>
                                <Form.Control type="text" placeholder=""
                                              required
                                              value={authorName ? authorName : ''}
                                              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                  handleOnAuthorNameChanged(event.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Author Name.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button className='create-btn mt-4 py-1 px-4' type='submit'>
                                {authorToUpdate ? 'Update' : 'Create'}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default CreateAuthor;