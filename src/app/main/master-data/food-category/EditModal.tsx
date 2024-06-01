import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from 'app/store';
import { editFoodCategory, foodCategoryReducerState, getFoodCategoryData } from './slice/foodCategorySlice';
import { ObjectFoodCategoryToEdit } from '../../type/food-category.type';

const EditModal = ({show,handleClose, object, setOpenSuccessSnackbar, setOpenFailSnackbar})=>{
  const [foodCategory, setfoodCategory] =useState<ObjectFoodCategoryToEdit>({
    id: object.id,
    name: object.name,
  }) 
    const [checkName, setCheckName] = useState(false)
    const pageNumber  = useAppSelector((state: foodCategoryReducerState) => state.foodCategoryReducer.foodCategorySlice.foodCategories.pagination.pageNumber)
    const pageSize  = useAppSelector((state: foodCategoryReducerState) => state.foodCategoryReducer.foodCategorySlice.foodCategories.pagination.pageSize)
    const dispatch = useAppDispatch()
    const checkValid= () =>{
      let check: boolean = true
      if(foodCategory.name.trim() === '') {setCheckName(true)} else setCheckName(false)
      if(foodCategory.name.trim() === ''){
          check = false
      }
      return check;
    }
  
    const edit = async() => {
      const validate = checkValid()
      if(validate) {
        const id:string = foodCategory.id
        const data ={
          name:foodCategory.name
        }
        await dispatch(editFoodCategory({id, data}))
        await dispatch(getFoodCategoryData({pageNumber: pageNumber, pageSize: pageSize}))
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
      error={checkName ? true : false} value={foodCategory.name} onKeyPress={e => {if(e.key === 'Enter') edit()}}
      onChange={e => setfoodCategory(prev => ({...prev, name: e.target.value}))} label='Name' 
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