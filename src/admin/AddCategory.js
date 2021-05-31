import React,{ useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { createCategory } from './helper/adminapicall'

// import { Button } from 'react-bootstrap';

const AddCategory = () => {

    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { User, token } = isAuthenticated();

    const goBack = () => {
        return (
            <div>
                <Link to='/admin/dashboard' className="btn btn-sm btn-info mb-3">
                    Admin Home
                </Link>
            </div>
        );
    }

    const handleChange = (event) => {
        setError("");
      
        setName(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
       
        setError("");
        setSuccess(false);
        
        createCategory(User._id, token, {name})
        .then(data => {
            console.log("Category DATA - ",data);
            
            if(data.error){
                console.log("Category DATA If ke undar - ",data.error);
                setError(true);
            }else {
                setName('');
                setError("");
                setSuccess(true);
            }
        });

    }

    const successMessage = () => {
        if(success){
            return (
                <h4 className="text-success">Category Created Successfully🎉</h4>
            )
        }
    }

    const warningMessage = () => {
        if(error){
            return (
                <div>
                    
                    <h4 className="text-success">Fail to create Category🛑</h4>
                </div>
            )
        }
    }

    const categoryForm = () => {
        return (
            <form>
                <div className="form-group">
                    <div className="row mt-3 ml-1">
                        <Link to='/admin/dashboard' className="btn btn-sm btn-info mb-3">
                            Go Back
                        </Link>
                        <p className="ml-2 lead">Enter the category</p>
                    </div>
                    <input
                        type="text"
                        onChange={handleChange}
                        value={name}
                        className='form-control my-3'
                        
                        required
                        placeholder='Ex - Summer'
                    />
                    <button 
                        className="btn bg-success btn-outlined-info text-white"
                        onClick={onSubmit}
                    >
                        Create Category
                    </button>
                </div>
            </form>
        );
    }

    return (
        <Base
            title='Create a category here'
            description='Add a new category'
            className='container bg-info p-4'
        >
            <div className='row bg-white rounded'>
                <div className='col-md-8 offset-md-2'>

                    {successMessage()}
                    {warningMessage()}
                    
                    
                    {categoryForm()}
                </div>
            </div>
        </Base>
    )
}

export default AddCategory
