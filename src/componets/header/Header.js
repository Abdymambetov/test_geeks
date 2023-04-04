import { Box, Typography, Container, AppBar, InputAdornment, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoManga from '../../images/headerImg/logo.svg'
import { CssTextField } from '../../theme/Theme'
import classes from './Header.module.css'
import searchImg from '../../images/headerImg/searchLoop.svg'
import { useDispatch, useSelector } from 'react-redux'
import AuthLogModal from '../authLogModal/AuthLogModal'
import { getProfileUserAction, logOutAction } from '../../store/slices/regisSlice'
import SearchModal from '../searchComponent/SearchModal'
import { searchMangaAction, setSearch } from '../../store/slices/mangaSlice'
function Header() {
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const [modal, setModal] = useState('register')
  const [modalStyle, setModalStyle] = useState(['none','static'])
  const [media, setMedia] = useState(['3px', '1'])
  const [searchModal, setSearchModal] = useState(false)
  const {search, searchText} = useSelector(state => state.manga)
  const {users, logined, userInfo} = useSelector(state=> state.auth)

  let account = users?.find(user => user.username === userInfo.username) 
  const refreshToken = JSON.parse(localStorage.getItem('refreshToken'))
  if(!account){
    account = JSON.parse(localStorage.getItem('profile'))
  }
  useEffect(() => {
    dispatch(getProfileUserAction())
  }, [])

  const logOutFunc = () =>{
    dispatch(logOutAction({refresh: refreshToken}))
    
  }
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
  const hide = () => {
    setMedia(['3px', '1']);
    setTimeout(() =>{setSearchModal(false)},1000)
  }

  // useEffect(() => {
  //   dispatch(searchMangaAction({
  //     search: searchText !== '' && searchText
  //   }))
  // }, [searchText, dispatch])
  const clickSearch = () => {
    dispatch(searchMangaAction({
      search: searchText !== '' && searchText
    }))
  }
  function isLoginedUser(log) {
    return log
      ?
        (<Box className={classes.profile_user}>
          <Box>
            <Typography variant='span' className={classes.profile_name}>
              {account?.username}
            </Typography>
          </Box>
          <Box className={classes.profile_img} sx={{backgroundImage: `url(${account?.image_file})`}}></Box>
          <Button 
            variant='containder' 
            onClick={logOutFunc}
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
            <Typography variant='span'>Выйти</Typography>
          </Button>
        </Box>
        )
      :
        (<Box className={classes.header_auth}>
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
          <AuthLogModal users={users} openReg={openRegModal} openLog={openLogModal} profile={account && account} openMod={openModal} modalClass = {modalStyle} type={modal} closeLogMod={closeLoginModal}/>
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
  const searchModalFunc = (state) => {
    if(state === true) {
      return search?.length> 0 && <SearchModal results={search?.length > 0 && search} className={classes.block_search}/>
    } else{
      return false
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
                sx={{ height: '56px', width: '342px', paddingLeft: '50px' }}
                onClick={() => {
                  setSearchModal(true);
                }}
                onChange={(e) => {
                  dispatch(setSearch(e.target.value));
                }}
                onFocus={() => setMedia(['-16px', '0'])}
                onBlur={() => hide()}
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
              <Button onClick={clickSearch}>Searh</Button>
              {searchModalFunc(searchModal)}
            </Box>
            {isLoginedUser(logined)}
          </Box>
        </Container>
      </AppBar>
  )
}
  


export default Header