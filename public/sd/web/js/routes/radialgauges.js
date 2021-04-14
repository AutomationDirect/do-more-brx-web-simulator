const RadialGauges = Vue.component('RadialGauges', {
    data: () => {
        return {
            error: false,
            gauge1: {
                value: 0.00
            },
            gauge2: {
                value: 0.00
            },
            gauge3: {
                value: 0.00
            },
            gauge4: {
                value: 0.00
            }
        }
    },
    methods: {
        initiateGauges: function() {
            this.initiateGauge1();
            this.initiateGauge2();
            this.initiateGauge3();
            this.initiateGauge4();
        },
        initiateGauge1: function() {
            this.gauge1 = new RadialGauge({
                renderTo: 'chartContainer',
                width: 300,
                height: 300,
                minValue: 0,
                maxValue: 100,
                majorTicks: [
                    "0",
                    "10",
                    "20",
                    "30",
                    "40",
                    "50",
                    "60",
                    "70",
                    "80",
                    "90",
                    "100"
                ],
                minorTicks: 2,
                strokeTicks: true,
                highlights: [
                    {
                        "from": 80,
                        "to": 100,
                        "color": "rgba(200, 50, 50, .75)"
                    }
                ],
                colorPlate: "#fff",
                borderShadowWidth: 0,
                borders: false,
                needleType: "arrow",
                needleWidth: 2,
                needleCircleSize: 7,
                needleCircleOuter: true,
                needleCircleInner: false,
                animationDuration: 1500,
                animationRule: "linear"
            });
            this.gauge1.draw();
        },
        initiateGauge2: function() {
            this.gauge2 = new RadialGauge({
                renderTo: 'chartContainer1',
                width: 300,
                height: 300,
                title: "Temperature",
                minValue: -100,
                maxValue: 100,
                majorTicks: [-100,-75,-50,-25,0,25,50,75,100],
                minorTicks: 2,
                strokeTicks: true,
                highlights: [
                    {
                        "from": -50,
                        "to": 0,
                        "color": "rgba(0,0, 255, .3)"
                    },
                    {
                        "from": 0,
                        "to": 50,
                        "color": "rgba(255, 0, 0, .3)"
                    }
                ],
                ticksAngle: 225,
                startAngle: 67.5,
                colorMajorTicks: "#ddd",
                colorMinorTicks: "#ddd",
                colorTitle: "#eee",
                colorUnits: "#ccc",
                colorNumbers: "#eee",
                colorPlate: "#222",
                borderShadowWidth: 0,
                borders: true,
                needleType: "arrow",
                needleWidth: 2,
                needleCircleSize: 7,
                needleCircleOuter: true,
                needleCircleInner: false,
                animationDuration: 1500,
                animationRule: "linear",
                colorBorderOuter: "#333",
                colorBorderOuterEnd: "#111",
                colorBorderMiddle: "#222",
                colorBorderMiddleEnd: "#111",
                colorBorderInner: "#111",
                colorBorderInnerEnd: "#333",
                colorNeedleShadowDown: "#333",
                colorNeedleCircleOuter: "#333",
                colorNeedleCircleOuterEnd: "#111",
                colorNeedleCircleInner: "#111",
                colorNeedleCircleInnerEnd: "#222",
                valueBoxBorderRadius: 0,
                colorValueBoxRect: "#222",
                colorValueBoxRectEnd: "#333"
            });
            this.gauge2.draw();
        },
        initiateGauge3: function() {
            this.gauge3 = new RadialGauge({
                renderTo: 'chartContainer2',
                width: 300,
                height: 300
            });
            this.gauge3.draw();
        },
        initiateGauge4: function() {
            this.gauge4 = new RadialGauge({
                renderTo: 'chartContainer3',
                width: 300,
                height: 300,
                startAngle: 0,
                ticksAngle: 180,
                valueBox: false,
                majorTicks: [0,10,20,30,40,50,60,70,80,90,100],
                minorTicks: 2,
                strokeTicks: true,
                highlights: [
                    {
                        "from": 70,
                        "to": 100,
                        "color": "rgba(200, 50, 50, .75)"
                    }
                ],
                colorPlate: "#fff",
                borderShadowWidth: 0,
                borders: false,
                needleType: "arrow",
                needleWidth: 2,
                needleCircleSize: 7,
                needleCircleOuter: true,
                needleCircleInner: false,
                animationDuration: 1500,
                animationRule: "linear",
                animationTarget: "plate"
            });
            this.gauge4.draw();
        },
        updateChart: function() {
            $.get("/data/json?Linear=R200&Cosine=R201&Random=R202&SineRandom=R203")
                .done( response => {
                    this.error = false;
                    this.valuesHeader = JSON.stringify(response).slice(1, -1);
                    this.gauge1.update({value: response.Linear});
                    this.gauge2.update({value: response.Cosine});
                    this.gauge3.update({value: response.Random});
                    this.gauge4.update({value: response.SineRandom});
                })
                .fail( err => {
                    console.log(err);
                    this.error = true;
                });
        }
    },
    template: `
        <div class="main-container">
            
            <div class="row text-center"> 
                <div class="col-xl-3 col-md-6">
                    <p class="text-center">
                        Linear: {{ gauge1.value }}
                    </p>
                    <canvas id="chartContainer"></canvas>   
                </div>

                <div class="col-xl-3 col-md-6 mt-4 mt-md-0">
                <p class="text-center">
                    Cosine: {{ gauge2.value }}
                </p>
                    <canvas id="chartContainer1"></canvas> 
                </div>

                <div class="col-xl-3 col-md-6 mt-md-4">
                <p class="text-center">
                    Random: {{ gauge3.value }}
                </p>
                    <canvas id="chartContainer2"></canvas> 
                </div>

                <div class="col-xl-3 col-md-6 mt-md-4">
                <p class="text-center">
                    SineRandom: {{ gauge4.value }}
                </p>
                    <canvas id="chartContainer3"></canvas> 
                </div>  
            </div>
        </div>
    `,
    mounted: function() {
        this.initiateGauges();
        setInterval(() => {
            this.updateChart();
        }, 2000);
    }
});