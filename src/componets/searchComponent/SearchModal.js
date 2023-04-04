import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOneMangaAction, setMangaId } from '../../store/slices/mangaSlice'
import SearchCardManga from './SearchCardManga'
import classes from './SearhModal.module.css'
function SearchModal({results}) {
  const dispatch = useDispatch()
  const {mangaId} = useSelector(state => state.manga)
  useEffect(() => {
    dispatch(getOneMangaAction(mangaId))
  }, [mangaId, dispatch])
  const toManga = (id) => {
    dispatch(setMangaId(id))
  }
  return (
    <Box className={classes.results}>
        {results?.length > 12
        ? results.slice(0, 12).map(item => <Link key={item?.id} to={`${item?.id}`}><SearchCardManga key={item?.id} toManga={toManga} manga={item}/></Link>)
        : results.map(item => <Link key={item?.id} to={`${item?.id}`}><SearchCardManga key={item?.id} toManga={toManga} manga={item}/></Link>)
        }
    </Box>
  )
}

export default SearchModal