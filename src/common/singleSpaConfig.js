import * as SingleSpa from 'single-spa';

const loadingFn = () => import('app/react/app.js');
//路由为react，实行加载静态文件
const activityFn = location => {
  console.log(location);
  return location.pathname.startsWith('/react')
};
//app注册
SingleSpa.registerApplication('reactApp',loadingFn,activityFn);
SingleSpa.start();