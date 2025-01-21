import axios  from "axios";
let baseURL = "/api/persons/"
let getAll = () => {
    return axios.get(baseURL).then((response) => {
        return response.data;
    });
}
let add = (person) => {
    return axios.post(baseURL, person)
}

let deleteItem = (id) => {
    return axios.delete(`${baseURL}${id}`)
}
let updateNumber = (item, number) => {
    return axios.put(`${baseURL}${item.id}`, {...item, number: number})
}
export default {getAll, add, deleteItem, updateNumber }