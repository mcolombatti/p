import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import DeleteIcon from '@mui/icons-material/Delete';
import { useTours, ToursProvider } from '../context/Tours.Context';
export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const { tours,remove } = useTours();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    
  };

  const handleAccept = () => {
    setOpen(false);
    remove(props.tour)
  };

  return (
    <div>
      <Button startIcon={<DeleteIcon />} variant="outlined" color="error" className='delete' onClick={handleClickOpen}>
        Eliminar
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Estas a punto de eliminar un registro"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           ¿Estas seguro que deseas eliminar el registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAccept} autoFocus>
           Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}