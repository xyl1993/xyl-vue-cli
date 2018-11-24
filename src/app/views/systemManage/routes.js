const sysUser = () => import('./sys-user');
const sysRole = () => import('./sys-role');
const minaAccount = () => import('./mina-account');
const menu = () => import('./menu');
const company = () => import('./company');
export default [
  {
    path: '/sysUser',
    component: sysUser,
    name: '系统用户'
  },
  {
    path: '/menu',
    component: menu,
    name: '菜单管理'
  },
  {
    path: '/company',
    component: company,
    name: '单位管理'
  },
  {
    path: '/sysRole',
    component: sysRole,
    name: '角色管理'
  },
  {
    path: '/minaAccount',
    component: minaAccount,
    name: '小程序用户'
  }
]