const routes = [
    { path: '/', component: Home },
    { path: '/log-trend', component: LogTrend },
    { path: '/live-trend', component: LiveTrend },
    { path: '/radial-gauges', component: RadialGauges },
    { path: '/linear-gauges', component: LinearGauges }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

const app = Vue.createApp({
    data() {
        return {
            activeLink: 'home'
        }
    }
});
  
app.use(router);

app.component("navbar", navbar);

app.mount("#app");