import { motion } from 'framer-motion';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useState } from 'react';
import CreateModal from './CreateModal';
import { useAppDispatch, useAppSelector } from 'app/store';
import { farmReducerState, getFarmData, setSearchText } from './slice/farmSlice';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const FarmHeader = ()=>{
    const [showAdd, setShowAdd] =useState(false)
    const dispatch = useAppDispatch()
    const [openCreateSuccessNotify, setOpenCreateSuccessNotify] = useState(false);
    const searchValue = useAppSelector((state: farmReducerState) => state.farmReducer.farmSlice.searchText)
    const pageNumber  = useAppSelector((state: farmReducerState) => state.farmReducer.farmSlice.farms.pagination.pageNumber)
    const pageSize  = useAppSelector((state: farmReducerState) => state.farmReducer.farmSlice.farms.pagination.pageSize)
    const handleSearch =()=>{
        dispatch(getFarmData({name: searchValue, pageNumber: pageNumber, pageSize: pageSize}))
    }
    return <div style={{background:'rgb(241, 245, 249)'}} className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
    <motion.span
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
    >
        <Typography className="text-24 md:text-32 font-extrabold tracking-tight">Farms</Typography>
    </motion.span>
    <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
    <Paper
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
        >
            <Input
                placeholder="Search farms"
                disableUnderline
                fullWidth
                value={searchValue}
                inputProps={{
                    'aria-label': 'Search'
                }}
                onChange={e => dispatch(setSearchText(e.target.value))}
            />

        </Paper>
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
            <Button
                variant="contained" className='me-12'
                color="secondary"
                startIcon={<FuseSvgIcon>heroicons-outline:search</FuseSvgIcon>}
                onClick={handleSearch}
            >
                Search
            </Button>
            <Button
                onClick={()=>setShowAdd(true)}
                variant="contained"
                color="secondary"
                startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
            >
                Add
            </Button>
        </motion.div>
</div>
<Snackbar open={openCreateSuccessNotify} autoHideDuration={3000} onClose={()=>{setOpenCreateSuccessNotify(false)}} anchorOrigin={{vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={()=>{setOpenCreateSuccessNotify(false)}}
          severity="success" variant="filled" sx={{ width: '100%' }}>
          Add successfully
        </Alert>
      </Snackbar>
    
    {showAdd && <CreateModal handleClose={()=> setShowAdd(false)} show={showAdd} setOpenSuccessSnackbar={setOpenCreateSuccessNotify}/>}
</div>
}
export default FarmHeader