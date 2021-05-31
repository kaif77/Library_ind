import React, {useState} from "react";
import BookTitle from "./BookTitle";
import BookList from "./BookList";
import {IAuthor, IBook} from "../../types/LibraryTypes";
import AddBook from "./AddBook";
import CreateBook from "./CreateBook";

type BookSectionProps = {
    books: IBook[]
    authors: IAuthor[]
}

const BookSection: React.FC<BookSectionProps> = (props) => {
    const {books, authors} = props;
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

    return (
        <React.Fragment>
            <BookTitle/>
            <BookList books={books}
                      updateBook={handleOnBookUpdateRequest}/>
            <AddBook isFormVisible={handleOnAddClick}/>
            {formVisibility && <CreateBook bookToUpdate={bookToUpdate}
                                           authors={authors}
                                           onFormClose={handleOnBookFormClose}
            />}
        </React.Fragment>
    );
}

export default BookSection;