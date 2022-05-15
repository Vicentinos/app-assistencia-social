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
        </TableRow>
      </TableHead>
      <TableBody>
        {docs.data.docs.map((doc) => (
          <TableRow key={doc.id}>
            <TableCell>
              <Typography variant={"caption"}>{doc.id}</Typography>
            </TableCell>
            <TableCell>{doc.get("personName")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
