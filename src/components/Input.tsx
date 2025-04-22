import { FormControl, FormHelperText, OutlinedInput, styled, Typography } from "@mui/material";

export function FormikCustomInput({ ...props }) {
  return (
    <FormControl fullWidth error={Boolean(props.touched && props.errors)}>
      <Typography variant="body2" pb={1}>{props.label}</Typography>
      <CustomInput
        type={props.type}
        value={props.value}
        name={props.name}
        {...props}
      />
      {props.touched && props.errors && (
        <FormHelperText error>{props.errors.toString()}</FormHelperText>
      )}
    </FormControl>
  );
}

const InputRoot = styled(OutlinedInput)(({ theme }) => ({
  width: '100%',
  color: theme.palette.grey[400],
  '& .MuiOutlinedInput-notchedOutline': {
    border: `2px solid ${theme.palette.grey[300]}`,
    color: `${theme.palette.grey[400]} !important`
  },

  '&:hover $notchedOutline': {
    borderColor: theme.palette.primary.light,
  },
  '&.MuiInputBase-multiline': {
    padding: 1,
  }
}))

export const CustomInput = ({ ...props }) => {
  return <InputRoot notched={false} {...props} />
}
