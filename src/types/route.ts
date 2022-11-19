export enum RouteName {
  Home = 'home',
  Login = 'login',
  SignupAdmin = 'sign-up-admin',
  SignupAdminConfirm = 'complete-registration',
}

export enum RoutePath {
  Home = '/',
  Login = '/auth/login',
  SignupAdmin = '/auth/sign-up-admin',
  SignupAdminConfirm = '/registration/complete/:id',
}
