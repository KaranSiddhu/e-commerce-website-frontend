import { API } from "../../backend";

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