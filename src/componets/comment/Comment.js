import React from 'react'
import classes from './Comment.module.css'
import { Box, Typography } from '@mui/material'

function Comment({item}) {
  return (
    <Box className={classes.comments_parent}>
        <Box sx={{backgroundImage: `url(${item?.user?.image_file})`}} className={classes.user_avatar}></Box>
        <Box className={classes.user_comment}>
            <Box sx={{marginLeft: '26px'}}>
                <Typography variant='h3' className={classes.name_text}>{item?.user?.username},  {item?.user?.nickname}</Typography>
                <Typography paragraph className={classes.text}>{item?.text}</Typography>
            </Box>
        </Box>
    </Box>
  )
}

export default Comment