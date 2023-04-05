import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const regisUrl = 'http://134.122.75.14:8666/api/auth/signup/'
const logUrl = 'http://134.122.75.14:8666/api/auth/signin/'
const profileUrl = 'http://134.122.75.14:8666/api/auth/profile/'
const logOutURL = `http://134.122.75.14:8666/api/auth/logout/`

export const getProfileUserAction = createAsyncThunk(
    'getProfileUserAction',
    async () => {
        const response = await axios.get(profileUrl)
        const data = await response.data
        return data
    }
)
export const regisUserAction = createAsyncThunk(
    'regisUserAction',
    async (param) => {
        const response = await axios({
            method: 'POST',
            url: regisUrl,
            headers: {
                'Content-type': 'multipart/form-data' 
            },
            data: param
        })
        .then(response => console.log(response.data))
        .catch((e) => console.log(e))
        return response.data
    }
)

export const logInAction = createAsyncThunk(
    'logInAction',
    async (param, {dispatch}) => {
        try{
            const response = await axios({
                method: 'POST',
                url: logUrl,
                headers: {
                    'Content-type': 'application/json'
                },
                data: JSON.stringify(param)
            })
            const data = await response.data
            console.log(data)
            if(response.status === 200) {
                localStorage.setItem('tokenAccess', JSON.stringify(data.access))
                localStorage.setItem('refreshToken', JSON.stringify(data.refresh))
                localStorage.setItem('logined',true)
                window.location.reload()
            }
        }catch(e){
            alert(e)
        }
    }
)
export const logOutAction = createAsyncThunk(
    'logOutAction',
    async (param, {dispatch}) => {
        console.log(param)
        try{
            const response = await axios({
                method: 'POST',
                url: logOutURL,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('tokenAccess'))}`
                },
                data: param
            })
            if(response.status === 204) {
                localStorage.removeItem('tokenAccess')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('logined')
                localStorage.removeItem('profile')
                window.location.reload()
            }
        }
       catch(e) {
        console.log(e)
       }
    }
)

const regisSlice = createSlice({
    name: 'regisSlice',
    initialState: {
        users: [],
        logined: JSON.parse(localStorage.getItem('tokenAccess')) ? true : false,
        userInfo: {
            username: '',
            password: ''
        }
    }, 
    reducers: {
        setLogined: (state, action) => {
            state.logined = action.payload
        },
        setAddUsername: (state, action) => {
            state.userInfo.username = action.payload
        },
        setAddPassword: (state, action) => {
            state.userInfo.password = action.payload
        },
        setLogout: (state, action) => {
            state.logined = false
        }
    },
    extraReducers: builder => {
        builder.addCase(getProfileUserAction.fulfilled, (state, action)=> {
            state.users = action.payload
        })
    }
})

export default regisSlice.reducer
export const {setLogined, setAddPassword, setAddUsername, setLogout} = regisSlice.actions