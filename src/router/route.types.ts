export enum RouteName {
  Home = 'home',
  Login = 'login',
  ResetPasswordRequest = 'reset-password-request',
  SignupAdmin = 'sign-up-admin',
  SignupAdminConfirm = 'complete-registration',
}

export enum RoutePath {
  Home = '/',
  Login = '/auth/login',
  ResetPasswordRequest = '/auth/reset-pass',
  SignupAdmin = '/auth/sign-up-admin',
  SignupAdminConfirm = '/registration/complete/:id',
}
