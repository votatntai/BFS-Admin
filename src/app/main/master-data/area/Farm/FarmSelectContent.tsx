import {useEffect, useState } from 'react';
import { useAppDispatch,useAppSelector } from 'app/store';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import { getFarmData } from '../../farm/slice/farmSlice';

const container = {
	show: {
		transition: {
			staggerChildren: 0.1
		}
	}
};
 const FarmSelectContent = ()=>{
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const farms  = useAppSelector((state) => state.farmReducer.farmSlice.farms.data)
    useEffect(()=>{
        dispatch(getFarmData({pageNumber: 0, pageSize: 100}))
    },[])
    
    return <motion.div
    className="items-center flex grid grid-cols-1  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-32 mt-32 sm:mt-40 ms-32"
    variants={container} initial="hidden" animate="show" >
    {farms.length>0 && farms.map(farm => <Card key={farm.id} className='cursor-pointer' onClick={()=>navigate(`/master-data/select-farm/area/${farm.id}`)}>
      <CardHeader sx={{ maxWidth: 'fit-content' }} subheader={farm.name} />
    </Card>)}
    </motion.div>
}

export default FarmSelectContent