import BirdCategoryDetailContent from "./BirdCategoryDetailContent";
import BirdCategoryDetailHeader from "./BirdCategoryDetailHeader";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { FormProvider, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "app/store";
import * as yup from 'yup';
import { Link, useParams } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import { selectBirdCategory } from "../store/birdCategorySlice";
import { getBirdCategory, selectBirdCategoryDetail } from "../store/birdCategoryDetailSlice";
import { useDeepCompareEffect } from "@fuse/hooks";

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
    const dataItem = useAppSelector(selectBirdCategoryDetail);
    const routeParams = useParams();
    const methods = useForm<FormValues>({
        mode: 'onSubmit',
        defaultValues: {
            name: dataItem?.name
        },
        resolver: yupResolver(schema)
    });
    const { reset, watch } = methods;
    const form = watch();

    useDeepCompareEffect(() => {
        function updateProductState() {

            if (routeParams.id != 'new') {
                dispatch(getBirdCategory(routeParams.id))
            }
        }

        updateProductState();
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