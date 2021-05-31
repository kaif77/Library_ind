import React, {useEffect, useState} from "react";
import AuthorTitle from "./AuthorTitle";
import AuthorList from "./AuthorList";
import {IAuthor} from "../../types/LibraryTypes";
import CreateAuthor from "./CreateAuthor";
import AddAuthor from "./AddAuthor";

type AuthorSectionProps = {
    authors: IAuthor[]
    setAuthors: (authors: IAuthor[]) => void
}

const AuthorSection: React.FC<AuthorSectionProps> = (props) => {
    const {authors, setAuthors} = props;
    const [formVisibility, setFormVisibility] = useState(false);
    const [authorToUpdate, setAuthorToUpdate] = useState<IAuthor | null>(null);

    const handleOnAuthorFormClose = () => {
        setFormVisibility(false);
        setAuthorToUpdate(null);
    }

    const handleOnAddClick = () => {
        setFormVisibility(true);
        setAuthorToUpdate(null);
    }

    const handleOnAuthorToUpdateId = (authorToUpdate: number) => {
        const updatingAuthor = authors.find(({id}) => id === authorToUpdate);
        if (!updatingAuthor) {
            return;
        }
        setAuthorToUpdate(updatingAuthor);
    }

    const handleOnAuthorDelete = (deletingAuthorID: number) => {
        const deletingAuthorIndex = authors.findIndex((author) => author.id === deletingAuthorID);
        const allAuthors = authors.slice();
        allAuthors.splice(deletingAuthorIndex, 1);
        setAuthors(allAuthors);
    }

    const handleOnAuthorAdded = (author: IAuthor) => {
        const allAuthors = authors.slice();
        allAuthors.push(author);
        setAuthors(allAuthors);
        setAuthorToUpdate(null);
    }

    const handleOnAuthorUpdate = (author: IAuthor) => {
        const allAuthors = authors.slice();
        const index = allAuthors.findIndex((value) => value.id === author.id);
        allAuthors.splice(index, 1, author);
        setAuthors(allAuthors);
        setAuthorToUpdate(null);
    }

    useEffect(() => {
        if (!authorToUpdate) {
            return;
        }
        setFormVisibility(true);
    }, [authorToUpdate]);

    return (
        <React.Fragment>
            <AuthorTitle/>
            <AuthorList authors={authors}
                        updateAuthor={handleOnAuthorToUpdateId}
                        deleteAuthor={handleOnAuthorDelete}/>
            <AddAuthor onFormAdd={handleOnAddClick}/>
            {formVisibility && <CreateAuthor onFormClose={handleOnAuthorFormClose}
                                             authorToUpdate={authorToUpdate}
                                             authors={authors}
                                             onAuthorAdded={handleOnAuthorAdded}
                                             onAuthorUpdate={handleOnAuthorUpdate}
            />}
        </React.Fragment>
    );
}

export default AuthorSection;