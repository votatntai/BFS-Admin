import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import AreaContent from './AreaContent'
import AreaHeader from './AreaHeader';
import { useParams } from 'react-router';
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

function Area() {
const {id} = useParams()
	return (<Root
	header={<AreaHeader farmId={id}/>}
	content={
			<AreaContent farmId={id}/>
	}
/>)
}

export default Area;
