import { Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import React from "react";
import { useFirestore } from "reactfire";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

type AssistedPersonType = {
  personName: string;
};
export const AssistedPersonRegistration = () => {
  const { handleSubmit, register } = useForm<AssistedPersonType>();
  const firestore = useFirestore();
  const navigate = useNavigate();
  const onSubmit = async (data: AssistedPersonType) => {
    const collectionReference = collection(firestore, "assistedPersons");
    await addDoc(collectionReference, data);
    navigate("..");
  };
  return (
    <Stack spacing={2}>
      <Typography>Cadastro de pessoa assistida</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
          <TextField
            inputProps={{ ...register("personName") }}
            label={"Nome"}
          />
          <Button type="submit" variant={"contained"}>
            Cadastrar
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
