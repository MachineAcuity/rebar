(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{1000:function(e,n,a){"use strict";const l={kind:"Fragment",name:"EnsayoPublicList_Viewer",type:"Viewer",metadata:{connection:[{count:null,cursor:null,direction:"forward",path:["Ensayos"]}]},argumentDefinitions:[],selections:[{kind:"LinkedField",alias:"Ensayos",name:"__EnsayoPublicList_Ensayos_connection",storageKey:null,args:null,concreteType:"EnsayosConnection",plural:!1,selections:[{kind:"LinkedField",alias:null,name:"edges",storageKey:null,args:null,concreteType:"EnsayosEdge",plural:!0,selections:[{kind:"LinkedField",alias:null,name:"node",storageKey:null,args:null,concreteType:"Ensayo",plural:!1,selections:[{kind:"ScalarField",alias:null,name:"id",args:null,storageKey:null},{kind:"ScalarField",alias:null,name:"Ensayo_Title",args:null,storageKey:null},{kind:"ScalarField",alias:null,name:"Ensayo_Description",args:null,storageKey:null},{kind:"ScalarField",alias:null,name:"__typename",args:null,storageKey:null}]},{kind:"ScalarField",alias:null,name:"cursor",args:null,storageKey:null}]},{kind:"LinkedField",alias:null,name:"pageInfo",storageKey:null,args:null,concreteType:"PageInfo",plural:!1,selections:[{kind:"ScalarField",alias:null,name:"endCursor",args:null,storageKey:null},{kind:"ScalarField",alias:null,name:"hasNextPage",args:null,storageKey:null}]}]}],hash:"57408f235362c09e18e90877cbe309bc"};e.exports=l},1943:function(e,n,a){"use strict";a.r(n);var l=a(46),s=a(47),i=a(161),t=a(4),r=a(138),o=a(0),c=a.n(o),u=a(12),d=a(26);n.default=Object(u.createFragmentContainer)(Object(t.a)(e=>({card:{minWidth:275}}))(Object(r.withRouter)(class extends c.a.Component{_handle_onClick(e){this.context.router.push("/ensayo/item/"+e)}render(){const{classes:e,Viewer:n}=this.props;return c.a.createElement(d.a,null,n.Ensayos.edges.map(n=>c.a.createElement(l.a,{key:n.node.id,className:e.card},c.a.createElement(i.a,{title:n.node.Ensayo_Title}),c.a.createElement(s.a,{onClick:()=>this._handle_onClick(n.node.id)},n.node.Ensayo_Description))))}})),function(){return a(1e3)})}}]);