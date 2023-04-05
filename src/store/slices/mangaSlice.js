import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const mangaApi = 'http://134.122.75.14:8666/api/v1/manga/';
const topManga = 'http://134.122.75.14:8666/api/v1/top-manga/'

export const getAllMangasAction = createAsyncThunk(
    'getAllMangas',
    async (params) => {
        const response = await axios.get(mangaApi, {params: params})
        const data = await response.data
        console.log(data);
        return data
    }
)

export const getOneMangaAction = createAsyncThunk(
    'getOneMangaAction',
    async(id) => {
        const response = await axios.get(mangaApi+id)
        const data = await response.data
        console.log(data);
        return data
    }
)

export const getTopMangasAction = createAsyncThunk(
    'getTopMangas',
    async(params) => {
        const response = await axios.get(topManga, {params: params})
        const data = await response.data
        console.log(data)
        return data
    }
)



export const getMangasByTypesAction = createAsyncThunk(
    'getMangasByTypes',
    async (params) => {
        const response = await axios.get(mangaApi,{ params: params });
        const data = response.data
        console.log(data);
        return data
    }
)

export const getMangasByGenresAction = createAsyncThunk(
    'getMangasByGenresAction',
    async (params) => {
        const response = await axios.get(mangaApi, { params: params });
        const data = await response.data
        console.log(data);
        return data
    }
)

export const getCommentsMangaAction = createAsyncThunk(
    'getCommentsMangaAction',
    async(id) => {
        const response = await axios.get(`http://134.122.75.14:8666/api/v1/manga/${id}/comments/`)
        const data = await response.data
        console.log(data)
        return data
    }
)

export const postCommentAction = createAsyncThunk(
    'postCommentAction',
    async(data) => {
        const {id, text} = data
        try{
            console.log(id, text)
            const response = await axios.post(`http://134.122.75.14:8666/api/v1/manga/${id}/add-comment/`, text, {
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('tokenAccess'))}`
                }
            })
            const data = await response.data
            console.log(data)
            if(response.status >= 201) {
                window.location.reload()
            }
        } catch(e) {
            alert(e)
        }
    }
)

export const searchMangaAction = createAsyncThunk(
    'searchManga',
    async (params) => {
        const response = await axios.get(topManga, { params: params });
        const data = await response.data
        console.log(data);
        return data
    }
)
const mangasSlice = createSlice({
    name: 'mangasSlice',
    initialState: {
        search: [],
        searchText: '',
        mangas: {
            count: 0,
            results: [],
        },
        topMangas: {
            count: 0,
            results: []
        },
        mangaComments: [],
        manga: {
            comments_count: 0,
            results: {}
        },
        mangaId: 1,
        mangasByType: {
            count: 0,
            results: []
        } ,
        mangasByYears : [],
        mangaByGenres: {
            count: 0,
            results: []
        },
        types: '',
        load: true,
        startYear: 0,
        endYear: 0,
        users: [],
    },
    reducers: {
        setMangasByYear(state, action){
            state.mangasByYears = action.payload
        },
        setTypes(state,action){
            state.types = action.payload
        },
        setManga(state,action){
            state.manga = action.payload
        },
        setMangaId(state,action){
            state.mangaId = action.payload
        },
        setMangaByGenre(state, action){
            state.mangaByGenres = action.payload
        },
        setSearch(state,action){
            state.searchText = action.payload
        }, 
        setStartYear(state, action){
            state.startYear = action.payload
        },
        setEndYear(state, action){
            state.endYear = action.payload
        },
        setMangasByType(state, action){
            state.mangasByType = action.payload
        },
        setResults(state,action){
            state.mangas = action.payload
        },
    }, extraReducers: (builder) => {
            builder
            .addCase(searchMangaAction.fulfilled, (state,action) => {
                state.search = action.payload
                state.load = false
            })
            .addCase(getMangasByGenresAction.fulfilled, (state, action) => {
                state.mangaByGenres = action.payload
                state.load = false
            })
            .addCase(getMangasByGenresAction.pending, (state) => {
                state.load = true
            })
            .addCase(getAllMangasAction.fulfilled, (state, action) => {
                state.mangas = action.payload;
                state.load = false;
            })
            .addCase(getAllMangasAction.pending, (state) => {
                state.load = true;
            })
            .addCase(getTopMangasAction.fulfilled, (state, action) => {
                state.topMangas = action.payload;
                state.load = false;
            })
            .addCase(getTopMangasAction.pending, (state) => {
                state.load = true;
            })
            .addCase(getMangasByTypesAction.fulfilled, (state, action) => {
                state.mangasByType = action.payload
                state.load = false
            })
            .addCase(getMangasByTypesAction.pending, (state) => {
                state.load = true
            })
            .addCase(getOneMangaAction.fulfilled, (state,action) => {
                state.manga = action.payload
                state.load = false
            })
            .addCase(getOneMangaAction.pending, (state) => {
                state.load = true
            })
            .addCase(getCommentsMangaAction.pending, (state, action) => {
                state.load = true
            })
            .addCase(getCommentsMangaAction.fulfilled, (state, action) => {
                state.mangaComments = action.payload
                state.load = false
            })
        },
})

export const {setStartYear, setEndYear, setMangasByType, setResults, setMangasByYear, setTypes, setManga, setMangaId, setMangaByGenre, setSearch} = mangasSlice.actions

export default mangasSlice.reducer