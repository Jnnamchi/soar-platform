export enum RouteName {
  Home = 'home',
  Login = 'login',
  SignupAdmin = 'sign-up-admin',
  SignupAdminConfirm = 'complete-registration',
  SignupParticipant = 'sign-up-participant',
  ResetPasswordRequest = 'reset-password-request',
  ChangePassword = 'change-password',
}

export enum RoutePath {
  Home = '/',
  Login = '/auth/login',
  SignupAdmin = '/auth/sign-up-admin',
  SignupAdminConfirm = '/registration/complete/:id',
  SignupParticipant = '/registration/complete/participant/:id',
  ResetPasswordRequest = '/auth/reset-password',
  ChangePassword = '/reset-password//:id',
}
