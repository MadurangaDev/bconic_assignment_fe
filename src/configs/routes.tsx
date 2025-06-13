import { createBrowserRouter, Navigate } from "react-router-dom";

import {
  AdminDashboard,
  LandingPage,
  LoginPage,
  RegisterPage,
  ShipmentCreation,
  ShipmentTracking,
  UserDashboard,
} from "@pages";
import { Layout } from "@layouts";
import { PrivateRoute, PublicRoute } from "@components";
import { UserRole } from "@typings/enums";

export const routers = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    children: [
      {
        path: "",
        element: (
          <PublicRoute>
            <Layout>
              <LandingPage />
            </Layout>
          </PublicRoute>
        ),
      },
      {
        path: "shipment",
        children: [
          {
            path: "",
            element: (
              <Layout>
                <Navigate to="/shipment/track" />
              </Layout>
            ),
          },
          {
            path: "track",
            children: [
              {
                path: "",
                element: (
                  <PublicRoute>
                    <Layout>
                      <ShipmentTracking />
                    </Layout>
                  </PublicRoute>
                ),
              },
              {
                path: ":shipmentId",
                element: (
                  <PublicRoute>
                    <Layout>
                      <ShipmentTracking />
                    </Layout>
                  </PublicRoute>
                ),
              },
            ],
          },
          {
            path: "new",
            element: (
              <PrivateRoute roles={[UserRole.USER]}>
                <Layout>
                  <ShipmentCreation />
                </Layout>
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },

  // Auth Routes
  {
    path: "/auth",
    children: [
      {
        path: "",
        element: (
          <Layout>
            <Navigate to="/auth/login" />
          </Layout>
        ),
      },
      {
        path: "login",
        element: (
          <PublicRoute isBlockedWhenAuthenticated={true}>
            <Layout>
              <LoginPage />
            </Layout>
          </PublicRoute>
        ),
      },
      {
        path: "register",
        element: (
          <PublicRoute isBlockedWhenAuthenticated={true}>
            <Layout>
              <RegisterPage />
            </Layout>
          </PublicRoute>
        ),
      },
    ],
  },

  // Admin Routes
  {
    path: "/admin",
    children: [
      {
        path: "",
        element: (
          <PrivateRoute roles={[UserRole.ADMIN]}>
            <Layout>
              <Navigate to="/admin/dashboard" />
            </Layout>
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute roles={[UserRole.ADMIN]}>
            <Layout>
              <AdminDashboard />
            </Layout>
          </PrivateRoute>
        ),
      },
    ],
  },

  // User Routes
  {
    path: "/user",
    children: [
      {
        path: "",
        element: (
          <PrivateRoute roles={[UserRole.USER]}>
            <Layout>
              <Navigate to="/user/dashboard" />
            </Layout>
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute roles={[UserRole.USER]}>
            <Layout>
              <UserDashboard />
            </Layout>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
