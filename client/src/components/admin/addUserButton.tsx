'use client';

import * as React from 'react';
import Button from '@mui/joy/Button';
import ModalAddUser from '@/components/admin/modal.addUser';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

export default function AddUserButton() {
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
        Thêm mới người dùng
      </Button>
      <ModalAddUser open={openAddUser} setOpen={setOpenAddUser} />
    </>
  );
}
