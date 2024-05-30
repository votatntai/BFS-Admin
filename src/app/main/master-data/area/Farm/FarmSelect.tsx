import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import FarmSelectContent from './FarmSelectContent';
import FarmSelectHeader from './FarmSelectHeader';
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

function FarmSelect() {

	return (<Root
	header={<FarmSelectHeader/>}
	content={
			<FarmSelectContent />
	}
/>)
}

export default FarmSelect;
