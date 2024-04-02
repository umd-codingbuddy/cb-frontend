import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, TextField, makeStyles } from '@mui/material';
import styles from './dialog.module.css';

const DialogBox = ({open,title,onClose, children}) => {
  return (
    <div>
      <Dialog open={open} onClose={onClose} className={styles.dialogBox}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent className={styles.dialogContent}>
            {children}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogBox;