import { Box, Typography } from '@mui/material'
import React from 'react'
import classes from './SearhModal.module.css'

function SearchCardManga({toManga, manga}) {
  return (
    <Box onClick={toManga(manga?.id)} className={classes.card}>
      <Box sx={{backgroundImage: `url(${manga?.image})`}} className={classes.card_img}></Box>
      <Typography variant='h4'>{manga?.ru_name}</Typography>
    </Box>
  )
}

export default SearchCardManga