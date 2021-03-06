import { Grid, Paper } from "@material-ui/core";
import useStyles from "../Dashboard/styles";
import { Button, TextField, Fade } from "@material-ui/core";
import { useHistory, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";
import { toast } from "material-react-toastify";
import { Redirect } from "react-router-dom";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useEffect, useState } from "react";
import Card from "../../components/Card/index";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";

const Dashboard = ({ authorized, setAuthorized }) => {
  const style = {
    mt: {
      xs: 1,
      sm: 0,
    },
    minWidth: {
      xs: 200,
      sm: 200,
    },
  };

  const [token] = useState(
    JSON.parse(localStorage.getItem("@Kehub:token")) || ""
  );
  const [user] = useState(
    JSON.parse(localStorage.getItem("@Kehub:user")) || ""
  );

  const [tech, setTech] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [logedUser, setLogedUser] = useState("");

  const history = useHistory();
  const location = useLocation();

  const [status, setStatus] = useState("Iniciante");

  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  const schema = yup.object().shape({
    title: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitForm = ({ title }) => {
    api
      .post(
        "/users/techs",
        {
          title: title,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        showUser();
        setIsShow(true);
        reset();
        toast.success("Tecnologia adicionada com sucesso!");
      })
      .catch((err) => {
        toast.error(
          err.response.data.message ===
            "User Already have this technology created you can only update it"
            ? "Usuário já possui esta tecnologia. Somente update permitido."
            : null
        );
      });
  };

  const showUser = () => {
    api.get(`/users/${user.id}`).then((response) => {
      setLogedUser(response.data.name);
      setTech(response.data.techs);
    });
  };

  const handleTechs = () => {
    showUser();
    setIsShow(!isShow);
  };

  const deleteTech = (tech_id) => {
    api
      .delete(`/users/techs/${tech_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        showUser();
        setIsShow(true);
        toast.success("Deletado com sucesso");
      })
      .catch((err) => console.log(err));
  };

  const editFunction = (data, techId, status) => {
    if (
      data.toLowerCase() !== "intermediário" &&
      data.toLowerCase() !== "avançado"
    ) {
      toast.error("Escolha um status válido! Veja ?");
      return null;
    }

    if (
      status.toLowerCase() === "avançado" ||
      status.toLowerCase() === data.toLowerCase()
    ) {
      toast.error("Mudança não permitida! Veja ?");
      return null;
    }

    api
      .put(
        `/users/techs/${techId}`,
        {
          status: `${data}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        showUser();
        setIsShow(true);
        toast.success("Tecnologia atualizada com sucesso");
      })
      .catch((err) => {
        toast.error("Modificação não concluida");
      });
  };

  useEffect(() => {
    showUser(); // eslint-disable-next-line
  }, []);

  const classes = useStyles();

  if (!authorized) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={classes.container}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        style={{ minHeight: "100vh", marginTop: "20px" }}
      >
        <Grid item xs={12} sm={9} md={7} lg={5} xl={4}>
          <Fade in timeout={1500}>
            <Paper className={classes.paper} elevation={10}>
              <h1 className={classes.greeting}>
                Bem vindo(a) {logedUser.split(" ")[0]}
                <Button
                  variant="contained"
                  sx={{ marginLeft: "10px" }}
                  onClick={() => history.push("/")}
                >
                  <HomeOutlinedIcon />
                </Button>
                <Button
                  variant="contained"
                  sx={{ marginLeft: "10px" }}
                  color="warning"
                  onClick={() => {
                    localStorage.removeItem("@Kehub:token");
                    localStorage.removeItem("@Kehub:user");
                    setAuthorized(false);
                    toast.info("Logout efetuado! Até logo!!");
                    history.push("/");
                  }}
                >
                  <LogoutIcon />
                </Button>
              </h1>

              <form
                className={classes.form}
                onSubmit={handleSubmit(onSubmitForm)}
              >
                <div className={classes.div}>
                  <TextField
                    style={{ margin: 0 }}
                    label="Tecnologia"
                    margin="normal"
                    size="medium"
                    color="primary"
                    {...register("title")}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  ></TextField>

                  <FormControl variant="outlined" sx={style}>
                    <InputLabel>Status</InputLabel>
                    <Select value={status} onChange={handleStatus}>
                      <MenuItem value={"Iniciante"}>Iniciante</MenuItem>
                      <MenuItem value={"Intermediário"}>Intermediário</MenuItem>
                      <MenuItem value={"Avançado"}>Avançado</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <Paper elevation={10}>
                  <Button
                    endIcon={<AppRegistrationIcon className={classes.svg} />}
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                  >
                    Cadastrar
                  </Button>

                  <Button onClick={handleTechs} fullWidth>
                    {isShow ? "OCULTAR" : "MOSTRAR"} TECHS
                  </Button>
                </Paper>
              </form>

              {isShow &&
                tech.map((value) => (
                  <Card
                    key={value.id}
                    title={value.title}
                    status={value.status}
                    valueId={value.id}
                    delClick={() => deleteTech(value.id)}
                    techId={value.id}
                    editFunction={editFunction}
                    local={location.pathname}
                  />
                ))}
            </Paper>
          </Fade>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
