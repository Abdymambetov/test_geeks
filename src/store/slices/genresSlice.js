import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const genresApi = 'http://134.122.75.14:8666/api/v1/genre/'

export const genresAction = createAsyncThunk(
    'genresAction',
    async(params) => {
        const response = await axios.get(genresApi, {params: params})
        const data = await response.data
        console.log(data)
        return data
    }
)

export const genresSlice = createSlice({
    name: 'genresSlice',
    initialState: {
        genresArr: [],
        selectGenres: '',
        load: true
    },
    reducers: {
        setGenres: (state, action) => {
            state.selectGenres = action.payload
        }
    }, extraReducers: builder => {
        builder.addCase(genresAction.fulfilled, (state, action) => {
            state.genresArr = action.payload
            state.load = false
        })
    }
})

export const {setGenres} = genresSlice.actions

export default genresSlice.reducer