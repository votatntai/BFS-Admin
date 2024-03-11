import BirdCategoryDetailHeader from "./CageDetailHeader";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { FormProvider, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "app/store";
import * as yup from 'yup';
import { Link, useParams } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import { useDeepCompareEffect } from "@fuse/hooks";
import { getCage, selectDetail } from "../store/cageDetailSlice";
import CageDetailHeader from "./CageDetailHeader";
import CageDetailContent from "./CageDetailContent";
import { CageType } from "../type/CageType";

const schema = yup.object().shape({
    name: yup
        .string()
        .required('You must enter a  name')
        .min(5, 'At least 5 charactor'),
    code: yup
        .string()
        .required('You must enter a  code')
        .min(5, 'At least 5 charactor'),
    material: yup
        .string()
        .required('You must enter a  material')
        .min(5, 'At least 5 charactor'),
    description: yup
        .string()
        .required('You must enter a  description')
        .min(5, 'At least 5 charactor'),
    height: yup
        .number()
        .required('You must enter a  height'),

    width: yup
        .number()
        .required('You must enter a  width'),

    depth: yup
        .number()
        .required('You must enter a  depth'),


});
type FormValues = {
    name: string,
}


const CageDetail = () => {
    const dispatch = useAppDispatch();
    const dataItem = useAppSelector(selectDetail);
    const routeParams = useParams();
    const methods = useForm<CageType>({
        mode: 'onSubmit',
        defaultValues: {
            name: dataItem?.name,
            code : dataItem?.code,
            material : dataItem?.material,
            description : dataItem?.description,
            depth : dataItem?.depth,
            width : dataItem?.width,
            height : dataItem?.height,
            thumbnailUrl : dataItem?.thumbnailUrl,
        },
        resolver: yupResolver(schema)
    });
    const { reset, watch } = methods;
    const form = watch();

    useDeepCompareEffect(() => {
        function updateState() {

            if (routeParams.id !== 'new') {
                dispatch(getCage(routeParams.id))
            }
        }

        updateState();
    }, [dispatch, routeParams]);

    return (
        <form>
            <FormProvider
                {...methods}>
                <FusePageCarded
                    header={<CageDetailHeader />}
                    content={
                        <CageDetailContent prop={dataItem}
                        />
                    }
                />
            </FormProvider>
        </form>
    );
};

export default CageDetail;