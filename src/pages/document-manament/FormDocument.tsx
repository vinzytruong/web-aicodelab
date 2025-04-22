import { Autocomplete, Box, Button, FormHelperText, Grid, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import useDocument from '../../hooks/useDocument';
import { DocumentType } from '../../types/document';
import { FormikCustomInput } from '../../components';

interface FormProps {
    id?: string,
    handleOpen: (e: any) => void,
}

const FormDocument = ({ id, handleOpen }: FormProps) => {
    const theme = useTheme()
    const { t } = useTranslation()

    const { document, isLoadingDocument, createNewDocument } = useDocument()
    const [initialValues, setInitialValues] = useState<DocumentType>()


    const onSubmit = async (values: any, { setErrors, setStatus, setSubmitting }: any) => {
        try {
            await createNewDocument(values)
            handleOpen(false)
        } catch (err: any) {
            if (err) {
                setStatus({ success: false });
                setErrors({ submit: err });
                setSubmitting(false);

            }
        }
    };

    useEffect(() => {
        if (id) setInitialValues(document?.find(item => item.id === id))
    }, [id, document, isLoadingDocument]);

    if (isLoadingDocument) {
        return <>Loading...</>
    }


    return (
        <Formik
            enableReinitialize
            initialValues={{
                title: initialValues?.title,
                type: initialValues?.type,
                year: initialValues?.year,
                author: initialValues?.author,
                field: initialValues?.field,
                publisher: initialValues?.publisher,
            }}
            validationSchema={Yup.object().shape({
                title: Yup.string().max(255).required('Không được trống'),
            })}
            onSubmit={onSubmit}
        >
            {({ errors, handleBlur, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Grid container spacing={1}>



                        <Grid item xs={12} sm={12}>
                            <Typography variant='body2' py={1}>Tên học liệu</Typography>
                            <FormikCustomInput
                                size="small"
                                name="title"
                                type="text"
                                value={values.title}
                                onChange={(e: any) => setFieldValue("title", e.target.value)}
                                onBlur={handleBlur}
                                touched={touched.title}
                                errors={errors.title}

                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant='body2' py={1}>Tác giả</Typography>
                            <FormikCustomInput
                                size="small"
                                name="author"
                                type="text"
                                value={values.author}
                                onChange={(e: any) => setFieldValue("author", e.target.value)}
                                onBlur={handleBlur}
                                touched={touched.author}
                                errors={errors.author}

                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant='body2' py={1}>Nhà xuất bản</Typography>
                            <FormikCustomInput
                                size="small"
                                name="publisher"
                                type="text"
                                value={values.publisher}
                                onChange={(e: any) => setFieldValue("publisher", e.target.value)}
                                onBlur={handleBlur}
                                touched={touched.publisher}
                                errors={errors.publisher}

                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant='body2' py={1}>Lĩnh vực</Typography>
                            <FormikCustomInput
                                size="small"
                                name="field"
                                type="text"
                                value={values.field}
                                onChange={(e: any) => setFieldValue("field", e.target.value)}
                                onBlur={handleBlur}
                                touched={touched.field}
                                errors={errors.field}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant='body2' py={1}>Năm xuất bản</Typography>
                            <FormikCustomInput
                                size="small"
                                name="year"
                                type="number"
                                value={values.year}
                                onChange={(e: any) => setFieldValue("year", e.target.value)}
                                onBlur={handleBlur}
                                touched={touched.year}
                                errors={errors.year}


                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant='body2' py={1} pb={2}>Loại học liệu</Typography>
                            <Autocomplete
                                size="small"
                                fullWidth
                                disablePortal
                                options={["Bài báo", "Sách", "Slide"]}
                                getOptionLabel={(option) => option || ''}
                                onChange={(event, newValue) => {
                                    setFieldValue("type", newValue);
                                }}
                                renderInput={(params) => <TextField {...params} placeholder={values?.type} />}
                            />
                        </Grid>



                        <Grid item xs={12} sm={12} textAlign={"right"}>
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: theme.palette.primary.main, boxShadow: 0, textTransform: "uppercase" }}
                                size="medium"
                                disabled={isSubmitting}
                                type="submit"

                            >
                                {t("Lưu")}
                            </Button>
                        </Grid>
                    </Grid>

                </form>
            )}
        </Formik >
    )
}
export default FormDocument