import React from "react";
import {Plus} from "react-feather";

type AddAuthorProps = {
    onFormAdd : () => void;
}

const AddAuthor: React.FC<AddAuthorProps> = (props) =>{
    const {onFormAdd} = props;
    return (
        <div className='add-author my-2' onClick={onFormAdd}>
            <i> <Plus size='1.6em'/></i>
            <label className='mx-2'>Add Author</label>
        </div>
    );
}

export default AddAuthor;