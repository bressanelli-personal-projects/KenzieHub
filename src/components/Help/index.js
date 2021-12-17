import { Button, Box, Modal, Typography } from "@material-ui/core";
import { useState } from "react";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

const Help = ({ local }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xs: 300,
      sm: 500,
      xl: 600,
    },

    bgcolor: "background.paper",
    border: "2px solid #007aff",
    borderRadius: "10px",
    boxShadow: 24,
    p: {
      xs: 1,
      sm: 3,
    },
  };

  return (
    <>
      {local === "/signup" ? (
        <>
          <Button onClick={handleOpen}>
            <HelpOutlineOutlinedIcon sx={{ color: "#0b3" }} />
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Ajuda rápida
              </Typography>

              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <ol>
                  <li>
                    <strong>Senha:</strong>
                    <ul>
                      <li>
                        Mínimo de 6 caracteres, onde:
                        <ul>
                          <li>Pelo menos 1 letra maiúscula</li>
                          <li>Pelo menos 1 letra minúscula</li>
                          <li>Pelo menos 1 número</li>
                          <li>Pelo menos 1 caracter @$!%*?&</li>
                        </ul>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <strong>Contato:</strong>
                    <ul>
                      <li>Rede social ou telefone</li>
                    </ul>
                  </li>

                  <li>
                    <strong>Módulo:</strong>
                    <ul>
                      <li>
                        Opções:
                        <ol type="i">
                          <li>Primeiro módulo (Introdução ao Frontend)</li>
                          <li>Segundo módulo (Frontend Avançado)</li>
                          <li>Terceiro módulo (Introdução ao Backend)</li>
                          <li>Quarto módulo (Backend Avançado)</li>
                        </ol>
                      </li>
                    </ul>
                  </li>
                </ol>
              </Typography>
            </Box>
          </Modal>
        </>
      ) : (
        <>
          <Button onClick={handleOpen}>
            <HelpOutlineOutlinedIcon sx={{ color: "#0b3" }} />
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Ajuda rápida
              </Typography>

              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <ul>
                  <li>Mudar Status para um valor superior ao atual</li>
                  <li>
                    Como Iniciante é o menor valor, somente mudar o status para
                    um dos seguintes valores:
                  </li>
                  <ol>
                    <li>Intermediário, ou</li>
                    <li>Avançado</li>
                  </ol>
                </ul>
              </Typography>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
};

export default Help;
