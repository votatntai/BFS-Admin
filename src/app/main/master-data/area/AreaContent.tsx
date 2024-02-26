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
import { areaReducerState, getAreaData, setPaginPageNumber,setPaginPageSize } from './slice/areaSlice';
import { useAppDispatch,useAppSelector } from 'app/store';
import EditModal from './EditModal';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const FarmContent = ()=>{
    const [openEditSuccessNotify, setOpenEditSuccessNotify] = useState(false);
    const [openEditFailNotify, setOpenEditFailNotify] = useState(false);
	const [showEdit, setShowEdit] =useState(false)
	const [editValue, setEditValue] =useState({})
    const dispatch = useAppDispatch()
    const areas  = useAppSelector((state: areaReducerState) => state.areaReducer.areaSlice.areas.data)
    const pageNumber  = useAppSelector((state: areaReducerState) => state.areaReducer.areaSlice.areas.pagination.pageNumber)
    const pageSize  = useAppSelector((state: areaReducerState) => state.areaReducer.areaSlice.areas.pagination.pageSize)
    const totalRow =  useAppSelector((state: areaReducerState) => state.areaReducer.areaSlice.areas.pagination.totalRow)
    const searchValue = useAppSelector((state: areaReducerState) => state.areaReducer.areaSlice.searchText)
    useEffect(()=>{
        dispatch(getAreaData({name:searchValue, pageNumber: pageNumber, pageSize: pageSize}))
    },[pageNumber, pageSize])
    
    return <div className="w-full flex flex-col min-h-full bg-white">
    <FuseScrollbars className="grow overflow-x-auto">
        <Table className="min-w-x" aria-labelledby="tableTitle" >
        <TableHead style={{background:'rgb(250, 251, 254)'}}>
  <TableRow>
    <TableCell align="center"><span className='font-semibold'>ID</span></TableCell>
    <TableCell align="left"><span className='font-semibold'>Name</span></TableCell>
    <TableCell align="left"><span className='font-semibold'>Thumbnail</span></TableCell>
    <TableCell align="left"><span className='font-semibold'>Create at</span></TableCell>
    <TableCell align="left"><span className='font-semibold'></span></TableCell>
  </TableRow>
</TableHead>
    {areas && areas.length > 0 && <TableBody>
        {areas.map((item) => (<TableRow key={item.id} >
        <TableCell align='center'>{item.id}</TableCell>
        <TableCell align='left'>{item.name}</TableCell>
        <TableCell align='left'>
            {item.thumbnailUrl === null ? <></> :<a href={item.thumbnailUrl} target="_blank" rel="noopener noreferrer">
                <img width='150px' height='150px' src={item.thumbnailUrl} alt='thumbnail' />
            </a>}
            </TableCell>
        <TableCell align='left'>{new Date(item.createAt).toLocaleDateString('en-Gb')}</TableCell>
        <TableCell align='left'>
            <Button variant='contained' color='success' onClick={()=>{setShowEdit(true); setEditValue(item)}}>edit</Button>
        </TableCell>
    </TableRow>))}
        </TableBody>}
        </Table>
    {areas && areas.length===0 && <Stack className='mt-36' direction='row' alignItems={"center"} justifyContent={"center"}>
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
    <Snackbar open={openEditFailNotify} autoHideDuration={3000} onClose={()=>{setOpenEditFailNotify(false)}} anchorOrigin={{vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={()=>{setOpenEditFailNotify(false)}}
          severity="error" variant="filled" sx={{ width: '100%' }}>
          Edit failed
        </Alert>
      </Snackbar>
    {showEdit && <EditModal setOpenFailSnackbar={setOpenEditFailNotify} setOpenSuccessSnackbar={setOpenEditSuccessNotify} object={editValue} show={showEdit} handleClose={() => setShowEdit(false)} />}
</div>
}
export default FarmContent