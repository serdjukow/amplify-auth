export const AuthRoutes = {
    login: "/login",
    logout: "/logout",
    verify: "/verify",
    resendVerify: "/resendverify",
    forgotPassword: "/forgot-password",
    confirmForgotPassword: "/confirm-forgot-password",
    changeTemporaryPassword: "/change-temporary-password",
}

export const isAuthRoute = (locationPathname: string) => {
  return Object.values(AuthRoutes).includes(locationPathname);
};
