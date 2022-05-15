import { Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import { AuthenticatedLayout } from "./authenticated-layout";
import { AssistedPersons } from "../assisted-persons/assisted-persons";
import { AssistedPersonRegistration } from "../assisted-persons/assisted-person-registration";
import { AssistedPersonsList } from "../assisted-persons/assisted-persons-list";

export const MainAppRouter = () => (
  <Routes>
    <Route path="/" element={<AuthenticatedLayout />}>
      <Route index element={<Navigate to={"/assistidos"} />} />
      <Route path={"assistidos"} element={<AssistedPersons />}>
        <Route index element={<AssistedPersonsList />} />
        <Route path={"cadastro"} element={<AssistedPersonRegistration />} />
      </Route>
    </Route>
  </Routes>
);
