import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import CaremodeContent from './CaremodeContent'
import CaremodeHeader from './CaremodeHeader';
import FuseLoading from '@fuse/core/FuseLoading';
import { useAppSelector } from 'app/store';
import { caremodeReducerState } from './slice/caremodeSlice';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
	'& .FusePageSimple-content': {},
	'& .FusePageSimple-sidebarHeader': {},
	'& .FusePageSimple-sidebarContent': {}
}));

function Caremode() {
	return <Root
	header={<CaremodeHeader/>}
	content={
			<CaremodeContent />
	}
	/>  
}

export default Caremode;
