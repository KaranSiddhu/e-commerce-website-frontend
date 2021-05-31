import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Base from '../core/Base'
import { createaProduct, getAllCategories } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';



const AddProduct = () => {
    
    const { User, token } = isAuthenticated();

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: '',
        getRedirect: false,
        formData: ""
    });
    
    const { 
        name, 
        description, 
        price, 
        stock, 
        photo, 
        categories, 
        category, 
        loading, 
        error, 
        createdProduct, 
        getRedirect,         
        formData 
    } = values;

    const preLoad = () => {
        getAllCategories().then(data => {
          
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({ ...values, categories: data, formData: new FormData() });
          }
        });
    };

    useEffect(() => {
        preLoad();
    }, []);

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error:'', loading: true});
       
        createaProduct(User._id, token, formData)
          .then(data => {
            if (data.status === 'fail') {
              setValues({ ...values, error: data.message });
            }else{
              console.log("DASDASDAS",data);
              setValues({
                ...values,
                name:'',
                description:'',
                price:'',
                photo:'',
                stock:'',
                loading:false,
                error:'',
               
                createdProduct:data.savedProduct.name              
              });
            }
          });

        
     }

     const loadingMessage = () => {
      return (
        loading && (
          <div className='alert alert-success mt-3'>
            <h2>Loading..</h2>
          </div>
        )
      );
    };


    const successMessage = () => {
      return <div 
        className="alert alert-success mt-3"
        style={{display: (createdProduct ? "" : 'none')}}
      >
        <h4>{createdProduct} Created successfully</h4>
      </div>
    }
    
    const errorMessage = () => {
      return <div 
        className="alert alert-success mt-3"
        style={{display: (error ? "" : 'none')}}
      >
        <h4>{error} </h4>
      </div>
    }


    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>   
                
              {categories &&
                categories.map((cate, index) => (
                    <option key={index} value={cate._id}>
                        {cate.name}
                    </option>
                ))
              }
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Stock"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-2">
            Create Product
          </button>
        </form>
      );

    return (
        <Base
            title='Add a product here!'
            description='Welcome to product creation page'
            className='container bg-success p-4'
        >
            <Link to='/admin/dashboard' className="btn btn-sm btn-info mb-3">Go Back</Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {loadingMessage()}
                    {errorMessage()}
                    {successMessage()}
                    {createProductForm()}
                   
                </div>
            </div>
        </Base>
    )
}

export default AddProduct
