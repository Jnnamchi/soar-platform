export enum RouteName {
  Home = 'home',
  Login = 'login',
  SignupAdmin = 'sign-up-admin',
  SignupAdminConfirm = 'complete-registration',
  ResetPasswordRequest = 'reset-password-request',
  ChangePassword = 'change-password',
}

export enum RoutePath {
  Home = '/',
  Login = '/auth/login',
  SignupAdmin = '/auth/sign-up-admin',
  SignupAdminConfirm = '/registration/complete/:id',
  ResetPasswordRequest = '/auth/reset-password',
  ChangePassword = '/reset-password//:id',
}
