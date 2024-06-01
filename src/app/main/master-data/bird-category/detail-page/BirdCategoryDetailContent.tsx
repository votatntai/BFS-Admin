import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
export default function BirdCategoryDetailContent(prop) {
    const { dataItem } = prop
    const methods = useFormContext();
    const { register, control, formState, watch } = methods;
    const { errors } = formState;
    const { setValue } = useFormContext();


    const thumbnailUrl = watch('thumbnailUrl')

    return (
        <div>
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
                            className=' absolute  left-1/2'
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
                                <div></div>
                            )}</>
                    </Box>
                )}
            />
        </div>
    )
}
