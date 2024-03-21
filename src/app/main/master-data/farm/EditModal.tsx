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
import { ObjectFarmToEdit } from '../../type/farm.type';
import { useAppDispatch, useAppSelector } from 'app/store';
import { editFarm, farmReducerState, getFarmData } from './slice/farmSlice';

const EditModal = ({show,handleClose, object, setOpenSuccessSnackbar, setOpenFailSnackbar})=>{
  const [farm, setFarm] =useState<ObjectFarmToEdit>({
    id: object.id,
    name: object.name,
    thumbnailUrl: object.thumbnailURL,
    address: object.address,
    phone: object.phone,
  }) 
  const [checkAddress, setCheckAddress] = useState(false)
    const [checkName, setCheckName] = useState(false)
    const [checkPhone, setCheckPhone] = useState(false)
    const [checkThumbnailURL, setCheckThumbcheckThumbnailURL] = useState(false)
    const [file, setFile] = useState(object.thumbnailUrl)
    const [localFile, setLocalFile] = useState(null) //để render image push từ local lên
    const pageNumber  = useAppSelector((state: farmReducerState) => state.farmReducer.farmSlice.farms.pagination.pageNumber)
    const pageSize  = useAppSelector((state: farmReducerState) => state.farmReducer.farmSlice.farms.pagination.pageSize)
    const dispatch = useAppDispatch()
    const checkValid= () =>{
      let check: boolean = true
      if(farm.name.trim() === '') {setCheckName(true)} else setCheckName(false)
      if(farm.phone.trim() === '') {setCheckPhone(true)} else setCheckPhone(false)
      if(farm.address.trim() === '') { setCheckAddress(true)} else setCheckAddress(false)
      if(farm.thumbnailUrl === '') { setCheckThumbcheckThumbnailURL(true)} else setCheckThumbcheckThumbnailURL(false)
      if(farm.name.trim() === '' || farm.address.trim() === '' || farm.phone.trim()==='' || farm.thumbnailUrl === ''){
          check = false
      }
      return check;
    }
  
    const edit = async() => {
      const validate = checkValid()
      const formData = new FormData()
      if(validate) {
        const id:string = farm.id
        formData.append('name', farm.name)
        formData.append('address', farm.address)
        formData.append('phone', farm.phone)
        formData.append('thumbnail', file)
        await dispatch(editFarm({id, formData}))
        await dispatch(getFarmData({pageNumber: pageNumber, pageSize: pageSize}))
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

      <TextField helperText={checkAddress ? "This field is required" : false} 
      error={checkAddress ? true : false} value={farm.address}
       onChange={e => setFarm(prev => ({...prev, address: e.target.value}))} label='Adderss' 
       placeholder='Enter address' size='small' variant="outlined" />
      
      <TextField helperText={checkPhone ? "This field is required" : false} 
      error={checkPhone ? true : false} value={farm.phone}
       onChange={e => setFarm(prev => ({...prev, phone: e.target.value}))} label='Phone' 
       placeholder='Enter phone number' size='small' variant="outlined" />

<Stack direction="row" spacing={2}>
              <Button variant='contained' onClick={()=>document.getElementById('fileInput').click()}>
                  <FuseSvgIcon>heroicons-outline:cloud-upload</FuseSvgIcon>
                  Upload image
              </Button>
              <input id="fileInput" type="file" hidden={true} onChange={(e: any) => {
              setFarm(prev => ({...prev, thumbnailUrl: "có thumbnail"}))
              setFile(e.target.files[0])
              setLocalFile(URL.createObjectURL(e.target.files[0]))
            }} />
            {file && <Button variant='contained' onClick={()=>{setFarm(prev => ({...prev, thumbnailUrl: "" }))
                    setFile(null)}}>
                  <FuseSvgIcon>heroicons-outline:x-circle</FuseSvgIcon>
                  Clear image
            </Button>}
            </Stack>
            {checkThumbnailURL &&<div style={{color:'red'}}>Thumbnail is required!</div>}
      {file && <img src={localFile!==null ? localFile : file} alt="Selected Image" style={{ marginTop: '10px', maxWidth: '100%' }} />}
        </Stack>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={handleClose}>Cancel</Button>
      <Button variant='contained' color='success' onClick={edit} >Edit</Button>
    </DialogActions>
    
  </Dialog>
}

export default EditModal