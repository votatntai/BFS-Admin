import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { ObjectUnitToEdit } from '../../type/unit-of-measurement.type';
import { useAppDispatch, useAppSelector } from 'app/store';
import { editUnit, unitReducerState, getUnitData } from './slice/unitSlice';

const EditModal = ({show,handleClose, object, setOpenSuccessSnackbar, setOpenFailSnackbar})=>{
  const [farm, setFarm] =useState<ObjectUnitToEdit>({
    id: object.id,      
    name: object.name,
  }) 
    const [checkName, setCheckName] = useState(false)
    const pageNumber  = useAppSelector((state: unitReducerState) => state.unitReducer.unitSlice.units.pagination.pageNumber)
    const pageSize  = useAppSelector((state: unitReducerState) => state.unitReducer.unitSlice.units.pagination.pageSize)
    const dispatch = useAppDispatch()
    const checkValid= () =>{
      let check: boolean = true
      if(farm.name.trim() === '') {setCheckName(true)} else setCheckName(false)
      if(farm.name.trim() === ''){
          check = false
      }
      return check;
    }
  
    const edit = async() => {
      const validate = checkValid()
      const formData = new FormData()
      if(validate) {
        const id:string = farm.id
        formData.append('name', farm.name.trim())
        await dispatch(editUnit({id, formData}))
        await dispatch(getUnitData({pageNumber: pageNumber, pageSize: pageSize}))
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
      error={checkName ? true : false} value={farm.name}
      onChange={e => setFarm(prev => ({...prev, name: e.target.value}))} label='Name' 
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