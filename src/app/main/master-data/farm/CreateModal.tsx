import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { ObjectFarmToCreate } from '../../type/farm.type';
import { useAppDispatch } from 'app/store';
import { addFarm } from './slice/farmSlice';
const CreateModal=({handleClose, show,setOpenFailSnackbar,setOpenSuccessSnackbar})=>{
    const [farm, setFarm] =useState<ObjectFarmToCreate>({
      name: '',
      thumbnailUrl: '',
      address:'',
      phone:'',
      managerId: "34691515-a93b-461e-8fa3-de6c06ca3095",
    })
    const formData = new FormData()
    const [file, setFile] =useState(null)
    const [checkName, setCheckName] = useState(false)
    const [checkAddress, setCheckAddress] = useState(false)
    const [checkPhone, setCheckPhone] = useState(false)
    const [checkThumbnailURL, setCheckThumbnailURL] = useState(false)
    const dispatch = useAppDispatch()
    const checkValid= () =>{
      let check: boolean = true
      if(farm.name.trim() === '') {setCheckName(true)} else setCheckName(false)
      if(farm.address.trim() === '') { setCheckAddress(true)} else setCheckAddress(false)
      if(farm.phone.trim() === '') { setCheckPhone(true)} else setCheckPhone(false)
      if(farm.thumbnailUrl.trim() === '') { setCheckThumbnailURL(true)} else setCheckThumbnailURL(false)
      if(farm.name.trim() === '' || farm.address.trim() === '' || farm.phone.trim() === '' || farm.thumbnailUrl.trim() === ''){
          check = false
      }
      return check;
    }
  
    const add = async() => {
      const validate = checkValid()
      if(validate) {
        formData.append('name',farm.name)
        formData.append('thumbnail',file)
        formData.append('address',farm.address)
        formData.append('phone',farm.phone)
        formData.append('managerId',farm.managerId)
        await dispatch(addFarm(formData))
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
      error={checkName ? true : false} value={farm.name}
      onChange={e => setFarm(prev => ({...prev, name: e.target.value}))} label='Name' 
      placeholder='Enter name' size='small' variant="outlined" />

      <TextField helperText={checkAddress ? "This field is required" : false} 
      error={checkAddress ? true : false} value={farm.address}
      onChange={e => setFarm(prev => ({...prev, address: e.target.value}))} label='Adderss' 
       placeholder='Enter address' size='small' variant="outlined" />

      <TextField helperText={checkPhone ? "This field is required" : false}  
      error={checkPhone ? true : false} value={farm.phone} 
      onChange={e => setFarm(prev => ({...prev, phone: e.target.value}))} label='Phone' 
      placeholder='Enter phone number' size='small' variant="outlined" />
      
      <TextField helperText={checkThumbnailURL ? "This field is required" : false}  
      error={checkThumbnailURL ? true : false} value={farm.thumbnailUrl} type="file"
      inputProps={{ accept: "image/png, image/jpeg, image/jpg" }}
      onChange={(e: any) => {
        setFarm(prev => ({...prev, thumbnailUrl: e.target.value}))
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