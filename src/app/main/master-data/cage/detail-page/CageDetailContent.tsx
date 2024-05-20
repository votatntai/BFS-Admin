import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from 'app/store';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { getAreaData } from '../../area/slice/areaSlice';
import { getCaremodeData } from '../../care-mode/slice/caremodeSlice';
import { getSpeciesList, selectSpecieslist } from '../../species/store/SpecisesSlice';
export default function CageDetailContent(prop) {
    const { cage } = prop
    const areaList = useAppSelector((state) => state.areaReducer.areaSlice.areas.data)
    const caremodeList = useAppSelector((state) => state.caremodeReducer.caremodeSlice.caremodes.data)
    const speciesList = useAppSelector(selectSpecieslist);
    const dispatch = useAppDispatch();
    const methods = useFormContext();
    const { reset, control, formState, watch } = methods;
    const { errors } = formState;
    const { setValue } = useFormContext();
    useEffect(
        () => {
            dispatch(getCaremodeData({}));
            dispatch(getSpeciesList());
            dispatch(getAreaData({}));
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
                        <TextField
                            {...field}
                            className="mt-8 mb-16 w-[300px] ml-48"
                            required
                            label="Name"
                            autoFocus
                            id="name"
                            variant="outlined"
                            fullWidth
                            error={!!errors.name}
                            helperText={errors?.name?.message as string}
                        />
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
                            autoFocus
                            id="Code"
                            variant="outlined"
                            fullWidth
                            error={!!errors.code}
                            helperText={errors?.code?.message as string}
                        />
                    )}
                />
                <Controller
                    name="material"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mt-8 mb-16 w-[300px] ml-48"
                            required
                            label="material"
                            autoFocus
                            id="material"
                            variant="outlined"
                            fullWidth
                            error={!!errors.material}
                            helperText={errors?.material?.message as string}
                        />
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mt-8 mb-16 w-[300px] ml-48"
                            required
                            label="description"
                            autoFocus
                            id="description"
                            variant="outlined"
                            fullWidth
                            error={!!errors.description}
                            helperText={errors?.description?.message as string}
                        />
                    )}
                />
            </div>
            <div className='flex flex-col w-1/3'>

                <Controller
                    name="height"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mt-8 mb-16 w-[300px] ml-48"
                            required
                            label="height"
                            autoFocus
                            id="height"
                            variant="outlined"
                            fullWidth
                            error={!!errors.height}
                            helperText={errors?.height?.message as string}
                        />
                    )}
                />
                <Controller
                    name="depth"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mt-8 mb-16 w-[300px] ml-48"
                            required
                            label="depth"
                            autoFocus
                            id="depth"
                            variant="outlined"
                            fullWidth
                            error={!!errors.depth}
                            helperText={errors?.depth?.message as string}
                        />
                    )}
                />
                <Controller
                    name="width"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mt-8 mb-16 w-[300px] ml-48"
                            required
                            label="width"
                            autoFocus
                            id="width"
                            variant="outlined"
                            fullWidth
                            error={!!errors.width}
                            helperText={errors?.width?.message as string}
                        />
                    )}
                />
            </div>
            <div className='flex flex-col w-1/3'>

                <Controller
                    name="careModeId"
                    control={control}
                    defaultValue={[]}
                    render={({ field: { onChange, value } }) => (
                        <Autocomplete
                            className="mt-8 mb-16"
                            freeSolo
                            options={caremodeList}
                            getOptionLabel={(option) => option?.name}
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
                />
                <Controller
                    name="areaId"
                    control={control}
                    defaultValue={[]}
                    render={({ field: { onChange, value } }) => (
                        <Autocomplete
                            className="mt-8 mb-16"
                            freeSolo
                            options={areaList}
                            getOptionLabel={(option) => option.name}
                            value={value}
                            onChange={(event, newValue) => {
                                onChange(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="w-[300px] ml-48"
                                    placeholder="Select one"
                                    label="Area"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            )}
                        />
                    )}
                />
                <Controller
                    name="speciesId"
                    control={control}
                    defaultValue={[]}
                    render={({ field: { onChange, value } }) => (
                        <Autocomplete
                            className="mt-8 mb-16"
                            freeSolo
                            options={speciesList}
                            getOptionLabel={(option) => option.name}
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
                />
                <Controller
                    name="thumbnailUrl"

                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Box
                            component="label"
                            htmlFor="button-file"
                            className="productImageUpload ml-48 flex items-center justify-center relative w-128 h-128 rounded-16  mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                        >
                            <input
                                accept="image/*"
                                className="hidden"
                                id="button-file"
                                type="file"
                                onChange={async (e) => {
                                    function readFileAsync() {
                                        return new Promise((resolve) => {
                                            const file = e?.target?.files?.[0];
                                            if (!file) {
                                                return;
                                            }
                                            resolve(file)

                                        });
                                    }
                                    onChange(await readFileAsync());
                                }}
                            />
                            <FuseSvgIcon
                                size={32}
                                color="action"
                            >
                                heroicons-outline:upload
                            </FuseSvgIcon>
                            <>
                                {thumbnailUrl ? (

                                    <img
                                        className="max-w-none w-auto h-full"
                                        // src={URL.createObjectURL(thumbnailUrl)}
                                    />
                                ) : (
                                    <img
                                        className="w-32 sm:w-48 rounded"
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
