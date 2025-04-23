import { Autocomplete, Box, Button, FormHelperText, Grid, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Author } from '../../types/document';
import { FormikCustomInput } from '../../components';
import useAuthor from '../../hooks/useAuthor';

interface FormProps {
    id?: string,
    handleOpen: (e: any) => void,
}

const FormAuthor = ({ id, handleOpen }: FormProps) => {
    const theme = useTheme()
    const { t } = useTranslation()

    const { authors, isLoadingAuthor, createNewAuthor, fetchDataAuthor } = useAuthor()
    const [initialValues, setInitialValues] = useState<Author>()


    const onSubmit = async (values: any, { setErrors, setStatus, setSubmitting }: any) => {
        try {
            await createNewAuthor(values)
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
        if (id) setInitialValues(authors?.find(item => item.id === id))
    }, [id, authors, isLoadingAuthor]);

    if (isLoadingAuthor) {
        return <>Loading...</>
    }


    return (
        <Formik
            enableReinitialize
            initialValues={{
                name: initialValues?.name
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string().max(255).required('Không được trống'),
            })}
            onSubmit={onSubmit}
        >
            {({ errors, handleBlur, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Grid container spacing={1}>



                        <Grid item xs={12} sm={12}>
                            <Typography variant='body2' py={1}>Tên tác giả</Typography>
                            <FormikCustomInput
                                size="small"
                                name="name"
                                type="text"
                                value={values.name}
                                onChange={(e: any) => setFieldValue("name", e.target.value)}
                                onBlur={handleBlur}
                                touched={touched.name}
                                errors={errors.name}

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
export default FormAuthor