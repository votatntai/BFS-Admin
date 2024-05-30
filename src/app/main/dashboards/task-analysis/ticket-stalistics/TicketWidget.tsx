import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { ApexOptions } from 'apexcharts';
import { useAppSelector } from 'app/store';
import { selectWidgets } from '../store/widgetsSlice';
import ReactApexChart from 'react-apexcharts';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { selectTickets } from 'src/app/main/master-data/menu-sample/store/menusSlice';

/**
 * The conversions widget.
 */
function TicketWidget(props) {
    const { status } = props
    const theme = useTheme()
    const tasks = useAppSelector(selectTickets)
    const [amount, setAmount] = useState(0)
    const [label, setLabel] = useState([])
    const [taskCount, setTaskCount] = useState([])

    useEffect(() => {
        if (tasks ) {
            var todoTasks = _.filter(tasks, { status: status });
            let sortedTodoTask = _.orderBy(todoTasks, [(task) => new Date(task.createAt)], ['asc']);
            let startDate = new Date();
            startDate.setDate(startDate.getDate() - 90);
            let recentTasks = _.filter(sortedTodoTask, task => new Date(task.createAt) >= startDate)
            let tasksByDate = recentTasks.map(task => {
                return {
                    ...task,
                    startAt: new Date(task.startAt).toLocaleDateString() // Chuyển đổi datetime thành định dạng ngày
                }
            })

            let amount = _.size(recentTasks);
            setAmount(amount)
            let grouped = _.groupBy(tasksByDate, 'startAt');
            let dateRanges = _.keys(grouped);
            setLabel(dateRanges)
            let taskCounts = _.map(grouped, group => group.length);
            setTaskCount(taskCounts)
        }
    }, [tasks])


    const chartOptions: ApexOptions = {
        chart: {
            animations: {
                enabled: false
            },
            fontFamily: 'inherit',
            foreColor: 'inherit',
            height: '100%',
            type: 'bar',
            sparkline: {
                enabled: true
            }
        },
        colors: [theme.palette.secondary.main],
        fill: {
            colors: [theme.palette.secondary.light],
            opacity: 0.5
        },
        stroke: {
            curve: 'smooth'
        },
        tooltip: {
            followCursor: true,
            theme: 'dark'
        },
        xaxis: {
            type: 'category',
            categories: label
        }
    };

    return (
        <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
            <div className="flex items-start justify-between m-24 mb-0">
                <Typography className="text-lg font-medium tracking-tight leading-6 truncate">{status}</Typography>
                <div className="ml-8">
                    <Chip
                        size="small"
                        className="font-medium text-sm"
                        label=" 30 days"
                    />
                </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center mx-24 mt-12">
                <Typography className="text-7xl font-bold tracking-tighter leading-tight">
                    {amount.toLocaleString('en-US')}
                </Typography>

            </div>
            <div className="flex flex-col flex-auto h-80">
                <ReactApexChart
                    options={chartOptions}
                    series={[{ data: taskCount }]}
                    type={chartOptions?.chart?.type}
                    height={chartOptions?.chart?.height}
                />
            </div>
        </Paper>
    );
}

export default TicketWidget;
