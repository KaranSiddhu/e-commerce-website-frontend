import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Cards from "./Cards";
import { getAllProducts } from "./helper/coreapicalls";
import { loadCart } from "./helper/cartHelper";
import StripeCheckOut from "./StripeCheckOut";

const Cart = () => {
    const [product, setProduct] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProduct(loadCart());
    }, [reload]);

    const loadAllProducts = () => {
        return (
            <div>
                
                {product.map((prod, index) => {
                    return (
                            <Cards 
                                product={prod} 
                                key={index}
                                removeFromCart={true}
                                addToCart={false}
                                setReload={setReload}
                                reload={reload}
                          />
                    );
                })}
            </div>
        );
    };

    const loadCheckOut = () => {
        return (
            <div>
                <StripeCheckOut product={product} setReload={setReload} />
            </div>
        );
    };

    return (
        <Base title="Cart Page" description="Ready to checkout">
            <div className="row text-center">
                <div className="col-6">{loadAllProducts()}</div>
                <div className="col-6">{loadCheckOut()}</div>
            </div>
        </Base>
    );
};

export default Cart;
