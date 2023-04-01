import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { setEndYear, setStartYear, setTypes } from '../../store/slices/mangaSlice';
import classes from './AllFilter.module.css'
import { Box, Typography, Button, Checkbox, FormControlLabel, RadioGroup, TextField } from '@mui/material';


function Filter({changePageToTypes, changeFilter,resetAll,confirm,offset,changeOffset, filterByYears, filterTypeByYear,startYear,endYear,types}) {
    const dispatch = useDispatch()
    const mangaTypes = ['Манга', 'Манхва', 'Западный комикс', 'Маньхуа']
    const [resetAndApply, setResetAndApply] = useState(['Сбросить', 'Применить'])

    const deleteAll = () => {
        resetAll()
        dispatch(setTypes(''))
    }
    const checkType = (startYear, endYear) => {
        types === '' 
        ?
        filterByYears(startYear,endYear)
        : 
        filterTypeByYear(startYear,endYear) 
    }  
    useEffect(() => {
        confirm(types)
    }, [offset,types])
    
    return (
        <Box className={classes.filter_parent}>
            <Box className={classes.genres_all} onClick={changeFilter}>
                <Typography>Жанры</Typography>
                <Button className={classes.btn_genres}>
                    <Typography 
                        textTransform="lowercase"
                        variant="span"
                        sx={{ fontWeight: '400', color: '#878787', fontSize: '24px' }}
                    >
                    Все
                    </Typography>
                    <ArrowForwardIosIcon sx={{ color: '#878787' }}/>
                </Button>
            </Box>
            <Box className={classes.types_genres}>
                <Typography variant='p'>Тип</Typography>
                <RadioGroup className={classes.checkbox_btn}>
                    {mangaTypes.map((type, index) => (
                        
                        <FormControlLabel
                        key={index}
                        onChange={({target}) => {
                            target.checked
                                ? dispatch(setTypes(type))
                                : dispatch(setTypes(''))
                            changeOffset(0)
                        }}
                        sx={{
                            '& .MuiFormControlLabel-label': {
                                fontSize: '24px',
                            },
                        }}
                        control={
                            <Checkbox
                            key={index}
                            onClick={changePageToTypes}
                            checked={type === types}
                            sx={{
                                color: '#2FE09B',
                                '& svg': {
                                  width: 40,
                                  height: 40,
                                },
                                '&.Mui-checked': {
                                  color: '#2FE09B',
                                },
                                '&.MuiCheckbox-root:hover': {
                                  background: 'none',
                                },
                            }}
                            />
                        }
                        label={type}
                        />
                    ))}
                </RadioGroup>
                <Box className={classes.inputs_year}>
                    <TextField
                    className={classes.start_year_input}
                    variant="outlined"
                    type="number"
                    color="secondary"
                    placeholder="От 0"
                    value={startYear > 0 && startYear}
                    onChange={(e) => dispatch(setStartYear(e.target.value))}
                    sx={{
                        width: '168px',
                        height: '55px',
                        '& input': {
                          paddingLeft: '15px',
                        },
                        '& .MuiInputBase-root': {
                          '& fieldset': {
                            border: '2px solid #2FE09B',
                            borderRadius: '8px'
                          },
                        },
                        '& .MuiInputBase-root:hover fieldset': {
                          borderColor: '#2FE09B',
                        },
                      }}
                    />
                    <HorizontalRuleIcon/>
                    <TextField 
                    className={classes.end_year_input}
                    variant="outlined"
                    type="number"
                    color="secondary"
                    placeholder="До 2022"
                    onChange={(e) => dispatch(setEndYear(e.target.value))}
                    sx={{
                        width: 168,
                        height: 55,
                        '& input': {
                          paddingLeft: '15px',
                        },
                        '& .MuiInputBase-root': {
                          '& fieldset': {
                            border: '2px solid #2FE09B',
                            borderRadius: '8px'
                          },
                        },
                        '& .MuiInputBase-root:hover fieldset': {
                          borderColor: '#2FE09B',
                        },
                    }}
                    />
                </Box>
            </Box>
            <Box className={classes.btn_filters}>
                <Button
                className={classes.one_btn_filter}
                variant="outlined"
                onClick={deleteAll}
                onBlur={() => {
                  setResetAndApply(['Сбросить', 'Применить'])
                }}
                sx={{
                  padding: '16px 40px',
                  background: '#C94CEE',
                  borderRadius: '8px',
                  color: '#fff',
                  '&:hover': {
                    boxShadow: '0px 0px 20px #AD02E0',
                    background: '#C94CEE'
                  },
                }}
                >
                    <Typography variant='span'>{resetAndApply[0]}</Typography>
                </Button>
                <Button 
                onClick={()=> checkType(startYear, endYear)}
                onBlur={() => {
                  setResetAndApply(['Сбросить', 'Применить'])
                }}
                className={classes.one_btn_filter}
                variant="outlined"
                sx={{
                  padding: '16px 40px',
                  background: '#AD02E0',
                  borderRadius: '8px',
                  color: '#fff',
                  '&:hover': {
                    boxShadow: '0px 0px 20px #AD02E0',
                    background: '#AD02E0'
                  },
                }}
                >
                    <Typography variant='span'>{resetAndApply[1]}</Typography>
                </Button>
            </Box>
        </Box>
    )
}

export default Filter