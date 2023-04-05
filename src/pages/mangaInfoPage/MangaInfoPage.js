import React, { useEffect, useState } from 'react'
import classes from './MangaInfoPage.module.css'
import { Box, Typography, Container, Pagination,Button, CircularProgress} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux'
import { getCommentsMangaAction, getOneMangaAction, postCommentAction } from '../../store/slices/mangaSlice'
import { genresAction } from '../../store/slices/genresSlice'
import { Link } from 'react-router-dom';
import CommentModal from '../../componets/commentModal/CommentModal';
import Comment from '../../componets/comment/Comment';

function MangaInfoPage() {
  const dispatch = useDispatch()
  const {manga, mangaId, load, mangaComments} = useSelector(state => state.manga)
  const {genresArr} = useSelector(state => state.genres)
  const [open, setOpen] = useState(false)
  const [modalStyle, setModalStyle] = useState('none')
  const [offset, setOffset] = useState(1)
  const openModal = () => {
    setOpen(true)
    setModalStyle('block')
  }
  const closeModal = () => {
    setOpen(false)
    setModalStyle('none')
  }
  const changeOffset = (p) => {
    setOffset(p);
  };
  const postComFunc = (data) => {
    dispatch(postCommentAction(data))
  }
  useEffect(() => {
    dispatch(getOneMangaAction(mangaId))
  }, [mangaId, dispatch])

  useEffect(() => {
    dispatch(genresAction())
  }, [dispatch])

  useEffect(() => {
    dispatch(getCommentsMangaAction(mangaId))
  }, [mangaId, dispatch])
  
  const decodedText = decodeURIComponent(manga?.description)
  const cleanText = decodedText.replace(/<\/?[^>]+(>|$)/g, "")
  .replace(/&mdash;/g, "-").replace(/&raquo;/g, "»")
  .replace(/&laquo;/g, "«").replace(/&ndash;/g, "-")
  .replace(/&nbsp;/g, " ").replace(/&hellip;/g, "...")
  .replace(/&quot;/g, "\"");
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
            </Link>
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
                <hr className={classes.hr_line}/>
                <Box className={classes.comments_manga}>
                  <Box className={classes.add_com}>
                    <Typography variant='h3'>Топ комментарий</Typography>
                    <Typography variant='h3' sx={{color: '#AD02E0', fontSize: '18px'}} onClick={openModal}>Добавить комментарий</Typography>
                  </Box>
                  <Box className={classes.comments}>
                    {mangaComments.length > 0 
                      ?
                        (
                          mangaComments.slice(offset * 3 - 3, offset * 3).map(item => <Comment item={item}/>)
                        )
                      :
                        (
                          <Typography variant="h4">
                            Здесь нет комментариев
                          </Typography>
                        )
                    }
                  </Box>
                  <Box className={classes.pagination_block}>
                    <Pagination
                      color="secondary"
                      size="large"
                      sx={{
                        '& button.Mui-selected ': {
                          color: '#fff',
                        },
                        '& button': {
                          color: '#A5A5A5',
                        },
                      }}
                      onChange={(_,p)=> changeOffset(p)}
                      count={Math.ceil(manga?.comments_count / 3)}
                    />
                  </Box>
                </Box>
                <CommentModal open={open} closeModal={closeModal} modalStyle={modalStyle} postCommFunc={postComFunc}/>
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