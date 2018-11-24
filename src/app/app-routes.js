//懒加载
const FullLayout = () => import('./containers/full-layout/full-layout');
const SimpleLayout = () => import('./containers/simple-layout/simple-layout');
/**
 * 工作台目录模块 start
 */
import userManage from './views/systemManage/routes';
/**
 * 工作台目录模块 end
 */

//pages模块
//登陆注册404等额外的页面
import PagesLayout from './pages/routes';


const routes = [{
    path: '/',
    component: FullLayout,
    name: '系统管理',
    children: [
      ...userManage
    ]
  },
  {
    path: '/pages',
    component: SimpleLayout,
    children: [
      ...PagesLayout
    ]
  }
]
export default routes