import React from 'react'
import classes from './Footer.module.css'
import { Box, Container, Typography } from '@mui/material';
import logoManga from '../../images/headerImg/logo.svg';
import { Instagram, Twitter, Facebook } from '@mui/icons-material';
function Footer() {
  return (
    <Box className={classes.footer}>
      <Box className={classes.footerUnderline} sx={{ background: '#FFFFFF' }}>
        <Container fixed sx={{'&.MuiContainer-root':{
        padding: 0,
        maxWidth: 1240
      }}}>
          <Box className={classes.footerInner}>
            <Box className={classes.footerLogo}>
              <Box>
                <img src={logoManga} alt="logo" />
              </Box>
              <Box>
                <Typography variant="h4">MangoRead</Typography>
                <Typography
                  variant="span"
                  sx={{ fontSize: '16px', color: '#878787' }}>
                  Читай мангу с нами
                </Typography>
              </Box>
            </Box>
            <Box className={classes.footerLinks}>
              <Box className={classes.footerLink}>
                <Facebook />
                <Typography
                  variant="span"
                  sx={{ fontWeight: 600, fontFamily: 'Roboto' }}>
                  Link One
                </Typography>
              </Box>
              <Box className={classes.footerLink}>
                <Instagram />
                <Typography
                  variant="span"
                  sx={{ fontWeight: 600, fontFamily: 'Roboto' }}>
                  Link Two
                </Typography>
              </Box>
              <Box className={classes.footerLink}>
                <Twitter />
                <Typography
                  variant="span"
                  sx={{ fontWeight: 600, fontFamily: 'Roboto' }}>
                  Link Three
                </Typography>
              </Box>
            </Box>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6307.051589852468!2d-122.42250965472651!3d37.77771584865946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808eb456e2dd%3A0xcb1742ab59d38bda!2z0KHQuNCy0LjQuiDQodC10L3RgtC10YAsINCh0LDQvS3QpNGA0LDQvdGG0LjRgdC60L4sINCa0LDQu9C40YTQvtGA0L3QuNGPIDk0MTAyLCDQodCo0JA!5e0!3m2!1sru!2skg!4v1674495112170!5m2!1sru!2skg"
              width="400" height="250" style={{borderRadius: 20, border: "none"}} allowFullScreen="" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"></iframe>
          </Box>
        </Container>
      </Box>
      <Box className={classes.footerCom}>
        <Box className={classes.comInner}>
          <Typography
            variant="span"
            sx={{ fontFamily: 'Roboto', fontSize: 14 }}>
            ©2022, All right reserved.
          </Typography>
          <Typography
            variant="span"
            className={classes.comLink}
            sx={{ fontFamily: 'Roboto', fontSize: 14 }}>
            Privacy Policy
          </Typography>
          <Typography
            variant="span"
            className={classes.comLink}
            sx={{ fontFamily: 'Roboto', fontSize: 14 }}>
                Terms of Service
          </Typography>
          <Typography
            variant="span"
            className={classes.comLink}
            sx={{ fontFamily: 'Roboto', fontSize: 14 }}>
            Cookies Settings
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer