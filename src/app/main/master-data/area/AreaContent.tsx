import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useEffect, useState } from 'react';
import { setAreas } from './slice/areaSlice';
import { useAppDispatch,useAppSelector } from 'app/store';
import EditModal from './EditModal';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import instance from 'src/app/auth/services/api/customAxios';

const AreaContent = ({farmId})=>{
    const [openEditSuccessNotify, setOpenEditSuccessNotify] = useState(false);
    const [openEditFailNotify, setOpenEditFailNotify] = useState(false);
	const [showEdit, setShowEdit] =useState(false)
	const [editValue, setEditValue] =useState({})
    const dispatch = useAppDispatch()
    const areas = useAppSelector((state) => state.areaReducer.areaSlice.areas)
    const loadAreas = async() =>{
        await instance.get<any, any>(`/farms/${farmId}`).then(res => {dispatch(setAreas(res.areas))}).catch(err =>console.log(err))
    }
    
    useEffect(()=>{
        loadAreas()
    },[])
    
    return <div className="w-full flex flex-col min-h-full bg-white">
    <FuseScrollbars className="grow overflow-x-auto">
        <Table className="min-w-x" aria-labelledby="tableTitle" >
        <TableHead style={{background:'rgb(250, 251, 254)'}}>
  <TableRow>
    <TableCell align="left"><span className='font-semibold'></span></TableCell>
    <TableCell align="left" ><span className='font-semibold'></span></TableCell>
    <TableCell align="left"><span className='font-semibold'>Name</span></TableCell>
    <TableCell align="left"><span className='font-semibold'>Create at</span></TableCell>
    <TableCell align="left"><span className='font-semibold'>Action</span></TableCell>
  </TableRow>
</TableHead>
    {areas && areas.length > 0 && <TableBody>
        {areas.map((item) => (<TableRow key={item.id} >
            <TableCell></TableCell>
        <TableCell align="center" className="w-52" component="th" scope="row" padding="none">
            {item.thumbnailUrl === null ? <></> :<a href={item.thumbnailUrl} target="_blank" rel="noopener noreferrer">
                <img className="w-full block rounded"  src={item.thumbnailUrl} alt='thumbnail' />
            </a>}
            </TableCell>
        <TableCell align='left'>{item.name}</TableCell>
        <TableCell align='left'>{new Date(item.createAt).toLocaleDateString('en-Gb')}</TableCell>
        <TableCell>
        <FuseSvgIcon className="text-48 ms-10" size={24} color="action" style={{cursor:'pointer'}} onClick={()=>{setShowEdit(true); setEditValue(item)}}>heroicons-solid:pencil-alt</FuseSvgIcon>
        </TableCell>
    </TableRow>))}
        </TableBody>}
        </Table>
    {areas && areas.length===0 && <Stack className='mt-36' direction='row' alignItems={"center"} justifyContent={"center"}>
        <h2 style={{color:"gray"}}>No matching result</h2></Stack> }
    </FuseScrollbars>

    <Snackbar open={openEditSuccessNotify} autoHideDuration={3000} onClose={()=>{setOpenEditSuccessNotify(false)}} anchorOrigin={{vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={()=>{setOpenEditSuccessNotify(false)}}
          severity="success" variant="filled" sx={{ width: '100%' }}>
          Edit successfully
        </Alert>
      </Snackbar>
    <Snackbar open={openEditFailNotify} autoHideDuration={3000} onClose={()=>{setOpenEditFailNotify(false)}} anchorOrigin={{vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={()=>{setOpenEditFailNotify(false)}}
          severity="error" variant="filled" sx={{ width: '100%' }}>
          Edit failed
        </Alert>
      </Snackbar>
    {showEdit && <EditModal farmId={farmId} setOpenFailSnackbar={setOpenEditFailNotify} setOpenSuccessSnackbar={setOpenEditSuccessNotify} object={editValue} show={showEdit} handleClose={() => setShowEdit(false)} />}
</div>
}
export default AreaContent