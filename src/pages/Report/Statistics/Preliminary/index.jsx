// rely and components
import React from 'react';
import { Card } from 'antd';

// staic and config
import icons from '@/assets/reportmodule/icon_s7.png';
import './index.less';

export default class preliminary extends React.Component {
    render() {
        const titleIcon = (
            <React.Fragment>
                <img
                    src={icons}
                    style={{
                        width: '15%',
                        height: '15%',
                        margin: '0 3% 0 -2.8%',
                        fontSize: '22px',
                    }}
                />
                <span>Early Warning</span>
                <span style={{ color: '#1DC8B2', fontSize: '14px' }}>28<sup>0C</sup></span>
            </React.Fragment>
        );
        const titleIconExtra = (
            <img
                src={icons}
                style={{
                    width: '35px',
                    height: '35px',
                    margin: '0 2%',
                }}
            />
        );

        return (
            <Card
                title={titleIcon}
                bordered={false}
                hoverable="true"
                extra={titleIconExtra}
                className="card-content"
                headStyle={{
                    color: '#fff', fontWeight: '600', height: '20%',
                }}
                bodyStyle={{
                    color: 'rgba(255,255,255,.8)',
                    overflow: 'auto',
                    height: '66%',
                    width: '80%',
                    padding: '0',
                    textAlign: 'justify',
                }}
            >
                11月4日，中国上海。希腊总理米佐塔基斯对习近平说，
                “希腊人民热切期待习近平主席早日访问希腊”，
                11月10日，希腊雅典。习近平乘坐的专机在夜幕中抵达。
                原来，早日可以这样早。11月4日，中国上海。希腊总理米佐塔基斯对习近平说，
                “希腊人民热切期待习近平主席早日访问希腊”，
                11月10日，希腊雅典。习近平乘坐的专机在夜幕中抵达。
                原来，早日可以这样早。11月4日，中国上海。希腊总理米佐塔基斯对习近平说，
                “希腊人民热切期待习近平主席早日访问希腊”，
                11月10日，希腊雅典。习近平乘坐的专机在夜幕中抵达。
                原来，早日可以这样早。
            </Card>
        );
    }
}
