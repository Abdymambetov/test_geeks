import { Box, Typography, Container, AppBar, InputAdornment, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoManga from '../../images/headerImg/logo.svg'
import { CssTextField } from '../../theme/Theme'
import classes from './Header.module.css'
import searchImg from '../../images/headerImg/searchLoop.svg'
import { useDispatch } from 'react-redux'
function Header() {
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const [modal, setModal] = useState('register')
  const [modalStyle, setModalStyle] = useState(['none','static'])
  const [media, setMedia] = useState(['3px', '1'])
  
  const openRegModal = () => {
    setOpenModal(true)
    setModalStyle(['block', 'absolute'])
    setModal('register')
  }
  const openLogModal = () => {
    setOpenModal(true)
    setModalStyle(['block', 'absolute'])
    setModal('login')
  }
  const closeLoginModal = () => {
    setOpenModal(false)
    setModalStyle(['none', 'static'])
    setModal('login')
  }
  function isLoginedUser(log) {
    if(log) {
      return(
        <Box className={classes.profile_user}>
          <Box>
            <Typography variant='span' className={classes.profile_name}>
              Meder
            </Typography>
          </Box>
          <Box className={classes.profile_img} sx={{backgroundImage: `url(${searchImg})`}}></Box>
          <Button variant='containder'>
            <Typography variant='span'>Выйти</Typography>
          </Button>
        </Box>
      )
    } else{
      return(
        <Box className={classes.header_auth}>
          <Button 
            onClick={openLogModal}
            variant="outlined"
            sx={{
              padding: '12px 40px',
              color: '#000',
              border: '2px solid #AD02E0',
              borderRadius: '8px',
              '&:hover': {
                color: '#FFFFFF',
                background: '#AD02E0',
                border: '2px solid #AD02E0',
                boxShadow: '0px 0px 20px #AD02E0',
              },
              '&:active': {
                background: '#740994',
                boxShadow: 'inset 0px 0px 20px rgba(0, 0, 0, 0.25)',
              },
            }}
          >
            <Typography variant='span'>
              Войти
            </Typography>
          </Button>
          <Button 
            onClick={openRegModal}
            variant="contained"
            color="neutral"
            sx={{
              padding: '12px 40px',
              borderRadius: '8px',
              '&:hover': {
                color: '#FFFFFF',
                boxShadow: '0px 0px 20px #AD02E0',
              },
              '&:active': {
                background: '#740994',
                boxShadow: 'inset 0px 0px 20px rgba(0, 0, 0, 0.25)',
              },
            }}
          >
            <Typography variant='span'>
              Регистрация 
            </Typography>
          </Button>
        </Box>
      )
    }
  }
  return (
      <AppBar sx={{background: '#f3f3f3' }}>
        <Container
          fixed
          sx={{
            '&.MuiContainer-root': {
              padding: 0,
              maxWidth: 1240,
            },
          }}
        >
          <Box className={classes.header}>
            <Link>
              <Box className={classes.header_logo}>
                <Box>
                  <img src={logoManga} alt="manga" />
                </Box>
                <Box>
                  <Typography variant='h4'>
                    MangoRead
                  </Typography>
                  <Typography variant='span'  sx={{ fontSize: '16px', color: '#878787' }}>
                    Читай мангу вместе с нами
                  </Typography>
                </Box>
              </Box>
            </Link>
            <Box className={classes.header_input_search}>
              <CssTextField
                variant='outlined'
                placeholder='Placeholder'
                sx={{ height: '56px', width: '342px' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <img 
                      src={searchImg} 
                      alt='search'
                      style={{
                        borderRadius: '8px',
                        opacity: media[1],
                        height: '18px',
                        marginRight: media[0],
                        transition: '0.5s',
                      }}/>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
            {isLoginedUser()}
          </Box>
        </Container>
      </AppBar>
  )
}
  


export default Header