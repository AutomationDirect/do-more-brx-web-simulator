var navbar = Vue.component("navbar", {
    data: function() {
        return {
            active: false
        }
    },
    methods: {
        toggleActive: function() {
            this.active = !this.active;
        }
    },
    template: `
        <nav class="navbar navbar-expand-lg bg-dark">
            <a class="navbar-brand" href="#/"">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAZCAYAAACB6CjhAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFTElEQVRYhd2YW2xUVRSGvzUzFFpKkaCUAoqKeAkQJT4IaiIxAQVNJF5iEI0SxHAxGgQ1KC8m4gsEkSjGCBrqpRAFQkwplxgUEKMSWlFAEsDIpVAoobaUcmnn9+FM28OZvWemrYmJf3Ie9lpr/2vttfdZ+2L8jyCpP7AAsJA4D7gAzDKzi/9JYB2FJMtu5ey3QW4slxR39Uk4SJYC1+bg7yLQBBwDdppZRYhjIvBsDhyXCWbnDLAf2GRmfwF5kspS8pNApZmtzUQkaQkw3qH60Mxm5hALSOrlyWAu2CdpSIqnvAs876U4tkfkv2WIe7qHa2tOAw8R3d2FwCWpOsWzo4s8L6R4oljuiHmsh+OgOvoryZ/JjuBxSZVdJUnFs86hGhyK90ZJutSilupGNYZsLkkqzmXM0Row3GGzBfg2IisCJgE3OOzHAQMc8gVAQ6gdA4YBk12BSeoGvARMjKgWA4+l9D8BxAybt4sDRc3o3TGUnI8xosjsjIs3IyRtdmR8jMc2Jqk+YtsoaaWD42gGn3M9i6BfSr/PobtekTrzzREd52WVXbdaXxevkmsinYhF2sMcNqddHc0syZX7LcABj723gJGaxQhqCXYAgHkO/UFgQlgwbiD9ikdRcuQk+TUNLC5cqQWFpUESM6EtAZIGkb50T5vZXldHSR8BhRHxcoKtMQonRwrTHbJVZtYCYGbrgZqIPm1Pb0myNJlkOwV069WdhBmjDcoKS/VEBt/tMyhpAlAe0f8NbOPKWhEnqBXRZJWb2cOS9gAjIrpnzOzzsEBSCTANeMsRVx8zqwvZzgCWZRjHbjO7k4V6qLCYOWml3zikOEvOPZU+meEEzAPeyeDEhxPAXDP7UtLVuH+BE0BLqB0HShx2AsaY2bY0hXQYd9GtBQab2XkWanjvYpYmPYGasba+Lx8zof1IHK4Bt3r6ZUOC9sG4qj8p/aDQFx28gBXAAM/gu3l4jwIjzew8AK/a70k46wtU4tFetawuLNX94eBbcbOvYxZcAyyS1Jfgd+ks6s3spEe3B/fsnzOzY22tFRpgUKDMfooM5heV6l7ilCUAJCVwnwEmESzfMPoAM4GxEflrwCOZfXthwGxJmNkrYYWkcvyr8zZJk83sC4CY8bygexZfh2VUxFqoyutBjaWcjCDIchg1ZtbfxyLpBODVh/AJ8EGonQBGAYuA6NL+1czuCPlYDMzOwn/QzIayTH3i+XxVEE/b2jEjKdgSb2ZT3RSrCutaf4Fo1Yb0hESRZaW1YZ2Z7Y7IfpY0FHgxIm87KUqaSvbBA9y095T6D1vPXdHqb1CNUR5rpqJuSvuuEkamBGzyeZQ0BXcVd+GQRx7d2wGOp/jvIzhTRFEJzAJ2hoWJPCpo4E+uCnY1M77H2FD/tP2SLbjWBLgKYImkB0LtOEHBu4dg/46iAcjnysJaR3A6dGGIQ7ZGwQ3uO4cuCYw3sxpJmwnuHLQIlR4ijyT1zWdZ21DAZmbYKY/PdEjqLmm/5zyeK6okvS4pGZHvyOB3Z8S2RdKTkrZ6fIwO9b2lVdjUrMu7alVbe0Hv5zzoSCAjU847iyZJxZLecOg+9fiMSaqO2DZLuuDx8ZyDw3VVHtiZBMzp5MAlaZOCOwSSLjr0b3p89u6Aj7c9HPmSTkdsN3Z0/AmCt70fcrBtBhoJjp5/ABvNrDIVTE/gR9LfF7Z4uJqADUBvgnPGg6RfrADWmNl8F4GZNSl4gpsK3A4UAz0k9TSzxhzG8+9BnXzFTfWd5pn5quy9nXzO118f0l6FOwMzy/VM4MIQ4DOCFdYK0bmLGa3X6FzxD4YDMiC3hrnNAAAAAElFTkSuQmCC"/>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <div class="hamburger" @click="toggleActive" :class="active ? 'is-active' : ''">
                    <span class="line"></span>
                    <span class="line"></span>
                    <span class="line"></span>
                </div>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <router-link to="/linear-gauges" class="nav-item nav-link">
                        Linear Gauges
                    </router-link>
                    <router-link to="/radial-gauges" class="nav-item nav-link">
                        Radial Gauges
                    </router-link>
                    <router-link to="/live-trend" class="nav-item nav-link">
                        Live Trend
                    </router-link>
                    <router-link to="/log-trend" class="nav-item nav-link">
                        Log Trend
                    </router-link>
                </div>
            </div>
        </nav>
    `,
});