import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './components/Root.tsx'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Unauthorized from './pages/Unauthorized.tsx'
import Clients from './pages/Clients'
import Appointments from './pages/Appointments.tsx'
import Reports from './pages/Reports.tsx'
import ClientDetail from './pages/ClientDetail.tsx'
import AppointmentDetail from './pages/AppointmentDetail.tsx'
import Users from './pages/Users.tsx'
import NewClient from './pages/NewClient.tsx'
import NewAppointment from './pages/NewAppointment.tsx'
import EditClient from './pages/EditClient.tsx'
import EditAppointment from './pages/EditAppointment.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import Error from './pages/Error.tsx'
import {
  authLoader,
  loginAction,
  checkUserAuth,
  checkAdminAuth,
} from './utils/authFunctions.ts'
import {
  appointmentViewLoader,
  createOrModifyAppointmentAction,
  getAppointmentViewByIdLoader,
  getTodaysUpcomingAppointmentsLoader,
  deleteAppointmentAction,
} from './utils/appointmentFunctions.ts'
import ClientRootLayout from './components/ClientRootLayout.tsx'
import AppointmentRootLayout from './components/AppointmentRootLayout.tsx'
import {
  ClientsLoader,
  createOrModifyClientAction,
  deleteClientAction,
  getClientByIdLoader,
} from './utils/clientFunctions.ts'
import StylistReports from './components/StylistReports.tsx'
import { stylistReportViewLoader } from './utils/StylistFunctions.ts'
import AppointmentReport from './components/AppointmentReport.tsx'
import { appointmentReportViewLoader } from './utils/appointmentFunctions.ts'
import StylistAggregateReport from './components/StylistAggregateReport.tsx'
import { stylistAggregateReportViewLoader } from './utils/StylistFunctions.ts'
import { usersLoader } from './utils/UserFunctions.ts'
import UsersList from './components/UsersList.tsx'
import { newUserAction } from './utils/UserFunctions.ts'
import NewUser from './components/NewUser.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    id: 'root',
    loader: authLoader,
    children: [
      {
        element: <Home />,
        index: true,
        loader: getTodaysUpcomingAppointmentsLoader,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'unauthorized',
        element: <Unauthorized />,
      },
      {
        path: 'clients',
        element: <ClientRootLayout />,
        id: 'clients',
        loader: ClientsLoader,
        children: [
          {
            index: true,
            element: <Clients />,
            loader: checkUserAuth,
          },
          {
            path: ':id',
            id: 'client-detail',
            loader: getClientByIdLoader,
            action: deleteClientAction,
            children: [
              {
                index: true,
                element: <ClientDetail />,
                loader: checkUserAuth,
              },
              {
                path: 'edit',
                element: <EditClient />,
                loader: checkUserAuth,
                action: createOrModifyClientAction,
              },
            ],
          },
          {
            path: 'new',
            element: <NewClient />,
            loader: checkUserAuth,
            action: createOrModifyClientAction,
          },
        ],
      },
      {
        path: 'appointments',
        id: 'appointments',
        element: <AppointmentRootLayout />,
        loader: appointmentViewLoader,
        children: [
          {
            index: true,
            element: <Appointments />,
            loader: checkUserAuth,
          },
          {
            path: ':id',
            id: 'appointment-detail',
            loader: getAppointmentViewByIdLoader,
            action: deleteAppointmentAction,
            children: [
              {
                index: true,
                element: <AppointmentDetail />,
                loader: checkUserAuth,
              },
              {
                path: 'edit',
                element: <EditAppointment />,
                loader: checkUserAuth,
                action: createOrModifyAppointmentAction,
              },
            ],
          },
          {
            path: 'new',
            element: <NewAppointment />,
            loader: checkUserAuth,
            action: createOrModifyAppointmentAction,
          },
        ],
      },
      {
        path: 'reports',
        element: <Reports />,
        loader: checkAdminAuth,
        children: [
          {
            path: 'appointmentsReport',
            element: <AppointmentReport />,
            loader: appointmentReportViewLoader,
          },
          {
            path: 'stylistReports',
            element: <StylistReports />,
            loader: stylistReportViewLoader,
            children: [
              {
                index: true,
                element: <StylistAggregateReport />,
                loader: stylistAggregateReportViewLoader,
              },
            ], 
          }
        ],
      },
      {
        path: 'users',
        element: <Users />,
        loader: checkAdminAuth,
        children: [
          {
            index: true,
            element: <UsersList />,
            loader: usersLoader,
          },
          {
            path: 'new',
            element: <NewUser />,
            action: newUserAction,
          }
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
