import React, { useEffect, useState } from 'react';
import PieChat from './PieChart';
import './index.less';
// eslint-disable-next-line import/order
import { connect } from 'dva';
import transform from '@/utils/transform.js';
import { similarApi } from '@/config/api';

const WarningNodeBar = ({ seaAlertInfo }) => {
    const [warningNodeData, setWarningNodeData] = useState(seaAlertInfo);
    const resultData = transform.getAllPieData(warningNodeData);

    useEffect(() => {
        setWarningNodeData(seaAlertInfo);
    }, [seaAlertInfo]);

    const handleClick = () => {
        window.open(`${window.location.origin}${similarApi.ct}/exception/list`);
    };

    return (
        <article className="report-bar-content-styles">
            <ul className="warning-message">
                {resultData && resultData.length ? resultData.map(({ delay, milestoneName, totalNum }, index) => (
                    <li key={index}>
                        <div className="top-title"><div>{milestoneName}</div></div>
                        <div className="chat" onClick={() => handleClick()}>   <PieChat
                            percent={((delay / totalNum) * 100).toFixed(0)}
                            data={[{
                                item: 'delay', count: delay,
                            }, { item: 'totalNum-delay', count: totalNum - delay }]}
                        />
                        </div>
                    </li>
                )) : null}
            </ul>
        </article>
    );
};

export default connect(({ reportStatic: { seaAlertInfo } }) => ({ seaAlertInfo }))(WarningNodeBar);
