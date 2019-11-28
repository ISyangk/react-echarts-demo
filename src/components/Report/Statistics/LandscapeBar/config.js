import echarts from 'echarts';
// 初始化数据
export default function configData(value = {}) {
    const {
        category,
        barData,
    } = value;

    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },

        grid: {
            top: '1%',
            left: '2.5%',
            right: '13%',
            bottom: '0%',
            containLabel: true,
        },

        xAxis: {
            type: 'value',
            show: false,
        },

        yAxis: [
            {
                type: 'category',
                inverse: false,
                data: category,
                splitLine: { show: false },
                axisLabel: {
                    interval: 0,
                    // eslint-disable-next-line no-shadow
                    formatter: (value) => {
                        let newParamsName = '';
                        const paramsNameNumber = value.length;
                        const provideNumber = 8;
                        const rowNumber = Math.ceil(paramsNameNumber / provideNumber);

                        if (paramsNameNumber > provideNumber) {
                            for (let p = 0; p < rowNumber; p++) {
                                let tempStr = '';
                                const start = p * provideNumber;
                                const end = start + provideNumber;

                                if (p === rowNumber - 1) {
                                    tempStr = value.substring(start, paramsNameNumber);
                                } else {
                                    tempStr = `${value.substring(start, end)}\n`;
                                }
                                newParamsName += tempStr;
                            }
                        } else {
                            newParamsName = value;
                        }
                        return newParamsName;
                    },
                    triggerEvent: true,
                },

                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#fff',
                    },
                    onZero: false,
                },
                axisTick: { show: false, alignWithLabel: true },
                offset: 8,
                nameTextStyle: { fontSize: 15 },
            },
        ],

        series: [
            {
                name: 'number',
                type: 'bar',
                data: barData,
                barWidth: 14,
                barGap: 10,
                smooth: true,
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        offset: [0, 0],
                        textStyle: {
                            color: 'rgb(253,253,253)',
                            fontSize: 12,
                        },
                    },
                },
                itemStyle: {
                    emphasis: {
                        barBorderRadius: [0, 7, 7, 0],
                    },
                    normal: {
                        barBorderRadius: [0, 7, 7, 0],
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 1, 0,
                            [
                                { offset: 0, color: '#3977E6' },
                                { offset: 1, color: '#37BBF8' },
                            ],
                        ),
                    },
                },
            },
        ],
    };
}
