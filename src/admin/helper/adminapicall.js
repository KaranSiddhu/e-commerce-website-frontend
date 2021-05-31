import { API } from "../../backend";

//! Category API calls

//*Create Category
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category)
    })
    .then(res => res.json())
    .catch(err => console.log("Error in creating category - ",err));
}

//* Get all category    
export const getAllCategories = () => {
    return fetch(`${API}/category`)
    .then(res => res.json())
    .catch(err => console.log("Error in getting all category - ",err));
}

//! Products API calls

//* Create Products
export const createaProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: product
    })
    .then(res => res.json())
    .catch(err => console.log("Error in creating Product - ",err));
}

//* Get all products
export const getAllProducts = () => {
    return fetch(`${API}/products`, {

        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log("Error in fetching all products ",err));
}

//* Get a product
export const getProduct = (prodId) => {
    return fetch(`${API}/product/${prodId}`)
    .then(res => res.json())
    .catch(err => console.log("Error in Getting a Product - ",err));

}

//* Update a product
export const updateProduct = ( prodId, userId, token, product) => {
    return fetch(`${API}/product/${prodId}/${userId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: product
    })
    .then(res => res.json())
    .catch(err => console.log("Error in Updating Product - ",err));
}

//* Delete a product
export const deleteProduct = (prodId, userId, token) => {
    return fetch(`${API}/product/${prodId}/${userId}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        }
    })
    .then(res => res.json())
    .catch(err => console.log("Error in Deleting Product - ",err));
}