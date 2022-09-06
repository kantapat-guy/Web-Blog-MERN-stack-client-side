import {useState} from "react";
import Navbar from './navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import { getUser, getToken } from "../services/auth";

const Form = () => {
    const [state, setState] = useState({
        title:"",
        author:getUser()
    })
    const { title, author } = state;

    const [content, setContent] = useState('')

    const submitContent = (event) => {
        setContent(event)
    }
    const inputValue = (name) => (event) => {
        setState({...state, [name]:event.target.value});
    }


    const submitForm = (event) => {
        event.preventDefault();
        console.log("API URL : ",import.meta.env.VITE_REACT_APP_API)
        //axios for bring data from input post to database
        axios
        .post(`${import.meta.env.VITE_REACT_APP_API}/create`, {title, content, author}, {headers: {authorization: `Bearer ${getToken()}`}})
        .then(() => {
            Swal.fire(
                'Good job!',
                'Your data had been saved.',
                'success'
            )
            setState({...state, title:"",author:""});
            setContent("")
        })
        .catch((err) => {
            Swal.fire(
                'Sorry for a problem!',
                err.response.data.error,
                'error'
            )
        })
    }

    return (
        <div className="container p-5">
            <Navbar/>
            <h1>Form component</h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>ชื่อบทความ</label>
                    <input type="text" className="form-control" onChange={inputValue("title")} value={title} />
                </div>
                <div className="form-group">
                    <label>รายละเอียดเนื้อหา</label>
                    <ReactQuill theme="snow" style={{border:"6px"}} className="pd-5 mb-3" onChange={submitContent} value={content} placeholder="เขียนรายละเอียดบทความ" />
                </div>
                <div className="form-group">
                    <label>ชื่อผู้แต่ง</label>
                    <input type="text" className="form-control" onChange={inputValue("author")} value={author} />
                </div>
                <input type="submit" value="บันทึก" className="btn btn-primary m-2" />
                {/* <a className="btn btn-success" href="/">Homepage</a> */}
            </form>
        </div>
    )
}

export default Form;