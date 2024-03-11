import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import MenuSampleContent from './MenuSampleContent'
import MenuSampleHeader from './MenuSampleHeader';
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

function MenuSample() {

	return (<Root
	header={<MenuSampleHeader/>}
	content={
			<MenuSampleContent />
	}
/>)
}

export default MenuSample;
