import FusePageCarded from "@fuse/core/FusePageCarded";
import { useDeepCompareEffect } from "@fuse/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "app/store";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { getBird, newItem, reaset, selectDetail } from "../store/birdDetailSlice";
import BirdDetailContent from "./BirdDetailContent";
import BirdDetailHeader from "./BirdDetailHeader";
import { useEffect } from "react";
import FuseLoading from "@fuse/core/FuseLoading";
import _ from "lodash";

const schema = yup.object().shape({
    name: yup
        .string()
        .required('You must enter a  name')
        .min(5, 'At least 5 charactor'),
    code: yup
        .string()
        .required('You must enter a  code')
        .min(5, 'At least 5 charactor'),
    gender: yup
        .string()
        .required('You must enter a  gender'),
    characteristic: yup
        .string()
        .required('You must enter a  characteristic'),
    dayOfBirth: yup
        .date()
        .required('You must enter a  dayOfBirth'),
    thumbnailUrl: yup
        .mixed(),
    category: yup
        .mixed()

});



const BirdDetail = () => {
    const dispatch = useAppDispatch();
    const dataItem = useAppSelector(selectDetail)
    console.log("dataItme",dataItem)
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
                await dispatch(getBird(routeParams.id))
            } else {
                await dispatch(newItem())
            }
        }

        updateState();


    }, [dispatch, routeParams]);
    useEffect(() => {
        reset(dataItem);
    }, [dataItem, reset]);
    useEffect(() => {
        return () => {
            dispatch(reaset())
        }
    }
        , [dispatch])
    if (!dataItem && routeParams.id !== "new") {
        return (
            <div className="flex w-full  items-center justify-center h-full">
                <FuseLoading />
            </div>
        )
    }
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
                    header={<BirdDetailHeader />}
                    content={
                        <BirdDetailContent
                        />
                    }
                />
            </FormProvider>
        </form>
    );
};

export default BirdDetail;