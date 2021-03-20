(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{103:function(t,e,a){},128:function(t,e,a){},129:function(t,e,a){"use strict";a.r(e);var r={};a.r(r),a.d(r,"selectIsLoggedIn",(function(){return D}));var n={};a.r(n),a.d(n,"todoLists",(function(){return Pt}));var s=a(0),i=a.n(s),c=a(9),o=a.n(c);a(103),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var u,l,d,p=a(22),f=a(20),m=a(7),b=a.n(m),h=a(14),v=a(80),g=a.n(v).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"api-key":"ea1464d3-6693-4a83-9755-2421f1dd088c"}}),k=function(){return g.get("todo-lists")},E=function(t){return g.post("todo-lists",{title:t})},y=function(t){return g.delete("todo-lists/".concat(t))},j=function(t,e){return g.put("todo-lists/".concat(t),{title:e})},O=function(t){return g.get("todo-lists/".concat(t,"/tasks"))},x=function(t){return g.post("todo-lists/".concat(t.id,"/tasks"),{title:t.title})},S=function(t,e){return g.delete("todo-lists/".concat(t,"/tasks/").concat(e))},w=function(t,e,a){return g.put("todo-lists/".concat(t,"/tasks/").concat(e),a)},C=function(){return g.get("auth/me")},T=function(t){return g.post("auth/login",t)},I=function(){return g.delete("auth/login")},L=a(13),A=Object(L.b)("app/setAppStatus"),W={setAppError:Object(L.b)("app/setAppError"),setAppStatus:A},V=W.setAppStatus,F=W.setAppError,P=function(t,e){t.messages.length>0?e(F({error:t.messages[0]})):e(F({error:"Failed"})),e(V({status:"failed"}))},z=function(t,e){e(F(t.message?{error:t.message}:{error:"Some error occurred"})),e(V({status:"failed"}))};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(u||(u={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(l||(l={})),function(t){t[t.Success=0]="Success",t[t.Error=1]="Error",t[t.Captcha=10]="Captcha"}(d||(d={}));var D=function(t){return t.auth.isLogged},M=Object(L.c)("auth/login",function(){var t=Object(h.a)(b.a.mark((function t(e,a){var r,n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,T(e);case 3:if((r=t.sent).data.resultCode!==d.Success){t.next=8;break}a.dispatch(W.setAppStatus({status:"succeeded"})),t.next=10;break;case 8:return P(r.data,a.dispatch),t.abrupt("return",a.rejectWithValue({errors:r.data.messages,fieldsErrors:r.data.fieldsErrors}));case 10:t.next=17;break;case 12:return t.prev=12,t.t0=t.catch(0),n=t.t0,P(t.t0,a.dispatch),t.abrupt("return",a.rejectWithValue({errors:[n.message],fieldsErrors:void 0}));case 17:case"end":return t.stop()}}),t,null,[[0,12]])})));return function(e,a){return t.apply(this,arguments)}}()),N=Object(L.c)("auth/logout",function(){var t=Object(h.a)(b.a.mark((function t(e,a){var r,n,s;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a.dispatch,n=a.rejectWithValue,r(W.setAppStatus({status:"loading"})),t.prev=2,t.next=5,I();case 5:if((s=t.sent).data.resultCode!==d.Success){t.next=10;break}r(W.setAppStatus({status:"succeeded"})),t.next=12;break;case 10:return P(s.data,r),t.abrupt("return",n({}));case 12:t.next=18;break;case 14:return t.prev=14,t.t0=t.catch(2),P(t.t0,r),t.abrupt("return",n(t.t0));case 18:case"end":return t.stop()}}),t,null,[[2,14]])})));return function(e,a){return t.apply(this,arguments)}}()),R={login:M,logout:N},B=Object(L.d)({name:"auth",initialState:{isLogged:!1},reducers:{setIsLogged:function(t,e){t.isLogged=e.payload.isLogged}},extraReducers:function(t){t.addCase(M.fulfilled,(function(t){t.isLogged=!0})),t.addCase(N.fulfilled,(function(t){t.isLogged=!1}))}}),H=a(86),U=a(161),q=a(181),J=a(165),K=a(166),X=a(176),$=a(182),_=a(178),G=a(168),Q=a(16),Y=a(23),Z=function(){return Object(p.b)()};function tt(t){var e=Z();return Object(s.useMemo)((function(){return Object(Y.b)(t,e)}),[t,e])}var et=function(t){var e={};return t.password?t.password.length<6&&(e.password="Must be 6 characters or more"):e.password="Required",e},at=function(){var t=Z(),e=Object(p.c)(D),a=Object(H.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:et,onSubmit:function(){var e=Object(h.a)(b.a.mark((function e(a,r){var n,s,i,c,o;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t(M(a));case 2:n=e.sent,M.rejected.match(n)&&(null===(s=n.payload)||void 0===s||null===(i=s.fieldsErrors)||void 0===i?void 0:i.length)&&(o=null===(c=n.payload)||void 0===c?void 0:c.fieldsErrors[0],r.setFieldError(o.field,o.error));case 4:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()});return e?i.a.createElement(Q.a,{to:"/"}):i.a.createElement(U.a,{container:!0,justify:"center"},i.a.createElement(U.a,{item:!0,xs:4},i.a.createElement("form",{onSubmit:a.handleSubmit},i.a.createElement(q.a,null,i.a.createElement(J.a,null,i.a.createElement("p",null,"To log in get registered",i.a.createElement("a",{href:"https://social-network.samuraijs.com/",target:"_blank",rel:"noopener noreferrer"},"here")),i.a.createElement("p",null,"or use common test account credentials:"),i.a.createElement("p",null,"Email: free@samuraijs.com"),i.a.createElement("p",null,"Password: free")),i.a.createElement(K.a,null,i.a.createElement(X.a,Object.assign({id:"email",type:"email",placeholder:"Email"},a.getFieldProps("email"))),a.touched.email&&a.errors.email?i.a.createElement("div",{style:{color:"red"}},a.errors.email):null,i.a.createElement(X.a,Object.assign({label:"Password",id:"password",type:"password"},a.getFieldProps("password"))),a.touched.password&&a.errors.password?i.a.createElement("div",{style:{color:"red"}},a.errors.password):null,i.a.createElement($.a,Object.assign({label:"Remember ME",id:"rememberMe",control:i.a.createElement(_.a,null)},a.getFieldProps("rememberMe"))),i.a.createElement(G.a,{type:"submit",variant:"contained",color:"primary"},"Login"))))))},rt=Object(f.a)(Object(f.a)({},R),B.actions),nt=B.reducer,st=W.setAppStatus,it=W.setAppError,ct=Object(L.c)("todolist/getTodolist",function(){var t=Object(h.a)(b.a.mark((function t(e,a){var r,n,s;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a.dispatch,n=a.rejectWithValue,r(st({status:"loading"})),t.next=4,k();case 4:return s=t.sent,t.prev=5,r(st({status:"succeeded"})),t.abrupt("return",{todolists:s.data});case 10:return t.prev=10,t.t0=t.catch(5),401===t.t0.response.status?r(it({error:"Please Sign In"})):r(it(t.t0.message)),r(st({status:"failed"})),t.abrupt("return",n(t.t0));case 15:case"end":return t.stop()}}),t,null,[[5,10]])})));return function(e,a){return t.apply(this,arguments)}}()),ot=Object(L.c)("todolist/createTodolist",function(){var t=Object(h.a)(b.a.mark((function t(e,a){var r,n,s;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a.dispatch,n=a.rejectWithValue,r(st({status:"loading"})),t.next=4,E(e);case 4:if(s=t.sent,t.prev=5,s.data.resultCode!==d.Success){t.next=11;break}return r(st({status:"succeeded"})),t.abrupt("return",{todolist:s.data.data.item});case 11:return P(s.data,r),t.abrupt("return",n({errors:s.data.messages,fieldsErrors:s.data.fieldsErrors}));case 13:t.next=19;break;case 15:return t.prev=15,t.t0=t.catch(5),z(t.t0,r),t.abrupt("return",n({errors:[t.t0.message],fieldsErrors:void 0}));case 19:case"end":return t.stop()}}),t,null,[[5,15]])})));return function(e,a){return t.apply(this,arguments)}}()),ut=Object(L.c)("todolist/deleteTodolist",function(){var t=Object(h.a)(b.a.mark((function t(e,a){var r,n,s;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a.dispatch,n=a.rejectWithValue,r(st({status:"loading"})),r(mt({entityStatus:"loading",id:e})),t.next=5,y(e);case 5:if(s=t.sent,t.prev=6,s.data.resultCode!==d.Success){t.next=12;break}return r(st({status:"succeeded"})),t.abrupt("return",{todoListID:e});case 12:return r(it({error:s.data.messages[0]})),r(st({status:"failed"})),r(mt({entityStatus:"failed",id:e})),t.abrupt("return",n({}));case 16:t.next=24;break;case 18:return t.prev=18,t.t0=t.catch(6),r(it(t.t0.message)),r(st({status:"failed"})),r(mt({entityStatus:"failed",id:e})),t.abrupt("return",n(t.t0));case 24:case"end":return t.stop()}}),t,null,[[6,18]])})));return function(e,a){return t.apply(this,arguments)}}()),lt=Object(L.c)("todolist/changeTodolistTitle",function(){var t=Object(h.a)(b.a.mark((function t(e,a){var r,n,s,i,c;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a.dispatch,n=a.rejectWithValue,s=e.id,i=e.newTitle,r(st({status:"loading"})),t.next=5,j(s,i);case 5:if(c=t.sent,t.prev=6,c.data.resultCode!==d.Success){t.next=12;break}return r(st({status:"succeeded"})),t.abrupt("return",{id:s,title:i});case 12:return P(c.data,r),t.abrupt("return",n({}));case 14:t.next=20;break;case 16:return t.prev=16,t.t0=t.catch(6),z(t.t0,r),t.abrupt("return",n(t.t0));case 20:case"end":return t.stop()}}),t,null,[[6,16]])})));return function(e,a){return t.apply(this,arguments)}}()),dt={getTodolists:ct,createTodolist:ot,deleteTodolist:ut,changeTodolistTitle:lt},pt=Object(L.d)({name:"todolist",initialState:[],reducers:{changeTodoListFilter:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));t[a].filter=e.payload.filter},setTodolistEntityStatus:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));t[a].entityStatus=e.payload.entityStatus}},extraReducers:function(t){t.addCase(ct.fulfilled,(function(t,e){return e.payload.todolists.map((function(t){return Object(f.a)(Object(f.a)({},t),{},{filter:"all",entityStatus:"idle"})}))})),t.addCase(ot.fulfilled,(function(t,e){t.unshift(Object(f.a)(Object(f.a)({},e.payload.todolist),{},{filter:"all",entityStatus:"idle"}))})),t.addCase(ut.fulfilled,(function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.todoListID}));t.splice(a,1)})),t.addCase(lt.fulfilled,(function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));t[a].title=e.payload.title})),t.addCase(rt.logout.fulfilled,(function(t){t.length=0}))}}),ft=pt.actions,mt=ft.setTodolistEntityStatus,bt=(ft.changeTodoListFilter,W.setAppError),ht=W.setAppStatus,vt=Object(L.c)("tasks/updateTask",function(){var t=Object(h.a)(b.a.mark((function t(e,a){var r,n,s,i,c,o,u;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=a.dispatch,n=a.getState,s=a.rejectWithValue,i=n(),c=i.tasks[e.todolistId].find((function(t){return t.id===e.taskId}))){t.next=6;break}return console.warn("Task for updating not found"),t.abrupt("return",s("Task for updating not found"));case 6:return o=Object(f.a)({title:c.title,status:c.status,startDate:c.startDate,description:c.description,priority:c.priority,deadline:c.deadline},e.model),r(ht({status:"loading"})),t.next=10,w(e.todolistId,e.taskId,o);case 10:if(u=t.sent,t.prev=11,u.data.resultCode!==d.Success){t.next=17;break}return r(ht({status:"succeeded"})),t.abrupt("return",e);case 17:return P(u.data,r),t.abrupt("return",s({}));case 19:t.next=25;break;case 21:return t.prev=21,t.t0=t.catch(11),z(t.t0,r),t.abrupt("return",s({}));case 25:case"end":return t.stop()}}),t,null,[[11,21]])})));return function(e,a){return t.apply(this,arguments)}}()),gt=Object(L.c)("tasks/getTasks",function(){var t=Object(h.a)(b.a.mark((function t(e,a){var r;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(ht({status:"loading"})),t.prev=1,t.next=4,O(e);case 4:return r=t.sent,a.dispatch(ht({status:"succeeded"})),t.abrupt("return",{tasks:r.data.items,todolistId:e});case 9:return t.prev=9,t.t0=t.catch(1),a.dispatch(bt(t.t0.message)),a.dispatch(ht({status:"failed"})),t.abrupt("return",a.rejectWithValue({}));case 14:case"end":return t.stop()}}),t,null,[[1,9]])})));return function(e,a){return t.apply(this,arguments)}}()),kt=Object(L.c)("tasks/removeTask",function(){var t=Object(h.a)(b.a.mark((function t(e,a){var r,n,s;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.todolistId,n=e.taskId,a.dispatch(ht({status:"loading"})),a.dispatch(Ot({entityStatus:"loading",todolistId:r,taskId:n})),t.prev=3,t.next=6,S(r,n);case 6:if((s=t.sent).data.resultCode!==d.Success){t.next=12;break}return a.dispatch(ht({status:"succeeded"})),t.abrupt("return",{taskId:n,todolistId:r});case 12:return a.dispatch(bt({error:s.data.messages[0]})),a.dispatch(ht({status:"failed"})),a.dispatch(Ot({entityStatus:"failed",todolistId:r,taskId:n})),t.abrupt("return",a.rejectWithValue({}));case 16:t.next=24;break;case 18:return t.prev=18,t.t0=t.catch(3),a.dispatch(bt({error:t.t0.message})),a.dispatch(ht({status:"failed"})),a.dispatch(Ot({entityStatus:"failed",todolistId:r,taskId:n})),t.abrupt("return",a.rejectWithValue({}));case 24:case"end":return t.stop()}}),t,null,[[3,18]])})));return function(e,a){return t.apply(this,arguments)}}()),Et=Object(L.c)("tasks/createTask",function(){var t=Object(h.a)(b.a.mark((function t(e,a){var r;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(ht({status:"loading"})),t.next=3,x(Object(f.a)({},e));case 3:if(r=t.sent,t.prev=4,r.data.resultCode!==d.Success){t.next=10;break}return a.dispatch(ht({status:"succeeded"})),t.abrupt("return",{task:r.data.data.item});case 10:return P(r.data,a.dispatch),t.abrupt("return",a.rejectWithValue({errors:r.data.messages,fieldsErrors:r.data.fieldsErrors}));case 12:t.next=18;break;case 14:return t.prev=14,t.t0=t.catch(4),z(t.t0,a.dispatch),t.abrupt("return",a.rejectWithValue({errors:[t.t0.message],fieldsErrors:void 0}));case 18:case"end":return t.stop()}}),t,null,[[4,14]])})));return function(e,a){return t.apply(this,arguments)}}()),yt={updateTaskTC:vt,getTasksTC:gt,removeTaskTC:kt,createTaskTC:Et},jt=Object(L.d)({name:"tasks",initialState:{todolist:[]},reducers:{setTaskEntityStatus:function(t,e){var a=t[e.payload.todolistId],r=a.findIndex((function(t){return t.id===e.payload.taskId}));a[r]=Object(f.a)(Object(f.a)({},a[r]),{},{entityStatus:e.payload.entityStatus})}},extraReducers:function(t){t.addCase(dt.createTodolist.fulfilled,(function(t,e){t[e.payload.todolist.id]=[]})),t.addCase(dt.deleteTodolist.fulfilled,(function(t,e){delete t[e.payload.todoListID]})),t.addCase(dt.getTodolists.fulfilled,(function(t,e){e.payload.todolists.forEach((function(e){t[e.id]=[]}))})),t.addCase(gt.fulfilled,(function(t,e){t[e.payload.todolistId]=e.payload.tasks})),t.addCase(kt.fulfilled,(function(t,e){var a=t[e.payload.todolistId],r=a.findIndex((function(t){return t.id===e.payload.taskId}));a.splice(r,1)})),t.addCase(vt.fulfilled,(function(t,e){var a=t[e.payload.todolistId],r=a.findIndex((function(t){return t.id===e.payload.taskId}));a[r]=Object(f.a)(Object(f.a)({},a[r]),e.payload.model)})),t.addCase(Et.fulfilled,(function(t,e){t[e.payload.task.todoListId].unshift(e.payload.task)})),t.addCase(rt.logout.fulfilled,(function(t){Object.keys(t).forEach((function(e){delete t[e]}))}))}}),Ot=jt.actions.setTaskEntityStatus,xt=a(45),St=a(167),wt=a(169),Ct=i.a.memo((function(t){var e=Object(s.useState)(""),a=Object(xt.a)(e,2),r=a[0],n=a[1],c=Object(s.useState)(null),o=Object(xt.a)(c,2),u=o[0],l=o[1],d=function(){var e=Object(h.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:""!==r.trim()?t.addItem(r,{setError:l,setTitle:n}):l("Title is required");case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return i.a.createElement("div",null,i.a.createElement(X.a,{variant:"outlined",value:r,onChange:function(t){u&&l(null),n(t.currentTarget.value)},onKeyPress:function(t){u&&(l(null),"Enter"===t.key&&d())},error:!!u,label:"Title",helperText:u,disabled:"loading"===t.entityStatus})," ",!u&&i.a.createElement(St.a,{color:"primary",onClick:d,disabled:"loading"===t.entityStatus},i.a.createElement(wt.a,null)))})),Tt=i.a.memo((function(t){var e=Object(s.useState)(!1),a=Object(xt.a)(e,2),r=a[0],n=a[1],c=Object(s.useState)(t.title),o=Object(xt.a)(c,2),u=o[0],l=o[1];return r?i.a.createElement(X.a,{onBlur:function(){n(!1),u.trim()&&t.changeTitle(u.trim())},onChange:function(t){l(t.currentTarget.value)},autoFocus:!0,value:u}):i.a.createElement("span",{onDoubleClick:"loading"===t.entityStatus?function(){}:function(){n(!0)}},t.title)})),It=a(130),Lt=a(170),At=i.a.memo((function(t){var e=t.task,a=t.entityStatus,r=tt(Dt),n=r.updateTaskTC,c=r.removeTaskTC,o=Object(s.useCallback)((function(t){return n({todolistId:e.todoListId,taskId:e.id,model:t.currentTarget.checked?{status:u.Completed}:{status:u.New}})}),[n,e.id,e.todoListId]),l=Object(s.useCallback)((function(t){return n({todolistId:e.todoListId,taskId:e.id,model:{title:t}})}),[e.id,n,e.todoListId]),d=Object(s.useCallback)((function(){return c({todolistId:e.todoListId,taskId:e.id})}),[e.id,c,e.todoListId]);return i.a.createElement("li",{style:{marginLeft:"0",position:"relative"}},i.a.createElement(_.a,{onChange:o,checked:e.status===u.Completed,color:"primary"}),i.a.createElement(Tt,{changeTitle:l,title:e.title,entityStatus:a}),i.a.createElement(St.a,{style:{position:"absolute",right:"0",top:"6px"},size:"small",onClick:d,color:"primary",disabled:"loading"===a},i.a.createElement(Lt.a,{fontSize:"small"})))})),Wt=i.a.memo((function(t){var e=t.todolist,a=t.demo,r=Object(p.c)((function(t){return t.tasks[e.id]})),n=tt(Dt).getTasksTC,c=tt(zt),o=c.changeTodoListFilter,l=c.deleteTodolist,d=c.changeTodolistTitle,f=Z();Object(s.useEffect)((function(){a||n(e.id)}),[a,n,e.id]);var m=r;"active"===e.filter&&(m=r.filter((function(t){return t.status!==u.Completed}))),"completed"===e.filter&&(m=r.filter((function(t){return t.status===u.Completed})));var v=Object(s.useCallback)((function(){return o({filter:"all",id:e.id})}),[e.id,o]),g=Object(s.useCallback)((function(){return o({filter:"active",id:e.id})}),[e.id,o]),k=Object(s.useCallback)((function(){return o({filter:"completed",id:e.id})}),[e.id,o]),E=Object(s.useCallback)(function(){var t=Object(h.a)(b.a.mark((function t(a,r){var n,s,i,c,o,u;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=Dt.createTaskTC({id:e.id,title:a}),t.next=3,f(n);case 3:s=t.sent,Dt.createTaskTC.rejected.match(s)?(null===(i=s.payload)||void 0===i||null===(c=i.errors)||void 0===c?void 0:c.length)?(u=null===(o=s.payload)||void 0===o?void 0:o.errors[0],r.setError(u)):r.setError("Some error occurred"):r.setTitle("");case 5:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}(),[e.id,f]),y=Object(s.useCallback)((function(t){d({id:e.id,newTitle:t})}),[e.id,d]),j=m.map((function(t){return i.a.createElement("span",{key:t.id},i.a.createElement(At,{entityStatus:t.entityStatus,task:t}))}));return i.a.createElement("div",{className:"App"},i.a.createElement(It.a,{elevation:3,style:{padding:"15px",position:"relative"}},i.a.createElement("h3",null,i.a.createElement(Tt,{title:e.title,changeTitle:y,entityStatus:e.entityStatus}),i.a.createElement(St.a,{style:{position:"absolute",top:"0",right:"0"},onClick:function(){return l(e.id)},color:"primary",disabled:"loading"===e.entityStatus},i.a.createElement(Lt.a,null))),i.a.createElement(Ct,{addItem:E,entityStatus:e.entityStatus}),i.a.createElement("ul",{style:{listStyle:"none",padding:"0"}},j,0===m.length&&i.a.createElement("span",{style:{opacity:"0.7",padding:"10px"}},"No tasks")),i.a.createElement("div",null,i.a.createElement(Vt,{callback:v,isSelected:"all"===e.filter},"All"),i.a.createElement(Vt,{callback:g,isSelected:"active"===e.filter},"Active"),i.a.createElement(Vt,{callback:k,isSelected:"completed"===e.filter},"Completed"))))})),Vt=function(t){var e=t.callback,a=t.isSelected,r=t.children;return i.a.createElement(G.a,{style:{margin:"3px"},variant:a?"outlined":"contained",size:"small",color:"primary",onClick:e},r)},Ft=function(t){var e=t.demo,a=Object(p.c)(n.todoLists),c=Object(p.c)(r.selectIsLoggedIn),o=tt(zt).getTodolists,u=Z();Object(s.useEffect)((function(){c&&!e&&o()}),[c,e,o]);var l=Object(s.useCallback)(function(){var t=Object(h.a)(b.a.mark((function t(e,a){var r,n,s,i,c,o;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=zt.createTodolist(e),t.next=3,u(r);case 3:n=t.sent,zt.createTodolist.rejected.match(n)?(null===(s=n.payload)||void 0===s||null===(i=s.errors)||void 0===i?void 0:i.length)?(o=null===(c=n.payload)||void 0===c?void 0:c.errors[0],a.setError(o)):a.setError("Some error occurred"):a.setTitle("");case 5:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}(),[u]);return c?i.a.createElement(i.a.Fragment,null,i.a.createElement(U.a,{container:!0,style:{padding:"15px"}},i.a.createElement(Ct,{addItem:l})),i.a.createElement(U.a,{container:!0,spacing:4,style:{flexWrap:"nowrap",overflowX:"scroll"}},a.map((function(t){return i.a.createElement(U.a,{item:!0,key:t.id},i.a.createElement("div",{style:{width:"300px"}},i.a.createElement(Wt,{key:t.id,todolist:t,demo:e})))})))):i.a.createElement(Q.a,{to:"/login"})},Pt=function(t){return t.todoLists},zt=Object(f.a)(Object(f.a)({},dt),pt.actions),Dt=Object(f.a)({},yt),Mt=pt.reducer,Nt=jt.reducer,Rt=function(t){return t.app.status},Bt=function(t){return t.app.isInitialized},Ht=function(t){return t.app.error},Ut=Object(L.c)("application/initializeApp",function(){var t=Object(h.a)(b.a.mark((function t(e,a){var r,n,s;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a.dispatch,n=a.rejectWithValue,r(W.setAppStatus({status:"loading"})),t.next=4,C();case 4:s=t.sent,t.prev=5,s.data.resultCode===d.Success?(r(W.setAppStatus({status:"succeeded"})),r(rt.setIsLogged({isLogged:!0}))):r(W.setAppStatus({status:"failed"})),t.next=13;break;case 9:return t.prev=9,t.t0=t.catch(5),P(t.t0,r),t.abrupt("return",n(t.t0));case 13:case"end":return t.stop()}}),t,null,[[5,9]])})));return function(e,a){return t.apply(this,arguments)}}()),qt={initializeApp:Ut},Jt=Object(L.d)({name:"app",initialState:{status:"idle",error:null,isInitialized:!1},reducers:{},extraReducers:function(t){t.addCase(Ut.fulfilled,(function(t){t.isInitialized=!0})),t.addCase(W.setAppStatus,(function(t,e){t.status=e.payload.status})),t.addCase(W.setAppError,(function(t,e){t.error=e.payload.error}))}}).reducer,Kt=a(48),Xt=Object(Y.c)({tasks:Nt,todoLists:Mt,app:Jt,auth:nt}),$t=Object(L.a)({reducer:Xt,middleware:function(t){return t().prepend(Kt.a)}});window.store=$t;a(128);var _t=a(171),Gt=a(172),Qt=a(173),Yt=a(174),Zt=a(175),te=a(180),ee=a(177);function ae(t){return i.a.createElement(ee.a,Object.assign({elevation:6,variant:"filled"},t))}function re(){var t=Object(p.c)(Ht),e=tt(W).setAppError,a=function(t,a){"clickaway"!==a&&e({error:null})};return i.a.createElement("div",null,i.a.createElement(te.a,{open:null!==t,autoHideDuration:6e3,onClose:a},i.a.createElement(ae,{onClose:a,severity:"error"},t)))}var ne=function(t){var e=t.demo,a=void 0!==e&&e,n=Object(p.c)(Rt),c=Object(p.c)(Bt),o=Object(p.c)(r.selectIsLoggedIn),u=tt(qt).initializeApp,l=tt(rt).logout;return Object(s.useEffect)((function(){a||u()}),[u,a]),c?i.a.createElement("div",{className:"App"},i.a.createElement(Gt.a,{position:"static",className:"appBar"},i.a.createElement(Qt.a,null,o&&i.a.createElement(G.a,{onClick:function(){l()},color:"inherit"},"LogOut"))),i.a.createElement("div",{style:{height:"4px"}},i.a.createElement(Yt.a,{className:"linearProgress",hidden:"loading"!==n})),i.a.createElement(Zt.a,{fixed:!0},i.a.createElement(Q.d,null,i.a.createElement(Q.b,{exact:!0,path:"/",render:function(){return i.a.createElement(Ft,{demo:a})}}),i.a.createElement(Q.b,{path:"/login",render:function(){return i.a.createElement(at,null)}}),i.a.createElement(Q.b,{path:"/404",render:function(){return i.a.createElement(Q.a,{to:"/"})}}),i.a.createElement(Q.a,{from:"*",to:"/404"}))),i.a.createElement(re,null)):i.a.createElement("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"}},i.a.createElement(_t.a,null))},se=a(47);o.a.render(i.a.createElement(se.a,null,i.a.createElement(p.a,{store:$t},i.a.createElement(ne,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},98:function(t,e,a){t.exports=a(129)}},[[98,1,2]]]);
//# sourceMappingURL=main.a759350c.chunk.js.map