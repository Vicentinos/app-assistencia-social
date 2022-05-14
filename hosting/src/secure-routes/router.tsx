import { Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import { AuthenticatedLayout } from "./authenticated-layout";
import { AssistedPersons } from "../assisted-persons/assisted-persons";

export const MainAppRouter = () => (
  <Routes>
    <Route path="/" element={<AuthenticatedLayout />}>
      <Route index element={<Navigate to={"/assistidos"} />} />
      <Route path={"assistidos"} element={<AssistedPersons />}></Route>
    </Route>
  </Routes>
);
