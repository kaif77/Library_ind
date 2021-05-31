import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {XCircle} from "react-feather";
import {IAuthor} from "../../types/LibraryTypes";




type CreateAuthorProps = {
    onFormClose: () => void
    authorToUpdate: IAuthor | null
}

const CreateAuthor: React.FC<CreateAuthorProps> = (props) => {
    const {onFormClose,authorToUpdate} = props;
    const [validated, setValidated] = useState(false);
    const [authorName, setAuthorName] = useState<string | null>(null);
    const Swal = require('sweetalert2')
    const handleOnAuthorNameChanged = (name: string) => {
        setAuthorName(name);
    }

    useEffect(()=>{
        if (!authorToUpdate) {
            setAuthorName('');
            return;
        }
        setAuthorName(authorToUpdate.name);
    },[authorToUpdate])

    const handleOnSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }


        Swal.fire({
            title: 'Success!',
            text: 'Do you want to continue',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        })
        setValidated(true);
        setAuthorName(null);
        onFormClose();
    }

    return (
        <Row className="create-author pt-5">
            <Col xs={12} md={11} lg={10}>
                <Row>
                    <Col className="create-author-title" xs={9}>
                        <h3>Create Author</h3>
                    </Col>
                    <Col className='text-right' xs={3}>
                        <i onClick={onFormClose}><XCircle/></i>
                    </Col>
                </Row>

                <Row>
                    <Col className="my-3">
                        <Form className='formInputs' noValidate validated={validated} onSubmit={handleOnSubmit}>
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