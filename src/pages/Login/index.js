import { Button, Paper, TextField, Grid, Fade } from "@material-ui/core";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useStyles from "./styles";
import api from "../../services/api";
import { toast } from "material-react-toastify";
import { Link, Redirect } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";

const Login = ({ authorized, setAuthorized }) => {
  const history = useHistory();

  const schema = yup.object().shape({
    email: yup.string().required("Campo obrigatório").email("Email inválido"),
    password: yup
      .string()
      .min(6, "Min. 6 caracteres")
      .required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitForm = (data) => {
    api
      .post("/sessions", data)
      .then((response) => {
        const { token, user } = response.data;
        toast.success("Login efetuado com sucesso!");

        localStorage.setItem("@Kehub:token", JSON.stringify(token));
        localStorage.setItem("@Kehub:user", JSON.stringify(user));

        setAuthorized(true);

        return history.push("/dashboard");
      })
      .catch((err) => toast.error("Email ou senha inválidos"));
  };

  const classes = useStyles();

  if (authorized) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Grid
      sx={{ minHeight: "100vh" }}
      style={{ backgroundColor: "#007aff" }}
      container
      className={classes.container}
    >
      <Grid className={classes.grid} item xs={12} sm={9} md={7} lg={5} xl={4}>
        <Fade in timeout={1500}>
          <Paper className={classes.paper} elevation={10}>
            <h1>Faça seu login</h1>

            <form
              className={classes.form}
              onSubmit={handleSubmit(onSubmitForm)}
            >
              <div>
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  variant="filled"
                  size="medium"
                  color="primary"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  label="Senha"
                  margin="normal"
                  variant="filled"
                  size="medium"
                  color="primary"
                  type={"password"}
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </div>

              <Paper elevation={10}>
                <Button
                  endIcon={<SendIcon className={classes.svg} />}
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                >
                  Login
                </Button>
              </Paper>

              <p>
                Não possui registro? Faça seu
                <Link className={classes.link} to="/signup">
                  <strong> cadastro</strong>
                </Link>
              </p>
            </form>
          </Paper>
        </Fade>
      </Grid>
    </Grid>
  );
};

export default Login;
