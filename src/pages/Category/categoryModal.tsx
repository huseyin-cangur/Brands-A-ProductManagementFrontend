
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm, Controller } from "react-hook-form";
import { TextField } from '@mui/material';
import { categoryService } from '../../services/categorService';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addCategory, updateCategory } from './CategorySlice';
import { toast } from 'react-toastify';

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
    categoryId: string | null;
};

type FormValues = {
    id?: string
    name: string;
    description: string;
};


export const CategoryModal: React.FC<MyModalProps> = ({ open, mode, categoryId, onClose }) => {

    console.log(categoryId)


    const dispatch = useAppDispatch();
    const isEdit = mode === "edit";



    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>();

    const { categories } = useAppSelector((state) => state.categories)




    React.useEffect(() => {

        if (!open) return;
        if (mode === "create") {
            reset({
                name: "",
                description: "",
            });
        }

        if (mode === "edit" && categoryId) {



            const category = categories.find(c => c.id == categoryId)
            reset({
                id: category?.id,
                name: category?.name,
                description: category?.description,
            });


        }

    }, [open, mode, categoryId, reset])


    const onSubmit = (data: FormValues) => {



        const request = isEdit
            ? categoryService.updateCategory(data)
            : categoryService.addCategory(data);

        request.then((res) => {
            if (res.success) {
                toast.success(res.message)
                dispatch(isEdit ? updateCategory(res.data) : addCategory(res.data));
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
                        Kategori Ekle
                    </Typography>

                    <Box
                    >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}>
                            <Controller
                                name="name"
                                control={control}
                                rules={{
                                    required: "Kategori adı zorunludur",
                                    minLength: {
                                        value: 3,
                                        message: "En az 2 karakter olmalıdır",
                                    },
                                }}
                                render={({ field }) => (
                                    <TextField

                                        {...field}
                                        fullWidth
                                        label="Kategori Adı"
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="description"
                                control={control}
                                rules={{

                                    minLength: {
                                        value: 3,
                                        message: "En az 2 karakter olmalıdır",
                                    },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        multiline
                                        minRows={3}
                                        {...field}
                                        fullWidth
                                        label="Kategori Açıklaması"
                                        error={!!errors.description}
                                        helperText={errors.description?.message}
                                    />
                                )}
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