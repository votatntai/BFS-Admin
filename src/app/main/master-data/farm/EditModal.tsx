import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useAppDispatch, useAppSelector } from 'app/store';
import {getFarmData } from './slice/farmSlice';
import * as Yup from "yup";
import instance from 'src/app/auth/services/api/customAxios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const EditModal = ({show,handleClose, object, setOpenSuccessSnackbar})=>{
  const [farm, setFarm] =useState({
    id: object.id,
    name: object.name,
    thumbnailUrl: object.thumbnailURL,
    address: object.address,
    phone: object.phone,
    manager:{
      label: object.manager.name,
      value: object.manager.id
    }
  }) 
  const [errors, setErrors] = useState({
    name: "",
    address: "",
    phone: "",
  });
    const [file, setFile] = useState(object.thumbnailUrl)
    const [localFile, setLocalFile] = useState(null) //để render image push từ local lên
    const pageNumber  = useAppSelector((state) => state.farmReducer.farmSlice.farms.pagination.pageNumber)
    const pageSize  = useAppSelector((state) => state.farmReducer.farmSlice.farms.pagination.pageSize)
    const dispatch = useAppDispatch()
    const validationSchema = Yup.object({
      name: Yup.string().trim().required("Name is required"),
      address: Yup.string().trim()
        .required("Address is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
    });
    const [snackbarNotify, setSnackbarNotify] =useState(false)
    const [responseMsg, setResponseMsg] =useState("")
    const edit = async() => {
      try{
        await validationSchema.validate(farm, { abortEarly: false });
        const formData = new FormData()
          const id:string = farm.id
          formData.append('name', farm.name)
          formData.append('address', farm.address)
          formData.append('phone', farm.phone)
          formData.append('managerId', farm.manager.value)
          formData.append('thumbnail', file)
          await instance.put(`/farms/${id}`,formData).then(
            async(res) => {
              console.log(res)
              await dispatch(getFarmData({pageNumber: pageNumber, pageSize: pageSize}))
              setErrors({
                name: "",
                address: "",
                phone: "",
              })
              setOpenSuccessSnackbar(true)
              handleClose()
            }
          ).catch(err => {
            setResponseMsg(err.response.data)
            setSnackbarNotify(true)
          })
      }catch(error){
        const errorObject = {
          name: "",
          phone: "",
          address: "",
        };
        if (error.inner) {
          error.inner.forEach((err) => {
            errorObject[err.path] = err.message;
          });
        }
        setErrors(errorObject);
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
    return <Dialog fullWidth open={show} onClose={handleClose}>
    <DialogTitle>Edit</DialogTitle>
    <DialogContent>
        <Stack direction='column' spacing={2} className='pt-5'>
      <TextField helperText={errors.name !== "" && errors.name} 
      error={errors.name !== "" ? true : false} value={farm.name}
      onChange={e => setFarm(prev => ({...prev, name: e.target.value}))} label='Name' 
      placeholder='Enter name' size='small' variant="outlined" />

      <TextField helperText={errors.address !== "" && errors.address} 
      error={errors.address !== "" ? true : false} value={farm.address}
       onChange={e => setFarm(prev => ({...prev, address: e.target.value}))} label='Adderss' 
       placeholder='Enter address' size='small' variant="outlined" />
      
      <TextField helperText={errors.phone !== "" && errors.phone} 
      error={errors.phone !== "" ? true : false} value={farm.phone}
       onChange={e => setFarm(prev => ({...prev, phone: e.target.value}))} label='Phone' 
       placeholder='Enter phone number' size='small' variant="outlined" />

      <Autocomplete value={farm.manager} disableClearable options={managers} fullWidth size='small' isOptionEqualToValue={(option, value) => option.value === value.value}
            onChange={(e, value) => setFarm(prev => ({...prev, manager: value}))} renderInput={(params) => <TextField {...params} label="Manager" />}/>

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
      {file && <img src={localFile!==null ? localFile : file} alt="Selected Image" style={{ marginTop: '10px', maxWidth: '100%' }} />}
        </Stack>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={handleClose}>Cancel</Button>
      <Button variant='contained' color='success' onClick={edit} >Edit</Button>
    </DialogActions>
    <Snackbar open={snackbarNotify} autoHideDuration={3000} onClose={()=>{setSnackbarNotify(false)}} anchorOrigin={{vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={()=>{setSnackbarNotify(false)}}
          severity="error" variant="filled" sx={{ width: '100%' }}>
          {responseMsg}
        </Alert>
      </Snackbar>
  </Dialog>
}

export default EditModal