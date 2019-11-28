import React, { Component } from 'react';
import { Card } from 'antd';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import cardTitleIcon from '@/assets/reportmodule/icon_s2.png';

import './index.less';
import config from './config';

class Bar extends Component {
    constructor() {
        super();
        this.refBar = React.createRef();
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
        const {
            configuration,
            id,
            linesconfig,
            color,
            colorlinesArr,
            seriesLines,
            dataAxis,
            seriesData,
        } = this.props;

        const container = document.getElementById(id || 'bar');
        const resizeContainer = function () {
            container.style.width = '100%';
            container.style.height = '100%';
        };
        resizeContainer();

        // component => config
        const configdata = {
            linesconfig,
            color,
            colorlinesArr,
            seriesLines,
            dataAxis,
            seriesData,
        };

        // init
        const ref = this.refBar.current;
        const mycharts = echarts.init(ref);
        mycharts.clear();
        setTimeout(() => {
            mycharts.setOption(configuration || config(configdata));
        }, 200);

        window.addEventListener('resize', () => {
            resizeContainer();
            mycharts.resize();
        });
        return true;
    }

    render() {
        const {
            cardIcon, cardContent, color, id, ...result
        } = this.props;
        const cardTitle = (
            <React.Fragment>
                <img src={cardIcon || cardTitleIcon} className="card-icon-styles" style={{ width: '10%' }} />
                <span style={{
                    color: 'rgba(255,255,255,0.9)', fontFamily: 'Arial Black', letterSpacing: '10', wordSpacing: '10', fontSize: '15px',
                }}
                >
                    {cardContent || 'TOP 10 Customer Volume (TEU)'}
                </span>
            </React.Fragment>
        );

        return (
            <React.Fragment>
                <Card
                    title={cardTitle}
                    bordered={false}
                    style={{
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        background: 'rgba(0,0,0,0.7)',
                    }}
                    className="card-styles"
                    headStyle={{
                        color: color || '#fff',
                        fontWeight: '600',
                        minHeight: '1%',
                        height: '30%',
                        lineHeight: '30%',
                        padding: '2% 4%',
                        borderBottom: 'none',
                        marginTop: '-2%',
                    }}
                    bodyStyle={{
                        padding: '0 6%',
                        height: '70%',
                        width: '100%',
                    }}
                >
                    <div
                        id={id || 'bar'}
                        style={{
                            width: '100%',
                            height: '100%',
                            ...result,
                        }}
                        ref={this.refBar}
                    />
                </Card>
            </React.Fragment>
        );
    }
}

export default Bar;
