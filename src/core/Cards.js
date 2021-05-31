import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

const Cards = ({
    product,
    removeFromCart = false,
    addToCart = true,
    setReload = f => f,
    reload = undefined,
}) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const cardTitle = product ? product.name : "Error loading title from backend";
    const cardDesc = product ? product.description : "Error loading description from backend";
    const cardPrice = product ? product.price : "Error loading price from backend";

    const addToCartMethod = () => {
        addItemToCart(product, () => setRedirect(true));
    };

    const getARedirect = () => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    };

    const showAddToCart = () => {
        return (
            addToCart && (
                <button
                    onClick={addToCartMethod}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                    Add to Cart
                </button>
            )
        );
    };

    const showRemoveFromCart = () => {
        return (
            removeFromCart && (
                <button
                    onClick={() => {
                        removeItemFromCart(product._id);
                        setReload(!reload)
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                    Remove from cart
                </button>
            )
        );
    };

    return (
        <div className="card text-white bg-dark border border-info">
            <div className="card-header lead">{cardTitle}</div>
            <div className="card-body">
                {getARedirect()}
                <ImageHelper product={product} />

                <p className="lead bg-success font-weight-normal text-wrap">{cardTitle}</p>
                <p className="btn btn-success rounded  btn-sm px-4">₹ {cardPrice}</p>
                <div className="row">
                    <div className="col-12">{showAddToCart()}</div>
                    <div className="col-12">{showRemoveFromCart()}</div>
                </div>
            </div>
        </div>
    );
};

export default Cards;
