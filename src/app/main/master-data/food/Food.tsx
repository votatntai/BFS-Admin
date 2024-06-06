import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import FoodContent from './FoodContent'
import FoodHeader from './FoodHeader';
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

function Food() {
	const {id} = useParams()
	return <Root
	header={<FoodHeader farmId={id}/>}
	content={
			<FoodContent farmId={id} />
	}
	/>  
}

export default Food;
