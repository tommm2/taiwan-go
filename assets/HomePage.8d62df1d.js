import{_ as A,S as D,N as E,G as R,P as S,a as V}from"./pagination.min.dce3f5c0.js";import{_ as b}from"./TravelCard.ffe33b3a.js";import{u as $,m as N,y as T,z as I,A as q,o as l,d as i,B as s,e as t,f,w as u,F as v,h as x,g as h,t as a,C as g,n as w,D as B,i as c}from"./vendor.8c77972f.js";import"./index.16c53bba.js";var j="/taiwan-go/assets/traveler.9e87b0c6.png",H="/taiwan-go/assets/food-mark.a6c57bb3.png";const U={class:"overflow-x-hidden"},O={class:"flex h-[60vh] flex-col items-center justify-center bg-home-banner bg-cover bg-center bg-no-repeat"},F={class:"mb-10 space-y-4 text-center text-white"},G={class:"banner-title"},L=c("\u60F3\u53BB\u54EA\u88E1\u73A9?"),M=[L],J={class:"text-lg text-shadow-lg"},K=c(" \u9019\u88E1\u5171\u6709\u4E0A\u5343\u500B\u6D3B\u52D5\u53CA\u7F8E\u98DF\u7B49\u8457\u4F60\u53BB\u4E00\u540C\u9AD4\u9A57 "),Q=[K],W={class:"relative py-20"},X={class:"z-10 whitespace-nowrap text-center"},Y=["textContent"],Z=["textContent"],tt={class:"absolute left-0 top-0 z-0 h-80 w-full rounded-br-[136px] bg-[#f7f7f7] lg:w-9/12"},et={class:"absolute left-0 -bottom-48 z-10 hidden w-28 lg:block lg:w-auto",src:j,alt:"traveler"},st={class:"relative my-10 lg:py-40"},ot={class:"container mx-auto flex flex-col items-center px-10"},nt={class:"grid grid-cols-12 gap-4 sm:gap-10"},lt={class:"col-span-12 lg:col-span-9"},it={class:"grid grid-cols-12 gap-6"},at={class:"order-first col-span-12 space-y-4 text-center lg:order-last lg:col-span-3 lg:text-left"},ct=["textContent"],rt=["textContent"],dt=c(" \u66F4\u591Afunny "),_t=t("div",{class:"btn-decoration"},null,-1),pt=[dt,_t],ut=c(" \u66F4\u591Afunny "),ht=t("div",{class:"btn-decoration"},null,-1),gt=[ut,ht],mt={class:"absolute right-0 -bottom-60 z-10 hidden w-28 lg:block lg:w-auto",src:H,alt:"traveler"},bt={class:"relative my-40"},vt={class:"container mx-auto flex flex-col items-center gap-20 px-10 xl:flex-row xl:items-start"},xt={class:"z-20 space-y-2 whitespace-nowrap text-center xl:text-left"},yt=["textContent"],ft=["textContent"],wt=c(" \u66F4\u591A\u7F8E\u5473 "),Ct=t("div",{class:"btn-decoration"},null,-1),kt=[wt,Ct],zt={class:"text-white"},Pt=["textContent"],At=["textContent"],Dt=["textContent"],Et=t("div",null,null,-1),Rt={class:"relative flex justify-center pl-6 pr-10 xl:hidden"},St=c(" \u66F4\u591A\u7F8E\u5473 "),Vt=t("div",{class:"btn-decoration"},null,-1),$t=[St,Vt],Nt={class:"absolute left-0 -top-24 z-0 h-80 w-0 rounded-r-full bg-[#f7f7f7] sm:w-2/3"},Tt={class:"relative my-40"},It={class:"container mx-auto grid grid-cols-12 gap-4 px-10 lg:gap-20"},qt={class:"z-10 col-span-12 space-y-2 text-center"},Bt=["textContent"],jt=["textContent"],Ht={class:"col-span-12"},Ut={class:"grid grid-cols-12 gap-4"},Ot={class:"col-span-12 flex justify-center"},Ft=c(" \u66F4\u591A\u4F4F\u5BBF "),Gt=t("div",{class:"btn-decoration"},null,-1),Lt=[Ft,Gt],Mt={class:"absolute -bottom-40 z-0 h-full w-full rounded-t-full bg-[#f7f7f7]"},Yt={setup(Jt){const y=$(),r=N(),m=T(()=>r.state.multiData),C=()=>{[{type:"Activity",query:{top:6,skip:20}},{type:"Restaurant",query:{top:10,skip:20}},{type:"Hotel",query:{top:4}}].forEach(n=>{const{type:e,query:o}=n;r.dispatch("getResult",{type:e,query:o})})},k=[E,R,S],z={breakpoints:{320:{slidesPerView:1,grid:{rows:2,fill:"row"}},600:{slidesPerView:2,grid:{rows:2,fill:"row"}},900:{slidesPerView:3},1100:{slidesPerView:4,grid:{rows:1}},1300:{slidesPerView:5,grid:{rows:1}}},pagination:{clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}},_=p=>y.push(p),P=p=>{const{query:n,option:e}=p;console.log(n,e),y.replace({path:"/city",query:n}),r.dispatch("changeArea",e)};return I(()=>{r.commit("UPDATE_POSITION",""),r.commit("UPDATE_AREA",""),r.commit("UPDATE_TITLE",""),C()}),(p,n)=>{const e=q("aos");return l(),i("div",U,[s((l(),i("section",O,[t("div",F,[s((l(),i("h3",G,M)),[[e]]),s((l(),i("h4",J,Q)),[[e,{delay:200}]])])])),[[e]]),t("section",W,[f(A,{onHandleChangeArea:P},{"home-page":u(()=>[s((l(),i("div",X,[t("h3",{class:"main-title mb-4",textContent:a("\u7E23\u5E02\u5FEB\u9078")},null,8,Y),t("h4",{class:"sub-title",textContent:a("choose cities")},null,8,Z)])),[[e]])]),_:1}),s(t("div",tt,null,512),[[e,{type:"fade-right"}]]),s(t("img",et,null,512),[[e,{type:"zoom-in"}]])]),t("section",st,[t("div",ot,[t("div",nt,[t("div",lt,[s((l(),i("div",it,[(l(!0),i(v,null,x(h(m).activitys,(o,d)=>s((l(),g(b,{key:d,data:o,class:w([[d<=2?"":"lg:translate-x-20"],"col-span-12 sm:col-span-6 lg:col-span-4"]),"api-type":"Activity"},null,8,["data","class"])),[[e,{delay:(d+1)*80}]])),128))])),[[e,{delay:500}]])]),t("div",at,[s(t("h3",{class:"main-title",textContent:a("\u591A\u4E45\u6C92\u6709\u51FA\u9580\u8D70\u8D70\u4E86\u5462?")},null,8,ct),[[e]]),s(t("h4",{class:"sub-title",textContent:a("let's get out")},null,8,rt),[[e,{delay:100}]]),s((l(),i("button",{class:"btn btn-gradient relative hidden pr-10 pl-6 uppercase tracking-wider lg:block",onClick:n[0]||(n[0]=o=>_("/activity"))},pt)),[[e,{delay:200}]])])]),t("button",{class:"btn btn-gradient relative mt-10 block pl-6 pr-10 uppercase tracking-wider lg:hidden",onClick:n[1]||(n[1]=o=>_("/activity"))},gt)]),s(t("img",mt,null,512),[[e,{type:"zoom-in"}]])]),t("section",bt,[t("div",vt,[t("div",xt,[s(t("h3",{class:"main-title",textContent:a("\u9910\u98F2\u7F8E\u98DF")},null,8,yt),[[e]]),s(t("h4",{class:"sub-title",textContent:a("tasty")},null,8,ft),[[e,{delay:100}]]),s((l(),i("button",{class:"btn btn-gradient relative hidden pl-6 pr-10 tracking-wider xl:block",onClick:n[2]||(n[2]=o=>_("/food"))},kt)),[[e,{delay:200}]])]),s((l(),g(h(D),{modules:k,navigation:!0,breakpoints:z.breakpoints,"space-between":30},{default:u(()=>[(l(!0),i(v,null,x(h(m).foods,o=>(l(),g(h(V),{key:o.RestaurantID},{default:u(()=>[f(b,{data:o,"api-type":"Restaurant"},{"image-layout":u(()=>[t("div",{style:B({backgroundImage:`url('${o.Picture.PictureUrl1}')`}),class:"flex h-80 cursor-pointer items-end justify-between rounded-lg bg-cover bg-center bg-no-repeat p-2"},[t("div",zt,[t("p",{class:"text-lg font-semibold",textContent:a(o.RestaurantName)},null,8,Pt),t("p",{textContent:a(o.Class)},null,8,At)]),t("span",{class:"whitespace-nowrap rounded-full bg-black p-2 text-white",textContent:a(o.City)},null,8,Dt)],4)]),"info-layout":u(()=>[Et]),_:2},1032,["data"])]),_:2},1024))),128))]),_:1},8,["breakpoints"])),[[e,{delay:500}]])]),t("div",Rt,[t("button",{class:"btn btn-gradient mt-10",onClick:n[3]||(n[3]=o=>_("/food"))},$t)]),s(t("div",Nt,null,512),[[e,{type:"fade-right"}]])]),t("section",Tt,[t("div",It,[t("div",qt,[s(t("h3",{class:"main-title",textContent:a("\u7CBE\u9078\u4F4F\u5BBF")},null,8,Bt),[[e]]),s(t("h4",{class:"sub-title",textContent:a("Accommodation")},null,8,jt),[[e,{delay:100}]])]),t("div",Ht,[t("div",Ut,[(l(!0),i(v,null,x(h(m).hotels,(o,d)=>s((l(),g(b,{key:o.HotelID,data:o,class:w([[d%2===0?"lg:-translate-y-10":""],"group sm:col-span-6 lg:col-span-3"]),"api-type":"Hotel"},null,8,["data","class"])),[[e,{delay:(d+1)*200}]])),128))])]),t("div",Ot,[t("button",{class:"btn btn-gradient z-10 mt-10 pr-10 pl-6 tracking-wider relative",onClick:n[4]||(n[4]=o=>_("/hotel"))},Lt)])]),s(t("div",Mt,null,512),[[e,{type:"zoom-in"}]])])])}}};export{Yt as default};
