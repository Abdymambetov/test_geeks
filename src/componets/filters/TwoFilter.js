import React, {useState, useEffect} from 'react'
import classes from './AllFilter.module.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Typography, Button, Checkbox, RadioGroup, FormControlLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setTypes } from '../../store/slices/mangaSlice';
import { setGenres } from '../../store/slices/genresSlice';

function TwoFilter({confirmGenres, resetAll, genres, changePage, changeFilter, selectedGenres, offset}) {
  const [resetAndApply, setResetAndApply] = useState(['Сбросить', 'Применить'])
  const dispatch = useDispatch()
  const changeFilterBack = () => {
    changeFilter()
  }
  const deleteAll = () => {
    dispatch(setTypes(''))
    dispatch(setGenres(''))
    resetAll()
  }
  useEffect(() => {
    confirmGenres(selectedGenres)
  }, [selectedGenres, offset]);
  
  return (
    <Box className={classes.filter_parent}>
      <Box className={classes.go_back_filter} onClick={changeFilterBack}>
        <ArrowBackIosIcon/>
        <Typography variant='span'>Назад</Typography>
      </Box>
      <Box className={classes.types_genres_2}>
          <Typography variant='span'>Жанры</Typography>
          <RadioGroup className={classes.checkbox_genres_two} sx={{flexWrap: 'nowrap', gap: '2px'}}>
            {genres.map((item) => (
              <FormControlLabel
              key={item?.id}
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '24px',
                },
              }}
              onChange={({target}) => {
                target.checked
                  ? dispatch(setGenres(item?.title))
                  : dispatch(setGenres(''))
              }}
              control={
                <Checkbox
                
                checked={item?.title === selectedGenres}
                key={item?.id}
                sx={{
                  color: '#2FE09B',
                  '& svg': {
                    width: 40,
                    height: 40,
                  },
                  '&.Mui-checked': {
                    color: '#2FE09B',
                  },
                  '&.MuiCheckbox-root':{
                    padding: '0 10px'
                  },
                  '&.MuiCheckbox-root:hover': {
                    background: 'none',
                    padding: '0 10px'
                  },
                }}
                />
              }
              label={item?.title}
              />
            ))}
          </RadioGroup>
      </Box>
      <Box className={classes.btn_filters}>
        <Button 
        className={classes.one_btn_filter}
        variant="outlined"
        sx={{
          padding: '16px 40px',
          background: '#C94CEE',
          color: '#fff',
          '&:hover': {
            boxShadow: '0px 0px 20px #AD02E0',
            background: '#C94CEE'
          },
        }}
        onBlur={() => {
          setResetAndApply(['Сбросить', 'Применить'])
        }}
        onClick={() => {deleteAll()}}
        >
          <Typography variant='span'>{resetAndApply[0]}</Typography>
        </Button>
        <Button
        sx={{
          padding: '16px 40px',
          background: '#AD02E0',
          color: '#fff',
          '&:hover': {
            boxShadow: '0px 0px 20px #AD02E0',
            background: '#AD02E0'
          },
        }}
        onBlur={() => {
          setResetAndApply(['Сбросить', 'Применить'])
        }}
        onClick={() => {
          confirmGenres(selectedGenres)
        }}
        className={classes.one_btn_filter}
        >
          <Typography variant='span'>{resetAndApply[1]}</Typography>
        </Button>
      </Box>
    </Box>
  )
}

export default TwoFilter