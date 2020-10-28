/** @format */

import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3),
      outline: 'none',
    },
    closeIcon: {
      cursor: 'pointer',
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      zIndex: 100,
    },
  })
);

interface TransitionsModalProps {
  component: any;
  buttonText: string;
  buttonClassName?: string;
  wrapperClassName?: string;
}

const TransitionsModal: React.FC<TransitionsModalProps> = ({
  component,
  buttonClassName,
  buttonText,
  wrapperClassName,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type='button' onClick={handleOpen} className={buttonClassName}>
        {buttonText}
      </button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <div className={`${classes.paper} ${wrapperClassName}`}>
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
            {component}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default TransitionsModal;
