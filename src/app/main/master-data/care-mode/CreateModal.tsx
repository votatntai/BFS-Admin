import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { ObjectCaremodeToCreate } from '../../type/care-mode.type';
import { useAppDispatch, useAppSelector } from 'app/store';
import { addCaremode, caremodeReducerState, getCaremodeData } from './slice/caremodeSlice';
const CreateModal=({handleClose, show, setOpenFailSnackbar, setOpenSuccessSnackbar})=>{
    const [caremode, setCaremode] =useState<ObjectCaremodeToCreate>({
      name: '',
      priority: 0,
    })
    const [checkName, setCheckName] = useState(false)
    const dispatch = useAppDispatch()
    const pageNumber  = useAppSelector((state: caremodeReducerState) => state.caremodeReducer.caremodeSlice.caremodes.pagination.pageNumber)
    const pageSize  = useAppSelector((state: caremodeReducerState) => state.caremodeReducer.caremodeSlice.caremodes.pagination.pageSize)
    const checkValid= () =>{
      let check: boolean = true
      if(caremode.name.trim() === '') {setCheckName(true)} else setCheckName(false)
      if(caremode.name.trim() === '' ){
          check = false
      }
      return check;
    }
  
    const add = async() => {
      const validate = checkValid()
      if(validate) {
        await dispatch(addCaremode({name: caremode.name, priority:caremode.priority.toString() }))
        await dispatch(getCaremodeData({pageNumber: pageNumber, pageSize: pageSize}))
        setOpenSuccessSnackbar(true)
        handleClose()
      } else setOpenFailSnackbar(true)
    }  

  return <Dialog fullWidth
    open={show}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      Create
    </DialogTitle>
    <DialogContent>
        <Stack direction='column' spacing={2} className='pt-5'>
      <TextField helperText={checkName ? "This field is required" : false} 
      error={checkName ? true : false} value={caremode.name}
      onChange={e => setCaremode(prev => ({...prev, name: e.target.value}))} label='Name' 
      placeholder='Enter name' size='small' variant="outlined" />
      
      {/* <TextField helperText={checkPriority ? "This field is required and can not smaller than 0" : false} 
      error={checkPriority ? true : false} value={caremode.priority} type="number"
      onChange={e => setCaremode(prev => ({...prev, priority: parseInt(e.target.value)}))} label='Priority' 
      placeholder='Enter name' size='small' variant="outlined" /> */}

      </Stack>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={handleClose}>cancel</Button>
      <Button variant='contained' color='secondary' onClick={add} >Add</Button>
    </DialogActions>
  </Dialog>

}

export default CreateModal