import { lazy } from "react";
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { CsDashboardLayout, DemoPageContent } from "../components/Layout";
import { CsLoadable } from "../components/Loadable";
import { useKeycloak } from "@react-keycloak/web";

const HomePage = CsLoadable(lazy(() => import("../pages/home")))

export default function Routes() {

  const { initialized, keycloak } = useKeycloak();


  if (!initialized) {
    return <div style={{ height: "100vh", width: "100vw", display: "grid", placeItems: "center" }}>Loading...</div>;
  }


  return (
    <RouterRoutes>
      <Route
        path="/"
        element={<CsDashboardLayout />}>
        <Route element={<DemoPageContent />}>
          <Route path="home" element={<HomePage />} />

        </Route>
      </Route>

    </RouterRoutes>

  )
}