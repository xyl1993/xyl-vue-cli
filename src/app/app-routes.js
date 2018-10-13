//懒加载
const FullLayout = () => import('./containers/full-layout/full-layout');
const SimpleLayout = () => import('./containers/simple-layout/simple-layout');
const Cointer = () => import('./views/cointer/cointer');
/**
 * 工作台目录模块 start
 */
import ShopManage from './views/shopManage/routes';
/**
 * 工作台目录模块 end
 */

//pages模块
//登陆注册404等额外的页面
import PagesLayout from './views/pages/routes';


let routes = [{
    path: '/',
    component: FullLayout,
    name: '',
    children: [{
      path: '/cointer',
      component: Cointer
    } ]
  }, {
    path: '/',
    component: FullLayout,
    name: '商品管理',
    children: [
      ...ShopManage
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