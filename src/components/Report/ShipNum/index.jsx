import React, { Component } from 'react';
// import { similarApi } from '@/config/api';
import './index.less';

const Values = ({
    value = 2015,
}) => (
    <div
        className="values"
        // onClick={
        //     () => window.open(`${window.location.origin}${similarApi.shipment}/shipment/list`)
        // }
    >
        { value && value
            .toString()
            .split('')
            .map((i, index) => (
                <span key={index} className="shipment-num">{i}</span>
            ))}
        {/* <div className="mask-ship" /> */}
    </div>
);

export default class ShipNum extends Component {
    render() {
        const { data } = this.props;
        return (
            <div className="report-right-body">
                <h4>Active Shipment</h4>
                <div className="report-right-top-ship">
                    <Values
                        value={(data && data.shipment_amount) || '0'}
                    />
                    <div className="shipment-unit"><span>Shipments</span></div>
                </div>
                <div className="report-right-top-date">
                    <div
                        className="date onclick-date"
                        // onClick={
                        //     () => window.open(`${window.location.origin}${similarApi.shipment}/Container/list`)
                        // }
                    >
                        <span>FCL</span>
                        <span>{(data && data.fcl_amount) || '0'} TEU</span>
                    </div>
                    <div className="date">
                        <span>LCL</span>
                        <span>{(data && data.lcl_amount) || '0'} CBM</span>
                    </div>
                </div>
            </div>
        );
    }
}
