import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { BirdCategoryType } from '../type/BirdCategoryType';

/**
 * The product model.
 */
const BirdCategoryModel = (data: PartialDeep<BirdCategoryType>) =>
	_.defaults(data || {}, {
		id: "",
		name: '',
		thumbnailUrl:"",
        createAt:''
	});

export default BirdCategoryModel;

	