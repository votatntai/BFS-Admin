import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useAppDispatch } from 'app/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import _ from '@lodash';
import { useEffect, useState } from 'react';
import { createSpecies, saveSpecies } from '../store/SpeciesDetailSlice';
import { SpeicesType } from '../type/SpeciesType';
import { getValue } from '@mui/system';


export default function SpeciesDetailHeader() {

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
    const formData = new FormData()
 

    const { name, thumbnailUrl,birdCategory } = watch();

    async function handleSaveProduct() {
        const formSave = new FormData()
        if(birdCategory)
        formSave.append('birdCategoryId', getValues().birdCategory.id)
        formSave.append('name', getValues().name)
        formSave.append('thumbnail', getValues().thumbnailUrl)
  
        const result = await dispatch(saveSpecies({id,formSave}));
        // navigate('/master-data/species');
    }
    const handleAdd = async () => {
        formData.append('birdCategoryId', getValues().birdCategory.id)
        formData.append('name', getValues().name)
        formData.append('thumbnail', getValues().thumbnailUrl)

        const result = await dispatch(createSpecies(formData));

        navigate('/master-data/species');
    }


    return (
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
                    to="/master-data/species"
                >
                    Back
                </Button>
                {!isAddButton ? (
                    <Button
                        className="whitespace-nowrap mx-4"
                        variant="contained"
                        color="secondary"
                        disabled={_.isEmpty(dirtyFields) || !isValid}
                        onClick={handleSaveProduct}
                    >
                        Save
                    </Button>) : (
                    <Button
                        className="whitespace-nowrap mx-4"
                        variant="contained"
                        color="secondary"
                        disabled={_.isEmpty(dirtyFields) || !isValid}
                        onClick={handleAdd}
                    >
                        Add
                    </Button>
                )}
            </motion.div>
        </div>
    );
}