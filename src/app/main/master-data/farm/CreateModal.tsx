import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useAppDispatch,useAppSelector } from 'app/store';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import instance from 'src/app/auth/services/api/customAxios';
import { getFarmData } from './slice/farmSlice';
const CreateModal=({handleClose, show,setOpenSuccessSnackbar})=>{
    const [farm, setFarm] =useState({
      name: '',
      thumbnailUrl: '',
      address:'',
      phone:'',
      manager: {
        label:"",
        value:""
      },
    })
    const pageNumber  = useAppSelector((state) => state.farmReducer.farmSlice.farms.pagination.pageNumber)
    const pageSize  = useAppSelector((state) => state.farmReducer.farmSlice.farms.pagination.pageSize)
    const formData = new FormData()
    const [file, setFile] =useState(null)
    const [checkName, setCheckName] = useState(false)
    const [checkAddress, setCheckAddress] = useState(false)
    const [checkPhone, setCheckPhone] = useState(false)
    const [checkManager, setCheckManager] = useState(false)
    const dispatch = useAppDispatch()
    const [snackbar, setSnackbar]=useState(false)
    const [responseMsg, setResponseMsg] = useState("")
    const checkValid= () =>{
      let check: boolean = true
      if(farm.name.trim() === '') {setCheckName(true)} else setCheckName(false)
      if(farm.address.trim() === '') { setCheckAddress(true)} else setCheckAddress(false)
      if(farm.phone.trim() === '') { setCheckPhone(true)} else setCheckPhone(false)
      if(farm.manager.value === '') { setCheckManager(true)} else setCheckManager(false)
      if(farm.name.trim() === '' || farm.address.trim() === '' || farm.phone.trim() === '' || farm.manager.value === ''){
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
        formData.append('managerId',farm.manager.value)
        await instance.post('/farms',formData)
        .then(async(res) =>{
          console.log(res.status)
          await dispatch(getFarmData({pageNumber: pageNumber, pageSize: pageSize}))
          setOpenSuccessSnackbar(true)
        handleClose()
        }).catch(err => {
          // console.log(err)
          setResponseMsg(err.response.data)
          setSnackbar(true)
        })
      } 
    }  
    const [managers, setManagers]=useState([])
    const loadManagers = async() => {
      await instance.get<any,any>('/managers',{
        params: {
          status: "Active",
          pageSize: 100,
          pageNumber: 0
        }
      })
      .then(res => {
        const updatedComboboxList = res.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setManagers(updatedComboboxList)
      })
      .catch(err => console.log(err))
    }
    useEffect(()=>{
      loadManagers()
    },[])
    return <Dialog fullWidth open={show} onClose={handleClose}  >
    <DialogTitle>
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
      
      <Autocomplete value={farm.manager} disableClearable options={managers} fullWidth size='small' isOptionEqualToValue={(option, value) => option.value === value.value}
      onChange={(e, value) => setFarm(prev => ({...prev, manager: value}))} renderInput={(params) => <TextField helperText={checkManager ? "This field is required" : false} error={checkManager ? true : false} {...params} label="Manager" />}
/>

      <TextField value={farm.thumbnailUrl} type="file"
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
      <Button variant='contained' onClick={handleClose}>Cancel</Button>
      <Button variant='contained' color='secondary' onClick={add} >Add</Button>
    </DialogActions>
    <Snackbar open={snackbar} autoHideDuration={3000} onClose={()=>{setSnackbar(false)}} anchorOrigin={{vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={()=>{setSnackbar(false)}}
          severity="error" variant="filled" sx={{ width: '100%' }}>
          {responseMsg}
        </Alert>
      </Snackbar>
  </Dialog>

}

export default CreateModal