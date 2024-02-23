import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from './slice/birdSlice';

const BirdContent = ()=>{
    const [showAdd, setShowAdd] =useState(false)
	const [showEdit, setShowEdit] =useState(false)
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(5);
	const [editValue, setEditValue] =useState({})
    const dispatch = useDispatch()
    const posts  = useSelector(state => state)
    console.log(posts)
    useEffect(()=>{
        dispatch(getPost({_page: pageNumber+1, _limit: pageSize}))
    },[pageNumber, pageSize])
    return <div className="w-full flex flex-col min-h-full bg-white">
    <FuseScrollbars className="grow overflow-x-auto">
        <Table className="min-w-x" aria-labelledby="tableTitle" >
        <TableHead style={{background:'rgb(250, 251, 254)'}}>
  <TableRow>
    <TableCell align="center"><span className='font-semibold'>ID</span></TableCell>
    <TableCell align="left"><span className='font-semibold'>User ID</span></TableCell>
    <TableCell align="left"><span className='font-semibold'>Title</span></TableCell>
    <TableCell align="left"><span className='font-semibold'>Body</span></TableCell>
    <TableCell align="left"><span className='font-semibold'></span></TableCell>
  </TableRow>
</TableHead>
    <TableBody>
        {posts && posts.length>0 && posts.map((item) => (<TableRow key={item.id} >
        <TableCell align='center'>{item.id}</TableCell>
        <TableCell align='left'>{item.userId}</TableCell>
        <TableCell align='left'>{item.title}</TableCell>
        <TableCell align='left'>{item.body}</TableCell>
        <TableCell align='left'>
            <Button variant='contained' color='success' onClick={()=>{setShowEdit(true); setEditValue(item)}}>edit</Button>
        </TableCell>
    </TableRow>))}
        </TableBody>
<TableBody>
</TableBody>
        </Table>
    </FuseScrollbars>

    <TablePagination
        className="shrink-0 border-t-1"
        component="div"
        rowsPerPageOptions={[5,10]}
        count={100}
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
    
</div>
}
export default BirdContent