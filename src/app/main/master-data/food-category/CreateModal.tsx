import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { ObjectFoodCategoryToCreate } from '../../type/food-category.type';
import { useAppDispatch,useAppSelector } from 'app/store';
import { addFoodCategory, foodCategoryReducerState, getFoodCategoryData } from './slice/foodCategorySlice';
const CreateModal=({handleClose, show, setOpenFailSnackbar, setOpenSuccessSnackbar})=>{
    const [foodCategory, setFoodCategory] =useState<ObjectFoodCategoryToCreate>({
      name: '',
    })
    const formData = new FormData()
    const [checkName, setCheckName] = useState(false)
    const dispatch = useAppDispatch()
    const pageNumber  = useAppSelector((state: foodCategoryReducerState) => state.foodCategoryReducer.foodCategorySlice.foodCategories.pagination.pageNumber)
    const pageSize  = useAppSelector((state: foodCategoryReducerState) => state.foodCategoryReducer.foodCategorySlice.foodCategories.pagination.pageSize)
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
        const data={
          name:foodCategory.name
        }
        await dispatch(addFoodCategory(data))
        await dispatch(getFoodCategoryData({pageNumber: pageNumber, pageSize: pageSize}))
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