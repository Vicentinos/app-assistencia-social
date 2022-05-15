import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AssistedPersonsLayout = () => {
  const navigate = useNavigate();
  return (
    <Stack spacing={2}>
      <Typography variant={"h1"}>Assistidos</Typography>
      <Stack spacing={1} direction={"row"}>
        <Button
          variant={"contained"}
          onClick={() => {
            navigate("./cadastro");
          }}
        >
          Cadastrar pessoa assistida
        </Button>
      </Stack>
      <Box>
        <Outlet />
      </Box>
    </Stack>
  );
};
export { AssistedPersonsLayout };
