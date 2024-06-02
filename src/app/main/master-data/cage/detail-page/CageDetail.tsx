import BirdCategoryDetailHeader from "./CageDetailHeader";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { FormProvider, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "app/store";
import * as yup from 'yup';
import { Link, useParams } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import { useDeepCompareEffect } from "@fuse/hooks";
import { getCage, reaset, selectDetail } from "../store/cageDetailSlice";
import CageDetailHeader from "./CageDetailHeader";
import CageDetailContent from "./CageDetailContent";
import { CageType } from "../type/CageType";
import { useEffect } from "react";
import FuseLoading from "@fuse/core/FuseLoading";

const schema = yup.object().shape({
    name: yup
        .string()
        .required('You must enter a name'),
    code: yup
        .string()
        .required('You must enter a code'),
    material: yup
        .string()
        .required('You must enter a material'),
    description: yup
        .string()
        .required('You must enter a description'),
    height: yup
        .number()
        .required('You must enter a height'),

    width: yup
        .number()
        .required('You must enter a width'),

    depth: yup
        .number()
        .required('You must enter a depth'),
    area: yup
        .mixed()
        .required('You must select a area'),
    thumbnailUrl: yup
        .mixed()

});
type FormValues = {
    name: string,
}


const CageDetail = () => {
    const dispatch = useAppDispatch();
    const cage = useAppSelector(selectDetail);
    const routeParams = useParams();
    const methods = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });
    const { reset, watch } = methods;

    useDeepCompareEffect(() => {
        function updateState() {

            if (routeParams.id !== 'new') {
                dispatch(getCage(routeParams.id))
            }
        }

        updateState();
    }, [dispatch, routeParams])

    useEffect(() => {

        return () => {
            dispatch(reaset())
        };
    }, [dispatch]);
    useEffect(() => {
        if (!cage) {
            return;
        }
        reset(cage);

    }, [cage, reset]);
    useEffect(() => {
        return () => {

            reset({})
        };
    }, [dispatch])
    if (!cage && routeParams.id !== "new") {
        return (
            <div className="flex w-full  items-center justify-center h-full">
                <FuseLoading />
            </div>
        )
    }
    return (
        <form>
            <FormProvider
                {...methods}>
                <FusePageCarded
                    header={<CageDetailHeader />}
                    content={
                        <CageDetailContent cage={cage}
                        />
                    }
                />
            </FormProvider>
        </form>
    );
};

export default CageDetail;