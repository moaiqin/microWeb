import React from 'react';
import ReactDOM,{ render } from 'react-dom';
import singleSpaReact from 'single-spa-react';
import RootComponent from './rootComponent/rootComponent';

if(process.env.NODE_ENV == 'development'){
  ReactDOM.render(<RootComponent/>,document.getElementById('root'));
}

//生命周期
const reactLife = singleSpaReact({
  React,
  ReactDOM,
  rootComponent:RootComponent,
  domElementGetter: () => document.getElementById('root')
});

// 项目启动的钩子
export const bootstrap = [
  reactLife.bootstrap
];
// 项目启动后的钩子
export const mount = [
  reactLife.mount
]
// 项目卸载的钩子
export const unmount = [
  reactLife.unmount
]