import FusePageSimple from '@fuse/core/FusePageSimple';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from 'app/store';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getBirds } from '../../master-data/bird/store/birdSlice';
import TaskDashBoardHeader from './TaskDashBoardHeader';
import SpeciesWidget from './bird-stalistics/SpeciesWidget';
import { getWidgets } from './store/widgetsSlice';
import { getFarms, getTickets, selectFarms } from '../../master-data/menu-sample/store/menusSlice';
import TodoWidgets from './task-widget/TodoWidget';
import CaremodeWidget from './bird-stalistics/CaremodeWidget';
import GenderWidget from './bird-stalistics/GenderWidget';
import CategoryWidget from './bird-stalistics/CategoryWidget';
import TicketWidget from './ticket-stalistics/TicketWidget';
import { FarmContext } from './context/FarmContext';

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
    const [farmId, setFarmId] = useState("d2f2494f-0182-4457-8920-2d15943a7a23");  const dispatch = useAppDispatch()
  
    useEffect(() => {
        dispatch(getWidgets(farmId))
        dispatch(getBirds(farmId))
        dispatch(getTickets(farmId))
        dispatch(getFarms())
    }, [dispatch,farmId])



    return (
        <FarmContext.Provider value={{farmId, setFarmId}}>
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
                    </motion.div>



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
                            <CaremodeWidget />
                        </motion.div>

                        <motion.div
                            className="sm:col-span-2 lg:col-span-1 "
                            variants={item}>
                            <GenderWidget />
                        </motion.div>
                        <motion.div
                            className="sm:col-span-2 lg:col-span-1 "
                            variants={item}>
                            <CategoryWidget />
                        </motion.div>
                        <motion.div
                            className="sm:col-span-2 lg:col-span-1 "
                            variants={item}>
                            <SpeciesWidget />
                        </motion.div>

                    </div>
                    {/* Ticket stalistical */}
                    <div className="sm:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-32 w-full">
                        <Typography className="text-2xl font-semibold tracking-tight leading-6">
                            Tickets statistical
                        </Typography>
                        <div className="sm:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-32 w-full">

                            <motion.div
                                variants={item}
                                className="sm:col-span-2 lg:col-span-1 "
                            >
                                <TicketWidget status="To do" />
                            </motion.div>
                            <motion.div
                                variants={item}
                                className="sm:col-span-2 lg:col-span-1 "
                            >
                                <TicketWidget status="In progress" />
                            </motion.div>

                            <motion.div
                                variants={item}
                                className="sm:col-span-2 lg:col-span-1 "
                            >
                                <TicketWidget status="Done" />
                            </motion.div>

                            <motion.div
                                variants={item}
                                className="sm:col-span-2 lg:col-span-1 "
                            >
                                <TicketWidget status="Work finished" />
                            </motion.div>
                        </div>


                    </div>
                </motion.div>
            }
        />
        </FarmContext.Provider>
    );
}

export default AnalyticsDashboardApp;
