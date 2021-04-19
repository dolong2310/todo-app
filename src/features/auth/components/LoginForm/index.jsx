import { yupResolver } from "@hookform/resolvers/yup";
import { LinearProgress } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../../components/formControls/inputField";
import PasswordField from "../../../../components/formControls/passwordField";

LoginForm.propTypes = {};

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    progress: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
    },
}));

function LoginForm(props) {
    const { onSubmit } = props;
    const classes = useStyles();
    const schema = yup.object().shape({
        identifier: yup
            .string()
            .required("Please enter your email")
            .email("Please enter a valid email"),
        password: yup.string().required("Please enter your password"),
    });

    const form = useForm({
        defaultValues: {
            identifier: "",
            password: "",
        },
        resolver: yupResolver(schema),
    });

    async function handleSubmit(values) {
        if (onSubmit) {
            await onSubmit(values);
        }
    }

    const { isSubmitting } = form.formState;

    return (
        <Container component="main" maxWidth="xs">
            {isSubmitting && <LinearProgress className={classes.progress} />}
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form
                    className={classes.form}
                    onSubmit={form.handleSubmit(handleSubmit)}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <InputField
                                name="identifier"
                                label="Email"
                                form={form}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PasswordField
                                name="password"
                                label="Password"
                                form={form}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default LoginForm;
