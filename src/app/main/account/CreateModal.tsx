import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
const CreateModal=({handleClose, show})=>{
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [tax, setTax] = useState('')
    const [checkName, setCheckName] = useState(false)
    const [checkAddress, setCheckAddress] = useState(false)
    const [checkTax, setCheckTax] = useState(false)
    const checkValid= () =>{
      let check: boolean = true
  
      if(name.trim() === '') {setCheckName(true)} else setCheckName(false)
      if(address.trim() === '') { setCheckAddress(true)} else setCheckAddress(false)
      if(tax.trim() === '') { setCheckTax(true)} else setCheckTax(false)
      if(name.trim() === '' || address.trim() === '' || tax.trim() === ''){
          check = false
      }
      return check;
    }
  
    const add = async() => {
      const validate = checkValid()
      if(validate) console.log('add successfully')
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

      <TextField helperText={checkAddress ? "This field is required" : false} 
      error={checkAddress ? true : false} value={address}
       onChange={e => setAddress(e.target.value)} label='Adderss' 
       placeholder='Enter address' size='small' variant="outlined" />

      <TextField helperText={checkTax ? "This field is required" : false}  
      error={checkTax ? true : false} value={tax} 
      onChange={e => setTax(e.target.value)} label='Tax Code' 
      placeholder='Enter tax code' size='small' variant="outlined" />
        </Stack>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={handleClose}>cancel</Button>
      <Button variant='contained' color='success' onClick={add} >add</Button>
    </DialogActions>
  </Dialog>

}

export default CreateModal