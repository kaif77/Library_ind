import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {XCircle} from "react-feather";
import NumberFormat from 'react-number-format';
import {IAuthor, IBook, IOptions} from "../../types/LibraryTypes";
import Select from "react-select/creatable";

type CreateBookProps = {
    bookToUpdate: IBook | null
    authors: IAuthor[]
    onFormClose: () => void
    onBookAdd: (book: IBook) => void
    books: IBook[]
    updateBook: (book: IBook) => void
}

const CreateBook: React.FC<CreateBookProps> = (props) => {
    const {bookToUpdate, authors, onFormClose, onBookAdd, books, updateBook} = props;
    const [validated, setValidated] = useState(false);
    const [bookName, setBookName] = useState<string | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [bookAuthor, setBookAuthor] = useState<IOptions | null>(null);
    const Swal = require('sweetalert2');

    const options: IOptions[] | null = authors.map((author) => {
        return {value: author.id, label: author.name};
    });

    const handleOnBookNameChanged = (name: string) => {
        setBookName(name);
    }
    const handleOnBookPriceChanged = (price: number | undefined) => {
        if (!price) {
            return;
        }
        setPrice(price);
    }

    const handleOnAuthorChanged = (author: IOptions | null) => {
        if (!author) {
            return;
        }
        setBookAuthor(author);
    }

    useEffect(() => {
        if (!bookToUpdate) {
            setBookName(null);
            setBookAuthor(null);
            setPrice(null);
            return;
        }
        const authorOption = options.find(({value}) => value === bookToUpdate.author);
        if (!authorOption) {
            return;
        }
        setBookName(bookToUpdate.name);
        setPrice(bookToUpdate.price);
        setBookAuthor(authorOption);
    }, [bookToUpdate]);

    const handleOnSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);

        if (!bookName || bookName.trim() === '' || !price || price < 0 || !bookAuthor) {
            return;
        }

        if (bookToUpdate) {
            const updatedBook: IBook = {...bookToUpdate, name: bookName, price: price, author: bookAuthor.value};
            updateBook(updatedBook);
            setBookName(null);
            updateAlert();
            return;
        }

        let newBookID: number;
        if (books.length === 0) {
            newBookID = 1;
        } else {
            newBookID = authors[books.length - 1].id + 1;
        }

        const newBook: IBook = {id: newBookID, name: bookName, price: price, author: bookAuthor.value};
        onBookAdd(newBook);
        Swal.fire({
            title: 'Success!',
            icon: 'success',
            text: 'New Book Added',
            showConfirmButton: false,
            timer: 1500
        });
        setValidated(false);
        setBookName(null);
        setPrice(null);
        setBookAuthor(null);
        onFormClose();
    }

    const updateAlert = () => {
        Swal.fire({
            title: 'Updated!',
            icon: 'success',
            text: 'Book Updated',
            showConfirmButton: false,
            timer: 1500
        });
        onFormClose();
    }

    return (
        <Row className="create-book pt-5">
            <Col xs={12} md={11} lg={10}>
                <Row>
                    <Col className="create-book-title" xs={9}>
                        <h4>Create Book</h4>
                    </Col>
                    <Col className='text-right' xs={3}>
                        <i onClick={onFormClose}><XCircle/></i>
                    </Col>
                </Row>
                <Row>
                    <Col className="my-3">
                        <Form className='form-inputs' noValidate validated={validated} onSubmit={handleOnSubmit}>
                            <Form.Group controlId="bookName">
                                <Form.Label>Name of Book</Form.Label>
                                <Form.Control type="text" placeholder=""
                                              required
                                              value={bookName ? bookName : ''}
                                              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                  handleOnBookNameChanged(event.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Book Name.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Price of the Book</Form.Label>
                                <NumberFormat className='form-control'
                                              thousandSeparator={true}
                                              required={true}
                                              prefix={'$'}
                                              value={price ? price : ''}
                                              onValueChange={(values) => {
                                                  handleOnBookPriceChanged(values.floatValue)
                                              }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Price.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Author</Form.Label>
                                <Select
                                    value={bookAuthor}
                                    onChange={(selected: IOptions | null) => {
                                        handleOnAuthorChanged(selected)
                                    }}
                                    options={options}
                                    allowCreateWhileLoading
                                    isClearable
                                    isSearchable={false}
                                    styles={{
                                        control: base => ({
                                            ...base,
                                            border: "2px solid #959595",
                                            boxShadow: '0',
                                            '&:hover': {
                                                border: '2px solid #959595',
                                            },
                                        })
                                    }}
                                    theme={theme => ({
                                        ...theme,
                                        borderRadius: 0,
                                        borderWidth: 2,
                                        colors: {
                                            ...theme.colors,
                                            primary25: '#deebff',
                                            primary: '#959595',
                                        },
                                    })}

                                />
                            </Form.Group>
                            {(!bookAuthor && validated) &&
                            <span className='select-invalid'>
                                Please select an Author.
                            </span>}
                            <Button className='create-btn mt-4 py-1 px-4' type='submit'>
                                {bookToUpdate ? 'Update' : 'Create'}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default CreateBook;