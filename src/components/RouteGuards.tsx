import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "@hooks";
import { UserRole } from "@enums";

interface IPrivateRouteProps {
  roles: UserRole[];
  children: ReactNode;
}
export const PrivateRoute: FC<IPrivateRouteProps> = ({ roles, children }) => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  if (roles.includes(user.role)) return children;

  return (
    <Navigate
      to={`/${user.role === UserRole.ADMIN ? "admin" : "user"}/dashboard`}
    />
  );
};

interface IPublicRouteProps {
  isBlockedWhenAuthenticated?: boolean;
  children: ReactNode;
}
export const PublicRoute: FC<IPublicRouteProps> = ({
  isBlockedWhenAuthenticated = false,
  children,
}) => {
  const { user } = useAppSelector((state) => state.auth);

  if (user && isBlockedWhenAuthenticated) {
    return (
      <Navigate
        to={`/${user.role === UserRole.ADMIN ? "admin" : "user"}/dashboard`}
      />
    );
  }

  return children;
};
