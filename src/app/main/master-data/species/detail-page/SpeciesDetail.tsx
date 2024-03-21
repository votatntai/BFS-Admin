import BirdCategoryDetailContent from "./SpeciesDetailContent";
import BirdCategoryDetailHeader from "./SpeciesDetailHeader";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { FormProvider, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "app/store";
import * as yup from 'yup';
import { Link, useParams } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import { useDeepCompareEffect } from "@fuse/hooks";
import { getSpecies, selectDetail } from "../store/SpeciesDetailSlice";

const schema = yup.object().shape({
    name: yup
        .string()
        .required('You must enter a bird catego ry name')
        .min(5, 'At least 5 charactor'),
});
type FormValues = {
    name: string,
}


const BirdCategoryDetail = () => {
    const dispatch = useAppDispatch();
    const dataItem = useAppSelector(selectDetail);
    const routeParams = useParams();
    const methods = useForm<FormValues>({
        mode: 'onSubmit',
        defaultValues: {
            name: dataItem?.name
        },
        resolver: yupResolver(schema)
    });
    const {  watch } = methods;


    useDeepCompareEffect(() => {
        function updateState() {

            if (routeParams.id != 'new') {
                dispatch(getSpecies(routeParams.id))
            }
        }

        updateState();
    }, [dispatch, routeParams]);

    return (
        <form>
            <FormProvider
                {...methods}>
                <FusePageCarded
                    header={<BirdCategoryDetailHeader />}
                    content={
                        <BirdCategoryDetailContent prop={dataItem}
                        />
                    }
                />
            </FormProvider>
        </form>
    );
};

export default BirdCategoryDetail;