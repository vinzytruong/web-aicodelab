import { lazy } from "react";
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { CsBlankLayout, CsDashboardLayout, DemoPageContent } from "../components/Layout";
import { CsLoadable } from "../components/Loadable";
import { type Navigation } from '@toolpad/core/AppProvider';
import { Book, CalendarMonth, Home, Warehouse } from "@mui/icons-material";

const AuthLogin = CsLoadable(lazy(() => import("../pages/login")));
const DocumentPage = CsLoadable(lazy(() => import("../pages/document")))
const MyCoursePage = CsLoadable(lazy(() => import("../pages/course")))
const HomePage = CsLoadable(lazy(() => import("../pages/home")))


export default function Routes() {

  const NAVIGATION: Navigation = [
    {
      kind: 'header',
      title: 'Sinh viên',
    },
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
    {
      segment: 'document',
      title: 'Kho học liệu',
      icon: <Warehouse />,

    },
    {
      segment: 'all-paper',
      title: 'Lịch biểu',
      icon: <CalendarMonth />,
    },
    {
      kind: 'header',
      title: 'Giảng viên',
    },
    {
      segment: 'course-management',
      title: 'Quản lý khóa học',
      icon: <CalendarMonth />,
    },
    {
      segment: 'document-management',
      title: 'Quản lý học liệu',
      icon: <CalendarMonth />,
    },


  ];
  return (
    <RouterRoutes>
      <Route path="/" element={<CsDashboardLayout navigation={NAVIGATION} />}>
        <Route element={<DemoPageContent />}>
          <Route path="dashboard" element={<HomePage />} />
          <Route path="document" element={<DocumentPage />} />
          <Route path="my-course" element={<MyCoursePage />} />
        </Route>
      </Route>

    </RouterRoutes>

  )
}