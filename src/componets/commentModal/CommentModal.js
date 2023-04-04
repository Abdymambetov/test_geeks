import React, {useState}from 'react'
import classes from './CommentModal.module.css'
import { Box, Button, Modal, Typography, TextField } from '@mui/material'
import { useSelector } from 'react-redux'
import CloseIcon  from '@mui/icons-material/Close';

function CommentModal({open, closeModal, modalStyle, postCommFunc}) {
  const {mangaId} = useSelector(state => state.manga)
  const [text, setText] = useState('')
  const data = {
    id: mangaId,
    text: {
        "text": text
    }
  }
  const profileUser = JSON.parse(localStorage.getItem('profile'))
  return (
    <Box sx={{display: `${modalStyle}`}}>
      <Modal open={open} onClose={closeModal} className={classes.modal_comment}>
        <Box className={classes.modal_inner} sx={{position: 'relative'}}>
            <CloseIcon sx={{position: 'absolute', right: '10px', top: '10px'}} onClick={closeModal}/>
            <Box className={classes.profile_info}>
                <Box sx={{backgroundImage: `url(${profileUser?.image_file})`}} className={classes.user_avatar}></Box>
                <Typography className={classes.profile_text} variant='p'>{`${profileUser?.username},`} {profileUser?.nickname}</Typography>
            </Box>
            <Box className={classes.add_comm}>
                <TextField
                label='Добавьте комментарий' 
                variant='outlined'
                sx={{'& .MuiInputBase-root': {
                    height: '52px',
                    width: '500px',
                    padding: '0 10px',
                    borderRadius: '8px 0px 0px 8px'
                }}}
                onChange={(e) => setText(e.target.value)}
                />
                <Button variant='outlined' sx={{backgroundColor: '#AD02E0',color: 'white','&:hover':{
                backgroundColor: '#AD02E0'
                }}} className={classes.send} onClick={() => postCommFunc(data)}>
                    Добавить
                </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default CommentModal