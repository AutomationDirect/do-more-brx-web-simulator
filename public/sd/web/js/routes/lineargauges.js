const LinearGauges =  {
    data: () => {
        return {
            gauge1: null,
            gauge2: null,
            gauge3: null,
            gauge4: null,
            values: {
                Linear: "000.00",
                Cosine: "000.00",
                Random: "000.00",
                SineRandom: "000.00",
            },
            error: false
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
            this.gauge1 = new LinearGauge({
                renderTo: 'chartContainer',
                width: 160,
                height: 600,
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
                minorTicks: 10,
                strokeTicks: true,
                highlights: [
                    {
                        "from": 90,
                        "to": 100,
                        "color": "rgba(200, 50, 50, .75)"
                    }
                ],
                colorPlate: "#fff",
                borderShadowWidth: 0,
                borders: false,
                needleType: "arrow",
                needleWidth: 2,
                animationDuration: 1500,
                animationRule: "linear",
                tickSide: "left",
                numberSide: "left",
                needleSide: "left",
                barStrokeWidth: 7,
                barBeginCircle: false,
                colorValueBoxShadow: false
            });  
            this.gauge1.draw();
        },
        initiateGauge2: function() {
            this.gauge2 = new LinearGauge({
                renderTo: 'chartContainer1',
                width: 160,
                height: 600,
                borderRadius: 20,
                borders: 0,
                barStrokeWidth: 20,
                minorTicks: 10,
                minValue: -100,
                maxValue: 100,
                majorTicks: [-100,-75,-50,-25,0,25,50,75,100],
                minorTicks: 5,
                strokeTicks: true,
                ticksWidth: 15,
                ticksWidthMinor: 7.5,
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
                colorMajorTicks: "#ffe66a",
                colorMinorTicks: "#ffe66a",
                colorTitle: "#eee",
                colorUnits: "#ccc",
                colorNumbers: "#eee",
                colorPlate: "#2465c0",
                colorPlateEnd: "#327ac0",
                borderShadowWidth: 0,
                borders: false,
                borderRadius: 10,
                needleType: "arrow",
                needleWidth: 3,
                animationDuration: 1500,
                animationRule: "linear",
                colorNeedle: "#222",
                colorNeedleEnd: "",
                colorBarProgress: "#327ac0",
                colorBar: "#f5f5f5",
                barStroke: 0,
                barWidth: 8,
                barBeginCircle: false,
                colorValueBoxShadow: false
            });
            this.gauge2.draw();
        },
        initiateGauge3: function() {
            this.gauge3 = new LinearGauge({
                renderTo: 'chartContainer2',
                width: 160,
                height: 600
            });
            this.gauge3.draw();
        },
        initiateGauge4: function() {
            this.gauge4 = new LinearGauge({
                renderTo: 'chartContainer3',
                width: 160,
                height: 600,
                borderRadius: 20,
                borders: 0,
                barStrokeWidth: 20,
                minorTicks: 10,
                majorTicks: [0,10,20,30,40,50,60,70,80,90,100],
                value: 0.0,
                units: "",
                colorValueBoxShadow: false
            });
            this.gauge4.draw();
        },
        updateChart: function() {
            $.get("/data/json?Linear=R200&Cosine=R201&Random=R202&SineRandom=R203")
                .done( response => {
                    this.error = false;
                    console.log(response)
                    this.values = response;
                    this.gauge1.update({value: this.values.Linear});
                    this.gauge2.update({value: this.values.Cosine});
                    this.gauge3.update({value: this.values.Random});
                    this.gauge4.update({value: this.values.SineRandom});
                })
                .fail( err => {
                    console.log(err);
                    this.error = true;
                })
        }
    },
    template: `
    <div class="main-container">
        <div class="row" id="id01"></div>

        <div class="row text-center"> 
            <div class="col-6 col-sm-3">
                <p>Linear: {{ values.Linear }}</p>
                <canvas id="chartContainer"></canvas>   
            </div>
            <div class="col-6 col-sm-3">
                <p>Cosine: {{ values.Cosine }}</p>
                <canvas id="chartContainer1"></canvas> 
            </div>
            <div class="col-6 col-sm-3">
                <p>Random: {{ values.Random }}</p>
                <canvas id="chartContainer2"></canvas> 
            </div>
            <div class="col-6 col-sm-3">
                <p>SineRandom: {{ values.SineRandom }}</p>
                <canvas id="chartContainer3"></canvas> 
            </div>  
        </div>
    </div>
    `,
    mounted: function() {
        this.initiateGauges();
        setInterval( () => {
            this.updateChart()
        }, 2000);
    }
};