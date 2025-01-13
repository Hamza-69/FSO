import axios  from "axios";

let getAll = () => {
    return axios.get("http://localhost:3001/persons").then((response) => {
        return response.data;
    });
}
let add = (person) => {
    return axios.post("http://localhost:3001/persons", person).then((response) => {
        return response.data;
    })
}

let deleteItem = (id) => {
    return axios.delete(`http://localhost:3001/persons/${id}`)
}
let updateNumber = (item, number) => {
    return axios.put(`http://localhost:3001/persons/${item.id}`, {...item, number: number}).then((response) => {
        return response.data;
    })
}
export default {getAll, add, deleteItem, updateNumber }