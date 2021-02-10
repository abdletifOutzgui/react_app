import React, { useState } from 'react'
import axios from "axios";

const AddProduct = (props) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");


    const addNewProduct = (e) => {
        e.preventDefault();
        
        console.log(title, content)
        axios.post("http://127.0.0.1:8000/api/products", 
            {
                title : title,
                content : content
            },
            {
                headers : {
                  "Authorization" : "Bearer "+localStorage.getItem("access_token"),
                  "Content-Type": 'application/json'
                }
            }
                    
        )
        .then(resp => {
            axios.get("http://127.0.0.1:8000/api/products", {
                headers : { 
                    "Authorization" : "Bearer "+localStorage.getItem("access_token")
                }
            })
                .then(resp => {
                    const data = resp.data.data;
                    props.setProducts(data)
                    alert("product added")
                    
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))

        setTitle("")
        setContent("")
    }
    return (
        <div className="container my-5">
           
            <form onSubmit={addNewProduct}>
                <div className="form-group">
                <label htmlFor="title">Title :</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="form-control"
                    placeholder="title...." />
                </div>
                <div className="form-group">
                <label htmlFor="content">Content :</label>
                <input
                    type="text"
                    name="content"
                    id="content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="form-control"
                    placeholder="content...." />
                </div>

                <button className="btn btn-secondary">Add Product</button>   
            </form>
        </div>
    )
}

export default AddProduct
