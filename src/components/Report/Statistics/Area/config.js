import echarts from 'echarts';

const xAxisdeData = ['8AM', '9AM', '10AM', '11AM', '12AM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM'];
export default function configData(params = {}) {
    const {
        texts = xAxisdeData,
        bottoms,
        tops,
    } = params;

    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985',
                },
            },
        },

        grid: {
            left: '3%',
            right: '6%',
            bottom: '8%',
            top: '10%',
            containLabel: true,
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: '#fff',
                        fontSize: '10',
                    },
                },
                axisTick: { show: false, alignWithLabel: true },
                axisLabel: {
                    interval: 0,
                    rotate: 45,
                    textStyle: {
                        color: '#fff',
                        fontSize: '10',
                    },
                },
                data: texts,
            },
        ],
        yAxis: {
            type: 'value',
            splitLine: {
                show: false,
            },
            axisTick: { show: false, alignWithLabel: true },
            axisLabel: {
                interval: 0,
                rotate: 45,
                textStyle: {
                    color: '#fff',
                    fontSize: '10',
                },
            },
            axisLine: {
                lineStyle: {
                    color: '#fff',
                    fontSize: '10',
                },
            },
        },
        series: [
            {
                name: 'red',
                type: 'line',
                symbol: 'none',
                smooth: true,
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(
                        1, 1.5, 1.2, 0.5,
                        [
                            { offset: 0, color: 'black' },
                            { offset: 0.2, color: 'black' },
                            { offset: 1, color: '#FD666D' },
                        ],
                        false,
                    ),
                    origin: 'start',
                    opacity: 0.5,
                },
                color: '#FD666D',
                data: tops,
            },
            {
                name: 'yellow',
                type: 'line',
                symbol: 'none',
                smooth: true,
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(
                        1, 1.5, 1.2, 0.5,
                        [
                            { offset: 0, color: 'black' },
                            { offset: 0.2, color: 'black' },
                            { offset: 1, color: '#ffc500' },
                        ],
                        false,
                    ),
                    origin: 'start',
                    shadowColor: '#F3F3F3',
                    shadowOffsetX: 1,
                },
                color: '#ffc500',
                data: bottoms,
            },
        ],
    };
}
