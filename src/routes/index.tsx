import { lazy } from "react";
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { CsDashboardLayout, DemoPageContent } from "../components/Layout";
import { CsLoadable } from "../components/Loadable";
import { type Navigation } from '@toolpad/core/AppProvider';
import { Book, BookOnline, CalendarMonth, DocumentScanner, Home, Person, Warehouse } from "@mui/icons-material";
import { useKeycloak } from "@react-keycloak/web";

const DocumentPage = CsLoadable(lazy(() => import("../pages/document")))
const MyCoursePage = CsLoadable(lazy(() => import("../pages/course")))
const HomePage = CsLoadable(lazy(() => import("../pages/home")))
const CourseManagementPage = CsLoadable(lazy(() => import("../pages/course-manament")))
const DocumentManagementPage = CsLoadable(lazy(() => import("../pages/document-manament")))
const FieldManagementPage = CsLoadable(lazy(() => import("../pages/field-manament")))
const AuthorManagementPage = CsLoadable(lazy(() => import("../pages/author-manament")))

export default function Routes() {

  const NAVIGATION_STUDENT: Navigation = [
    {
      kind: 'header',
      title: 'Sinh viên',
    },
    {
      segment: 'document',
      title: "Trang chủ",
      icon: <Home />,
    },
    // {
    //   segment: 'my-course',
    //   title: "Khóa học của tôi",
    //   icon: <Book />,
    // },
    // {
    //   segment: 'document',
    //   title: 'Kho học liệu',
    //   icon: <Warehouse />,

    // },
    // {
    //   segment: 'all-paper',
    //   title: 'Lịch biểu',
    //   icon: <CalendarMonth />,
    // }


  ];


  const NAVIGATION_LECTURER: Navigation = [
    {
      kind: 'header',
      title: 'Giảng viên',
    },
    {
      segment: 'document',
      title: "Trang chủ",
      icon: <Home />,
    },
    // {
    //   segment: 'my-course',
    //   title: "Khóa học của tôi",
    //   icon: <Book />,
    // },
    // {
    //   segment: 'document',
    //   title: 'Kho học liệu',
    //   icon: <Warehouse />,

    // },
    // {
    //   segment: 'course-management',
    //   title: 'Quản lý khóa học',
    //   icon: <CalendarMonth />,
    // },
    {
      segment: 'field-management',
      title: 'Quản lý lĩnh vực',
      icon: <DocumentScanner />,
    },
    {
      segment: 'author-management',
      title: 'Quản lý tác giả',
      icon: <Person />,
    },
    {
      segment: 'document-management',
      title: 'Quản lý học liệu',
      icon: <BookOnline />,
    },


  ];
  const { initialized, keycloak } = useKeycloak();


  if (!initialized) {
    return <div style={{ height: "100vh", width: "100vw", display: "grid", placeItems: "center" }}>Loading...</div>;
  }


  return (
    <RouterRoutes>
      <Route
        path="/"
        element={
          <CsDashboardLayout
            navigation={
              keycloak?.tokenParsed?.realm_access?.roles?.find(item => item.includes("lecturer")) ?
                NAVIGATION_LECTURER
                :
                NAVIGATION_STUDENT
            }
          />
        }>
        <Route element={<DemoPageContent />}>
          {/* <Route path="dashboard" element={<HomePage />} /> */}
          <Route path="document" element={<DocumentPage />} />
          {/* <Route path="my-course" element={<MyCoursePage />} /> */}
          {/* <Route path="course-management" element={<CourseManagementPage />} /> */}
          <Route path="document-management" element={<DocumentManagementPage />} />
          <Route path="field-management" element={<FieldManagementPage />} />
          <Route path="author-management" element={<AuthorManagementPage />} />
        </Route>
      </Route>

    </RouterRoutes>

  )
}