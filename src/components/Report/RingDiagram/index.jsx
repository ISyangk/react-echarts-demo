/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入环形图
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
// import { similarApi } from '@/config/api';
import { withRouter } from 'dva/router';
import { connect } from 'dva';

@withRouter
@connect(({ appMenu }) => {
    return { currentMenu: appMenu.currentMenu };
})
export default class RingDiagram extends Component {
    constructor() {
        super();
        this.pieRef = React.createRef();
    }

    componentDidUpdate() {
        const myEvent = new Event('resize'); // resize是指resize事件  让图表自适应浏览器大小
        const result = this.initEcharts();
        if (result) {
            setTimeout(() => {
                window.dispatchEvent(myEvent);
            }, 100);
        }
    }

    initEcharts() {
        const { position, option, type } = this.props;
        const container = document.getElementById('pie');
        const resizeContainer = function () { // 1.自适应布局。
            container.style.width = position.width;
            container.style.height = position.height;
        };
        resizeContainer(); // 2.自适应布局。

        const ref = this.pieRef.current;
        let myEchart = echarts.init(ref);
        myEchart.dispose();
        myEchart = echarts.init(ref);
        let index = 0;
        // container.addEventListener('mouseover', () => {
        //     if (option.legend.length !== 0) {
        //         myEchart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: index });
        //     }
        // });
        if (option) {
            setTimeout(() => {
                myEchart.setOption(option, true);
                // 设置默认选中高亮部分
                myEchart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: 0 });
                // 重写触发事件
                // const triggerAction = function (action, selected) {
                //     const legend = [];
                //     for (const name in selected) {
                //         if (Reflect.has(selected, name)) {
                //             legend.push({ name });
                //         }
                //     }
                //     // 重写 echarts 的legendSelect事件
                //     myEchart.dispatchAction({
                //         type: action,
                //         batch: legend,
                //     });
                // };

                // // 监测没有选中的情况，将状态更改回来
                // const isOneUnSelect = function (selected) {
                //     let unSelectedCount = 0;
                //     for (const name in selected) {
                //         if (Reflect.has(selected, name)) {
                //             if (selected[name] === false) {
                //                 ++unSelectedCount;
                //             }
                //         }
                //     }
                //     return unSelectedCount === 1;
                // };

                // // 监测选中后的事件
                // myEchart.on('legendselectchanged', (obj) => {
                //     const { selected } = obj;
                //     if (selected !== undefined) {
                //         if (isOneUnSelect(selected)) {
                //             triggerAction('legendSelect', selected);
                //         }
                //     }
                //     // window.open('https://www.google.com');
                // });

                // 监听 mouseover 事件
                myEchart.on('mouseover', (e) => {
                    if (e.dataIndex !== index) {
                        myEchart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: index });
                    }
                });

                myEchart.on('mouseout', (e) => {
                    index = e.dataIndex;
                    // if (option.legend.length === 0) {
                    //     myEchart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: e.dataIndex });
                    // }
                    myEchart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: e.dataIndex });
                });

                // eslint-disable-next-line no-unused-vars
                myEchart.on('click', (param) => {
                    const { name, code } = param.data;
                    console.log('type', type);
                    if (type === 'statusPie') {
                        // const shipmentType = 'Sea',
                        const {
                            // dispatch,
                            history,
                        } = this.props;
                        // dispatch({ type: 'appMenu/save', payload: { currentMenu: true } });
                        // history.push('/app/shipment/list/');
                        // window.open(`${window.location.origin}${similarApi.shipment}/shipment/list/?code=${code}&shipmentType=${shipmentType}`);
                    } else if (type === 'staticPie') {
                        // window.open(`${window.location.origin}${similarApi.ct}/exception/?type=${name}`);
                    }
                });
            }, 150);
        }

        window.addEventListener('resize', () => {
            resizeContainer();
            myEchart.resize();
        });
        return true;
    }

    render() {
        return (
            <div
                ref={this.pieRef}
                id="pie"
                style={{ background: 'none' }}
            />
        );
    }
}
