import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getBirdCategories, selectBirdCategories } from '../../bird-category/store/birdCategorySlice';
import { useAppDispatch, useAppSelector } from 'app/store';
import { getCaremodeData } from '../../care-mode/slice/caremodeSlice';
import { getSpeciesList, selectSpecieslist } from '../../species/store/SpecisesSlice';
import { getAreaData } from '../../area/slice/areaSlice';
export default function CageDetailContent(prop) {
    const areaList = useAppSelector((state) => state.areaReducer.areaSlice.areas.data)
    const caremodeList = useAppSelector((state) => state.caremodeReducer.caremodeSlice.caremodes.data)
    const speciesList = useAppSelector(selectSpecieslist);
    const dispatch = useAppDispatch();
    const dataItem = prop
    const methods = useFormContext();
    const { register, control, formState, watch } = methods;
    const { errors } = formState;
    const { setValue } = useFormContext();
    useEffect(
        () => {

            dispatch(getCaremodeData({}));
            dispatch(getSpeciesList());
            dispatch(getAreaData({}));
            setValue('name', dataItem.name)
            setValue('thumbnailUrl', dataItem.thumbnailUrl);

        }
        , []
    )

    const thumbnailUrl = watch('thumbnailUrl')

    return (
        <div className='flex'>
            <div className='flex flex-col w-1/3'>
                <Controller
                    defaultValue={dataItem.name}
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            {...register("name")}
                            className="mt-8 mb-16 w-[300px] ml-48"
                            required
                            label="Name"
                            autoFocus
                            value={dataItem.name}
                            id="name"
                            variant="outlined"
                            fullWidth
                            error={!!errors.name}
                            helperText={errors?.name?.message as string}
                        />
                    )}
                />
                <Controller
                    defaultValue={dataItem.code}
                    name="code"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            {...register("code")}
                            className="mt-8 mb-16 w-[300px] ml-48"
                            required
                            label="Code"
                            autoFocus
                            value={dataItem.code}
                            id="Code"
                            variant="outlined"
                            fullWidth
                            error={!!errors.code}
                            helperText={errors?.code?.message as string}
                        />
                    )}
                />
                <Controller
                    defaultValue={dataItem.material}
                    name="material"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            {...register("material")}
                            className="mt-8 mb-16 w-[300px] ml-48"
                            required
                            label="material"
                            autoFocus
                            value={dataItem.material}
                            id="material"
                            variant="outlined"
                            fullWidth
                            error={!!errors.material}
                            helperText={errors?.material?.message as string}
                        />
                    )}
                />
                <Controller
                    defaultValue={dataItem.description}
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            {...register("description")}
                            className="mt-8 mb-16 w-[300px] ml-48"
                            required
                            label="description"
                            autoFocus
                            value={dataItem.description}
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
                    defaultValue={dataItem.height}
                    name="height"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            {...register("height")}
                            className="mt-8 mb-16 w-[300px] ml-48"
                            required
                            label="height"
                            autoFocus
                            value={dataItem.height}
                            id="height"
                            variant="outlined"
                            fullWidth
                            error={!!errors.height}
                            helperText={errors?.height?.message as string}
                        />
                    )}
                />
                <Controller
                    defaultValue={dataItem.depth}
                    name="depth"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            {...register("depth")}
                            className="mt-8 mb-16 w-[300px] ml-48"
                            required
                            label="depth"
                            autoFocus
                            value={dataItem.depth}
                            id="depth"
                            variant="outlined"
                            fullWidth
                            error={!!errors.depth}
                            helperText={errors?.depth?.message as string}
                        />
                    )}
                />
                <Controller
                    defaultValue={dataItem.width}
                    name="width"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            {...register("width")}
                            className="mt-8 mb-16 w-[300px] ml-48"
                            required
                            label="width"
                            autoFocus
                            value={dataItem.width}
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
                                        src={URL.createObjectURL(thumbnailUrl)}
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
