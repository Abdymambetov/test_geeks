import React, {useEffect, useState} from 'react'
import { Box, Container, CircularProgress} from '@mui/material';
import classes from './MainPage.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllMangasAction, getMangasByGenresAction, getMangasByTypesAction, getTopMangasAction, setMangaByGenre, setMangaId, setMangasByType, setMangasByYear } from '../../store/slices/mangaSlice';
import { genresAction } from '../../store/slices/genresSlice';
import PaginationFunc from '../../componets/paginationFunc/PaginationFunc';
import { Link } from 'react-router-dom';
import CardManga from '../../componets/cardManga/CardManga';
import Filter from '../../componets/filters/Filter';
import TwoFilter from '../../componets/filters/TwoFilter';



function MainPage() {
  const dispatch = useDispatch()
  const [page, setPage] = useState('TopMangas')
  const [offset, setOffset] = useState(0)
  const [all, setAll] = useState(false)
  const {
    startYear,
    endYear,
    types,
    mangas, 
    topMangas,
    mangaByGenres,
    mangasByYears,
    mangasByType,
    load
  } = useSelector(state => state.manga)
  const {genresArr, selectGenres} = useSelector(state => state.genres)

  const toManga = (id) => {
    dispatch(setMangaId(id))
  }

  useEffect(() => {
    dispatch(getAllMangasAction({
      limit: 12,
      offset: offset
    }))
  }, [dispatch, offset])

  useEffect(() => {
    dispatch(getTopMangasAction({
      limit: 12,
      offset: offset
    }))
  }, [offset, dispatch])

  useEffect(() => {
    dispatch(genresAction())
  }, [dispatch])

  useEffect(() => {
    dispatch(getMangasByGenresAction({
      limit: 12,
      offset: offset,
      genre_title: selectGenres
    }))
  }, [dispatch, offset, selectGenres])

  useEffect(() => {
    dispatch(getMangasByTypesAction({
      limit:12, 
      offset: offset,
      type: ''
    }))
  }, [dispatch])

  const changeFilter=() => {
    setAll(!all)
    dispatch(setMangasByType({
      count: 0,
      results: []
    }))
    dispatch(setMangasByYear([]))
    setPage('TopMangas')
  }

  const resetAll = () => {
    dispatch(getAllMangasAction({
      limit: 12,
      offset: offset
    }))
    dispatch(setMangasByType({
      count: 0,
      results: []
    }))
    dispatch(setMangasByYear([]))
    dispatch(setMangaByGenre({
      count: 0,
      results: []
    }))
  }

  const changeOffset = (p) => {
    setOffset(p)
  }
  
  const changePage = () => {
    setPage('Genres')
  }

  const changePageToTypes = () => {
    setPage('Types')
  }

  const confirm = (type) => {
    dispatch(getMangasByTypesAction({
      limit: 12,
      offset: offset,
      type: type,
    }))
  }

  const confirmGenres = (selectedGenres) =>{
    dispatch(getMangasByGenresAction({
      limit: 12,
      offset: offset,
      genre__title: selectedGenres
    }))
    setPage('Genres')
  }
  const filterTypeMangasByYears = (startYear, endYear) => {
    dispatch(setMangasByYear(mangasByType?.results?.filter(item => item?.issue_year >= startYear && item?.issue_year <= endYear)))
    setPage('Years')
  }
  const filterMangasByYears = (startYear,endYear) => {
    dispatch(setMangasByYear(mangas?.results?.filter(item => item?.issue_year >= startYear && item?.issue_year <= endYear)))
    setPage('Years')
  }

  //pagination
  const selectPagination = (name) => {
    if(name === 'Mangas') {
      return <PaginationFunc changePage={changeOffset} count={Math.ceil(mangas?.count / 12)}/>
    } else if(name === 'Types') {
      return <PaginationFunc changePage={changeOffset} count={Math.ceil(mangasByType?.count / 12)}/>
    } else if(name === 'Genres') {
      return <PaginationFunc changePage={changeOffset} count={Math.ceil(mangaByGenres?.count / 12)}/>
    } else if(name === 'Years') {
      return <PaginationFunc changePage={changeOffset} count={Math.ceil(mangasByYears?.length / 12)}/>
    } else if(name === 'TopMangas') {
      return <PaginationFunc changePage={changeOffset} count={Math.ceil(topMangas?.count / 12)}/>
    }
  }

  //select page
  const selectPage = (page) => {
    if(page === 'Mangas') {
      return !load
      ? 
      mangas?.results?.map((item) => (
        <Link key={item?.id} to={`${item?.id}`}>
          <CardManga toInfoManga={toManga} manga={item} key={item?.id}/>
        </Link>
      ))
      :
      <Box className={classes.load}>
        <CircularProgress/>
      </Box>
    } else if(page === 'Types') {
      return !load 
      ? 
      mangasByType?.results?.map((item) => (
        <Link key={item?.id} to={`${item?.id}`}>
          <CardManga toInfoManga={toManga} manga={item} key={item?.id}/>
        </Link>
      ))
      :
      <Box className={classes.load}>
        <CircularProgress/>
      </Box>
    } else if(page === 'Genres') {
      return !load
      ? 
      mangaByGenres?.results?.map((item) => (
        <Link key={item?.id} to={`${item?.id}`}>
          <CardManga toInfoManga={toManga} manga={item} key={item?.id}/>
        </Link>
      ))
      :
      <Box className={classes.load}>
        <CircularProgress/>
      </Box>
    } else if(page === 'Years') {
      return (
        mangasByYears?.map((item) => (
        <Link key={item?.id} to={`${item?.id}`}>
          <CardManga toInfoManga={toManga} manga={item} key={item?.id}/>
        </Link>
        )
      ))
    } else if(page === 'TopMangas') {
      return !load
      ? 
      topMangas?.results?.map((item) => (
        <Link key={item?.id} to={`${item?.id}`}>
          <CardManga toInfoManga={toManga} manga={item} key={item?.id}/>
        </Link>
      ))
      :
      <Box className={classes.load}>
        <CircularProgress/>
      </Box>
    }
  }

  //+++
  return (
   <Box className={classes.main_page} sx={{backgroundColor: '#F3F3F3'}}>
    <Container 
      sx={{
        '&.MuiContainer-root': {
          padding: 0,
          Width: '1240px',
        },
      }}
      className={classes.container}
    >
      <Box className={classes.main_inner}>
        {
          !all
          ?
          <Filter 
            confirm={confirm}
            offset={offset}
            changeOffset={changeOffset}
            resetAll={resetAll}
            filterByYears={filterMangasByYears} 
            filterTypeByYear={filterTypeMangasByYears}
            changePageToTypes={changePageToTypes}
            changeFilter={changeFilter}
            types={types}
            startYear={startYear}
            endYear={endYear}
          />
          :
          <TwoFilter
            confirmGenres={confirmGenres}
            resetAll={resetAll}
            genres={genresArr}
            changePage={changePage}
            changeFilter={changeFilter}
            selectedGenres={selectGenres}
            offset={offset}
            changeOffset={changeOffset}
            filterByYears={filterMangasByYears}
          />
        }
        <Box className={classes.mangas_page}>
          {selectPage(page)}
        </Box>
      </Box>
      <Box className={classes.pagination_component}>
        {selectPagination(page)}
      </Box>
    </Container>
   </Box>
  )
}

export default MainPage