import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import BirdCategoryContent from './BirdCategoryContent'
import BirdCategoryHeader from './BirdCategoryHeader';
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

function BirdCategory() {

	return (<Root
	header={<BirdCategoryHeader/>}
	content={
			<BirdCategoryContent />
	}
/>)
}

export default BirdCategory;
