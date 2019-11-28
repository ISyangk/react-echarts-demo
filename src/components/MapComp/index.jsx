import React, { Component } from 'react';
import './index.less';
import { withRouter } from 'dva/router';

import mapboxgl from 'mapbox-gl';
import mapConfig from '@/config/mapConfig';
import * as turf from '@turf/turf';
import MapboxLanguage from '@mapbox/mapbox-gl-language';

import { connect } from 'dva';
import Priority from '@/config/Priority';
import { getMapLang, transportThousand } from '@/utils/fn';

mapboxgl.accessToken = mapConfig.accessToken;

@withRouter
@connect(({ mapData }) => {
    return {
        mapList: mapData.mapList,
    };
})
export default class MapComp extends Component {
    constructor() {
        super();
        this.state = {
            shipData: [],
            screenArr: ['Sea', 'Road', 'Air', 'Rail'],
        };

        this.map = null;

        this.timer = null;
        this.show = false;
    }

    componentDidMount() {
        this.setMap();
        // 让地图初始化自适应大小
        const myEvent = new Event('resize'); // resize是指resize事件  让地图自适应浏览器大小

        // this.initMap();// 触发window的resize事件;
        setTimeout(() => { window.dispatchEvent(myEvent); }, 500);
    }

    dataAction() {
        const { mapList } = this.props;
        const shipData = mapList.map(s => ({
            ...s,
            emergency: Priority[s.emergency] || Priority.Normal,
            warning: s.warning || '0',
        }));
        this.setState({
            shipData,
        }, () => {
            this.setShipment();
        });

        this.timer = setTimeout(() => {
            this.dataAction();
        }, 120000);
    }

    setMap() {
        const sMap = document.querySelector('.s-map');
        this.map = new mapboxgl.Map({
            container: sMap,
            attributionControl: false,
            style: 'mapbox://styles/patrickwjs/ck0617qox1o7u1cmhffh0y1yp',
            maxZoom: 14,
            center: [116.3972282409668, 39.90960456049752],
            zoom: 1.5,
        });
        const mapLang = new MapboxLanguage(getMapLang());
        this.map.addControl(mapLang);


        this.map.on('style.load', () => { this.setMapItem(this.map); });
    }

    // 筛选出需要显示的数据类型，默认全选
    setShipment = (screen = null) => {
        const { shipData, screenArr } = this.state;

        let screenN = screenArr;
        let shipments = [];
        if (screen !== null) {
            screenN = screen;
        }
        shipments = shipData.filter(v => {
            return screenN.indexOf(v.modeName) > -1;
        });

        this.setState({
            screenArr: screenN,
        }, () => {
            const source = turf.featureCollection(shipments.map(s => {
                let lglt = s.lnglat || [];
                if (lglt && lglt.length && (lglt[0] !== null && lglt[1] !== null)) {
                    lglt = s.lnglat;
                } else {
                    lglt = [0, 0];
                }
                return turf.point(lglt || [0, 0], {
                    ...s,
                    lnglat: lglt,
                    emergency: s.emergency || Priority.Normal,
                    warning: s.warning || '0',
                    emergencyModeCode: `${s.modeCode}${s.emergency}`,
                });
            }));
            this.setSource(source);
        });
    }

    setSource(val) {
        this.map.getSource('shipments').setData(val);
    }

    addSources() {
        this.map.addSource('shipments', {
            type: 'geojson',
            data: turf.featureCollection([]),
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 50,
        });
    }

    addLayers() {
        // 控制群集颜色
        this.map.addLayer(mapConfig.cluster);
        this.map.addLayer(mapConfig.clusterCount);
        this.map.addLayer(mapConfig.unclusteredPoint);
    }

    // 设置显隐
    setShowMap() {
        const isShow = true;
        this.map.setLayoutProperty(
            'clusters',
            'visibility',
            isShow ? 'visible' : 'none',
        );

        this.map.setLayoutProperty(
            'cluster-count',
            'visibility',
            isShow ? 'visible' : 'none',
        );

        this.map.setLayoutProperty(
            'unclustered-point',
            'visibility',
            isShow ? 'visible' : 'none',
        );
    }

    setMapItem(shipmentMap) {
        this.map = shipmentMap;
        this.addSources();
        this.addLayers();
        this.dataAction();

        const { topFiveLines: lines } = this.props;


        // const steps = 15;
        const dataIndex = 0;

        this.map.on('load', () => {
            // lines.forEach((line, key) => {
            //     const npoints = Math.ceil(turf.distance(line.origin, line.destination) / steps);
            //     const greatCircle = turf.greatCircle(line.origin, line.destination, { npoints });
            //     this.map.addSource(`route-${key}`, {
            //         type: 'geojson',
            //         data: greatCircle,
            //     });
            //     this.map.addLayer({
            //         id: `route-${key}`,
            //         source: `route-${key}`,
            //         type: 'line',
            //         paint: {
            //             'line-width': 2,
            //             'line-color': '#ffc500',
            //             'line-dasharray': [1, 1],
            //         },
            //     });
            // });

            //     const animateLine = (line, key) => {
            //         let counter = 0;
            //         const npoints = Math.ceil(turf.distance(line.origin, line.destination) / steps);
            //         const greatCircle = turf.greatCircle(line.origin, line.destination, { npoints });
            //         if (greatCircle.geometry.coordinates.length === 2) {
            //             greatCircle.geometry.coordinates = [...greatCircle.geometry.coordinates[0], ...greatCircle.geometry.coordinates[1]];
            //         }
            //         const point = {
            //             type: 'FeatureCollection',
            //             features: [{
            //                 type: 'Feature',
            //                 properties: {},
            //                 geometry: {
            //                     type: 'Point',
            //                     coordinates: line.origin,
            //                 },
            //             }],
            //         };

            //         this.map.addSource(`point-${key}`, {
            //             type: 'geojson',
            //             data: point,
            //         });

            //         this.map.addLayer({
            //             id: `point-${key}`,
            //             source: `point-${key}`,
            //             type: 'symbol',
            //             layout: {
            //                 'icon-image': 'airport-15',
            //                 'icon-rotate': ['get', 'bearing'],
            //                 'icon-rotation-alignment': 'map',
            //                 'icon-allow-overlap': true,
            //                 'icon-ignore-placement': true,
            //             },
            //         });


            //         const animate = () => {
            //             point.features[0].geometry.coordinates = greatCircle.geometry.coordinates[counter];

            //             point.features[0].properties.bearing = turf.bearing(
            //                 turf.point(greatCircle.geometry.coordinates[counter >= npoints ? counter - 1 : counter]),
            //                 turf.point(greatCircle.geometry.coordinates[counter >= npoints ? counter : counter + 1]),
            //             );
            //             this.map.getSource(`point-${key}`).setData(point);
            //             if (counter < npoints - 2) {
            //                 requestAnimationFrame(animate);
            //             } else {
            //                 this.map.removeLayer(`route-${dataIndex}`);
            //                 this.map.removeLayer(`point-${dataIndex}`);
            //                 dataIndex++;
            //                 if (lines[dataIndex]) {
            //                     animateLine(lines[dataIndex], dataIndex);
            //                 }
            //             }
            //             counter++;
            //         };
            //         animate();
            //     };
            if (lines && lines.length) {
                animateLine(lines[dataIndex], dataIndex);
            }
        });

        let timer;
        this.map.on('render', () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                const clusters = this.map.queryRenderedFeatures(null, {
                    layers: ['clusters'],
                });
                const clusterSource = this.map.getSource('shipments');
                clusters.forEach(c => {
                    clusterSource.getClusterLeaves(
                        c.id,
                        c.properties.point_count,
                        0,
                        (err, features) => {
                            if (err) return;
                            const stat = features.reduce(
                                (a, b) => {
                                    const { emergency } = b.properties;
                                    return {
                                        normal: a.normal + (emergency === Priority.Normal ? 1 : 0),
                                        attention: a.attention + (emergency === Priority.Attention ? 1 : 0),
                                        delay: a.delay + (emergency === Priority.Delay ? 1 : 0),
                                    };
                                },
                                { normal: 0, attention: 0, delay: 0 },
                            );

                            if (
                                c.state.delay !== stat.delay
                            || c.state.attention !== stat.attention
                            || c.state.normal !== stat.normal
                            ) {
                                this.map.setFeatureState(
                                    { source: 'shipments', id: c.id },
                                    {
                                        ...stat,
                                        place:
                                        features[0].properties.place == null
                                            ? ''
                                            : features[0].properties.place,
                                    },
                                );
                            }
                        },
                    );
                });
            }, 20);
        });

        // 触摸圆形数据集
        const popup = new mapboxgl.Popup({ closeButton: false });
        let hoverId = 0;
        this.map.on('mouseenter', 'clusters', e => {
            this.map.getCanvas().style.cursor = 'pointer';
            console.log('features1', e.features, e.lngLat);
            // 获取中心坐标.log()
            const features = e.features[0];
            const coordinates = features.geometry.coordinates.slice();
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            hoverId = features.properties.cluster_id;

            this.map.setFeatureState(
                { source: 'shipments', id: hoverId },
                { hover: 1 },
            );
            const { state } = features;

            const c = features.properties;
            const clusterSource = this.map.getSource('shipments');
            clusterSource.getClusterLeaves(
                c.cluster_id,
                c.point_count,
                0,
                (err) => {
                    if (err) return;
                    // paramsDom = featuresArr;
                    const description = `<div class='map-stat'>
                        <div class="legend-title">Total Shipment：${transportThousand(c.point_count)}</div>
                        <div class='legends'>
                            <div class="legend delay" data-type="Delay">
                                ${transportThousand(state.delay)}：Delay
                            </div>
                            <div class="legend alert" data-type="Attention">
                                ${(state.attention)}：Attention
                            </div>
                            <div class="legend normal" data-type="Normal">
                            ${(state.normal)}：Normal
                            </div>
                        </div></div>`;

                    popup.setLngLat(coordinates).setHTML(description).addTo(this.map);
                },
            );
        });

        this.map.on('mouseleave', 'clusters', () => {
            this.map.getCanvas().style.cursor = '';
            this.map.setFeatureState(
                { source: 'shipments', id: hoverId },
                { hover: 0 },
            );
        });

        // 触摸数据集为1 的元素
        const popup2 = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
        });
        this.map.on('mouseenter', 'unclustered-point', e => {
            this.map.getCanvas().style.cursor = 'pointer';
            const coordinates = e.features[0].geometry.coordinates.slice();
            const m = e.features[0].properties;
            console.log('mmmmm', m);
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            const description = `<div class='pop'>
                <div class="line-title">${m.blNo}</div>
                <div class='line'><div class='label'>Status：</div><div class='value'>${
    m.statusName === 'null' ? '' : m.statusName
}</div></div>
                            <div class='line'><div class='label'>Reference No：</div><div class='value'>${
    m.refNo === 'null' ? '' : m.refNo
}</div></div>
                            <div class='line'><div class='label'>Mode：</div><div class='value'>${
    m.modeName === 'null' ? '' : m.modeName
}</div></div>
                            <div class='line'><div class='label'>Origin：</div><div class='value'>${
    m.origin === 'null' ? '' : m.origin
}</div></div>
                            <div class='line'><div class='label'>Destination：</div><div class='value'>${
    m.destination === 'null' ? '' : m.destination
}</div></div>
                            <div class='line'><div class='label'>ETA：</div><div class='value'>${
    m.eta === 'null' ? '' : m.eta
}</div></div>
                            <div class='line'><div class='label'>ETD：</div><div class='value'>${
    m.etd === 'null' ? '' : m.etd
}</div></div>
                            <div class='line'><div class='label'>Shipper：</div><div class='value'>${
    m.shipper === 'null' ? '' : m.shipper
}</div></div>
            </div>`;
            popup2
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(this.map);
        });

        this.map.on('mouseleave', 'unclustered-point', () => {
            this.map.getCanvas().style.cursor = '';
            popup2.remove();
        });
    }

    render() {
        return (
            <div className="map-container s-map" style={{ width: '100%', height: '100%' }} />
        );
    }
}
