import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import instance from 'src/app/auth/services/api/customAxios';
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from 'app/store';
import { editUser, getUser } from './store/accountSlice';
import Avatar from '@mui/material/Avatar';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const EditModal = ({show,handleClose,setOpenSuccessSnackbar, object})=>{
  const dispatch=useAppDispatch()
  const [editFail, setEditFail] = useState(false)
  const [editFailMessage, setEditFailMessage] = useState(false)
  const role = useAppSelector((state: any) => state.accountReducer.accountsSlice.role)
  const pageNumber = useAppSelector((state: any) => state.accountReducer.accountsSlice.accounts.pagination.pageNumber)
    const pageSize = useAppSelector((state: any) => state.accountReducer.accountsSlice.accounts.pagination.pageSize)
    const [userInfo, setUserInfo] = useState({
      "id": object.id,
      "name": object.name,
      "avatarUrl": object.avatarUrl,
      "email": object.email,
      "phone": object.phone,
      "farm": {
        "label": object.farm.name,
        "value": object.farm.id
      },
      "status": object.status
    })
    const [imageSend, setImageSend]=useState(object.avatarUrl)
    const [errors, setErrors] = useState({
      name: "",
      avatar: "",
      phone: "",
      email: "",
    });
    const validationSchema = Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email name is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
    });
    const currentPhone = object.phone
    const handleEdit = async(e) => {
      e.preventDefault()
      try {
        const formData = new FormData()
        const checkForm = await validationSchema.validate(userInfo, { abortEarly: false });
        formData.append('name', checkForm.name)
        formData.append('email', checkForm.email)
        currentPhone !== checkForm.phone && formData.append('phone', checkForm.phone)
        formData.append('avatar', imageSend)
        formData.append('status', userInfo.status)
        await instance.put(`/${role}s/${userInfo.id}`,formData)
        .then(async() => {
          await dispatch(getUser({role: role, params:{pageNumber: pageNumber, pageSize: pageSize}}))
          setErrors({
            name: "",
            avatar: "",
            phone: "",
            email: "",
          })
          await setOpenSuccessSnackbar(true)
          handleClose()
        }).catch(error => {
          setEditFail(true);
          setEditFailMessage(error.response.data);
        })
      } catch (error) {
        const errorObject = {
          name: "",
          avatar: "",
          phone: "",
          email: "",
        };
        if (error.inner) {
          error.inner.forEach((err) => {
            errorObject[err.path] = err.message;
          });
        }
        setErrors(errorObject);
      }
    }  
    
    const [farms, setFarms] = useState([])
    const loadFarm = async() =>{
      try {
        const res = await instance.get('/farms', {params:{pageNumber:0, pageSize: 100}})
        if(res.data){
          setFarms(prevFarms => {
            // Map over the data and return the new array
            return res.data.map(item => ({ label: item.name, value: item.id }));
          });
        }
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
      loadFarm()
    },[])
    return <Dialog fullWidth
    open={show}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      Edit
    </DialogTitle>
      <form onSubmit={handleEdit}>
    <DialogContent>
        <Stack direction='column' spacing={2} className='pt-5'>
          <Stack direction='row' className='justify-center '>
          {userInfo.avatarUrl === null ? <Avatar className='cursor-pointer' sx={{ width: 56, height: 56 }} onClick={()=>{document.getElementById('fileInput').click()}} alt='user logo'/>
          : <Avatar className='cursor-pointer' onClick={()=>{document.getElementById('fileInput').click()}} sx={{ width: 56, height: 56 }} 
          src={userInfo.avatarUrl} />}
         <input id="fileInput" type="file" hidden={true} onChange={(e: any) => {
                const file = e.target.files[0];
                if (file) {
                  setUserInfo(prev => ({
                    ...prev,
                    avatarUrl: URL.createObjectURL(file)
                  }));
                  setImageSend(file);
                }
              }} />
          </Stack>
      <TextField  value={userInfo.name} helperText={errors.name !== "" && errors.name} 
      error={errors.name == ""? false: true}
      onChange={e => setUserInfo({...userInfo, name: e.target.value})} label='Fullname' 
      placeholder='Enter fullname' size='small' variant="outlined" />
      
      <TextField value={userInfo.email} helperText={errors.email !== "" && errors.email} 
      error={errors.email == ""? false: true}
      onChange={e => setUserInfo({...userInfo, email: e.target.value})} label='Email' 
      placeholder='Enter email' size='small' variant="outlined" />

      <TextField value={userInfo.phone} inputProps={{ maxLength: 10 }} helperText={errors.phone !== "" && errors.phone} 
      error={errors.phone == ""? false: true}
       onChange={e => setUserInfo({...userInfo, phone: e.target.value})} label='Phone' 
       placeholder='Enter phone' size='small' variant="outlined" />

    <Autocomplete size='small'
      disablePortal fullWidth disableClearable value={userInfo.farm} onChange={(event, value) => setUserInfo({...userInfo, farm: value})}
      options={farms} isOptionEqualToValue={(option, value) => option.value === value.value}
      renderInput={(params) => <TextField {...params} label="Farm" />}
    />

    <Autocomplete size='small'
      disablePortal fullWidth disableClearable value={userInfo.status} onChange={(event, value) => setUserInfo({...userInfo, status: value})}
      options={['Active', 'Disable']} isOptionEqualToValue={(option, value) => option.value === value.value}
      renderInput={(params) => <TextField {...params} label="Status" />}
    />
        </Stack>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={handleClose}>Cancel</Button>
      <Button variant='contained' color='success' type='submit' >Edit</Button>
    </DialogActions>
        </form>
        <Snackbar open={editFail} autoHideDuration={3500} onClose={()=>{setEditFail(false)}} anchorOrigin={{vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={()=>{setEditFail(false)}}
          severity="error" variant="filled" sx={{ width: '100%' }}>
          {editFailMessage}
        </Alert>
      </Snackbar>
  </Dialog>
}

export default EditModal