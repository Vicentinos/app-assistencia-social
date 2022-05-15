import { Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import React from "react";
import { useFirestore } from "reactfire";
import { addDoc, collection } from "firebase/firestore";

type AssistedPersonType = {
  personName: string;
};
export const AssistedPersonRegistration = () => {
  const { handleSubmit, register } = useForm<AssistedPersonType>();
  const firestore = useFirestore();
  const onSubmit = async (data: AssistedPersonType) => {
    console.log({ data, firestore });
    const collectionReference = collection(firestore, "assistedPersons");
    const docRef = await addDoc(collectionReference, data);
    console.log("Assisted person document written with ID: ", docRef.id);
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
