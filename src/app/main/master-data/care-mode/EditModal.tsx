import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useAppDispatch, useAppSelector } from 'app/store';
import { editCaremode, caremodeReducerState, getCaremodeData } from './slice/caremodeSlice';
import { ObjectCaremodeToEdit } from '../../type/care-mode.type';

const EditModal = ({show,handleClose, object, setOpenSuccessSnackbar, setOpenFailSnackbar})=>{
  const [caremode, setCaremode] =useState<ObjectCaremodeToEdit>({
    id: object.id,
    name: object.name,
  }) 
    const [checkName, setCheckName] = useState(false)
    const [checkThumbnailURL, setCheckThumbcheckThumbnailURL] = useState(false)
    const [file, setFile] = useState(object.thumbnailUrl)
    const [localFile, setLocalFile] = useState(null) //để render image push từ local lên
    const pageNumber  = useAppSelector((state: caremodeReducerState) => state.caremodeReducer.caremodeSlice.caremodes.pagination.pageNumber)
    const pageSize  = useAppSelector((state: caremodeReducerState) => state.caremodeReducer.caremodeSlice.caremodes.pagination.pageSize)
    const dispatch = useAppDispatch()
    const checkValid= () =>{
      let check: boolean = true
      if(caremode.name.trim() === '') {setCheckName(true)} else setCheckName(false)
      if(caremode.name.trim() === ''){
          check = false
      }
      return check;
    }
  
    const edit = async() => {
      const validate = checkValid()
      if(validate) {
        const id:string = caremode.id
        await dispatch(editCaremode({"id":id, formData: {"name":caremode.name}}))
        await dispatch(getCaremodeData({pageNumber: pageNumber, pageSize: pageSize}))
        setOpenSuccessSnackbar(true)
        handleClose()
      }else setOpenFailSnackbar(true)
    }  
    return <Dialog fullWidth
    open={show}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      Edit
    </DialogTitle>
    <DialogContent>
        <Stack direction='column' spacing={2} className='pt-5'>
      <TextField helperText={checkName ? "This field is required" : false} 
      error={checkName ? true : false} value={caremode.name} onKeyPress={e => {if(e.key === 'Enter') edit()}}
      onChange={e => setCaremode(prev => ({...prev, name: e.target.value}))} label='Name' 
      placeholder='Enter name' size='small' variant="outlined" />
        </Stack>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={handleClose}>Cancel</Button>
      <Button variant='contained' color='success' onClick={edit} >Edit</Button>
    </DialogActions>
    
  </Dialog>
}

export default EditModal