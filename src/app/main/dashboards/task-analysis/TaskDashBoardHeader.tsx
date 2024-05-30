import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Menu, MenuItem } from '@mui/material';
import { useContext, useState } from 'react';
import { useAppSelector } from 'app/store';
import { selectFarms } from '../../master-data/menu-sample/store/menusSlice';
import _ from 'lodash';
import { FarmContext } from './context/FarmContext';

/**
 * The analytics dashboard app header.
 */
function TaskDashBoardHeader() {
	const { farmId, setFarmId } = useContext(FarmContext);
	const farms = useAppSelector(selectFarms)
	const [selectedFarm, setSelectedFarm] = useState<{ id: string; menuEl: HTMLElement | null }>({
		id: "d2f2494f-0182-4457-8920-2d15943a7a23",
		menuEl: null
	})
	function handleChangeFarm(id: string) {
		setSelectedFarm({
			id,
			menuEl: null
		});
		setFarmId(id);  
	}
	function handleOpenFarmMenu(event: React.MouseEvent<HTMLElement>) {
		setSelectedFarm({
			id: selectedFarm.id,
			menuEl: event.currentTarget
		})
	}
	function handleFarmMenu() {
		setSelectedFarm({
			id: selectedFarm.id,
			menuEl: null
		})
	}

	if (_.isEmpty(farms)) {
		return null;
	}

	return (
		<div className="flex w-full container">
			<div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 p-24 md:p-32 pb-0 md:pb-0">
				<div className="flex flex-col flex-auto">
					<Typography className="text-3xl font-semibold tracking-tight leading-8">
						Task Analytics
					</Typography>
					<Typography
						className="font-medium tracking-tight"
						color="text.secondary"
					>
						Monitor metrics, check reports and review performance
					</Typography>
					<div className="flex items-center">
						<Button
							onClick={handleOpenFarmMenu}
							className="flex items-center border border-solid border-b-0 rounded-t-xl rounded-b-0 h-40 px-16 text-13 sm:text-16"
							sx={{
								backgroundColor: (theme) => theme.palette.background.default,
								borderColor: (theme) => theme.palette.divider
							}}
							endIcon={
								<FuseSvgIcon
									size={20}
									color="action"
								>
									heroicons-solid:chevron-down
								</FuseSvgIcon>
							}
						>
							{_.find(farms, ['id', selectedFarm.id])?.name}
						</Button>
						<Menu
							id="project-menu"
							anchorEl={selectedFarm.menuEl}
							open={Boolean(selectedFarm.menuEl)}
							onClose={handleFarmMenu}
						>
							{farms &&
								farms.map((farm) => (
									<MenuItem
										key={farm.id}
										onClick={() => {
											handleChangeFarm(farm.id);
										}}
									>
										{farm.name}
									</MenuItem>
								))}
						</Menu>
					</div>
				</div>


			</div>
		</div>
	);
}

export default TaskDashBoardHeader;
