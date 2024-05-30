import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import * as Yup from "yup";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { getUser } from './store/accountSlice';
import { useAppDispatch,useAppSelector } from 'app/store';
import instance from 'src/app/auth/services/api/customAxios';
const CreateModal=({handleClose, show, setOpenSuccessSnackbar})=>{
  const dispatch = useAppDispatch()
  const [form, setForm] = useState({
    fullName: "",
    avatar: "",
    phone: "",
    email: "",
    password: "",
    farm:{
      label:"",
      value:""
    }
  });
  const [errors, setErrors] = useState({
    fullName: "",
    avatar: "",
    phone: "",
    email: "",
    password: "",
  });
  const role = useAppSelector((state: any) => state.accountReducer.accountsSlice.role)
  const pageNumber = useAppSelector((state: any) => state.accountReducer.accountsSlice.accounts.pagination.pageNumber)
  const pageSize = useAppSelector((state: any) => state.accountReducer.accountsSlice.accounts.pagination.pageSize)
  const [showPW, setShowPW]=useState(false)
  const validationSchema = Yup.object({
    fullName: Yup.string().trim().required("Name is required"),
    email: Yup.string().trim()
      .email("Invalid email format")
      .required("Email name is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    password: Yup.string().trim()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.{}|<>]/,
        "Password must contain at least one special character"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
  });

  const [createFail, setCreateFail]=useState(false)
  const [createFailMessage, setCreateFailMessage]=useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(form, { abortEarly: false });
      await instance.post(`/${role}s/registrations`,role === 'staff' ? {
        "name": form.fullName,
        "email": form.email,
        "phone": form.phone,
        "password": form.password,
        "farmId": form.farm.value
      } : {
        "name": form.fullName,
        "email": form.email,
        "phone": form.phone,
        "password": form.password,
      }).then(async() => {
        await dispatch(getUser({ role: role, params: { pageNumber: pageNumber, pageSize: pageSize } }));
      setErrors({
        fullName: "",
        avatar: "",
        phone: "",
        email: "",
        password: ""
      });
      setOpenSuccessSnackbar(true);
      handleClose();
      }).catch(error => {
        setCreateFail(true);
        setCreateFailMessage(error.response.data);
      }) 
    } catch (error) {
      const errorObject = {
        fullName: "",
        avatar: "",
        phone: "",
        email: "",
        password: ""
      };
      if (error.inner) {
        error.inner.forEach((err) => {
          errorObject[err.path] = err.message;
        });
      }
      setErrors(errorObject);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
  };

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
    useEffect(()=>{
      if(farms.length>0) {
        console.log('chay5')
        setForm({...form, farm: farms[0]})};
    },[farms])
    return <Dialog fullWidth
    open={show}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      Create
    </DialogTitle>
      <form onSubmit={handleSubmit}>
    <DialogContent>
        <Stack direction='column' spacing={2} className='pt-5'>
      <TextField helperText={errors.fullName !== "" && errors.fullName} 
      error={errors.fullName == ""? false: true} value={form.fullName}
      onChange={handleChange} label='Name' name='fullName'
      placeholder='Enter phone' size='small' variant="outlined" />

      <TextField helperText={errors.email !== "" && errors.email} 
      error={errors.email == ""? false: true} value={form.email}
      onChange={handleChange} label='Email' name='email'
      placeholder='Enter email' size='small' variant="outlined" />

      <TextField helperText={errors.phone !== "" && errors.phone} 
      error={errors.phone == ""? false: true} value={form.phone}
      onChange={handleChange} label='Phone' name='phone'
      placeholder='Enter phone' size='small' variant="outlined" />
      
      <TextField helperText={errors.password !== "" && errors.password} type={showPW ? 'text' : 'password'}
      error={errors.password == ""? false: true} value={form.password} InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={()=>{setShowPW((prev) => !prev)}} edge="end">
              {showPW ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      onChange={handleChange} label='Password' name='password'
      placeholder='Enter password' size='small' variant="outlined" />

      {role === 'staff' && <Autocomplete size='small' fullWidth disableClearable value={form.farm} onChange={(event, value) => setForm({...form, farm: value})}
      options={farms} isOptionEqualToValue={(option, value) => option.value === value.value}
      renderInput={(params) => <TextField {...params} label="Farm" />}
      />}
        </Stack>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={handleClose}>Cancel</Button>
      <Button variant='contained' color='secondary' type='submit'>Add</Button>
    </DialogActions>
        </form>
  <Snackbar open={createFail} autoHideDuration={3500} onClose={()=>{setCreateFail(false)}} anchorOrigin={{vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={()=>{setCreateFail(false)}}
          severity="error" variant="filled" sx={{ width: '100%' }}>
          {createFailMessage}
        </Alert>
      </Snackbar>
  </Dialog>
}

export default CreateModal