import TextField, { type TextFieldProps } from '@mui/material/TextField';
import { type FieldHookConfig, useField } from 'formik';

export type ITextField = TextFieldProps & FieldHookConfig<string>;

export function TextFieldConnected(props: ITextField) {
    const [field, meta] = useField<string>(props);

    const { error, touched } = meta;
    const hasError = Boolean(error && touched);

    return (
        <TextField
            {...field}
            {...props}
            error={hasError}
            helperText={hasError && error}
        />
    );
}
