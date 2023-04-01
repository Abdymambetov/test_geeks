import React from 'react'
import { Box } from '@mui/system'
import {Typography } from '@mui/material'
import classes from './CardManga.module.css'
function CardManga({manga, toInfoManga}) {
  return (
    <Box 
        className={classes.manga} 
        sx={{backgroundImage: `url(${manga?.image})`}} 
        onClick={() => toInfoManga(manga?.id)}
    >
      <Typography variant='p' sx={{fontSize: '14px', color: '#FFFFFF'}}>{`Год: ${manga?.issue_year}`}</Typography>
      <Typography variant='span' sx={{color: '#FFFFFF', fontWeight: 500}}>{manga?.ru_name}</Typography>
    </Box>
  )
}

export default CardManga