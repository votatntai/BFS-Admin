import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { CageType } from '../type/CageType';


/**
 * The product model.
 */
const CageModels = (data: PartialDeep<CageType>) =>
    _.defaults(data || {}, {
        id: '',
        code: '',
        name: '',
        thumbnailUrl: '',
        description: '',
        width: '',
        height: '',
        depth: '',
        material: '',
        createAt: '',
    
    });
type CaremodeType= {
    id: string;
    proirity: string;
    name: string;
    createAt: string;
}
type AreaType ={
    id: string;
    thumbnailUrl: string;
    name: string;
    createAt: string;
}
type SpeciesType= {
    id: string;
    thumbnailUrl: string;
    name: string;
    createAt: string;
}
export default CageModels;
