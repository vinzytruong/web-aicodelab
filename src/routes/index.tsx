import { lazy } from "react";
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { CsBlankLayout, CsDashboardLayout } from "../components/Layout";
import { CsLoadable } from "../components/Loadable";
import { type Navigation } from '@toolpad/core/AppProvider';
import { useTranslation } from "react-i18next";
import { Book, CalendarMonth, Home, Warehouse } from "@mui/icons-material";

const AuthLogin = CsLoadable(lazy(() => import("../pages/login")));
const DocumentPage = CsLoadable(lazy(() => import("../pages/document")))
const MyCoursePage = CsLoadable(lazy(() => import("../pages/course")))
const HomePage = CsLoadable(lazy(() => import("../pages/home")))


export default function Routes() {
  const { t } = useTranslation();
  const NAVIGATION: Navigation = [
    // {
    //   kind: 'header',
    //   title: 'Animals',
    // },
    {
      segment: 'dashboard',
      title: "Trang chủ",
      icon: <Home />,
    },
    {
      segment: 'my-course',
      title: "Khóa học của tôi",
      icon: <Book />,
    },
    // {
    //   kind: 'header',
    //   title: 'Movies',
    // },
    {
      segment: 'all-paper',
      title: 'Lịch biểu',
      icon: <CalendarMonth />,
    },
    {
      segment: 'document',
      title: 'Kho học liệu',
      icon: <Warehouse />,

    },
  ];
  return (
    <RouterRoutes>
      <Route path="/" element={<CsBlankLayout />}>
        <Route index path="/" element={<AuthLogin />} />
        <Route path="/login" element={<AuthLogin />} />
      </Route>
      <Route path="/" element={<CsDashboardLayout navigation={NAVIGATION} />}>
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/document" element={<DocumentPage />} />
        <Route path="/my-course" element={<MyCoursePage />} />
      </Route>
    </RouterRoutes>

  )
}