import { motion } from 'framer-motion';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useDispatch, useSelector } from 'react-redux';
import { accountReducerState, setSearchText,setRole, getUser } from './store/accountSlice';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import CreateModal from './CreateModal'
const AccountHeader = () =>{
    const [show, setShow]=useState(false)
    const searchValue  = useSelector((state: accountReducerState) => state.accountReducer.accountsSlice.searchText)
    const dispatch = useDispatch()
    
    const role = useSelector((state: any) => state.accountReducer.accountsSlice.role)
    
    return <div style={{background:'rgb(241, 245, 249)'}} className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
    <motion.span
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
    >
        <Typography className="text-24 md:text-32 font-extrabold tracking-tight">Account</Typography>
    </motion.span>
<div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
<Autocomplete size='small' 
             value={role}
        onChange={(event: any, newValue: string | null) => {
            dispatch(setRole(newValue));
        }}
        options={["Staff", "Manager"]} disableClearable
        sx={{ width: '15rem' }}
        renderInput={(params) => <TextField  sx={{background:'white'}} {...params} label="Role" />}
      />

<Paper
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
        >
            <Input
                placeholder="Search accounts"
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
            >
                Search
            </Button>
            <Button
                onClick={()=>setShow(true)}
                variant="contained"
                color="secondary"
                startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
            >
                Add
            </Button>
        </motion.div>
</div>
{show && <CreateModal show={show} handleClose={()=>setShow(false)}/> }
</div>
}

export default AccountHeader