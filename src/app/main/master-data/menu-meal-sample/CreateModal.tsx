import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useAppDispatch,useAppSelector } from 'app/store';
import { addMenuMealSample, menuMealSampleReducerState, getMenuMealSampleData } from './slice/menuMealSampleSlice';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { ObjectMenuMealSampleToCreate } from '../../type/menu-meal-sample.type';
const CreateModal=({handleClose, show, setOpenFailSnackbar, setOpenSuccessSnackbar})=>{
    const [foodCategory, setFoodCategory] =useState<ObjectMenuMealSampleToCreate>({
      name: '',
    })
    const formData = new FormData()
    const [checkName, setCheckName] = useState(false)
    const dispatch = useAppDispatch()
    const pageNumber  = useAppSelector((state: menuMealSampleReducerState) => state.menuMealSampleReducer.menuMealSampleSlice.menuMealSamples.pagination.pageNumber)
    const pageSize  = useAppSelector((state: menuMealSampleReducerState) => state.menuMealSampleReducer.menuMealSampleSlice.menuMealSamples.pagination.pageSize)
    const checkValid= () =>{
      let check: boolean = true
      if(foodCategory.name.trim() === '') {setCheckName(true)} else setCheckName(false)
      if(foodCategory.name.trim() === ''){
          check = false
      }
      return check;
    }
  
    const add = async() => {
      const validate = checkValid()
      if(validate) {
        formData.append('name',foodCategory.name)
        await dispatch(addMenuMealSample(formData))
        await dispatch(getMenuMealSampleData({pageNumber: pageNumber, pageSize: pageSize}))
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
      error={checkName ? true : false} value={foodCategory.name}
      onChange={e => setFoodCategory(prev => ({...prev, name: e.target.value}))} label='Name' 
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