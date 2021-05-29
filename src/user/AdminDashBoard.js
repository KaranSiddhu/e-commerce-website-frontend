import React from 'react'
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base';

const AdminDashboard = () => {
    const { User: {name, email, role} } = isAutheticated();
    
    const adminLeftSide = () => {
        //
    }
    
    const adminRightSide = () => {
        //
    }

    return (
        <Base title='Welcome Admin' description='Manage all your products here'>
        {adminLeftSide()}
        {adminRightSide()}
        </Base>
    )
}

export default AdminDashboard;
