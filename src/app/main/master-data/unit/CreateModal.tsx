import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { ObjectUnitToCreate } from '../../type/unit-of-measurement.type';
import { useAppDispatch,useAppSelector } from 'app/store';
import { addUnit, unitReducerState, getUnitData } from './slice/unitSlice';
const CreateModal=({handleClose, show, setOpenFailSnackbar, setOpenSuccessSnackbar})=>{
    const [unit, setUnit] =useState<ObjectUnitToCreate>({
      name: '',
    })
    const formData = new FormData()
    const [checkName, setCheckName] = useState(false)
    const dispatch = useAppDispatch()
    const pageNumber  = useAppSelector((state: unitReducerState) => state.unitReducer.unitSlice.units.pagination.pageNumber)
    const pageSize  = useAppSelector((state: unitReducerState) => state.unitReducer.unitSlice.units.pagination.pageSize)
    const checkValid= () =>{
      let check: boolean = true
      if(unit.name.trim() === '') {setCheckName(true)} else setCheckName(false)
      if(unit.name.trim() === ''){
          check = false
      }
      return check;
    }
  
    const add = async() => {
      const validate = checkValid()
      if(validate) {
        await dispatch(addUnit({name: unit.name}))
        await dispatch(getUnitData({pageNumber: pageNumber, pageSize: pageSize}))
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
      error={checkName ? true : false} value={unit.name}
      onChange={e => setUnit(prev => ({...prev, name: e.target.value}))} label='Name' 
      placeholder='Enter name' size='small' variant="outlined" />
      </Stack>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={handleClose}>cancel</Button>
      <Button variant='contained' color='secondary' onClick={add} >Add</Button>
    </DialogActions>
  </Dialog>

}

export default CreateModal