<template>
    <div id="timeslider" >
        <v-slider
                v-model="selectedDate"
                :tick-labels="ticksLabels"
                :min="ticksLabels.length-19"
                :max="ticksLabels.length-1"
                v-on:change="emitNewDate(ticksLabels[selectedDate])"
                step="1"
                tick-size="1"
        ></v-slider>
    </div>
</template>

<script>

    export default {
        name: "Timeslider",

        props: ['value', 'selectedDate', 'ticksLabels', 'newDate'],

        methods: {
            emitNewDate: function (newDate) {
                //console.log(newDate)
                this.bus.$emit('new-date', newDate);
            }
        },
    };

</script>

<style scoped>

    #timeslider {
        width: 95%;
        height: 30%;
    }

</style>
