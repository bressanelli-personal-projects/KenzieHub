import { Box, Button, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const Home = () => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <h1 className={classes.title}>KENZIE HUB</h1>

            <Paper className={classes.paper} elevation={10}>
                <Link className={classes.link} to="login">
                    <Button
                        endIcon={<LoginIcon />}
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                    >
                        LOGIN
                    </Button>
                </Link>
            </Paper>

            <Paper className={classes.paper} elevation={10}>
                <Link className={classes.link} to="signup">
                    <Button
                        endIcon={<AppRegistrationIcon />}
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                    >
                        SIGNUP
                    </Button>
                </Link>
            </Paper>
        </Box>
    );
};

export default Home;
