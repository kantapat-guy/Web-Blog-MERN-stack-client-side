import {useState, useEffect} from "react";
import { useParams  } from "react-router-dom";
import Navbar from './navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import { getToken } from "../services/auth";

const EditForm = () => {
    const [state, setState] = useState({
        title:"",
        author:"",
        slug:""
    })
    const { title, author, slugs } = state;

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
        .put(`${import.meta.env.VITE_REACT_APP_API}/blog/${slug}`, {title,content,author,slug}, {headers: {authorization: `Bearer ${getToken()}`}})
        .then((res) => {
            Swal.fire(
                'Good job!',
                'Your data had been updated.',
                'success'
            )
            const {title,content,author,slugs} = res.data
            setState({...state,title,author,slugs})
            setContent(content)
        })
        .catch((err) => {
            Swal.fire(
                'Sorry for a problem!',
                err.response.data.error,
                'error'
            )
        })
    }

    //ดึงข้อมูลจาก parameter (เพื่อเอา slug ที่ถูกส่งมา) ที่ส่งเข้ามาจาก route
    let { slug } = useParams();

    useEffect(() => {
        axios
        .get(`${import.meta.env.VITE_REACT_APP_API}/blog/${slug}`)
        .then((res) => {
            const {title, content, author, slug} = res.data
            setState({...state,title,author,slug})
            setContent(content)
        })
        .catch(err=>alert(err))
    },[])

    const showUpdateForm = () => (
        <form onSubmit={submitForm}>
            <div className="form-group">
                <label>ชื่อบทความ</label>
                <input type="text" className="form-control" onChange={inputValue("title")} value={title} />
            </div>
            <div className="form-group">
                <label>รายละเอียดเนื้อหา</label>
                <ReactQuill theme="snow" style={{border:"6px"}} className="pd-5 mb-3" onChange={submitContent} value={content} />
            </div>
            <div className="form-group">
                <label>ชื่อผู้แต่ง</label>
                <input type="text" className="form-control" onChange={inputValue("author")} value={author} />
            </div>
            <input type="submit" value="EDIT" className="btn btn-primary m-2" />
            {/* <a className="btn btn-success" href="/">Homepage</a> */}    
        </form>
    )

    return (
        <div className="container p-5">
            <Navbar/>
            <h1>Edit Form</h1>
            {showUpdateForm()}
        </div>
    )
}

export default EditForm;