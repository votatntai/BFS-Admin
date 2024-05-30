import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import * as Yup from "yup";

const CreateModal=({handleClose, show})=>{
  const [form, setForm] = useState({
    fullName: "",
    avatar: "",
    phone: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    avatar: "",
    phone: "",
    email: "",
    password: "",
  });
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Name is required"),
    // email: Yup.string()
    //   .email("Invalid email format")
    //   .required("Email name is required"),
    // phone: Yup.string()
    //   .matches(/^\d{10}$/, "Phone number must be 10 digits")
    //   .required("Phone number is required"),
    // password: Yup.string()
    //   .required("Password is required")
    //   .min(8, "Password must be at least 8 characters")
    //   .matches(
    //     /[!@#$%^&*(),.{}|<>]/,
    //     "Password must contain at least one special character"
    //   )
    //   .matches(/[0-9]/, "Password must contain at least one number")
    //   .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    //   .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(form, { abortEarly: false });
      console.log(form);
      setErrors({
        fullName: "",
        avatar: "",
        phone: "",
        email: "",
        password: "",
    });
    } catch (error) {
      const errorObject = {
        fullName: "",
        avatar: "",
        phone: "",
        email: "",
        password: "",
      };
      // console.log(error.inner);
      error.inner.forEach((err) => {
        errorObject[err.path] = err.message;
      });
      setErrors(errorObject);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
  };
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
      <form onSubmit={handleSubmit}>
        <Stack direction='column' spacing={2} className='pt-5'>
      <TextField helperText={errors.fullName !== "" && errors.fullName} 
      error={errors.fullName == ""? false: true} value={form.fullName}
      onChange={handleChange} label='Name' name='fullName'
      placeholder='Enter name' size='small' variant="outlined" />

        </Stack>
        </form>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={handleClose}>Cancel</Button>
      <Button variant='contained' color='secondary' onClick={handleSubmit} >Add</Button>
    </DialogActions>
  </Dialog>

}

export default CreateModal