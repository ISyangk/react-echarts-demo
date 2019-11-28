import React, { Component } from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import fullScreen from '@/utils/fullScreen';
import RingDiagram from '@/components/Report/RingDiagram';
import MapComp from '@/components/MapComp/index.jsx';
import BarChartCom from '@/components/Report/Statistics/Bar';
import ShipNumCom from '@/components/Report/ShipNum';
import LandscapeBarCom from '@/components/Report/Statistics/LandscapeBar';
// import logSym from 'log-symbols';

import config from '@/components/Report/RingDiagram/config';
import S1 from '@/assets/report/icon_s1.png';
import cardicon3 from '@/assets/reportmodule/icon_s3.png';
import cardicon4 from '@/assets/reportmodule/icon_s4.png';
import './index.less';

@withRouter
@connect(({ reportDetail }) => ({
    statusInfo: reportDetail.statusInfo,
    statusInfoColumn: reportDetail.statusInfoColumn,
    activeShipInfo: reportDetail.activeShipInfo,
}))
export default class DetailsPage extends Component {
    constructor() {
        super();
        this.state = {
            isFullScreen: false,
            statusInfo: [],
            statusInfoColumn: [],
            activeShipment: {},

            // Top 10相关数据状态变量
            topTenCustomerInfo: {},
            topTenDestinationInfo: {},
            topTenOriginsInfo: {},

            // getVolumeByTradeLane
            volumeByTradeLane: [],
        };
        this.screenRef = React.createRef();
    }

    componentDidMount() {
        // this.judgeIsFullScreen();
        this.getAllData();
    }

    // request all data
    getAllData() {
        this.getStatusData();
        this.getActiveShipInfo();

        // TOP Ten
        this.getTopTenInfo('topTenCustomerInfo', 'getTopTenCustomerInfo');
        this.getTopTenInfo('topTenDestinationInfo', 'getTopTenDestinationInfo');
        this.getTopTenInfo('topTenOriginsInfo', 'getTopTenOriginsInfo');

        // getVolumeByTradeLane
        this.getVolumeByTradeLane();
    }

    // dispatch package
    // type: redux action type
    // payload: redux action params
    dispatchPackage(type, payload, inter, ...rest) {
        const { dispatch } = this.props;
        return dispatch({
            type, payload, inter, ...rest,
        });
    }

    /**
     * TOP 10相关请求信息
     * getTopTenCustomerInfo 获取Top 10 Customer表数据
     * getTopTenDestinationInfo 获取Top 10 Destination表数据
     * getTopTenOriginsInfo 获取Top 10 Origins表数据
     */

    // 获取Top 10 表数据
    // stateName: state 状态名
    // inter: Api相对应接口地址
    getTopTenInfo(stateName, inter) {
        this.dispatchPackage('reportDetail/getTopTenInfo', {}, inter)
            .then(res => this.setState({ [stateName]: res }));
    }

    // tradeLane
    // getVolumeByTradeLane
    getVolumeByTradeLane() {
        this.dispatchPackage('reportDetail/getVolumeByTradeLane', {})
            .then(res => this.setState({ volumeByTradeLane: res }));
    }

    // 获取到shipment 状态相关数据
    getStatusData() {
        const { dispatch } = this.props;
        dispatch({
            type: 'reportDetail/getShipmentStatusInfo',
            payload: {},
        }).then(res => {
            this.setState({
                statusInfo: res.statusInfo,
                statusInfoColumn: res.statusInfoColumn,
            });
        });
    }

    // 获取到active shipment数据
    getActiveShipInfo() {
        const { dispatch } = this.props;
        dispatch({
            type: 'reportDetail/getActiveShipmentInfo',
            payload: {
                customer_code: '',
            },
        }).then(res => {
            this.setState({
                activeShipment: res,
            });
        });
    }

    judgeIsFullScreen() {
        const de = this.screenRef.current;
        const isFullScreen = fullScreen.isFullscreenForNoScroll(de);
        this.setState({ isFullScreen });
    }

    fullScreen = () => {
        const { isFullScreen } = this.state;
        const de = this.screenRef.current;
        const isFull = fullScreen.handleFullScreen(de, isFullScreen);
        this.setState({ isFullScreen: isFull });
    };

    setColumn(data, type) {
        const arr = [];
        data.forEach((item, index) => {
            if (type === 'left' && index % 2 === 0) {
                arr.push(item);
            } else if (type === 'right' && index % 2 === 1) {
                arr.push(item);
            }
        });
        return arr;
    }

    render() {
        const {
            statusInfo, statusInfoColumn, activeShipment,
            // top ten
            topTenCustomerInfo, topTenDestinationInfo, topTenOriginsInfo,
            // tradeLane
            volumeByTradeLane,
        } = this.state;

        const statusPiePosition = { width: '80%', height: '100%' };
        const statusOptions = config.statusPieOption(statusInfo, statusInfoColumn);
        return (
            <div
                className="detailBody"
                ref={this.screenRef}
                onDoubleClick={this.fullScreen.bind()}
            >
                <div className="map-box">
                    <MapComp />
                </div>

                <div className="detailContent">
                    <div className="detailTop">
                        <div className="topLeft">
                            <div className=" top_left_title">
                                <img src={S1} />
                                <span>Shipment Status (TEU)</span>
                            </div>
                            <div className="top_left_content" id="leftContent">
                                <RingDiagram
                                    position={statusPiePosition}
                                    option={statusOptions}
                                    type="statusPie"
                                />
                            </div>
                        </div>

                        <div className="topRight">
                            <div className="top-right-Num">
                                <ShipNumCom data={activeShipment} />
                            </div>
                            <div className="top-right-landsapebar">
                                <LandscapeBarCom
                                    category={volumeByTradeLane.xaias}
                                    barData={volumeByTradeLane.source}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="detailBottom">
                        <div className="bottomLeft">
                            <BarChartCom
                                id="bar1"
                                linesconfig={false}
                                dataAxis={topTenCustomerInfo.xaias}
                                seriesData={topTenCustomerInfo.source}
                            />
                        </div>
                        <div className="bottomCenter">
                            <BarChartCom
                                id="bar2"
                                cardContent="TOP 10 Origins (TEU)"
                                cardIcon={cardicon3}
                                dataAxis={topTenOriginsInfo.xaias}
                                seriesData={topTenOriginsInfo.source}
                                color={
                                    [
                                        { offset: 0, color: '#ffc500' },
                                        { offset: 0.5, color: 'rgba(225,145,19)' },
                                        { offset: 1, color: 'rgba(197,97,39)' },
                                    ]
                                }
                                seriesLines={topTenOriginsInfo.lines}
                                colorlinesArr={
                                    [
                                        { offset: 0, color: 'rgb(61,170,200)' },
                                        { offset: 1, color: 'rgb(61,170,200)' },
                                    ]
                                }
                            />
                        </div>
                        <div className="bottomRight">
                            <BarChartCom
                                id="bar3"
                                cardContent="TOP 10 Destination (TEU)"
                                cardIcon={cardicon4}
                                dataAxis={topTenDestinationInfo.xaias}
                                seriesData={topTenDestinationInfo.source}
                                seriesLines={topTenDestinationInfo.lines}
                                color={
                                    [
                                        { offset: 0, color: '#ffc500' },
                                        { offset: 0.5, color: 'rgba(225,145,19)' },
                                        { offset: 1, color: 'rgba(197,97,39)' },
                                    ]
                                }
                                colorlinesArr={
                                    [
                                        { offset: 0, color: 'rgb(61,170,200)' },
                                        { offset: 1, color: 'rgb(61,170,200)' },
                                    ]
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
