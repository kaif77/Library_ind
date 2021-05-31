import React, {useState} from "react";
import AuthorTitle from "./AuthorTitle";
import AuthorList from "./AuthorList";
import {IAuthor} from "../../types/LibraryTypes";
import CreateAuthor from "./CreateAuthor";
import AddAuthor from "./AddAuthor";

type AuthorSectionProps = {
    authors: IAuthor[]
}

const AuthorSection: React.FC<AuthorSectionProps> = (props) => {
    const {authors} = props;
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

    return (
        <React.Fragment>
            <AuthorTitle/>
            <AuthorList authors={authors}
                        updateAuthor={handleOnAuthorToUpdateId}/>
            <AddAuthor onFormAdd={handleOnAddClick}/>
            {formVisibility && <CreateAuthor onFormClose={handleOnAuthorFormClose}
                                             authorToUpdate={authorToUpdate}
            />}
        </React.Fragment>

    );
}

export default AuthorSection;