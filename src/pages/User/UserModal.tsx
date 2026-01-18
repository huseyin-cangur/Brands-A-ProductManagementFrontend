
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm, Controller } from "react-hook-form";
import { Autocomplete, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { userService } from '../../services/userService';
import { addUser, updateUser } from './UserSlice';
import { claimService } from '../../services/claimService';
import { setClaim } from '../Claim/ClaimSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type MyModalProps = {
    open: boolean;
    mode: "create" | "edit";
    onClose: () => void;
    userId: string | null;
};

type FormValues = {
    id?: string
    firstName: string;
    lastName: string;
    password: string;
    email: string,
    operationClaimIds: string[];

};


export const UserModal: React.FC<MyModalProps> = ({ open, mode, userId, onClose }) => {




    const dispatch = useAppDispatch();
    const isEdit = mode === "edit";
    const modalTitle = mode ==="edit" ? "Kullanıcı Düzenle" :"Kullanıcı Ekle"


    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>();

    const { users } = useAppSelector((state) => state.users)
    const { claims } = useAppSelector((state) => state.claims);



    React.useEffect(() => {

        if (!open) return;


        claimService.getAll(1, 20).then(res => {
            console.log(res);

            dispatch(setClaim(res))
        })


        if (mode === "create") {
            reset({
                id: "",
                firstName: "",
                lastName: "",
                email: "",
                password: ""

            });
        }

        if (mode === "edit" && userId) {


            const user = users.find(c => c.id == userId)


            reset({
                id: user?.id,
                firstName: user?.firstName,
                lastName: user?.lastName,
                email: user?.email, 
                operationClaimIds:user?.operationClaimIds
                
            });


        }

    }, [open, mode, userId, reset])


    const onSubmit = (data: FormValues) => {



        const request = isEdit
            ? userService.updateUser(data)
            : userService.addUser(data);

        request.then((res) => {
            if (res.success) {

                toast.success(res.message);
                dispatch(isEdit ? updateUser(res.data) : addUser(res.data));
                closeModal();
            }
        });
    };




    const closeModal = () => {
        onClose();
    };


    const handleClose = () => {
        reset();
        closeModal()
    }

    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Typography variant="h6" sx={{ mb: 2 }}>
                         {modalTitle}
                    </Typography>

                    <Box
                    >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}>
                            <Controller
                                name="firstName"
                                control={control}
                                rules={{
                                    required: "Ad alanı zorunludur",
                                    minLength: {
                                        value: 2,
                                        message: "En az 2 karakter olmalıdır",
                                    },
                                }}
                                render={({ field }) => (
                                    <TextField

                                        {...field}
                                        fullWidth
                                        label="Ad"
                                        error={!!errors.firstName}
                                        helperText={errors.firstName?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="lastName"
                                control={control}
                                rules={{

                                    minLength: {
                                        value: 2,
                                        message: "En az 2 karakter olmalıdır",
                                    },
                                }}
                                render={({ field }) => (
                                    <TextField

                                        {...field}
                                        fullWidth
                                        label="Soyadı"
                                        error={!!errors.lastName}
                                        helperText={errors.lastName?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: "E-posta adresi zorunludur",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Geçerli bir e-posta adresi giriniz",
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "E-posta en fazla 100 karakter olabilir",
                                    },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="E-posta"
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                )}
                            />

                            {
                                !isEdit &&
                                (
                                    <Controller
                                        name="password"
                                        control={control}
                                        rules={{
                                            required: "Şifre alanı zorunludur",
                                            minLength: {
                                                value: 8,
                                                message: "En az 8 karakter olmalıdır",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <TextField

                                                {...field}
                                                fullWidth
                                                label="Şifre"
                                                error={!!errors.password}
                                                helperText={errors.password?.message}
                                            />
                                        )}
                                    />
                                )


                            }
                            <Controller
                                name="operationClaimIds"
                                control={control}
                                rules={{
                                    required: "En az bir rol seçmelisiniz",
                                }}
                                render={({ field }) => {
                                    const selectedClaims = claims.filter((c) =>
                                        field.value?.includes(c.id)
                                    );

                                    return (
                                        <Autocomplete
                                            multiple
                                            options={claims}
                                            value={selectedClaims}
                                            getOptionLabel={(option) => option.name}
                                            isOptionEqualToValue={(option, value) =>
                                                option.id === value.id
                                            }
                                            onChange={(_, values) =>
                                                field.onChange(values.map((v) => v.id))
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Roller"
                                                    error={!!errors.operationClaimIds}
                                                    helperText={errors.operationClaimIds?.message}
                                                />
                                            )}
                                        />
                                    );
                                }}
                            />



                        </Box>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 2,
                            mt: 4,
                        }}>
                            <Button variant="outlined" onClick={handleClose}>
                                Kapat
                            </Button>

                            <Button onClick={handleSubmit(onSubmit)} variant="contained">
                                Kaydet
                            </Button>
                        </Box>


                    </Box>
                </Box>

            </Modal>
        </div>
    )

}