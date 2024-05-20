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

const schema = yup.object().shape({
    name: yup
        .string()
        .required('You must enter a bird catego ry name')
        .min(5, 'At least 5 charactor'),
    thumbnailUrl: yup
        .mixed()

});
type FormValues = {
    name: string,
    thumbnailUrl: any,
}


const SpeciesDetail = () => {
    const dispatch = useAppDispatch();
    const dataItem = useAppSelector(selectDetail);
    const { id } = useParams();
    const methods = useForm<FormValues>({
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    });
    const { watch, reset } = methods;


    useDeepCompareEffect(() => {
        function updateState() {

            if (id != 'new') {
                dispatch(getSpecies(id))
            } else dispatch(reaset())
        }
        updateState();

    }, [dispatch, id]);
    useEffect(() => {
        reset(dataItem)

    }, [dataItem]);
    useEffect(() => {
        return () => {
            console.log("reAset ??")
            dispatch(reaset())
        }
    }
        , [dispatch]);


    return (
        <form>
            <FormProvider
                {...methods}>
                <FusePageCarded
                    header={<SpeciesDetailContent />}
                    content={
                        <SpeciesDetailHeader 
                        />
                    }
                />
            </FormProvider>
        </form>
    );
};

export default SpeciesDetail;