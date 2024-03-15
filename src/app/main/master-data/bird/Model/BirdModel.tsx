import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { BirdType } from '../type/BirdType';


/**
 * The product model.
 */
const BirdModels = (data: PartialDeep<BirdType>) =>
    _.defaults(data || {}, {
        id: '',
        code: '',
        name: '',
        dayOfBirth: '',
        gender: '',
        characteristic: '',
        thumbnailUrl:'',
        createAt: '',
    });

export default BirdModels;
