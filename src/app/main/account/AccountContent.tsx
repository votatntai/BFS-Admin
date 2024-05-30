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
import CreateModal from './CreateModal';
import EditModal from './EditModal';
import { accountReducerState, getUser } from './store/accountSlice';
import { useAppDispatch,useAppSelector } from 'app/store';

function AccountContent() {
	const [showAdd, setShowAdd] =useState(false)
	const [showEdit, setShowEdit] =useState(false)
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(5);
	const [editValue, setEditValue] =useState({})
    const dispatch = useAppDispatch()
	const users = useAppSelector((state: any) => state.accountReducer.accountsSlice.accounts.data)
	// console.log(users)
    const searchValue  = useAppSelector((state: accountReducerState) => state.accountReducer.accountsSlice.searchText)
    const role = useAppSelector((state: any) => state.accountReducer.accountsSlice.role)
    useEffect(()=>{
		dispatch(getUser({role: role, params:{pageNumber: pageNumber, pageSize: pageSize}}))
	},[role, pageNumber, pageSize])

	return <div className="w-full flex flex-col min-h-full bg-white">
	<FuseScrollbars className="grow overflow-x-auto">
		<Table className="min-w-x" aria-labelledby="tableTitle" >
		<TableHead style={{background:'rgb(250, 251, 254)'}}>
  <TableRow>
	<TableCell align="center"><span className='font-semibold'>ID</span></TableCell>
	<TableCell align="left"><span className='font-semibold'>Name</span></TableCell>
	<TableCell align="left"><span className='font-semibold'>Username</span></TableCell>
	<TableCell align="left"><span className='font-semibold'>Phone</span></TableCell>
	<TableCell align="left"><span className='font-semibold'>Email</span></TableCell>
	<TableCell align="left"><span className='font-semibold'>City</span></TableCell>
	<TableCell align="left"><span className='font-semibold'>Company</span></TableCell>
	<TableCell align="left"><span className='font-semibold'></span></TableCell>
  </TableRow>
</TableHead>
	{users && users.length>0 && <TableBody>
		{users.map((item: any) => (<TableRow key={item.id} >
		<TableCell align='center'>{item.id}</TableCell>
		<TableCell align='left'>{item.name}</TableCell>
		<TableCell align='left'>{item.username}</TableCell>
		<TableCell align='left'>{item.phone}</TableCell>
		<TableCell align='left'>{item.email}</TableCell>
		<TableCell align='left'>{item.address.city}</TableCell>
		<TableCell align='left'>{item.company.name}</TableCell>
		<TableCell align='left'>
			<Button variant='contained' color='success' onClick={()=>{setShowEdit(true); setEditValue(item)}}>edit</Button>
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
		rowsPerPageOptions={[5,10]}
		count={10}
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
	{showAdd && <CreateModal handleClose={()=>setShowAdd(false)} show={showAdd} />}
	{showEdit && <EditModal object={editValue} handleClose={()=>setShowEdit(false)} show={showEdit} />}
</div>
}

export default AccountContent;
