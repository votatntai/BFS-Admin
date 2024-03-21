import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { ObjectFoodToCreate } from '../../type/food.type';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useAppDispatch,useAppSelector } from 'app/store';
import { addFood, foodReducerState, getFoodData } from './slice/foodSlice';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'src/app/auth/services/api/customAxios';

const CreateModal=({handleClose, show, setOpenFailSnackbar, setOpenSuccessSnackbar})=>{
    const [food, setFood] =useState<ObjectFoodToCreate>({
      "thumbnail": "",
      "name": "",
      "foodCategoryId":{
        label: "", value: ""
      },
      "quantity": 0,
      "unitOfMeasurementId":{
        label: "", value: ""
      }
    })
    const formData = new FormData()
    const [file, setFile] =useState(null)
    const [checkName, setCheckName] = useState(false)
    const [checkThumbnail, setCheckThumbnail] = useState(false)
    const [checkFoodCategory, setCheckFoodCategory] = useState(false)
    const [checkUnit, setCheckUnit] = useState(false)
    const dispatch = useAppDispatch()
    const pageNumber  = useAppSelector((state: foodReducerState) => state.foodReducer.foodSlice.foods.pagination.pageNumber)
    const pageSize  = useAppSelector((state: foodReducerState) => state.foodReducer.foodSlice.foods.pagination.pageSize)
    const checkValid= () =>{
      let check: boolean = true
      if(food.name.trim() === '') {setCheckName(true)} else setCheckName(false)
      if(food.foodCategoryId === null || food.foodCategoryId.value === '' ) {setCheckFoodCategory(true)} else setCheckFoodCategory(false)
      if(food.thumbnail.trim() === '') { setCheckThumbnail(true)} else setCheckThumbnail(false)
      if(food.unitOfMeasurementId === null || food.unitOfMeasurementId.value==='') { setCheckUnit(true)} else setCheckUnit(false)
      if(food.name.trim() === '' || food.foodCategoryId === null || food.foodCategoryId.value === ''
      || food.thumbnail === '' || food.unitOfMeasurementId === null || food.unitOfMeasurementId.value === ''){
          check = false
      }
      return check;
    }
  
    const add = async() => {
      const validate = checkValid()
      if(validate) {
        formData.append('thumbnail',file)
        formData.append('name',food.name)
        formData.append('foodCategoryId',food.foodCategoryId.value)
        formData.append('quantity',food.quantity.toString())
        formData.append('unitOfMeasurementId',food.unitOfMeasurementId.value)
        await dispatch(addFood(formData))
        await dispatch(getFoodData({pageNumber: pageNumber, pageSize: pageSize}))
        setOpenSuccessSnackbar(true)
        handleClose()
      } else setOpenFailSnackbar(true)
    }  

    const [comboboxFoodCategory,setComboboxListFoodCategory] = useState([]);
    const [comboboxUOM,setComboboxUOM] = useState([]);
    const loadCombobox = async () => {
      const res = await axios.get(`/food-categories`)
      const res1 = await axios.get(`/unit-of-measurements`)
      if (res.data.length > 0) {
        const updatedComboboxList = res.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setComboboxListFoodCategory(updatedComboboxList);
      }
      if (res1.data.length > 0) {
        const updatedComboboxList = res1.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setComboboxUOM(updatedComboboxList);
      }
    };

    useEffect(() => {
      loadCombobox();
    }, []);

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
      error={checkName ? true : false} value={food.name}
      onChange={e => setFood(prev => ({...prev, name: e.target.value}))} label='Name' 
      placeholder='Enter name' size='small' variant="outlined" />
   
    {comboboxFoodCategory.length>0 &&<Autocomplete
              disablePortal  value={food.foodCategoryId}
              onChange={(event: any, newValue: any) => {
                setFood(prev => ({...prev, foodCategoryId: newValue}))
              }}
              options={comboboxFoodCategory} size='small'
              fullWidth
              renderInput={(params) => <TextField {...params} label={'Food categories'} helperText={checkFoodCategory ? "This field is required" : false}  
              error={checkFoodCategory ? true : false}/>}
            />}
      
      <TextField  value={food.quantity} type="number" InputProps={{ inputProps: { min: 0 } }}
      onChange={e => setFood(prev => ({...prev, quantity: parseInt(e.target.value)}))} label='Quantity' 
      placeholder='Enter name' size='small' variant="outlined" />

      {comboboxUOM.length>0 &&<Autocomplete
                  disablePortal  value={food.unitOfMeasurementId}
                  onChange={(event: any, newValue: any) => {
                    setFood(prev => ({...prev, unitOfMeasurementId: newValue}))
                  }}
                  options={comboboxUOM} size='small'
                  fullWidth
                  renderInput={(params) => <TextField {...params} label={'Unit'} helperText={checkUnit ? "This field is required" : false}  
                  error={checkUnit ? true : false}/>}
                />}
                
      <TextField helperText={checkThumbnail ? "This field is required" : false}  
            error={checkThumbnail ? true : false} value={food.thumbnail} type="file"
            inputProps={{ accept: "image/png, image/jpeg, image/jpg" }} InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {file && <IconButton onClick={()=>{
                    setFood(prev => ({...prev, thumbnail: "" }))
                    setFile(null)
                    }}>
                      <FuseSvgIcon>heroicons-outline:x-circle</FuseSvgIcon>
                    </IconButton>}
                </InputAdornment>
              ),
            }}
            onChange={(e: any) => {
              setFood(prev => ({...prev, thumbnail: e.target.value}))
              setFile(e.target.files[0])
            }} 
            size='small' variant="outlined" />
            {file && <img src={URL.createObjectURL(file)} alt="Selected Image" style={{ marginTop: '10px', maxWidth: '100%' }} />}
        </Stack>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={handleClose}>cancel</Button>
      <Button variant='contained' color='secondary' onClick={add} >Add</Button>
    </DialogActions>
  </Dialog>

}

export default CreateModal