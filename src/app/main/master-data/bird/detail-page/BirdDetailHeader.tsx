import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useAppDispatch } from 'app/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import _ from '@lodash';
import { useEffect, useState } from 'react';
import { createBird, saveBird } from '../store/birdDetailSlice';
import { getValue } from '@mui/system';
import { formatISO } from 'date-fns';


export default function CageDetailHeader(prop) {

    const dispatch = useAppDispatch();
    const methods = useFormContext();
    const { formState, watch, getValues } = methods;
    const { isValid, dirtyFields } = formState;
    const navigate = useNavigate();
    const { id } = useParams();

    const [isAddButton, setIsAddButton] = useState(false);
    useEffect(
        () => {
            if (id === 'new')
                setIsAddButton(true);
        }
        , []
    )
    const { name, thumbnailUrl } = watch();
    const formData = new FormData()
    const formSave = new FormData()
    async function handleSaveProduct() {
        const formSave = new FormData()
        formSave.append('code', getValues().code)
        formSave.append('name', getValues().name)
        if (thumbnailUrl instanceof File)
        formSave.append('thumbnail', getValues().thumbnailUrl)
        formSave.append('gender', getValues().gender)
        formSave.append('characteristic', getValues().characteristic)
        formSave.append('dayOfBirth', formatISO(new Date(getValues().dayOfBirth)))
        formSave.append('categoryId', getValues().category.id)
        formSave.append('cageId', getValues().cage.id)
        formSave.append('speciesId', getValues().species.id)
        formSave.append('careModeId', getValues().careMode.id)
        const result = await dispatch(saveBird({ id, formSave }));
        navigate('/master-data/bird');
    }
    const handleAdd = async () => {
        formData.append('code', getValues().code)
        formData.append('name', getValues().name)
        formData.append('thumbnail', getValues().thumbnailUrl)
        formData.append('gender', getValues().gender)
        formData.append('characteristic', getValues().characteristic)
        formData.append('dayOfBirth', formatISO(getValues().dayOfBirth))
        formData.append('categoryId', getValues().category.id)
        formData.append('cageId', getValues().cage.id)
        formData.append('speciesId', getValues().species.id)
        formData.append('careModeId', getValues().careMode.id)
        // let formSaveObj = {};
        // for (let [key, value] of formData.entries()) {
        //     formSaveObj[key] = value;
        // }
        // console.log("formSaveObj", formSaveObj);
        const result = await dispatch(createBird(formData));
        navigate('/master-data/bird');
    }
    return (<>

        <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-32 px-24 md:px-32">
            <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">

                <div className="flex items-center max-w-full">

                    <motion.div
                        className="flex  items-center sm:items-start min-w-0 mx-8 sm:mx-16"
                        initial={{ x: -20 }}
                        animate={{ x: 0, transition: { delay: 0.3 } }}
                    >

                        <Typography
                            variant="caption"
                            className="font-bold"
                        >
                            Detail Information
                        </Typography>
                    </motion.div>
                </div>
            </div>
            <motion.div
                className="flex"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
            >
                <Button
                    color="secondary"
                    className=" "
                    component={Link}
                    variant="outlined"
                    to="/master-data/bird"
                >
                    Back
                </Button>
                {isAddButton ? (
                    <Button
                        className="whitespace-nowrap mx-4"
                        variant="contained"
                        color="secondary"
                        disabled={_.isEmpty(dirtyFields) || !isValid}
                        onClick={handleAdd}

                    >
                        Add
                    </Button>
                ) : (
                    <Button
                        className="whitespace-nowrap mx-4"
                        variant="contained"
                        color="secondary"
                        disabled={_.isEmpty(dirtyFields) || !isValid}
                        onClick={handleSaveProduct}
                    >
                        Save
                    </Button>
                )}
            </motion.div>
        </div></>
    );
}