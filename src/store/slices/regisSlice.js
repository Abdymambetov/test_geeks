import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const regisUrl = 'http://134.122.75.14:8666/api/auth/signup/'
const logUrl = 'http://134.122.75.14:8666/api/auth/signin/'
const profileUrl = 'http://134.122.75.14:8666/api/auth/profile/'
const logOutURL = `http://134.122.75.14:8666/api/auth/logout/`

export const regisUserAction = createAsyncThunk(
    'regisUserAction',
    async (param) => {
        const response = await axios({
            method: 'POST',
            url: regisUrl,
            headers: {
                'Content-type': 'application/json'
            },
            data: JSON.stringify(param)
        })
        .then(response => console.log(response))
        .catch((e) => console.log(e))
        return response;
    }
)

export const logInAction = createAsyncThunk(
    'logInAction',
    async (param, {dispatch}) => {
        const response = await axios({
            method: 'POST',
            url: logUrl,
            headers: {
                'Content-type': 'application/json'
            },
            data: JSON.stringify(param)
        })
        .then((response) => {
            localStorage.setItem('tokenAccess', JSON.stringify(response.data.access))
            localStorage.setItem('refreshToken', JSON.stringify(response.data.refresh))
        })
        .catch((err) => console.log(err))
        return response
    }
)
export const logOutAction = createAsyncThunk(
    'logOutAction',
    async (param, {dispatch}) => {
        const response = await axios({
            method: 'POST',
            url: logOutURL,

        })
    }
)

const regisSlice = createSlice({
    name: 'regisSlice',
    initialState: {
        users: [],
        logined: false,
        userInfo: {
            username: '',
            password: ''
        }
    }, 
    reducers: {
        setLogined: (state, action) => {
            state.logined = action.payload
        }
    },
})

export default regisSlice.reducer
export const {setLogined} = regisSlice.actions