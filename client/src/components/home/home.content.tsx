'use client'
import { Box } from '@mui/joy'
import React from 'react'
import ListCategories from './listCategories'

type ListCategoriesProps = {
    listCategories: IBackendRes<any>[];
  };

export default function HomeContent( {listCategories}: ListCategoriesProps ) {
  return (
    <Box>
        <ListCategories listCategories={listCategories}/>
    </Box>
  )
}
