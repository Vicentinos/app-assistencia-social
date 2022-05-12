import { Typography } from "@mui/material";
import React from "react";

export function UnauthorizedUserDirection(props: { email: string | null }) {
  return (
    <>
      <Typography gutterBottom>
        Este é o primeiro acesso com o email {props.email || "utilizado"}, que
        ainda não está associado a nenhuma conferência.
      </Typography>
      <Typography>
        Solicite ajuda à pessoa na sua conferência que é responsável pelos
        cadastros de confrades e consócias no Aplicativo Vicentino.
      </Typography>
    </>
  );
}
