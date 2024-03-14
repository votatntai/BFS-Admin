import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import MenuMealSampleContent from './MenuMealSampleContent'
import MenuMealSampleHeader from './MenuMealSampleHeader';

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

function MenuMealSample() {
	return <Root
	header={<MenuMealSampleHeader/>}
	content={
			<MenuMealSampleContent />
	}
	/>  
}

export default MenuMealSample;
