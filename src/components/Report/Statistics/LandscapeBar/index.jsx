import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import { Card } from 'antd';
import cardTitleIcon from '@/assets/reportmodule/icon_s5.png';

import config from './config';
import './index.less';

class LandscapeBar extends Component {
    constructor(props) {
        super(props);
        this.landscapeBar = React.createRef();
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
        const { configuration, category, barData } = this.props;
        // props config data
        const configData = { category, barData };
        const container = this.landscapeBar.current;
        // set size
        const resizeContainer = function () {
            container.style.width = '100%';
            container.style.height = '100%';
        };
        resizeContainer();

        // init
        const mycharts = echarts.init(container);
        mycharts.clear();
        setTimeout(() => {
            mycharts.setOption(configuration || config(configData));
        }, 200);

        // resize
        window.addEventListener('resize', () => {
            resizeContainer();
            mycharts.resize();
        });

        return true;
    }

    render() {
        const {
            cardIcon, cardContent, color, ...result
        } = this.props;
        const cardTitle = (
            <React.Fragment>
                <img src={cardIcon || cardTitleIcon} className="card-icon-styles" style={{ width: '15%' }} />
                <span style={{
                    color: 'rgba(255,255,255,0.9)', fontFamily: 'Arial Black', wordSpacing: '10', fontSize: '15px',
                }}
                >{cardContent || ' Volume Per Trade lane (TEU)'}
                </span>
            </React.Fragment>
        );

        return (
            <Card
                title={cardTitle}
                headStyle={{
                    color: color || '#fff',
                    fontWeight: '600',
                    height: '20%',
                    lineHeight: '20%',
                }}
                style={{
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(0,0,0,0.7)',
                }}
                bodyStyle={{
                    color: '#fff',
                    height: '70%',
                    width: '100%',
                }}
                bordered={false}
                className="card-styles"
            >
                <div
                    style={{ width: '100%', height: '100%', ...result }}
                    ref={this.landscapeBar}
                />
            </Card>
        );
    }
}

export default LandscapeBar;
