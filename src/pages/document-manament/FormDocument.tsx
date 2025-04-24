import { Autocomplete, Button, Grid, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import useDocument from '../../hooks/useDocument';
import { DocumentType } from '../../types/document';
import { FormikCustomInput } from '../../components';
import useField from '../../hooks/useField';
import useAuthor from '../../hooks/useAuthor';

interface FormProps {
    id?: string,
    handleOpen: (e: any) => void,
}

const FormDocument = ({ id, handleOpen }: FormProps) => {
    const theme = useTheme()
    const { t } = useTranslation()

    const { documents, isLoadingDocument, createNewDocument, editDocument } = useDocument()
    const { fields } = useField()
    const { authors } = useAuthor()
    const [initialValues, setInitialValues] = useState<DocumentType>()


    const onSubmit = async (values: any, { setErrors, setStatus, setSubmitting }: any) => {
        try {
            if (id) await editDocument(id, values)
            else await createNewDocument(values)
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
        if (id) setInitialValues(documents?.find(item => item.id === id))
    }, [id, documents, isLoadingDocument]);

    // if (isLoadingDocument) {
    //     return <>Loading...</>
    // }


    return (
        <Formik
            enableReinitialize
            initialValues={{
                title: initialValues?.title,
                type: initialValues?.type,
                // year: initialValues?.year,
                author_ids: initialValues?.authors.map(author => author.id),
                field_id: initialValues?.field.id,
                // publisher: initialValues?.publisher,
                content: initialValues?.content
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
                            <Typography variant='body2' py={1} pb={2}>Tác giả</Typography>
                            {/* <Autocomplete
                                size="small"
                                fullWidth
                                disablePortal
                                options={authors}
                                getOptionLabel={(option) => option?.name || ''}
                                onChange={(event, newValue) => {
                                    setFieldValue("author_id", newValue?.id);
                                }}
                                renderInput={(params) => <TextField {...params} placeholder={initialValues?.author?.name} />}
                            /> */}
                            <Autocomplete
                                multiple
                                size="small"
                                fullWidth
                                disablePortal
                                options={authors}
                                getOptionLabel={(option) => option?.name || ''}
                                onChange={(event, newValue) => {
                                    // Lấy mảng id từ các tác giả được chọn
                                    const authorIds = newValue.map(author => author.id);
                                    setFieldValue("author_ids", authorIds);
                                }}
                                renderInput={(params) => {
                                    // Convert author IDs to a string for the placeholder
                                    const placeholder = initialValues?.authors?.map((author) => author.name).join(', ') || '';

                                    return <TextField {...params} placeholder={placeholder} />;
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <Typography variant='body2' py={1} pb={2}>Lĩnh vực</Typography>
                            <Autocomplete
                                size="small"
                                fullWidth
                                disablePortal
                                options={fields}
                                getOptionLabel={(option) => option?.name || ''}
                                onChange={(event, newValue) => {
                                    setFieldValue("field_id", newValue?.id);
                                }}
                                renderInput={(params) => <TextField {...params} placeholder={initialValues?.field?.name} />}
                            />
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
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
                        </Grid> */}
                        <Grid item xs={12} sm={12}>
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

                        <Grid item xs={12} sm={12}>
                            <Typography variant='body2' py={1}>Nội dung</Typography>
                            <FormikCustomInput
                                size="small"
                                name="content"
                                type="text"
                                rows={8}
                                multiline
                                value={values.content}
                                onChange={(e: any) => setFieldValue("content", e.target.value)}
                                onBlur={handleBlur}
                                touched={touched.content}
                                errors={errors.content}

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