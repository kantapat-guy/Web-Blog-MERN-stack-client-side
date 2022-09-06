import { useParams  } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "./navbar";
import parse from 'html-react-parser';

const SinglePage = () => {

    //ดึงข้อมูลจาก parameter (เพื่อเอา slug ที่ถูกส่งมา) ที่ส่งเข้ามาจาก route
    let { slug } = useParams();

    const [blog, setBlog] =useState('')

    useEffect(() => {
        axios
        .get(`${import.meta.env.VITE_REACT_APP_API}/blog/${slug}`)
        .then((res) => {
            setBlog(res.data)
        })
        .catch(err=>alert(err))
    },[])

    return (
    <div className="container p-5">
        <Navbar/>
        {blog &&
        <div>
            <h2>{blog.title}</h2>
        <div className="pt-3">{parse(blog.content)}</div>
            <p className='text-muted'>Author: {blog.author}, Public date: {new Date(blog.createdAt).toLocaleString()}</p>
        </div>}
    </div>
    )
}

export default SinglePage