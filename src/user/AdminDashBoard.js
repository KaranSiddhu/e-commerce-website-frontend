import React from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';

const AdminDashboard = () => {
    const { User: { name, email, role } } = isAuthenticated();
    
    const adminLeftSide = () => {
        return (
            <div className='card'>
                <h4 className='card-header bg-dark text-white'>Admin Navigation</h4>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <Link 
                            to='/admin/create/category' 
                            className='nav-link text-success'
                        >
                            Create Categories
                        </Link>
                    </li>
                    <li className='list-group-item'>
                        <Link 
                            to='/admin/categories' 
                            className='nav-link text-success'
                        >
                            Manage Categories
                        </Link>
                    </li>
                    <li className='list-group-item'>
                        <Link 
                            to='/admin/create/product' 
                            className='nav-link text-success'
                        >
                            Create Products
                        </Link>
                    </li>
                    <li className='list-group-item'>
                        <Link 
                            to='/admin/create/products' 
                            className='nav-link text-success'
                        >
                            Manage Products
                        </Link>
                    </li>
                    <li className='list-group-item'>
                        <Link 
                            to='/admin/create/orders' 
                            className='nav-link text-success'
                        >
                            Manage Orders
                        </Link>
                    </li>
                </ul>      
            </div>
        )
    }
    
    const adminRightSide = () => {
       return( 
       <div className='card mb-4'>
            <h4 className='card-header'>Admin Information</h4>
            <ul className='list-group'>
                <li className='list-group-item'>
                    <span 
                        className='badge badge-success mr-2' 
                        style={{fontSize:16}}
                    >
                    Name:
                    </span>
                    {name}
                </li>
                <li className='list-group-item'>
                    <span 
                        className='badge badge-success mr-2'
                        style={{fontSize:16}}
                    >
                    E-mail:
                    </span>
                    {email}
                </li>
            </ul>
        </div>
        )
    }

    return (
        <Base 
            title='Welcome Admin' 
            description='Manage all your products here'
            className='container bg-success p-4'
        >

            <div className='row'>
                
                <div className='col-3'>
                    {adminLeftSide()}
                </div>
                <div className='col-9'>
                    {adminRightSide()}
                </div>

            </div>
    
        </Base>
    )
}

export default AdminDashboard;