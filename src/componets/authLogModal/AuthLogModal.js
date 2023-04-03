import React, { useState } from 'react'
import { Box, Typography, TextField, Modal, Checkbox, Button } from '@mui/material'
import CloseIcon  from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux'
import classes from './AuthLogModal.module.css'
import swal from 'sweetalert'
import { logInAction, regisUserAction, setAddPassword, setAddUsername } from '../../store/slices/regisSlice';

function AuthLogModal({users,openReg, openLog, profile, openMod, modalClass, type, closeLogMod}) {
  const dispatch = useDispatch()
  const {userInfo} = useSelector(state => state.auth)
  const [username, setUserName] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [uplFile,setUplFile] = useState(null)
  const [fileURL, setFileURL] = useState(null)

  const fileReader = new FileReader()
  fileReader.onloadend = () => {
    setFileURL(fileReader.result)
  }

  const setFile = (e) =>{
    e.preventDefault()
    const file = e.target.files[0]
    setUplFile(file)
    fileReader.readAsDataURL(file)
  }

  const handleClickRegis = (e) => {
    e.preventDefault()
    if(username === '' || password === '' || nickname === '' || uplFile === null){
      swal({text:'Заполните ВСЕ поля!',icon:'warning'})
      return false
    }else if(username.length < 9 || password.length < 9 || nickname.length < 9){
      swal({text:'Имя, Никнейм и Пароль должны содержать как минимум 10 символов!',icon:'warning'})
      return false
    }else if(users.find(u => u.username === username)){
      swal({text: 'Такой пользователь уже зарегистрирован', icon:'warning'})
    } else{
        const param = {
          "username": username,
          "password": password,
          "nickname": nickname,
          "image_file": uplFile
        }
        dispatch(regisUserAction(param))
        swal({text: 'Успешно',icon: 'success'})
    }
  }

  const handleCLickLogin = (e) => {
    e.preventDefault()
    if(userInfo.username === '' || userInfo.password === '') {
      swal({text: 'Заполните все поля!', icon:'warning'})
      return
    } else {
      dispatch(logInAction(userInfo))
      localStorage.setItem('profile', JSON.stringify(profile))
      swal({text: 'Вы успешно вошли', icon: 'success'})
    }
  }
  function choiseLog(state) {
    if(state === 'login') {
      return(
        <Box className={classes.login_user}>
          <Box className={classes.login_inputs}>
            <TextField 
            onChange={(e) => dispatch(setAddUsername(e.target.value))}
            placeholder="Username" 
            className={classes.auth_input}
            sx={{
              '& .MuiInputBase-root': {
                  borderRadius: '8px',
                  width: '500px',
                  height: '52px'
            }
          }}/>
            <TextField 
            onChange={(e) => dispatch(setAddPassword(e.target.value))}
            placeholder="Password" 
            className={classes.auth_input}
            sx={{
              '& .MuiInputBase-root': {
                  borderRadius: '8px',
                  width: '500px',
                  height: '52px'
            }
          }}/>
          </Box>
          <Box className={classes.login_inner}>
            <Box className={classes.log_checkbox}>
              <Checkbox size='large'/>
              <Typography variant='h4' sx={{color: '#878787'}}>
                Запомнить меня
              </Typography>
            </Box>
            <Button variant='contained' className={classes.button_log} sx={{borderRadius: '8px'}} onClick={handleCLickLogin}>
              <Typography variant='span'>Войти</Typography>
            </Button>
          </Box>
        </Box>
      )
    } else if(state === 'register'){
      return(
        <Box className={classes.regis_user}>
          <Box className={classes.regImg}>
            <Box className={classes.img} sx={{backgroundImage: `url(${fileURL ? fileURL : 'Выберите фото'})`}}></Box>
            <Button className={classes.addPhoto} component='label'>Добавить фото <input onChange={setFile} hidden accept="image/*,.png,.jpg,.gif,.web," multiple type="file"/></Button>
          </Box>
          <Box className={classes.regInputs}>
            <TextField 
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username" 
              className={classes.auth_input}
              sx={{
                '& .MuiInputBase-root': {
                    borderRadius: '8px',
                    width: '500px',
                    height: '52px'
                }
              }}
            />
            <TextField 
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Nickname" 
              className={classes.auth_input}
              sx={{
                '& .MuiInputBase-root': {
                    borderRadius: '8px',
                    width: '500px',
                    height: '52px'
                }
              }}
            />
            <TextField 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" 
              className={classes.auth_input}
              sx={{
                '& .MuiInputBase-root': {
                    borderRadius: '8px',
                    width: '500px',
                    height: '52px'
                }
              }}
            />
            <Button
            onClick={handleClickRegis}
              variant="contained"
              className={classes.buttonReg}
              sx={{borderRadius: '8px'}}>
              <Typography variant="span">Регистрация</Typography>
            </Button>
          </Box>
        </Box>
      )
    }
  }
  return (
    <Box
      sx={{ display: `${modalClass[0]}`, position: `${modalClass[1]}` }}
    >
      <Modal open={openMod} onClose={closeLogMod} className={classes.modal_forms}>
        <Box className={classes.modal_inner}>
          <Box className={classes.close_cross}>
            <CloseIcon onClick={closeLogMod}/>
          </Box>
          <Box className={classes.choise}>
            <Button 
              sx={{color: '#000', borderBottom: `${type === 'login' && '5px solid #AD02E0'}`, transition: '.3s'}}
            >
              <Typography variant="span" sx={{ fontSize: '24px' }} onClick={openLog}>
                Вход
              </Typography>
            </Button>
            <Button sx={{ color: '#000', borderBottom: `${type === 'Reg' && '5px solid #AD02E0'}`}}>
              <Typography variant="span" sx={{ fontSize: '24px' }} onClick={openReg}>
                Регистрация
              </Typography>
            </Button>
          </Box>
          {choiseLog(type)}
        </Box>
      </Modal>
    </Box>
  )
}

export default AuthLogModal