const Home = {
    template: `
        <ul class="mt-4">
            <li class="pb-2">
                <router-link to="/linear-gauges" class="animated-button sandy-one">
                    Linear Gauges
                </router-link>
            </li>
            <li class="pb-2">
                <router-link to="/radial-gauges" class="animated-button sandy-one">
                    Radial Gauges
                </router-link>
            </li>
            <li class="pb-2">
                <router-link to="/live-trend" class="animated-button sandy-one">
                    Live Trend
                </router-link>
            </li>
            <li>
                <router-link to="/log-trend" class="animated-button sandy-one">
                    Log Trend
                </router-link>
            </li>
        </ul>
    `
};