import axios from 'axios'

// const url = 'http://localhost:8000'
const url = ''


export const authenticatesignup = async (user) => {
    try {

        return await axios.post(`${url}/signup`, user)
    } catch (error) {
        console.log(error)
    }
}


export const authenticatelogin = async (user) => {
    try {
        return await axios.post(`${url}/login`, user)
    } catch (error) {
        console.log(error)

    }
}


export const payusingpaytm = async (data) => {
    try {
        let response=  await axios.post(`${url}/payment`, data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}