<!--
<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col">
                    <h1 class="display-4">Berlin</h1>
                    <img src="/images/berlin-alex.jpg" class="w-100 headerimage" alt="Los Angeles" />
                </div>
            </div>
        </div>
        <div class="container-fluid m-4">
            <div class="row">
                <div class="col">
                    <CovidAgeBarchart/>
                </div>
                <div class="col">
                    <CovidCasesLinechart/>
                </div>
                <div class="col">
                    <v-data-table :headers=this.headers :items=this.data_table_data :items-per-page="15" class="elevation-1"></v-data-table>
                </div>
                <div class="col">
                    <apexchart width="800" type="bar" :options="options" :series="series"></apexchart>
                    <div class="image-div">
                        <a href="/berlin/maps/covid">
                            <img class="image" src="/images/map.png" width="750px" alt="Map" />
                            <p>show map</p>
                        </a>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="image-div">
                    <a href="/berlin/maps/accidents">
                        <img class="image" src="/images/map_accident.PNG" height="80%" alt="Map" />
                        <p>show map</p>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import GeneralClasses from "../assets/GeneralClasses";
    import "leaflet/dist/leaflet.css";
    import CovidAgeBarchart from "../../components/charts/CovidAgeBarchart";
    import CovidCasesLinechart from "../../components/charts/CovidCasesLinechart";

    export default {
        name: "ChartsView",
        components: {CovidCasesLinechart, CovidAgeBarchart},
        props: {},

        data () {
            return {
                data_table_data: [],
                headers: [
                    {
                        align: 'start',
                        sortable: false,
                        value: 'data',
                    },
                    { text: 'ID', value: 'id' },
                    { text: 'Altersgruppe', value: 'altersgruppe' },
                    { text: 'Fallzahl', value: 'fallzahl' },
                    { text: 'Differenz', value: 'differenz' },
                    { text: 'Inzidenz', value: 'inzidenz' },
                ],
                options: {
                    chart: {
                        id: 'vuechart-example'
                    },
                    xaxis: {
                        categories: ['<9', '10-14', '15-19', '20-24', '25-29',
                            '30-39', '40-49', '50-59', '60-69', '70-79', '80+', ' unbekannt'],
                    }
                },
                series: [{
                    name: 'number of covid19 cases',
                    data: []
                }],
                Type: ''
            }
        },
        methods: {
            APIResult: function () {
                this.$http.get(GeneralClasses.GETAPIberlincovidage()).then((Result) => {
                    let data = Result.data[0][0]['data']
                    let chart_data = []
                    let value = 0
                    let temp = 0
                    for (let dat of data) {
                        if (dat['altersgruppe'] === ' Summe') {
                            delete data[dat]
                        } else {
                            value = parseInt(dat['fallzahl'])
                            if (dat['altersgruppe'] === ' 0-4') {
                                temp = value
                            }
                            if (dat['altersgruppe'] === ' 5-9') {
                                value = value + temp
                                temp = 0
                                chart_data.push(value)
                            }
                            if (dat['altersgruppe'] === ' 80-89') {
                                temp = value
                            }
                            if (dat['altersgruppe'] === ' 90+') {
                                value = value + temp
                                temp = 0
                                chart_data.push(value)
                            }
                            chart_data.push(value)
                        }
                    }
                    this.data_table_data = data
                    this.updateChart(chart_data)
                })
            },
            updateChart(chart_data) {
                this.series = [{
                    name: 'number of covid19 cases',
                    data: chart_data
                }]
            }
        },
        mounted() {
            this.APIResult();
            //this.updateChart()
        },
    };
</script>

&lt;!&ndash; Add "scoped" attribute to limit CSS to this component only &ndash;&gt;
<style scoped>
    .headerimage{
        max-height: 6rem;
        border-radius: 3rem;
        object-fit: cover;
    }
    .image-div {
        transition: 0.2s;
    }
    .image-div {
        opacity: 0.7;
    }
    .image-div:hover {
        opacity: 1;
        transform: scale(1.03);
    }
    .display-4 {
        font-weight: bold;
    }
    a {
        color: black;
        font-size: larger;
    }
</style>
-->
