import React, { useEffect } from 'react'
import classes from './MangaInfoPage.module.css'
import { Box, Typography, Container, Pagination,Button, CircularProgress} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux'
import { getOneMangaAction } from '../../store/slices/mangaSlice'
import { genresAction } from '../../store/slices/genresSlice'
import { Link } from 'react-router-dom';

function MangaInfoPage() {
  const dispatch = useDispatch()
  const {manga, mangaId, load} = useSelector(state => state.manga)
  const {genresArr} = useSelector(state => state.genres)
  useEffect(() => {
    dispatch(getOneMangaAction(mangaId))
  }, [mangaId, dispatch])
  useEffect(() => {
    dispatch(genresAction())
  }, [dispatch])

  const decodedText = decodeURIComponent(manga?.description)
  const cleanText = decodedText.replace(/<\/?[^>]+(>|$)/g, "").replace(/&mdash;/g, "-").replace(/&raquo;/g, "»").replace(/&laquo;/g, "«").replace(/&ndash;/g, "-");
  return (
    <Box className={classes.info_page}>
      {!load 
        ? 
        (
          <Container 
          sx={{
            '&.MuiContainer-root': {
              padding: 0,
              width: '1240px',
            },
          }}>
            <Link to='/'  style={{textDecoration: 'none'}}>
              <Box className={classes.go_back}>
                <ArrowBackIcon/>
                <Typography variant='span'>Назад</Typography>
              </Box>
                <Box className={classes.all_info_manga}>
                  <Box sx={{backgroundImage: `url(${manga?.image})`}} className={classes.image_manga}></Box>
                  <Box className={classes.info_block}>
                    <Typography variant='h2' sx={{ fontSize: '40px' }}>
                      {manga?.ru_name}
                    </Typography>
                    <Typography variant='p' className={classes.info_text}>
                      Информация:
                    </Typography>
                    <Typography variant='p'>
                      Тип:
                      <Typography variant='span' className={classes.type_info}>
                        {manga?.type}
                      </Typography> 
                    </Typography>
                    <Typography variant='p'>
                      Год:
                      <Typography variant='span' className={classes.type_info}>{manga?.issue_year}</Typography>
                    </Typography>
                    <Typography sx={{display: 'flex'}} variant='p'>
                      Жанр:
                      <Box className={classes.text_genres}>
                        {manga?.genre?.map((item) => (
                          <Typography className={classes.type_info} variant='span' key={item}>
                            {genresArr[item].title},
                          </Typography>
                        ))}
                      </Box>
                    </Typography>
                  </Box>
                </Box>
                <hr className={classes.hr_line}/>
                <Box className={classes.manga_info_tex}>
                  <Typography variant='h3'>Синопсис</Typography>
                  <Typography className={classes.p} paragraph>
                    {cleanText}
                  </Typography>
                </Box>
            </Link>
          </Container>
        )
        :
        (<Box>
          <CircularProgress/>
        </Box>)
      }
    </Box>
  )
}

export default MangaInfoPage