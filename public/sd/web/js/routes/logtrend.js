const LogTrend = Vue.component('LogTrend', {
    data: function() {
        return {
            selectedCSV: null,
            fileOptions: null,
            downloading: false,
            error: false,
            loadingBarProgress: 0,
            colors: [
                "DarkRed", "Salmon", "Gold", "GoldenRod", "Black", "Green", "Blue", "RebeccaPurple", "LightPink",
                "SandyBrown", "PaleGoldenRod", "Grey", "YellowGreen", "CornflowerBlue", "MediumPurple"
            ],
            tags: [],
            trdData: {
                series: []
            },
            chart: null,
            resetFunction: null
        }
    },
    methods: {
        parseCSV: function() {
            this.downloading = true;
            let dataChart = $("#datachart");
            while ( dataChart.rows.length > 1 ) {
                dataChart.deleteRow(-1);
            }
            if ( this.selectedCSV.includes(".csv") ) {
                $.get('/sd/logs/' + this.selectedCSV)
                    .progress( function(event) {
                         if ( event.lengthComputable )  {
                            this.loadingBarProgress = (event.loaded / event.total) * 100;  
                         }
                    }) 
                    .done( function() {
                        this.downloading = true;
                        const payload = this.responseText.split("\n");
                        const tagNames = payload[0].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
                        addTagData(tagNames);
                        addTableRowData(payload);
                        this.chart.update(this.trdData);
                        this.loadingBarProgress = 0;
                        this.downloading = false;
                    })
                    .fail( function(err) {
                        console.log(err)
                        this.error = true;
                    });
            }
        },
        addTagData: function(tagNames) {
            for ( let i=1; i < tagNames.length && i < 15; i++ ) {
                this.tags.push({
                    tag: tagNames[i].replaceAll('"',''), 
                    avg: 0, 
                    min: null, 
                    max: null,
                    total: 0,
                    count: 0,
                    pos: i
                });
                this.trdData.series.push({
                    name: tagNames[i].replaceAll('"',''),
                    data: []
                });
            }
        },
        addTableRowData: function(payload) {
            for ( let i=1; i < payload.length - 1; i++ ) {
                for (let x=0; x < this.tags.length; x++) {
                    let tableRowData = payload[i].split(",");
                    this.trdData.series[x].data.push({
                        x: Date.parse(tableRowData[0]), 
                        y: tableRowData[x + 1]
                    });
                    this.tags[x].count = this.tags[x].count + 1;
                    this.tags[x].total = this.tags[x].total + Number(tableRowData[x + 1]);
                    if ( Number(tableRowData[x + 1]) < this.tags[x].min || this.tags[x].count == 1 ) {
                        this.tags[x].min = Number(tableRowData[tag.pos])
                    }
                    if ( Number(tableRowData[x + 1]) > this.tags[x].max  || this.tags[x].count == 1) {
                        this.tags[x].max =  Number(tableRowData[tag.pos]);
                    }
                }
            }
        },
        updateInterpolation: function(tagName) {
            const interpolationRadios = $("#interp-" + tagName);
            let chartOptions = {
                axisX: {
                    type: Chartist.FixedScaleAxis,
                    divisor: 6,
                    labelInterpolationFnc: function(value) {
                        return moment(value).format('MMM D yyyy hh:mm:ss');
                    }
                },
                series: {
                    [tagName]: { lineSmooth: Chartist.Interpolation.none({fillHoles: false}) }
                }
            };	
            if ( interpolationRadios[1].checked == true ) {
                chartOptions.series[tagName].lineSmooth = Chartist.Interpolation.simple({fillHoles: false}); 	
            }
            if ( interpolationRadios[2].checked == true ) {
                chartOptions.series[tagName].lineSmooth = Chartist.Interpolation.step({fillHoles: false})	          
            }
            this.chart.update(this.trdData, option, true);
        },
        onZoom: function(chart, reset) {
            this.resetFunction = reset;
        },
        resetZoom: function() {
            this.resetFunction();
        },
        setCSVandFileOptions: function(options) {
            this.fileOptions = options;
            this.selectedCSV = options[0];
        }
    },
    computed: {
        loadingBarStyle: function() {
            width: this.loadingBarProgress + "%"
        }
    },
    mounted: function() {
        
        $.get("/data/json?SDFileNames=SDFileNames0,25")
            .done(function(response) {
                this.setCSVandFileOptions(response.SDFileNames);
            }.bind(this))
            .fail(function(err) {
                console.log(err);
                this.error = true;
            }.bind(this));

            
        const responsiveOptions = [
            [
                'screen and (min-width:701px) and (max-width: 1900px)',
                { 
                    axisX: {
                        labelInterpolationFnc: function(value) {
                            // Will return Mon, Tue, Wed etc. on medium screens
                            return moment(value).format('MMM D yyyy hh:mm:ss');
                        }
                    }
                }
            ],
            [
                'screen and (max-width: 700px)', 
                {  
                    showPoint: false,
                    axisX: {
                        labelInterpolationFnc: function(value) {
                            // Will return M, T, W etc. on small screens
                            return moment(value).format('mm:ss');
                        }
                    }
                }
            ]
        ];
     
        this.chart = new Chartist.Line('.ct-chart', this.trdData, {
            axisX: {
                type: Chartist.FixedScaleAxis,
                divisor: 6,
                labelInterpolationFnc: function(value) {
                    return moment(value).format('MMM D yyyy hh:mm:ss');
                }
            },
            axisY: {
                type: Chartist.AutoScaleAxis
            },
            plugins: [
                Chartist.plugins.zoom({ onZoom: this.onZoom })
            ],
            fullWidth: true,
            chartPadding: {
                right: 20
            }
        }, responsiveOptions);

    },
    template: `
        <div class="main-container">
            {{ selectedCSV }}
            <div class="row" id="id01"> 
                <div class="col-4">
                    <label for="log-file-options">Select Log File:</label>
                        <select id="log-file-options" name="log-file-options" v-model="selectedCSV">
                            <template v-for="fileName in fileOptions">                
                                <option :value="fileName">
                                    {{ fileName }}
                                </option>
                            </template>
                        </select>
                        <button type="button" @click="parseCSV()" class="btn btn-success btn-sm">Load</button>
                </div>
                <div class="col-4" id="loading-bar-outer">
                    {{ downloading ? "Downloading" : "" }}
                    {{ error ? "Error" : "" }}
                    <div id="loading-bar" :style="loadingBarStyle"></div>
                </div>	
                <div class="col-4">
                    <button type="button" id="resetZoom" @click="resetZoom" class="btn btn-success btn-sm">Reset Zoom</button>
                </div>
            </div>

            <div class="row" id="id02"></div>

            <div class="row"> 
                <div class="ct-chart ct-major-tenth"></div>
            </div>

            <div class="row"> 
                <table id="datachart">
                    <tr>
                        <th width="21px"></th>
                        <th width="250px">Element</th>
                        <th width="120px">Last Value</th>
                        <th>Avg</th>
                        <th>Min</th>
                        <th>Max</th>
                        <th width="250px">Interpolation</th>
                    </tr>
                    <template v-for="(tag, index) of this.trdData.series">
                        <tr>
                            <td></td>
                            <td class="font-weight-bold" 
                                :style="'color: ' + colors[i]">
                                {{ tag.name }}
                            </td>
                            <td>{{ tag.data[tag.data.length - 1].y }} </td>
                            <td>{{ tags[i].avg }}</td>
                            <td>{{ tags[i].min }}</td>
                            <td>{{ tags[i].max }}</td>
                            <td>
                                <form :id="'interp-' + tag.name" 
                                    @change="'updateInterpolation(' + tag.name + ')'">
                                    <input type="radio" name="ans"> None 
                                    <input type="radio" name="ans" checked> Simple 
                                    <input type="radio" name="ans"> Step 
                                </form>
                            </td>
                        </tr>
                    </template>
                </table>
            </div>
        </div>
    `
});