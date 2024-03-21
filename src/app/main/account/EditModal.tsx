import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
const EditModal = ({show,handleClose, object})=>{
    const [name, setName] = useState(object.name)
    const [username, setUsername] = useState(object.username)
    const [email, setEmail] = useState(object.email)
    const [address, setAddress] = useState(object.address.city)
    const [checkAddress, setCheckAddress] = useState(false)
    const [checkName, setCheckName] = useState(false)
    const [checkUsername, setCheckUsername] = useState(false)
    const [checkEmail, setCheckEmail] = useState(false)
    
    const checkValid= () =>{
      let check: boolean = true
      if(name.trim() === '') {setCheckName(true)} else setCheckName(false)
      if(username.trim() === '') {setCheckUsername(true)} else setCheckUsername(false)
      if(address.trim() === '') { setCheckAddress(true)} else setCheckAddress(false)
      if(name.trim() === '' || address.trim() === '' || username.trim()===''){
          check = false
      }
      return check;
    }
  
    const edit = async() => {
      const validate = checkValid()
      if(validate) console.log('edit successfully')
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
      error={checkName ? true : false} value={name}
      onChange={e => setName(e.target.value)} label='Name' 
      placeholder='Enter name' size='small' variant="outlined" />
      
      <TextField helperText={checkUsername ? "This field is required" : false} 
      error={checkUsername ? true : false} value={username}
      onChange={e => setUsername(e.target.value)} label='Username' 
      placeholder='Enter username' size='small' variant="outlined" />

      <TextField helperText={checkAddress ? "This field is required" : false} 
      error={checkAddress ? true : false} value={address}
       onChange={e => setAddress(e.target.value)} label='Adderss' 
       placeholder='Enter address' size='small' variant="outlined" />

        </Stack>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={handleClose}>Cancel</Button>
      <Button variant='contained' color='success' onClick={edit} >Edit</Button>
    </DialogActions>
  </Dialog>
}

export default EditModal