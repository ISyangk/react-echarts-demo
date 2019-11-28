import echarts from 'echarts/lib/echarts';

const colorDefault = [
    { offset: 0, color: '#83bff6' },
    { offset: 0.5, color: '#188df0' },
    { offset: 1, color: '#188df0' },
];
const colorLines = [
    { offset: 0, color: 'red' },
    { offset: 1, color: 'yellow' },
];

export default function config(params = {}) {
    const {
        linesconfig = true,
        color = colorDefault,
        dataAxis,
        seriesData,
        seriesLines,
        colorlinesArr = colorLines,
    } = params;

    return {
        xAxis: [
            {
                type: 'category',
                data: dataAxis,
                inverse: false,
                splitLine: { show: false },
                axisLabel: {
                    interval: 0,
                    rotate: 45,
                    textStyle: {
                        color: '#fff',
                        fontSize: '10',
                    },
                    formatter: value => {
                        return value.length >= 6 ? (`${value.substring(0, 6)}..`) : value;
                    },
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#fff',
                    },
                    onZero: false,
                    showMaxLabel: true,
                },
                axisTick: { show: false, alignWithLabel: true },
                offset: 8,
            },
        ],

        yAxis: [
            {
                type: 'value',
                name: 'number',
                inverse: false,
                splitLine: {
                    show: false,
                },
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    // formatter: '{value}',
                    textStyle: {
                        color: '#fff',
                    },
                    interval: 0,
                    formatter: value => {
                        return value.length >= 4 ? (`${value.substring(0, 4)}..`) : value;
                        // console.log(value);
                    },
                },
            },
            {
                type: 'value',
                name: 'percentage',
                splitLine: { show: false },
                axisLine: { show: false },
                axisTick: { show: false },
                offset: 0,
                axisLabel: {
                    formatter: '{value} %',
                    textStyle: {
                        color: '#fff',
                    },
                    interval: 0,
                },
            },
        ],

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },

        dataZoom: [
            {
                type: 'inside',
            },
        ],

        series: [
            {
                name: 'number',
                type: 'bar',
                data: seriesData,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            color,
                        ),
                        // 圆角
                        // barBorderRadius: [20, 20, 0, 0],
                    },
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#2378f7' },
                            { offset: 0.7, color: '#2378f7' },
                            { offset: 1, color: '#83bff6' },
                        ],
                    ),
                    // 圆角
                    // barBorderRadius: [20, 20, 0, 0],
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        offset: [0, 0],
                        textStyle: {
                            color: 'rgb(253,253,253)',
                            fontSize: 12,
                        },
                    },
                },
                barWidth: linesconfig ? '40%' : '36%',
            },
            generateLines(params.linesconfig, seriesLines, colorlinesArr),
        ],
        grid: {
            x: '9.5%',
            y: '6%',
            x2: linesconfig ? '9.5%' : '3%',
            y2: '25%',
            containLabel: false,
        },
    };
}

function generateLines(line = true, seriesLines, colorlinesArr) {
    if (line) {
        return {
            name: 'percent',
            type: 'line',
            yAxisIndex: 1,
            data: seriesLines,
            animation: true,
            smooth: true,
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 1, 0,
                        colorlinesArr,
                    ),
                },
            },
        };
    } else {
        return ' ';
    }
}
