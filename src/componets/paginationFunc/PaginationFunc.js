import React from 'react'
import { Box,Pagination } from '@mui/material'

function PaginationFunc({changePage, count}) {
  return (
    <Box sx={{padding: '28px 0 32px'}}>
        <Pagination
            sx={{
                '& button.Mui-selected ': {
                color: '#fff'
                },
                '& button': {
                color: '#A5A5A5',
                }
            }} 
            color='secondary' 
            size='large' 
            count={count} 
            onChange={(_,p) => changePage((p - 1) * 12)}
        />
    </Box>
  )
}

export default PaginationFunc