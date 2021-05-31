import React from "react";
import {Plus} from "react-feather";

type AddBookProps = {
    isFormVisible:() => void
}

const AddBook: React.FC<AddBookProps> = (props) => {
    const {isFormVisible} = props;
    return (
        <div className='add-book my-2' onClick={isFormVisible}>
            <i> <Plus size='1.6em'/></i>
            <label className='mx-2'>Add Book</label>
        </div>
    );
}

export default AddBook;