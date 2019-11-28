import React, { useState, useEffect } from 'react';
import './index.less';
import Api from '@/api/report';
import { withRouter } from 'dva/router';
import MapComp from '@/components/MapComp';
import { similarApi } from '@/config/api';

const Values = ({
    value = 2018,
    hasUnit = false,
    bgClass,
    fontColor,
    onMouseOver,
    onFocus,
    isActive = true,
    onClick,
}) => (
    <li onMouseOver={onMouseOver} onFocus={onFocus} onClick={onClick} className="li-style">
        <div className={isActive ? null : 'gray'}>
            <div className={`bg ${bgClass}`} />
            <div className={`value ${fontColor}`}>
                <div className="values">
                    {value
                        .toString()
                        .split('')
                        .map(i => (
                            <span>{i}</span>
                        ))}
                </div>
                {hasUnit && <div className="unit">Shipments</div>}
            </div>
        </div>
    </li>
);

const reportEntranceParamsMap = {
    0: {
        bgClass: '',
        fontColor: 'dark_blue_value',
        hasUnit: false,
    },
    1: {
        bgClass: 'tun_red',
        fontColor: 'red_value',
        hasUnit: true,
    },
    2: {
        bgClass: 'ton',
        fontColor: 'shallow_blue_value',
        hasUnit: false,
    },
    3: {
        bgClass: 'ton_red',
        fontColor: 'red_value',
        hasUnit: true,
    },
    4: {
        bgClass: 'truck',
        fontColor: 'yellow_value',
        hasUnit: false,
    },
    5: {
        bgClass: 'truck_red',
        fontColor: 'red_value',
        hasUnit: true,
    },
};

export default withRouter(({ history }) => {
    const [values, setValues] = useState([0, 0, 0, 0, 0, 0]);
    const [active, setActive] = useState(null);
    const [focusBoxStyle, setFocusBoxStyle] = useState({
        width: '100%',
        left: 0,
    });
    useEffect(() => {
        Api.getOnwayCargo().then(res => {
            const { success, data } = res;
            if (success) {
                setValues(data);
            }
        });
    }, []);
    const handleMouseOver = index => {
        setActive(index);
        setFocusBoxStyle({
            width: `${100 / 6}%`,
            left: `calc(${100 * (index / 6)}% + 1px)`,
            background: 'rgba(0, 0, 0, 0.7)',
        });
    };
    const handleFocus = e => {
        console.log(e);
    };

    const handleMouseLeave = () => {
        setActive(null);
        setFocusBoxStyle({
            width: '100%',
            left: 0,
        });
    };
    const handleClick = (index) => {
        switch (index) {
        case 0:
            history.push('/App/reportDetails');
            break;
        case 1:
            window.open(`${window.location.origin}${similarApi.ct}/exception/list?shipmentType=${index}`);
            break;
        case 3:
            window.open(`${window.location.origin}${similarApi.ct}/exception/list?shipmentType=${index}`);
            break;
        default:
            break;
        }
    };
    return (
        <React.Fragment>
            <div className="map-box">
                <MapComp />
            </div>
            <div className="ReportIndexPage">
                {values && values.length && (
                    <div className="report-entrance">
                        <ul onMouseLeave={handleMouseLeave}>
                            <div className="focus_box" style={focusBoxStyle} />
                            {values && values.length ? values.map((value, index) => (
                                <Values
                                    isActive={!!((active === index || active === null))}
                                    onMouseOver={() => handleMouseOver(index)}
                                    onFocus={handleFocus}
                                    value={value}
                                    key={index}
                                    onClick={() => handleClick(index)}
                                    {...reportEntranceParamsMap[index]}
                                />
                            )) : null}
                        </ul>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
});
