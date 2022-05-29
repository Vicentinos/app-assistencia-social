import { Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import React from "react";
import { useFirestore } from "reactfire";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

type AssistedPersonType = {
  personName: string;
  phone: string;
  cpf: string;
  neighborhood: string;
  status: string;
};
export const AssistedPersonRegistration = () => {
  const { handleSubmit, register, setValue, formState } =
    useForm<AssistedPersonType>();
  const firestore = useFirestore();
  const navigate = useNavigate();
  const onSubmit = async (data: AssistedPersonType) => {
    const collectionReference = collection(firestore, "assistedPersons");
    await addDoc(collectionReference, data);
    navigate("..");
  };
  console.log(formState.errors.personName);
  return (
    <Stack spacing={2}>
      <Typography>Cadastro de pessoa assistida</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
          <TextField
            inputProps={{ ...register("personName", { required: true }) }}
            label={"Nome"}
            error={Boolean(formState.errors.personName)}
            helperText={
              formState.errors.personName ? "Nome é obrigatório" : null
            }
          />
          <TextField inputProps={{ ...register("phone") }} label={"Telefone"} />
          <TextField inputProps={{ ...register("cpf") }} label={"CPF"} />
          <TextField
            inputProps={{ ...register("neighborhood") }}
            label={"Bairro"}
          />
          <TextField
            fullWidth
            inputProps={register("status")}
            select
            onChange={(e) => setValue("status", e.target.value)}
            label={"Status"}
            defaultValue={null}
            role={"listbox"}
          >
            {["assistida", "cancelada", "extra", "funcionária", "sobra"].map(
              (option, index) => (
                <MenuItem key={index} value={option} role={"option"}>
                  {option}
                </MenuItem>
              )
            )}
          </TextField>
          <Button type="submit" variant={"contained"}>
            Cadastrar
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
