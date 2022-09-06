import Navbar from './components/navbar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import parse from 'html-react-parser';
import { getUser,getToken } from './services/auth';

function App() {
  const [blogs, setBlogs] = useState([]);

  const fetchData = () => {
    axios
    .get(`${import.meta.env.VITE_REACT_APP_API}/blogs`)
    .then((res) => {
      setBlogs(res.data)
    })
    .catch((err) => {
      alert(err)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const confirmDel = (slug) => {
    Swal.fire({
        title:"Do you want to delete?",
        icon:"warning",
        showCancelButton:true,
    }).then((result)=>{
        if(result.isConfirmed){
          deleteBlog(slug)
        }
    })
  }

  //req to api to delete data
  const deleteBlog = (slug) => {
    axios
    .delete(`${import.meta.env.VITE_REACT_APP_API}/blog/${slug}`, {headers: {authorization: `Bearer ${getToken()}`}})
    .then(()=>{
      Swal.fire(
        "Delete complete!",
        'Your data had been deleted.',
        "success"
      )
      fetchData()
    })
    .catch(err=>console.log(err))
  }

  return (
    <div className= "container p-5">
      <Navbar/>
      {blogs.map((blog,index) => (
        <div className='row' key={index} style={{borderBottom: '1px solid silver'}}>
          <div className='col pt-3 pb-2'>
            <Link to={`/blog/${blog.slug}`}><h2>{blog.title}</h2></Link>
            <div className="p-3"> {parse(blog.content.substring(0,250))} </div>
            <div className='text-muted'> Author: {blog.author}, Public date: {new Date(blog.createdAt).toLocaleString()} </div>
            {getUser() && (
              <div>
                <Link to={`/blog/edit/${blog.slug}`} className='btn btn-outline-success'>Edit</Link> &nbsp;
                <button className='btn btn-outline-danger' onClick={()=>(confirmDel(blog.slug))} >Delete</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
