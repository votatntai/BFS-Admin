import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import BirdCategoryHeader from './BirdCategoryHeader';
import BirdCategoryTable from './BirdCategoryTable';
import FusePageCarded from '@fuse/core/FusePageCarded';
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

	return (<FusePageCarded
		header={<BirdCategoryHeader />}
		content={<BirdCategoryTable />}

	/>)
}

export default BirdCategory;
