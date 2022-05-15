import { useFirestore, useFirestoreCollection } from "reactfire";
import { collection } from "firebase/firestore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

export const AssistedPersonsList = () => {
  const firestore = useFirestore();
  const docs = useFirestoreCollection(collection(firestore, "assistedPersons"));
  return (
    <Table role={"table"} aria-label={"Lista de pessoas assistidas"}>
      <TableHead>
        <TableRow>
          <TableCell>Nome</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {docs.data.docs.map((doc) => (
          <TableRow>
            <TableCell>{doc.get("personName")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
