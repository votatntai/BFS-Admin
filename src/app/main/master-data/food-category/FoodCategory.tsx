import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import FoodCategoryContent from './FoodCategoryContent'
import FoodCategoryHeader from './FoodCategoryHeader';

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

function FoodCategory() {
	return <Root
	header={<FoodCategoryHeader/>}
	content={
			<FoodCategoryContent />
	}
	/>  
}

export default FoodCategory;
