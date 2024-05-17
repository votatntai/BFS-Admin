import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useEffect, useState } from 'react';
import { farmReducerState, getFarmData, setPaginPageNumber,setPaginPageSize } from './slice/farmSlice';
import { useAppDispatch,useAppSelector } from 'app/store';
import EditModal from './EditModal';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const FarmContent = ()=>{
    const [openEditSuccessNotify, setOpenEditSuccessNotify] = useState(false);
	const [showEdit, setShowEdit] =useState(false)
	const [editValue, setEditValue] =useState({})
    const dispatch = useAppDispatch()
    const farms  = useAppSelector((state: farmReducerState) => state.farmReducer.farmSlice.farms.data)
    const pageNumber  = useAppSelector((state: farmReducerState) => state.farmReducer.farmSlice.farms.pagination.pageNumber)
    const pageSize  = useAppSelector((state: farmReducerState) => state.farmReducer.farmSlice.farms.pagination.pageSize)
    const totalRow =  useAppSelector((state: farmReducerState) => state.farmReducer.farmSlice.farms.pagination.totalRow)
    useEffect(()=>{
        dispatch(getFarmData({pageNumber: pageNumber, pageSize: pageSize}))
    },[pageNumber, pageSize])
    
    return <div className="w-full flex flex-col min-h-full bg-white">
    <FuseScrollbars className="grow overflow-x-auto">
        <Table className="min-w-x" aria-labelledby="tableTitle" >
        <TableHead style={{background:'rgb(250, 251, 254)'}}>
  <TableRow>
    <TableCell></TableCell>
    <TableCell></TableCell>
    <TableCell align="left"><span className='font-semibold'>Name</span></TableCell>
    <TableCell align="left"><span className='font-semibold'>Address</span></TableCell>
    <TableCell align="left"><span className='font-semibold'>Phone</span></TableCell>
    <TableCell align="left"><span className='font-semibold'>Manager</span></TableCell>
    <TableCell align="left"><span className='font-semibold'>Action</span></TableCell>
  </TableRow>
</TableHead>
    {farms && farms.length > 0 && <TableBody>
        {farms.map((item) => (<TableRow key={item.id} >
            <TableCell></TableCell>
        <TableCell className="w-52" component="th" scope="row" padding="none">
            {item.thumbnailUrl === null ? <></> :<a href={item.thumbnailUrl} target="_blank" rel="noopener noreferrer">
                <img className="w-full block rounded" src={item.thumbnailUrl} alt='thumbnail' />
            </a>}
            </TableCell>
        <TableCell align='left'>{item.name}</TableCell>
        <TableCell align='left'>{item.address}</TableCell>
        <TableCell align='left'>{item.phone}</TableCell>
        <TableCell align='left'>{item.manager.name}</TableCell>
        <TableCell>
        <FuseSvgIcon className="text-48 ms-10" size={24} color="action" style={{cursor:'pointer'}} onClick={()=>{setShowEdit(true); setEditValue(item)}}>heroicons-solid:pencil-alt</FuseSvgIcon>
        </TableCell>
    </TableRow>))}
        </TableBody>}
        </Table>
    {farms && farms.length===0 && <Stack className='mt-36' direction='row' alignItems={"center"} justifyContent={"center"}>
        <h2 style={{color:"gray"}}>No matching result</h2></Stack> }
    </FuseScrollbars>

    <TablePagination
        className="shrink-0 border-t-1"
        component="div"
        rowsPerPageOptions={[5,10]}
        count={totalRow}
        rowsPerPage={pageSize}
        page={pageNumber}
        backIconButtonProps={{
            'aria-label': 'Previous Page'
        }}
        nextIconButtonProps={{
            'aria-label': 'Next Page'
        }}
        onPageChange={(event, newPage) => {
            dispatch(setPaginPageNumber(newPage))
        }}
        onRowsPerPageChange={(event) => {
            dispatch(setPaginPageSize(parseInt(event.target.value)))
            dispatch(setPaginPageNumber(0))
            }}
    />
    <Snackbar open={openEditSuccessNotify} autoHideDuration={3000} onClose={()=>{setOpenEditSuccessNotify(false)}} anchorOrigin={{vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={()=>{setOpenEditSuccessNotify(false)}}
          severity="success" variant="filled" sx={{ width: '100%' }}>
          Edit successfully
        </Alert>
      </Snackbar>
    
    {showEdit && <EditModal setOpenSuccessSnackbar={setOpenEditSuccessNotify} object={editValue} show={showEdit} handleClose={() => setShowEdit(false)} />}
</div>
}
export default FarmContent