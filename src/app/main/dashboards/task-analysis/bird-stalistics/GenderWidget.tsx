import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { ApexOptions } from 'apexcharts';
import { useAppSelector } from 'app/store';
import { memo, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { selectWidgets } from '../store/widgetsSlice';
import { selectBirds } from 'src/app/main/master-data/bird/store/birdSlice';

/**
 * The age widget.
 */
function GenderWidget() {
	const birds = useAppSelector(selectBirds)
	const [awaitRender, setAwaitRender] = useState(true)
	const theme = useTheme()
	const [totalBirds, setTotalBirds] = useState(10)
	const [series, setSeries] = useState([])
	const [colors, setColors] = useState([])
	const labels = ['Male', 'Female']
	const chartOptions: ApexOptions = {
		chart: {
			animations: {
				speed: 400,
				animateGradually: {
					enabled: false
				}
			},
			fontFamily: 'inherit',
			foreColor: 'inherit',
			height: '100%',
			type: 'donut',
			sparkline: {
				enabled: true
			}
		},
		colors,
		labels,
		plotOptions: {
			pie: {
				customScale: 0.9,
				expandOnClick: false,
				donut: {
					size: '70%'
				}
			}
		},
		stroke: {
			colors: [theme.palette.background.paper]
		},
		series,
		states: {
			hover: {
				filter: {
					type: 'none'
				}
			},
			active: {
				filter: {
					type: 'none'
				}
			}
		},
		tooltip: {
			enabled: true,
			fillSeriesColor: false,
			theme: 'dark',
			custom: ({
				seriesIndex,
				w
			}: {
				seriesIndex: number;
				w: { config: { colors: string[]; labels: string[]; series: string[] } };
			}) =>
				`<div class="flex items-center h-32 min-h-32 max-h-23 px-12">
            <div class="w-12 h-12 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
            <div class="ml-8 text-md leading-none">${w?.config?.labels[seriesIndex]}:</div>
            <div class="ml-8 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
        </div>`
		}
	}
	function generateRandomColors(numColors) {
		let colorList = [];
		for (let i = 0; i < numColors; i++) {
			let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
			colorList.push(color);
		}
		return colorList;
	}


	useEffect(() => {
		if (birds) {
			if (birds.length) {
				setTotalBirds(birds?.length)
				const genderPercentages = calculatePercentages(birds)
				setSeries(genderPercentages)
				setColors(["#0A51E2", "#29F0CA", '#B7B99F', '#385805', '#A5B1FE', '#E33486', '#F7AF57', '#6CE49F'])
			}
			else
				setSeries([])

		}
	}, [birds]);
	function calculatePercentages(birds) {
		let totalBirds = birds.length;
		let maleBirdsCount = birds.filter(bird => bird.gender === true).length;
		let femaleBirdsCount = totalBirds - maleBirdsCount;

		let malePercentage = (maleBirdsCount / totalBirds) * 100;
		let femalePercentage = (femaleBirdsCount / totalBirds) * 100;

		return [malePercentage, femalePercentage];
	}
	if (!series || !labels || !colors || !chartOptions.labels || !chartOptions.colors || !chartOptions.series) {
		return null
	}
	useEffect(() => {
		setAwaitRender(false);
	}, [])
	if (!series.length || !labels.length || !colors.length || !chartOptions.labels.length || !chartOptions.colors.length || !chartOptions.series.length) {
		return null
	}
	if (awaitRender) {
		return null
	}
	return (
		<Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden p-24">
			<div className="flex flex-col sm:flex-row items-start justify-between">
				<Typography className="text-lg font-medium tracking-tight leading-6 truncate">Gender</Typography>
				<div className="ml-8">
					<Chip
						size="small"
						className="font-medium text-sm"
						label=" 30 days"
					/>
				</div>
			</div>

			<div className="flex flex-col flex-auto mt-24 h-192">
				<ReactApexChart
					className="flex flex-auto items-center justify-center w-full h-full"
					options={chartOptions}
					series={series}
					type={chartOptions.chart?.type}
					height={chartOptions.chart?.height}
				/>
			</div>
			<div className="mt-32">
				<div className="-my-12 divide-y">
					{series?.map((dataset, i) => (
						<div
							className="grid grid-cols-3 py-12"
							key={i}
						>
							<div className="flex items-center">
								<Box
									className="flex-0 w-8 h-8 rounded-full"
									sx={{ backgroundColor: chartOptions?.colors?.[i] as string }}
								/>
								<Typography className="ml-12 truncate">{labels?.[i]}</Typography>
							</div>
							<Typography className="font-medium text-right">
								{((totalBirds * dataset) / 100).toLocaleString('en-US')}
							</Typography>
							<Typography
								className="text-right"
								color="text.secondary"
							>
								{parseFloat(dataset).toFixed(2)}%
							</Typography>
						</div>
					))}
				</div>
			</div>
		</Paper>
	);
}

export default memo(GenderWidget);
