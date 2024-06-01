import FusePageCarded from "@fuse/core/FusePageCarded";
import { useDeepCompareEffect } from "@fuse/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "app/store";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { getSpecies, reaset, selectDetail } from "../store/SpeciesDetailSlice";
import SpeciesDetailHeader from "./SpeciesDetailHeader";
import SpeciesDetailContent from "./SpeciesDetailContent";
import FuseLoading from "@fuse/core/FuseLoading";

const schema = yup.object().shape({
    name: yup
        .string()
        .required('You must enter a bird catego ry name')
        .min(5, 'At least 5 charactor'),
    thumbnailUrl: yup
        .mixed(),
    birdCategory: yup
        .mixed()

});
type FormValues = {
    name: string,
    thumbnailUrl: any,
    birdCategory: any,
}


const SpeciesDetail = () => {
    const dispatch = useAppDispatch();
    const dataItem = useAppSelector(selectDetail)
    console.log("dataItem",dataItem)
    const { id } = useParams();
    const methods = useForm<FormValues>({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });
    const { watch, reset } = methods;


    useDeepCompareEffect(() => {
        function updateState() {

            if (id != 'new') {
                dispatch(getSpecies(id))
            }
        }
        updateState();

    }, [dispatch, id]);
    useEffect(() => {
        reset(dataItem)

    }, [dataItem]);
    useEffect(() => {
        return () => {
            dispatch(reaset())
        }
    }
        , [dispatch])
    if (!dataItem && id !== "new") {
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
                    header={
                        <SpeciesDetailHeader
                        />
                    }
                    content={
                        <SpeciesDetailContent />
                    }
                />
            </FormProvider>
        </form>
    );
};

export default SpeciesDetail;