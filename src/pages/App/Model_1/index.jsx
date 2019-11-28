import React from 'react';
import { connect } from 'dva';

@connect(state => ({
    example: state.example,
}))
class IndexPage extends React.Component {
    render() {
        return (
            <div>
                <div>模板</div>
            </div>
        );
    }
}

export default IndexPage;
