import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getBirdCategories, selectBirdCategories } from '../../bird-category/store/birdCategorySlice';
import { useAppDispatch, useAppSelector } from 'app/store';
export default function BirdCategoryDetailContent(prop) {
    // additional

    const options = useAppSelector(selectBirdCategories);


    const dispatch = useAppDispatch();
    const dataItem = prop
    const methods = useFormContext();
    const { register, control, formState, watch } = methods;
    const { errors } = formState;
    const { setValue } = useFormContext();
    useEffect(
        () => {
            dispatch(getBirdCategories());

            setValue('name  ', dataItem.name)
            setValue('thumbnailUrl', dataItem.thumbnailUrl);

        }
        , []
    )

    const thumbnailUrl = watch('thumbnailUrl')

    return (
        <div>
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
            <Controller
                name="birdCategoryId"
                control={control}
                defaultValue={[]}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        options={options}
                        getOptionLabel={(option ) => option.name}
                        value={value}
                   
                        onChange={(event, newValue) => {
                            onChange(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                className="w-[300px] ml-48"
                                placeholder="Select one"
                                label="Bird Category"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        )}
                    />
                )}
            />
        </div>
    )   
}
