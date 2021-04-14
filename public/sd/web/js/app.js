const routes = [
    { path: '/', component: Home },
    { path: '/log-trend', component: LogTrend },
    { path: '/live-trend', component: LiveTrend },
    { path: '/radial-gauges', component: RadialGauges },
    { path: '/linear-gauges', component: LinearGauges }
];

const router = new VueRouter({
    routes
});

const app = new Vue({
    el: '#app',
    router: router,
    data: {
        activeLink: 'home'
    }
});
  