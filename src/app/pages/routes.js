const login = () => import('./login/index');
export default [{
  path: '/login',
  component: login,
  name: '登陆',
  meta: {
    keepAlive: true,
    isTab: false,
    isAuth: false
  }
}]