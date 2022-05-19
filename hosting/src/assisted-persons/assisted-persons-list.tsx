import { useFirestore, useFirestoreCollection } from "reactfire";
import { collection } from "firebase/firestore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

export const AssistedPersonsList = () => {
  const firestore = useFirestore();
  const docs = useFirestoreCollection(collection(firestore, "assistedPersons"));
  return (
    <Table role={"table"} aria-label={"Lista de pessoas assistidas"}>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Nome</TableCell>
          <TableCell>Telefone</TableCell>
          <TableCell>CPF</TableCell>
          <TableCell>Bairro</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {docs.data.docs.map((doc) => (
          <TableRow key={doc.id}>
            <TableCell>
              <Typography variant={"caption"}>{doc.id}</Typography>
            </TableCell>
            <TableCell>{doc.get("personName")}</TableCell>
            <TableCell>{doc.get("phone")}</TableCell>
            <TableCell>{doc.get("cpf")}</TableCell>
            <TableCell>{doc.get("neighborhood")}</TableCell>
            <TableCell>{doc.get("status")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
