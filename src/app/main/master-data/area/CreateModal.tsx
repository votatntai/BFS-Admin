import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from 'app/store';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { addArea, areaReducerState, setAreas } from './slice/areaSlice';
import IconButton from '@mui/material/IconButton';
import instance from 'src/app/auth/services/api/customAxios';

const CreateModal = ({ farmId,handleClose, show, setOpenFailSnackbar, setOpenSuccessSnackbar }) => {
  const [area, setArea] = useState({
    name: '',
    thumbnailUrl: '',
  })
  const formData = new FormData()
  const [file, setFile] = useState(null)
  const [checkName, setCheckName] = useState(false)
  const dispatch = useAppDispatch()
  const checkValid = () => {
    let check: boolean = true
    if (area.name.trim() === '') { setCheckName(true) } else setCheckName(false)
    if (area.name.trim() === '' ) {
      check = false
    }
    return check;
  }

  const add = async () => {
    const validate = checkValid()
    if (validate) {
      formData.append('name', area.name)
      formData.append('thumbnail', file)
      formData.append('farmId', farmId)
      await dispatch(addArea(formData))
      await instance.get<any, any>(`/farms/${farmId}`).then(res => {dispatch(setAreas(res.areas))}).catch(err =>console.log(err))
      setOpenSuccessSnackbar(true)
      handleClose()
    } else setOpenFailSnackbar(true)
  }

  return <Dialog fullWidth open={show} onClose={handleClose} >
    <DialogTitle>Create</DialogTitle>
    <DialogContent>
      <Stack direction='column' spacing={2} className='pt-5'>
        <TextField helperText={checkName ? "This field is required" : false}
          error={checkName ? true : false} value={area.name}
          onChange={e => setArea(prev => ({ ...prev, name: e.target.value }))} label='Name'
          placeholder='Enter name' size='small' variant="outlined" />

        <TextField value={area.thumbnailUrl} type="file"
          inputProps={{ accept: "image/png, image/jpeg, image/jpg" }} InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {file && <IconButton onClick={() => {
                  setArea(prev => ({ ...prev, thumbnailUrl: "" }))
                  setFile(null)
                }}>
                  <FuseSvgIcon>heroicons-outline:x-circle</FuseSvgIcon>
                </IconButton>}
              </InputAdornment>
            ),
          }}
          onChange={(e: any) => {
            setArea(prev => ({ ...prev, thumbnailUrl: e.target.value }))
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