/* eslint-disable */
import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";
import './index.less';

export default  class Donut extends React.Component {
  // handleClick = (ev) => {
  //   console.log('1111111111111111111', ev);
  //   debugger;
  //   window.open(`${window.location.origin}${similarApi.shipment}/exception/list`);
  // }

  render() {
    const { DataView } = DataSet;
    const { Html } = Guide;
    const {data,percent=0}=this.props;
    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          val = val * 100 + "%";
          return val;
        }
      }
    };
    return (
        <Chart
          data={dv}
          scale={cols}
          height={60}
          width={60}
          padding={[0, 0, 0, 0]}
        //   forceFit
        >
          <Coord type={"theta"} radius={0.75} innerRadius={0.72} />
          <Axis name="percent" />
         
         
          <Guide>
            <Html
              position={["50%", "50%"]}
              html={`<div class="g2-guide-html style=" font-size: 8px;color: #ffc502;cursor: pointer;">${data[0].count}</div>`}
              alignX="middle"
              alignY="middle"
            />
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color={['item', ['rgb(250,92,38)', '#000']]}
            tooltip={[
              "item*percent",
              (item, percent) => {
                percent = percent * 100 + "%";
                return {
                  name: item,
                  value: percent
                };
              }
            ]}
            style={{
              lineWidth: 1,
              stroke: "rgb(65,65,65)"
            }}
          >
          </Geom>
        </Chart>
    );
  }
}
