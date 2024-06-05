import { motion } from 'framer-motion';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useState } from 'react';
import CreateModal from './CreateModal';
import { useAppDispatch, useAppSelector } from 'app/store';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router';

 function AreaHeader({farmId}){
    const navigate = useNavigate()
    const [showAdd, setShowAdd] =useState(false)
    const [openCreateSuccessNotify, setOpenCreateSuccessNotify] = useState(false);
    const [openCreateFailNotify, setOpenCreateFailNotify] = useState(false);
    const dispatch = useAppDispatch()
   
    return( <div style={{background:'rgb(241, 245, 249)'}} className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
    <motion.span
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
    >
        <Typography className="text-24 md:text-32 font-extrabold tracking-tight">Areas</Typography>
    </motion.span>
    <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
            <Button
                onClick={()=>setShowAdd(true)} className='me-12'
                variant="contained"
                color="secondary"
                startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
            >
                Add
            </Button>
            <Button
                onClick={()=>navigate(-1)}
                variant="contained"
                color="secondary"
                startIcon={<FuseSvgIcon>heroicons-outline:arrow-left</FuseSvgIcon>}
            >
                Back
            </Button>
        </motion.div>
</div>
<Snackbar open={openCreateSuccessNotify} autoHideDuration={3000} onClose={()=>{setOpenCreateSuccessNotify(false)}} anchorOrigin={{vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={()=>{setOpenCreateSuccessNotify(false)}}
          severity="success" variant="filled" sx={{ width: '100%' }}>
          Add successfully
        </Alert>
      </Snackbar>
    <Snackbar open={openCreateFailNotify} autoHideDuration={3000} onClose={()=>{setOpenCreateFailNotify(false)}} anchorOrigin={{vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={()=>{setOpenCreateFailNotify(false)}}
          severity="error" variant="filled" sx={{ width: '100%' }}>
          Add failed
        </Alert>
      </Snackbar>
    {showAdd && <CreateModal farmId={farmId} handleClose={()=> setShowAdd(false)} show={showAdd} setOpenFailSnackbar={setOpenCreateFailNotify} setOpenSuccessSnackbar={setOpenCreateSuccessNotify} />}
</div>)
}
export default AreaHeader