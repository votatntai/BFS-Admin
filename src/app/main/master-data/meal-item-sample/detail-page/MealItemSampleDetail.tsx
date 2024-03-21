import FusePageCarded from "@fuse/core/FusePageCarded";
import { useDeepCompareEffect } from "@fuse/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "app/store";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { getMealItemSample, newItem, selectDetail } from "../store/mealItemSampleDetailSlice";
import MealItemSampleDetailContent from "./MealItemSampleDetailContent";
import MealItemSampleDetailHeader from "./MealItemSampleDetailHeader";
import { useEffect } from "react";
import FuseLoading from "@fuse/core/FuseLoading";
import _ from "lodash";

const schema = yup.object().shape({
  
});



const MealItemSampleDetail = () => {
    const dispatch = useAppDispatch();
    const dataItem = useAppSelector(selectDetail);
    const routeParams = useParams();
    const methods = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });
    const { reset, watch } = methods;
    const form = watch();

    useDeepCompareEffect(() => {
        async function updateState() {

            if (routeParams.id !== 'new') {

                await dispatch(getMealItemSample(routeParams.id))
            } else {
                await dispatch(newItem())
            }
        }

        updateState();
        reset(dataItem);

    }, [dispatch, routeParams]);
    useEffect(() => {
    }, [dataItem, reset]);
    console.log("form",form)
    /**
	 * Wait while dataItem data is loading and form is setted
	 */
	// if (_.isEmpty(form) || (dataItem && routeParams.id !== dataItem.id && routeParams.id !== 'new')) {
    
    //     return <FuseLoading />;
	// }
    return (
        <form>
            <FormProvider
                {...methods}>
                <FusePageCarded
                    header={<MealItemSampleDetailHeader />}
                    content={
                        <MealItemSampleDetailContent
                        />
                    }
                />
            </FormProvider>
        </form>
    );
};

export default MealItemSampleDetail;