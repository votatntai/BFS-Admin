import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import MealItemSampleHeader from './MealItemSampleHeader';
import MealItemSampleTable from './MealItemSampleTable';

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

export default function MealItemSample() {
	return <Root
	header={<MealItemSampleHeader/>}
	content={<MealItemSampleTable />}/>
}
