import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { FormControlLabel, Radio, RadioGroup, TextareaAutosize } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import { useAppDispatch, useAppSelector } from 'app/store';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { getBirdCategories, selectBirdCategories } from '../../bird-category/store/birdCategorySlice';
import { getCages, selectCages } from '../../cage/store/cageSlice';
import { getCaremodeData } from '../../care-mode/slice/caremodeSlice';
import { getSpeciesList, selectSpecieslist } from '../../species/store/SpecisesSlice';
export default function CageDetailContent() {
    const caremodeList = useAppSelector((state) => state.caremodeReducer.caremodeSlice.caremodes.data)
    const cagesList = useAppSelector(selectCages)
    const categoriesList = useAppSelector(selectBirdCategories)
    const speciesList = useAppSelector(selectSpecieslist);
    const dispatch = useAppDispatch();
    console.log("specieslist", speciesList)
    const methods = useFormContext();
    const { control, formState, watch, getValues } = methods;
    const { errors } = formState;
    useEffect(
        () => {

            dispatch(getCaremodeData({}));
            dispatch(getSpeciesList());
            dispatch(getBirdCategories())
            dispatch(getCages())


        }
        , []
    )
    const thumbnailUrl = watch('thumbnailUrl')

    return (
        <div className='flex'>
            <div className='flex flex-col w-1/3'>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <>
                            <TextField
                                {...field}
                                className="mt-8 mb-16 w-[300px] ml-48"
                                required
                                label="Name"
                                id="name"
                                variant="outlined"
                                fullWidth
                                error={!!errors.name}
                                helperText={errors?.name?.message as string}
                            />
                        </>
                    )}
                />
                <Controller
                    name="code"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mt-8 mb-16 w-[300px] ml-48"
                            required
                            label="Code"
                            id="Code"
                            variant="outlined"
                            fullWidth
                            error={!!errors.code}
                            helperText={errors?.code?.message as string}
                        />
                    )}
                />
                <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                        <RadioGroup
                            {...field}
                            className='mb-16 ml-48'
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value={true} control={<Radio />} label="Female" />
                            <FormControlLabel value={false} control={<Radio />} label="Male" />
                        </RadioGroup>

                    )}
                />

            </div>
            <div className='flex flex-col w-1/3'>

                <Controller
                    name="dayOfBirth"
                    control={control}
                    render={({ field }) => (
                        <DatePicker

                            {...field}
                            className='ml-48'
                        />
                    )}
                />
                {cagesList && <Controller
                    name="cageId"
                    control={control}
                    defaultValue={{}}
                    render={({ field: { onChange, value } }) => (
                        <Autocomplete
                            className="mt-8 mb-16"
                            freeSolo
                            options={cagesList}
                            getOptionLabel={(options) => {
                                return options.name || '';
                            }
                            }
                            value={value}
                            onChange={(event, newValue) => {
                                onChange(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="w-[300px] ml-48"
                                    placeholder="Select one"
                                    label="Care mode"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            )}
                        />
                    )}
                />}
                <h3 className="mt-8 mb-16 ml-48">Input Characteristic</h3>
                <Controller
                    name="characteristic"
                    control={control}
                    render={({ field }) => (
                        <TextareaAutosize
                            aria-label='characterristic'
                            placeholder="characterristic"
                            {...field}
                            className="mt-8 mb-16 w-[300px] ml-48  border-solid border-2"
                            required
                        />
                    )}
                />


            </div>
            <div className='flex flex-col w-1/3'>

                {caremodeList && <Controller
                    name="careModeId"
                    control={control}
                    defaultValue={caremodeList}
                    render={({ field: { onChange, value } }) => (
                        <Autocomplete
                            className="mt-8 mb-16"
                            freeSolo
                            options={caremodeList}
                            getOptionLabel={(options) => {
                                return options.name || '';
                            }
                            }
                            value={value}
                            onChange={(event, newValue) => {
                                onChange(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="w-[300px] ml-48"
                                    placeholder="Select one"
                                    label="Care mode"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            )}
                        />
                    )}
                />}
                {speciesList && <Controller
                    name="speciesId"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Autocomplete
                            className="mt-8 mb-16"
                            options={speciesList}
                            getOptionLabel={(options) => {
                                return options.name || '';
                            }
                            }
                            value={value}
                            onChange={(event, newValue) => {
                                onChange(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="w-[300px] ml-48"
                                    placeholder="Select one"
                                    label="Species"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            )}
                        />
                    )}
                />}
                {categoriesList && <Controller
                    name="categoryId"
                    control={control}
                    defaultValue={{}}
                    render={({ field: { onChange, value } }) => (
                        <Autocomplete
                            className="mt-8 mb-16"
                            options={categoriesList}
                            getOptionLabel={(options) => {
                                return options.name || '';
                            }
                            }
                            value={value}
                            onChange={(event, newValue) => {
                                onChange(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="w-[300px] ml-48"
                                    placeholder="Select one"
                                    label="Bird category"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            )}
                        />
                    )}
                />}

                <Controller
                    name="thumbnailUrl"

                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Box
                            component="label"
                            htmlFor="button-file"
                            className="productImageUpload ml-48 flex border-2 items-center justify-center relative w-128 h-128 rounded-16  mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                        >
                            <input
                                accept="image/*"
                                className="hidden"
                                id="button-file"
                                type="file"
                                onChange={
                                    async (e) => {
                                        const file = e.target.files[0];
                                        if (!file) return;
                                        onChange(file)
                                    }
                                }
                            />
                            <FuseSvgIcon
                                className=' absolute  left-1/2'
                                size={32}
                                color="action"
                            >
                                heroicons-outline:upload
                            </FuseSvgIcon>
                            <>
                                {thumbnailUrl ? (
                                    (thumbnailUrl instanceof File) ?
                                        (<img
                                            className="max-w-none w-auto h-full"
                                            src={URL.createObjectURL(thumbnailUrl)}
                                        />) : (
                                            <img
                                                className="max-w-none w-auto h-full"
                                                src={thumbnailUrl}
                                            />
                                        )
                                ) : (
                                    <img
                                        className="w-32 sm:w-48 rounded hidden"
                                        src="assets/images/apps/ecommerce/product-image-placeholder.png"
                                    />
                                )}</>
                        </Box>
                    )}
                />
            </div>

        </div>
    )
}
