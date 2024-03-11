import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { ObjectAreaToCreate } from '../../type/area.type';
import { useAppDispatch, useAppSelector } from 'app/store';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { addArea, areaReducerState, getAreaData } from './slice/areaSlice';
import IconButton from '@mui/material/IconButton';
import { farmReducerState, getFarmData } from '../farm/slice/farmSlice';
const CreateModal = ({ handleClose, show, setOpenFailSnackbar, setOpenSuccessSnackbar }) => {
  const [area, setArea] = useState<ObjectAreaToCreate>({
    name: '',
    thumbnailUrl: '',
    farmId: {
      label: "", value: ""
    },
  })
  const formData = new FormData()
  const [file, setFile] = useState(null)
  const [checkName, setCheckName] = useState(false)
  const [checkFarmId, setCheckFarmId] = useState(false)
  const [checkThumbnailURL, setCheckThumbnailURL] = useState(false)
  const dispatch = useAppDispatch()
  const pageNumber = useAppSelector((state: areaReducerState) => state.areaReducer.areaSlice.areas.pagination.pageNumber)
  const pageSize = useAppSelector((state: areaReducerState) => state.areaReducer.areaSlice.areas.pagination.pageSize)
  const farms = useAppSelector((state: farmReducerState) => state.farmReducer.farmSlice.farms.data)
  const checkValid = () => {
    let check: boolean = true
    if (area.name.trim() === '') { setCheckName(true) } else setCheckName(false)
    if (area.farmId.value === "") { setCheckFarmId(true) } else setCheckFarmId(false)
    if (area.thumbnailUrl.trim() === '') { setCheckThumbnailURL(true) } else setCheckThumbnailURL(false)
    if (area.name.trim() === '' || area.farmId.value === "" || area.thumbnailUrl.trim() === '') {
      check = false
    }
    return check;
  }

  const add = async () => {
    const validate = checkValid()
    if (validate) {
      formData.append('name', area.name)
      formData.append('thumbnail', file)
      formData.append('farmId', area.farmId.value)
      await dispatch(addArea(formData))
      await dispatch(getAreaData({ pageNumber: pageNumber, pageSize: pageSize }))
      setOpenSuccessSnackbar(true)
      handleClose()
    } else setOpenFailSnackbar(true)
  }

  const [comboboxList, setComboboxList] = useState([]);
  const loadCombobox = async () => {
    await dispatch(getFarmData({}));
  };

  useEffect(() => {
    loadCombobox();
  }, []);
  useEffect(() => {
    if (farms.length > 0) {
      const updatedComboboxList = farms.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      setComboboxList(updatedComboboxList);
    }
  }, [farms]);

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
          error={checkName ? true : false} value={area.name}
          onChange={e => setArea(prev => ({ ...prev, name: e.target.value }))} label='Name'
          placeholder='Enter name' size='small' variant="outlined" />

        <Autocomplete
          disablePortal value={area.farmId}
          onChange={(event: any, newValue: any) => {
            setArea(prev => ({ ...prev, farmId: newValue }))
          }}
          options={comboboxList} size='small'
          fullWidth
          renderInput={(params) => <TextField {...params} label={'Farm'} helperText={checkFarmId ? "This field is required" : false}
            error={checkFarmId ? true : false} />}
        />

        <TextField helperText={checkThumbnailURL ? "This field is required" : false}
          error={checkThumbnailURL ? true : false} value={area.thumbnailUrl} type="file"
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