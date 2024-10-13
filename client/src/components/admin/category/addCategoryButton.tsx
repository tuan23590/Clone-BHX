'use client';

import * as React from 'react';
import Button from '@mui/joy/Button';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ModalAddCategory from './modal.addCategory';

export default function AddCategoryButton() {
  const [openAddUser, setOpenAddUser] = React.useState(false);

  return (
    <>
      <Button
        color="primary"
        startDecorator={<PersonAddAltIcon />}
        size="md"
        onClick={(e) => {
          e.preventDefault();
          setOpenAddUser(true);
        }}
      >
        Thêm mới danh mục
      </Button>
      <ModalAddCategory open={openAddUser} setOpen={setOpenAddUser} />
    </>
  );
}
