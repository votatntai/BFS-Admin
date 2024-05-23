import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import {useEffect, useState } from 'react';
import CreateModal from './CreateModal';
import EditModal from './EditModal';
import { accountReducerState, getUser } from './store/accountSlice';
import { useAppDispatch,useAppSelector } from 'app/store';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';

export default function AccountContent() {
	const [openEditSuccessNotify, setOpenEditSuccessNotify] = useState(false);
	const [showAdd, setShowAdd] =useState(false)
	const [showEdit, setShowEdit] =useState(false)
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(8);
	const totalRow = useAppSelector((state: any) => state.accountReducer.accountsSlice.accounts.pagination.totalRow)

	const [editValue, setEditValue] =useState({})
    const dispatch = useAppDispatch()
	const users = useAppSelector((state: any) => state.accountReducer.accountsSlice.accounts.data)
    const searchValue  = useAppSelector((state: accountReducerState) => state.accountReducer.accountsSlice.searchText)
    const role = useAppSelector((state: any) => state.accountReducer.accountsSlice.role)
    useEffect(()=>{
		dispatch(getUser({role: role, params:{pageNumber: pageNumber, pageSize: pageSize, name: searchValue}}))
	},[role, pageNumber, pageSize])

	return <div className="w-full flex flex-col min-h-full bg-white">
	<FuseScrollbars className="grow overflow-x-auto">
		<Table className="min-w-x" aria-labelledby="tableTitle" >
		<TableHead style={{background:'rgb(250, 251, 254)'}}>
  <TableRow>
	<TableCell align="left"><span className='font-semibold'>Full name</span></TableCell>
	<TableCell align="left"><span className='font-semibold'>Phone</span></TableCell>
	<TableCell align="left"><span className='font-semibold'>Email</span></TableCell>
	<TableCell align="left"><span className='font-semibold'>Farm</span></TableCell>
	<TableCell align="center"><span className='font-semibold'>Status</span></TableCell>
	<TableCell align="left"><span className='font-semibold'>Action</span></TableCell>
  </TableRow>
</TableHead>
	{users && users.length>0 && <TableBody>
		{users.map((item: any) => (<TableRow key={item.id} >
		<TableCell align='left'>
		{item.avatarUrl === null ? <Chip icon={<FaceIcon />}
        label={item.name} variant="outlined" /> : <Chip avatar={<Avatar alt="avt" src={item.avatarUrl} />}
        label={item.name} variant="outlined" />}
			</TableCell>
		<TableCell align='left'>{item.phone}</TableCell>
		<TableCell align='left'>{item.email}</TableCell>
		<TableCell align='left'>{item.farm?.name}</TableCell>
		<TableCell align='center'>{item.status === 'Active' ? <Button variant="contained" style={{pointerEvents: "none"}} color='success'>Active</Button> : <Button variant="contained" style={{pointerEvents: "none"}} color='error'>Disable</Button>}</TableCell>
		<TableCell align='left'>
		<Tooltip title='Edit'>
            <FuseSvgIcon className="text-48 ms-10" size={24} color="action" style={{cursor:'pointer'}} 
            onClick={()=>{setShowEdit(true); setEditValue(item)}}
            >heroicons-solid:pencil-alt</FuseSvgIcon>
            </Tooltip>
		</TableCell>
	</TableRow>))}
		</TableBody>}
		</Table>
		{users && users.length===0 && <Stack className='mt-36' direction='row' alignItems={"center"} justifyContent={"center"}>
<h2 style={{color:"gray"}}>No matching result</h2></Stack> }
	</FuseScrollbars>

	<TablePagination
		className="shrink-0 border-t-1"
		component="div"
		rowsPerPageOptions={[8,16]}
		count={totalRow}
		rowsPerPage={pageSize}
		page={pageNumber}
		backIconButtonProps={{
			'aria-label': 'Previous Page'
		}}
		nextIconButtonProps={{
			'aria-label': 'Next Page'
		}}
		onPageChange={(event, newPage) => setPageNumber(newPage)}
		onRowsPerPageChange={(event) => {
			setPageSize(parseInt(event.target.value));
			setPageNumber(0)
			}}
	/>
	<Snackbar open={openEditSuccessNotify} autoHideDuration={3000} onClose={()=>{setOpenEditSuccessNotify(false)}} anchorOrigin={{vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={()=>{setOpenEditSuccessNotify(false)}}
          severity="success" variant="filled" sx={{ width: '100%' }}>
          Edit successfully
        </Alert>
      </Snackbar>
	
	{showEdit && <EditModal setOpenSuccessSnackbar={setOpenEditSuccessNotify} object={editValue} handleClose={()=>setShowEdit(false)} show={showEdit} />}
</div>
}