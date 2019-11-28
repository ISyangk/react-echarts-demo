import React, { useState } from 'react';
import { Select } from 'antd';
import Api from '@/api/report';
import { connect } from 'dva';
import './index.less';

const { Option } = Select;

let timeout;
let currentValue;

function fetch(value, callback) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    function search() {
        Api.getUserSearchSelect({
            searchValue: currentValue,
        }).then(res => {
            const { success, data } = res;
            if (success && currentValue === value) {
                callback(data);
            }
        });
    }

    timeout = setTimeout(search, 300);
}

const SearchBar = (props) => {
    const { searchValue } = props;
    const [value, setValue] = useState(searchValue);
    const [data, setData] = useState([]);

    const handleSearch = e => {
        if (e) {
            fetch(e, callbackData => setData(callbackData));
        } else {
            setData([]);
        }
    };
    const handleChange = e => {
        setValue(e);
        props.dispatch({ type: 'reportStatic/saveData', payload: { searchValue: e } });
    };
    const options = data.map(d => {
        if (!d) { return ''; } else { return <Option key={d.customer_code}>{d.customer_name}</Option>; }
    });

    return (
        <div className="report-right-search">
            <Select
                suffixIcon={<img src={require('./search.png')} style={{ width: 10 }} />}
                showArrow
                showSearch
                allowClear
                value={value}
                onSearch={handleSearch}
                onChange={handleChange}
                defaultActiveFirstOption={false}
                notFoundContent={null}
                filterOption={false}
                {...props}
                dropdownMatchSelectWidth={false}
                placeholder="Customer search"
            >
                {options}
            </Select>
        </div>
    );
};

export default connect(({ reportStatic: { searchValue } }) => ({ searchValue }))(SearchBar);
