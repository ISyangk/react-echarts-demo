// 将shipmenInfo的状态数据转换为图表所需要的类型
function toShipmentStatusInfo(data) {
    return data.map(item => {
        return {
            value: Number(item.shipment_amount),
            name: item.shipment_status_name,
            code: item.shipment_status_glcode,
            url: item.url || '',
        };
    });
}

// 获取到shipmentInfo的列数据
function getShipmentInfoClomn(data) {
    const arr = [];
    data.forEach((item) => {
        arr.push(item.shipment_status_name);
    });
    return arr;
}

// 获取到shipment 异常状态数据的列
function toShipmentExceptionInfo(data) {
    return data.map(item => {
        return {
            value: Number(item.shipment_amount),
            name: item.ongoing_status,
        };
    });
}

// TOP 10 数据处理

/**
 *
 * @param { Array } data;
 * @return { Object } xaias 坐标轴数据 source 数据;
 */
function interfaceTopTen(data = []) {
    const topTenObj = { xaias: [], source: [], lines: [] };
    if (!Array.isArray(data)) return data;

    // 统一处理柱形图数据
    // xaias 坐标轴，数组  source 原数据，数组
    data.forEach(item => {
        // 坐标轴数据
        topTenObj.xaias.push(
            item.customer
            || item.port_of_load
            || item.port_of_discharge
            || item.country_contingent
            || 'Error',
        );

        // 原数据
        topTenObj.source.push(item.cargo_amount || 0);

        // lines 线条数据 保留两位向下取整数
        const percentage = (((item.cargo_amount / item.total_amount) * 100) * 100);
        topTenObj.lines.push(Math.floor(percentage) / 100 || 0);
    });

    return topTenObj;
}

// 总览环形图的预览
function getAllPieData(warningNodeData) {
    if (warningNodeData && warningNodeData.length) {
        return warningNodeData.map(item => {
            return {
                delay: Number(item.delay_num),
                milestoneGlcode: item.milestone_glcode,
                totalNum: item.total_num,
                milestoneName: item.milestone_name,
            };
        });
    } else { return []; }
}

function interfaceAear(data = []) {
    try {
        if (!Array.isArray(data)) return data;
        const restData = { Delay: [], Attention: [] };
        data
            .filter(item => item.ongoing_status !== 'Normal')
            .forEach(rest => {
                // eslint-disable-next-line no-unused-expressions
                rest.ongoing_status === 'Attention'
                    ? restData.Attention.push(rest.shipment_amount)
                    : restData.Delay.push(rest.shipment_amount);
            });
        return restData;
    } catch (error) {
        throw new Error(error);
    }
}

// 转换为首字母大写的字符串
function toFirstUpLowerCase(str) {
    const first = str.substr(0, 1);
    const other = str.substr(1);
    const firstUp = first.toUpperCase();
    const otherLower = other.toLowerCase();
    return firstUp + otherLower;
}

export default {
    toShipmentStatusInfo,
    getShipmentInfoClomn,
    toShipmentExceptionInfo,
    interfaceTopTen,
    getAllPieData,
    interfaceAear,
    toFirstUpLowerCase,
};
