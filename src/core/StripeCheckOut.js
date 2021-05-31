import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { emptyCart, loadCart } from "./helper/cartHelper";
import StripeCheckout from 'react-stripe-checkout';
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";

const StripeCheckOut = ({ product, setReload = (f) => f, reload = undefined }) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: "",
    });

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().User._id;

    const finalPrice = () => {
        let amount = 0;
        product.map(p => {
            amount = amount + p.price;
        })
        return amount;
    }

    const makePayment = (token) => {
        const body = {
            token,
            product
          };
        const headers = {
            "Content-Type": "application/json"
          };

        return fetch(`${API}/stripepayment`,{
            method:"POST",
            headers,
            body: JSON.stringify(body)
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
        
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckout
                stripeKey="pk_test_51Ix98bSBZ041m0xZWJen3e4yTnNtMxz0T0kyiNozpEPbiwF0kBoDs8N72PxsoUZjGxaMVP8n0N0S1NOgQQlJgDMo003J38ygOU"
                token={makePayment}
                amount={finalPrice() * 100}
                name="Buy T-shirts"
                shippingAddress
                billingAddress
            >

                <button className="btn btn-success">Pay with stripe</button>
            </StripeCheckout>
        ) : (
            <Link to='/signin'>
                <button className="btn btn-warning">Sign In</button>
            </Link>
        );
    }

    return (
        <div>
            
            {showStripeButton()}
        </div>
    );
};

export default StripeCheckOut;
