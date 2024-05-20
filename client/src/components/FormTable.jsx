import React from "react";
import "../App.css"
import { MdClose } from 'react-icons/md';


const FormTable = ({handleSubmit,hadleOnchange,handleClose,rest}) => {
    return (
        <div className='addContainer'>

            <form onSubmit={handleSubmit}>
                <div className='closeBtn' onClick={handleClose}><MdClose /></div>
                <label htmlFor='name'>Name :</label>
                <input type='text' id='name' name='name' onChange={hadleOnchange} value={rest.name} />
                <label htmlFor='email'>Email :</label>
                <input type='email' id='email' name='email' onChange={hadleOnchange} value={rest.email}/>
                <label htmlFor='mobile'>Mobile :</label>
                <input type='number' id='mobile' name='mobile' onChange={hadleOnchange} value={rest.mobile}/>

                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default FormTable