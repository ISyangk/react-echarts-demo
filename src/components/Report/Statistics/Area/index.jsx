import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/title';
import transform from '@/utils/transform';

import genConfig from './config';

export default class EchartsArea extends Component {
    constructor() {
        super();
        this.refArea = React.createRef();
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
        const { configuration, id } = this.props;
        const container = document.getElementById(id || 'Area');

        // get data and apter
        let configData;
        const { data } = this.props;
        if (transform.interfaceAear(data)) {
            configData = {
                bottoms: (transform.interfaceAear(data)).Attention,
                tops: (transform.interfaceAear(data)).Delay,
            };
        }

        // set size
        const resizeContainer = function () {
            container.style.width = '100%';
            container.style.height = '100%';
        };
        resizeContainer();

        // init
        const ref = this.refArea.current;
        const mycharts = echarts.init(ref);
        mycharts.clear();
        setTimeout(() => {
            mycharts.setOption(configuration || genConfig(configData));
        }, 200);
        window.addEventListener('resize', () => {
            resizeContainer();
            mycharts.resize();
        });
        return true;
    }

    render() {
        return (
            <React.Fragment>
                <div
                    id="Area"
                    style={{ width: '100%', height: '100%' }}
                    ref={this.refArea}
                />
            </React.Fragment>
        );
    }
}
