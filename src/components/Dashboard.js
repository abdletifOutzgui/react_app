import React, {useState, useEffect} from 'react'
import axios from "axios"
import AddProduct from './products/addProduct';

const Dashboard = () => {

    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);

    // get products
    const getProducts = () => {
        axios.get("http://127.0.0.1:8000/api/products", {
        headers : { 
            "Authorization" : "Bearer "+localStorage.getItem("access_token")
        }
    })
        .then(resp => {
            const data = resp.data.data;
            setProducts(data)
            
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getProducts()        
    }, [])

    const ChangeShowForm = () => {
        setShowForm(!showForm)
    }
    
    const DeleteProduct = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/products/${id}`, {
            headers : { 
                "Authorization" : "Bearer "+localStorage.getItem("access_token")
            }
        })

        .then(resp => {
            getProducts()
            alert("product deleted")
        })
        .then(err => console.log(err))
    }
   
    return (
        <div>
            <div className="justify-content-between">
               <h1>Dashboard</h1>
               
               <button onClick={ChangeShowForm} className="btn btn-success">
                   Add product
               </button>
               {showForm ?  
                ( <AddProduct setProducts={setProducts} />)
               : " "}
            </div>
            <div className="row">
                {products.map(product => (
                    <div key={product.id}>
                        <div className="col-md-4 my-3">
                            <div className="card">
                                <h3 className="p-3">{product.title}</h3>
                                <p className="p-3">{product.content}</p>
                            </div>
                        </div>
                        <div className="mx-auto">
                            <button  className="btn btn-primary">Edit</button>
                            <button onClick={() => DeleteProduct(product.id) } className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard;
