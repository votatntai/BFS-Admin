import FusePageSimple from '@fuse/core/FusePageSimple';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from 'app/store';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { getBirds } from '../../master-data/bird/store/birdSlice';
import TaskDashBoardHeader from './TaskDashBoardHeader';
import SpeciesWidget from './bird-stalistics/SpeciesWidget';
import { getTicket, getWidgets } from './store/widgetsSlice';

const container = {
    show: {
        transition: {
            staggerChildren: 0.06
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

/**
 * The analytics dashboard app.
 */
function AnalyticsDashboardApp() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getWidgets());
        dispatch(getBirds())
        // dispatch(getTicket())
    }, [dispatch]);

    // if (_.isEmpty(widgets)) {
    // 	return null;
    // }

    return (
        <FusePageSimple
            header={<TaskDashBoardHeader />}
            content={
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-32 w-full p-24 md:p-32"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <motion.div
                        variants={item}
                        className="sm:col-span-2 lg:col-span-4"
                    >
                        {/* <VisitorsOverviewWidget /> */}
                    </motion.div>
{/* 
                    <motion.div
                        variants={item}
                        className="sm:col-span-2 lg:col-span-1 "
                    >
                        <TodoWidgets status="To do" />
                    </motion.div>
                    <motion.div
                        variants={item}
                        className="sm:col-span-2 lg:col-span-1 "
                    >
                        <TodoWidgets status="In progress" />
                    </motion.div>

                    <motion.div
                        variants={item}
                        className="sm:col-span-2 lg:col-span-1 "
                    >
                        <TodoWidgets status="Done" />
                    </motion.div>

                    <motion.div
                        variants={item}
                        className="sm:col-span-2 lg:col-span-1 "
                    >
                        <TodoWidgets status="Work finished" />
                    </motion.div> */}



                    <motion.div
                        variants={item}
                        className="sm:col-span-2 lg:col-span-3"
                    >
                        {/* <VisitorsVsPageViewsWidget /> */}
                    </motion.div>

                    <div className="w-full mt-16 sm:col-span-3">
                        <Typography className="text-2xl font-semibold tracking-tight leading-6">
                            Bird statistical
                        </Typography>
                        <Typography
                            className="font-medium tracking-tight"
                            color="text.secondary"
                        >
                            Demographic properties of your birds
                        </Typography>
                    </div>
                    {/* Bieu do Tron */}
                    <div className="sm:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-32 w-full">
                        <motion.div
                            className="sm:col-span-2 lg:col-span-1 "
                            variants={item}>
                            {/* <CaremodeWidget /> */}
                        </motion.div>
                        <motion.div
                            className="sm:col-span-2 lg:col-span-1 "
                            variants={item}>
                            {/* <GenderWidget /> */}
                        </motion.div>
                        <motion.div
                            className="sm:col-span-2 lg:col-span-1 "
                            variants={item}>
                            {/* <CategoryWidget /> */}
                        </motion.div>
                        <motion.div
                            className="sm:col-span-2 lg:col-span-1 "
                            variants={item}>
                            <SpeciesWidget />
                        </motion.div>
             
                    </div>
                    {/* Ticket stalistical */}
                    <div className="w-full mt-16 sm:col-span-3">
                        <Typography className="text-2xl font-semibold tracking-tight leading-6">
                            Tickets statistical
                        </Typography>
                      
                    </div>
                </motion.div>
            }
        />
    );
}

export default AnalyticsDashboardApp;
