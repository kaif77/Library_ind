import React, {useEffect, useState} from "react";
import BookTitle from "./BookTitle";
import BookList from "./BookList";
import {IAuthor, IBook} from "../../types/LibraryTypes";
import AddBook from "./AddBook";
import CreateBook from "./CreateBook";

type BookSectionProps = {
    books: IBook[]
    authors: IAuthor[]
    setBook: (book:IBook[]) => void
}

const BookSection: React.FC<BookSectionProps> = (props) => {
    const {books, authors, setBook} = props;
    const [bookToUpdate, setBookToUpdate] = useState<IBook | null>(null);
    const [formVisibility, setFormVisibility] = useState(false);

    const handleOnAddClick = () => {
        setFormVisibility(true);
        setBookToUpdate(null);
    }

    const handleOnBookFormClose = () => {
        setFormVisibility(false);
        setBookToUpdate(null);
    }

    const handleOnBookUpdateRequest = (bookToUpdate: number) => {
        const updatingBook = books.find(({id}) => id === bookToUpdate);
        if (!updatingBook) {
            return;
        }
        setBookToUpdate(updatingBook);
        setFormVisibility(true);
    }

    const handleOnBookDelete = (bookId:number) => {
        const bookIndex = books.findIndex((value)=> value.id===bookId);
        const allBooks = books.slice();
        allBooks.splice(bookIndex,1);
        setBook(allBooks);
        setBookToUpdate(null);
        setFormVisibility(false);
    }

    const handleOnBookUpdate = (updatedBook:IBook) => {
        const bookIndex = books.findIndex((value)=> value.id===updatedBook.id);
        const allBooks = books.slice();
        allBooks.splice(bookIndex,1,updatedBook);
        setBook(allBooks);
        setBookToUpdate(null);
    }

    const handleOnBookAdd = (newBook: IBook) => {
        const allBooks: IBook[] = books.slice();
        allBooks.push(newBook);
        setBook(allBooks);
        setBookToUpdate(null);
    }

    useEffect(() => {
        if (!bookToUpdate) {
            return;
        }
        setFormVisibility(true);
    },[bookToUpdate]);

    return (
        <React.Fragment>
            <BookTitle/>
            <BookList books={books}
                      updateBook={handleOnBookUpdateRequest}
                      deleteBook={handleOnBookDelete}
            />
            <AddBook isFormVisible={handleOnAddClick}/>
            {formVisibility && <CreateBook bookToUpdate={bookToUpdate}
                                           authors={authors}
                                           onFormClose={handleOnBookFormClose}
                                           onBookAdd={handleOnBookAdd}
                                           books={books}
                                           updateBook={handleOnBookUpdate}
            />}
        </React.Fragment>
    );
}

export default BookSection;