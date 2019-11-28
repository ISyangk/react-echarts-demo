/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'dva';

// components and rely
import AreaEchartsCom from '@/components/Report/Statistics/Area';
import RingDiagram from '@/components/Report/RingDiagram';
import ShipNum from '@/components/Report/ShipNum';
import WarningNodeBar from './WarningNodeBar';
import MapComp from '@/components/MapComp';
import SearchBar from './SearchBar';
import Preliminary from './Preliminary';

// staic and config
import ShipmentIcon from '@/assets/reportmodule/shipment.png';
import config from '@/components/Report/RingDiagram/config';
import IconS6 from '@/assets/reportmodule/icon_s6.png';
import './index.less';

// component
@connect(({ reportStatic, reportDetail }) => ({
    reportStatic,
    reportDetail,
}))
export default class Statistics extends Component {
    constructor() {
        super();
        this.state = {
            exceptionInfo: [],
            activeShipment: {},
        };
        this.screenRef = React.createRef();
    }

    componentDidMount() {
        this.getMonitoringMessage();
        // console.log()
    }

    componentDidUpdate(prevProps) {
        const { reportStatic: { searchValue } } = this.props;
        if (prevProps.reportStatic.searchValue !== searchValue) {
            this.getMonitoringMessage();
        }
    }

    getMonitoringMessage() {
        const { dispatch } = this.props;
        dispatch({
            type: 'reportStatic/getShipmentExceptionInfo',
            payload: {
                customer_code: '',
            },
        });
        dispatch({
            type: 'reportStatic/get_activeShipment',
            payload: {},
        });
        dispatch({
            type: 'reportStatic/get_daliyAlertInfo',
            payload: {},
        });
        dispatch({
            type: 'reportStatic/get_seaAlertInfo',
            payload: {
                customer_code: '',
            },
        });
    }

    // 获取到shipment 异常状态相关数据
    getStatusData() {
        const { dispatch } = this.props;
        dispatch({
            type: 'reportStatic/getShipmentExceptionInfo',
            payload: {},
        }).then(res => {
            this.setState({
                exceptionInfo: res.exceptionInfo,
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
                trans_type: '',
            },
        }).then(res => {
            this.setState({
                activeShipment: res,
            });
        });
    }

    render() {
        const { reportStatic: { exceptionInfo, activeShipment, daliyAlertInfo } } = this.props;
        const staticPiePosition = { width: '80%', height: '100%' };
        const staticOptions = config.staticPieOption(exceptionInfo);

        return (
            <React.Fragment>
                <div className="map-box">
                    <MapComp />
                </div>

                <section className="report-content-styles">
                    <article className="report-main-content-styles">
                        <aside className="report-left-content">
                            <div className="report-left-area">
                                <div className=" top_left_title">
                                    <img src={IconS6} />
                                    <span>Daily Alert Trend</span>
                                </div>
                                <div className="top_left_content">
                                    <AreaEchartsCom data={daliyAlertInfo} />
                                </div>
                            </div>

                            <div className="report-left-text">
                                <Preliminary />
                            </div>
                        </aside>

                        <aside className="report-right-content">
                            <div className="report-right-top">
                                <ShipNum
                                    data={activeShipment}
                                />
                            </div>

                            <div className="report-right-bottom">
                                <div className="report-right-bottom-top">
                                    <p style={{
                                        color: 'rgba(255,255,255,0.9 )',
                                    }}
                                    >
                                        Shipment Exception Status
                                    </p>
                                    <div className="report-right-bottom-content">
                                        <div className="report-right-bottom-left">
                                            <img src={ShipmentIcon} />
                                        </div>
                                        <div className="report-right-bottom-right">
                                            <RingDiagram
                                                position={staticPiePosition}
                                                option={staticOptions}
                                                type="staticPie"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <SearchBar style={{ width: '100%' }} />
                            </div>

                        </aside>
                    </article>

                    <article className="report-footer-styles">
                        <WarningNodeBar />
                    </article>
                </section>
            </React.Fragment>
        );
    }
}
