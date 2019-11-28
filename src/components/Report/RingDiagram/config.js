function statusPieLegend(statusInfoColumn = [], statusInfo = []) {
    return [
        {
            orient: 'vertical', // vertical
            icon: 'circle',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 10,
            left: '50%',
            top: '70%',
            bottom: '0%',
            align: 'left',
            data: setColumn(statusInfoColumn, 'right'),
            formatter(name) {
                let resultName = name;
                if (!resultName) return '';
                if (resultName.length > 15) {
                    resultName = `${resultName.slice(0, 15)}...`;
                    return resultName;
                } else {
                    return resultName;
                }
            },
            tooltip: {
                show: true,
                trigger: 'item',
                formatter(params) {
                    let resultName = params.name;
                    let total = 0,
                        target;

                    statusInfo.forEach(item => {
                        total += item.value;
                        if (item.name === params.name) {
                            target = item.value;
                        }
                    });
                    resultName = `name: ${resultName}<br/>count: ${target}<br/>percent: ${((target / total) * 100).toFixed(2)}%`;
                    return resultName;
                },
            },
            textStyle: {
                color: '#fff',
                fontSize: 13,
            },
        },
        {
            orient: 'vertical', // vertical
            icon: 'circle',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 10,
            left: '0%',
            top: '70%',
            bottom: '0%',
            align: 'left',
            data: setColumn(statusInfoColumn, 'left'),
            formatter(name) {
                let resultName = name;
                if (!resultName) return '';
                if (resultName.length > 15) {
                    resultName = `${resultName.slice(0, 15)}...`;
                    return resultName;
                } else {
                    return resultName;
                }
            },
            tooltip: {
                show: true,
                trigger: 'item',
                formatter(params) {
                    let resultName = params.name;
                    let total = 0,
                        target;

                    statusInfo.forEach(item => {
                        total += item.value;
                        if (item.name === params.name) {
                            target = item.value;
                        }
                    });
                    resultName = `name: ${resultName}<br/>count: ${target}<br/>percent: ${((target / total) * 100).toFixed(2)}%`;
                    return resultName;
                },
            },
            textStyle: {
                color: '#fff',
                fontSize: 13,
            },
        },
    ];
}

const position = {
    statusPie: ['50%', '35%'],
    staticPie: ['50%', '50%'],
};

const pieColor = ['#43a9cc', '#ed7f00', '#a6a8ab', '#b4552b', '#ff4f1f', '#f8e2d1', '#ffc500', '#007fa6', '#6BBE99'];
const staticPieColor = ['#EB5F5E', '#ffc500', '#6BBE99'];

function setColumn(data, type) {
    const arr = [];
    if (data) {
        data.forEach((item, index) => {
            if (type === 'left' && index % 2 === 0) {
                arr.push(item);
            } else if (type === 'right' && index % 2 === 1) {
                arr.push(item);
            }
        });
    }
    return arr;
}

function statusPieOption(statusInfo = {}, statusInfoColumn = []) {
    return {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: statusPieLegend(statusInfoColumn, statusInfo),
        series: [
            {
                name: 'data origin',
                type: 'pie',
                radius: ['50%', '70%'],
                center: position.statusPie,
                avoidLabelOverlap: false,
                legendHoverLink: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                    },
                    emphasis: {
                        formatter: '{d|{d}%}\n{c|{c}}',
                        rich: {
                            d: {
                                fontSize: 40,
                                fontFamily: 'Impact',
                                verticalAlign: 'top',
                                align: 'center',
                            },
                            c: {
                                fontSize: 20,
                                align: 'center',
                                padding: [5, 0, 0, 0],
                                lineHeight: 25,
                            },
                        },
                        show: true,
                    },
                },
                labelLine: {
                    normal: {
                        show: false,
                    },
                },
                data: statusInfo,
                tooltip: {
                    position(pos, params, dom, rect, size) {
                        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                        const obj = { top: 60 };
                        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                        return obj;
                    },
                    textStyle: {
                        fontSize: '14px',
                    },
                },
            },
        ],
        color: pieColor,
    };
}

function staticPieOption(statusInfo = {}) {
    return {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: [],
        series: [
            {
                name: 'data origin',
                type: 'pie',
                radius: ['50%', '70%'],
                center: position.staticPie,
                avoidLabelOverlap: false,
                legendHoverLink: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                    },
                    emphasis: {
                        formatter: '{d|{d}%}',
                        rich: {
                            d: {
                                fontSize: 20,
                                fontFamily: 'Impact',
                                verticalAlign: 'top',
                                align: 'center',
                            },
                        },
                        show: true,
                        position: 'center',
                    },
                },
                labelLine: {
                    normal: {
                        show: false,
                    },
                },
                data: statusInfo,
                tooltip: {
                    position(pos, params, dom, rect, size) {
                        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                        const obj = { top: 60 };
                        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                        return obj;
                    },
                    textStyle: {
                        fontSize: '14px',
                    },
                },
            },
        ],
        color: staticPieColor,
    };
}

export default {
    statusPieOption,
    staticPieOption,
};
