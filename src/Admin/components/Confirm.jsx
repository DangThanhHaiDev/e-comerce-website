import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmDialog({open, handleCloseConfirm, id, handleConfirmed, status, isCancel}) {

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xác nhận chuyển đơn hàng sang bước tiếp theo"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn đã chuẩn bị kỹ lưỡng đơn hàng, bạn sẽ không thể quay lại!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Hủy</Button>
          <Button onClick={e=>handleConfirmed(id, status, isCancel)} autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
