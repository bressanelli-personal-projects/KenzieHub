import { Button, Paper, TextField, Grid, Fade } from "@material-ui/core";
import { useHistory, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useStyles from "./styles";
import api from "../../services/api";
import { toast } from "material-react-toastify";
import { Link } from "react-router-dom";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Help from "../../components/Help";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const Signup = ({ authorized }) => {
    const history = useHistory();
    const location = useLocation();
 

    const [module, setModule] = useState("Primeiro módulo (Introdução ao Frontend)");

    const handleModule = (event) => {
        setModule(event.target.value);
        console.log(module)
    };

    const passRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    const schema = yup.object().shape({
        name: yup.string().required("Campo obrigatório"),
        email: yup
            .string()
            .required("Campo obrigatório")
            .email("Email inválido"),
        password: yup
            .string()
            .min(6, "Min. 6 caracteres")
            .required("Campo obrigatório")
            .matches(passRegex, "Senha inválida"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "As senhas devem ser iguais"),
        bio: yup.string().required("Campo obrigatório"),
        contact: yup.string().required("Campo obrigatório"),        
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmitForm = ({
        email,
        password,
        name,
        bio,
        contact,
        course_module=module,
    }) => {
        const user = { email, password, name, bio, contact, course_module };
        
        api.post("/users", user)
            .then((response) => {
                toast.success("Sucesso ao criar a conta");
                                
                return history.push("/login");

            })
            .catch((err) => {
                if (err.response.data.message === "Email already exists") {
                    toast.error("E-mail já cadastrado. Favor informar outro!");
                }
            });
    };

    const classes = useStyles();

    return (
        <Grid
            sx={{ minHeight: "100vh" }}
            container
            className={classes.container}
        >
            <Grid
                className={classes.grid}
                item
                xs={12}
                sm={9}
                md={7}
                lg={5}
                xl={4}
            >
                <Fade in timeout={1500}>
                    <Paper className={classes.paper} elevation={10}>
                        <form
                            className={classes.form}
                            onSubmit={handleSubmit(onSubmitForm)}
                        >
                            <div>
                                <TextField
                                    fullWidth
                                    label="Nome*"
                                    margin="normal"
                                    variant="filled"
                                    size="small"
                                    color="primary"
                                    {...register("name")}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            </div>

                            <div>
                                <TextField
                                    fullWidth
                                    label="Email*"
                                    margin="normal"
                                    variant="filled"
                                    size="small"
                                    color="primary"
                                    {...register("email")}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            </div>

                            <div>
                                <TextField
                                    fullWidth
                                    label="Senha*"
                                    margin="normal"
                                    variant="filled"
                                    size="small"
                                    color="primary"
                                    type={"password"}
                                    {...register("password")}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            </div>

                            <div>
                                <TextField
                                    fullWidth
                                    label="Confirmar senha*"
                                    margin="normal"
                                    variant="filled"
                                    size="small"
                                    color="primary"
                                    type="password"
                                    {...register("confirmPassword")}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword?.message}
                                />
                            </div>

                            <div>
                                <TextField
                                    fullWidth
                                    label="Bio*"
                                    margin="normal"
                                    variant="filled"
                                    size="small"
                                    color="primary"
                                    {...register("bio")}
                                    error={!!errors.bio}
                                    helperText={errors.bio?.message}
                                />
                            </div>

                            <div>
                                <TextField
                                    fullWidth
                                    label="Contato*"
                                    margin="normal"
                                    variant="filled"
                                    size="small"
                                    color="primary"
                                    {...register("contact")}
                                    error={!!errors.contact}
                                    helperText={errors.contact?.message}
                                />
                            </div>

                            <div>
                                <FormControl
                                    variant="filled"
                                    sx={{ mb: 3, mt: 2 }}
                                    required
                                    fullWidth
                                    size='small'
                                >
                                    <InputLabel>Módulo do Curso</InputLabel>
                                    <Select
                                        value={module}
                                        onChange={handleModule}                                
                                    >
                                        <MenuItem value={"Primeiro módulo (Introdução ao Frontend)"}>
                                        Primeiro módulo (Introdução ao Frontend)
                                        </MenuItem>
                                        <MenuItem value={"Segundo módulo (Frontend Avançado)"}>
                                        Segundo módulo (Frontend Avançado)
                                        </MenuItem>
                                        <MenuItem value={"Terceiro módulo (Introdução ao Backend)"}>
                                        Terceiro módulo (Introdução ao Backend)
                                        </MenuItem>
                                        <MenuItem value={"Quarto módulo (Backend Avançado)"}>
                                        Quarto módulo (Backend Avançado)
                                        </MenuItem>
                                    </Select>
                                </FormControl>

                                
                            </div>

                            <Paper>
                                <Button
                                    endIcon={
                                        <PersonAddAltIcon
                                            className={classes.svg}
                                        />
                                    }
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    type="submit"
                                >
                                    Cadastrar
                                </Button>
                            </Paper>

                            <p>
                                Já é registrado? Faça seu
                                <Link className={classes.link} to="/login">
                                    <strong> login</strong>
                                </Link>
                                <Help local={location.pathname} />
                            </p>
                        </form>
                    </Paper>
                </Fade>
            </Grid>
        </Grid>
    );
};

export default Signup;
