const iconImg = [
    'TPM_AIR1',
    'plane-15-normal',

    'TPM_AIR2',
    'plane-15-attention',

    'TPM_AIR3',
    'plane-15-delay',

    'TPM_SEA1',
    'ship-15-normal',

    'TPM_SEA2',
    'ship-15-attention',

    'TPM_SEA3',
    'ship-15-delay',

    'ship-15-normal',]
const route = {
    id: 'route',
    type: 'line',
    source: 'paths',
    layout: {
        'line-cap': 'round',
        'line-join': 'round'
    },
    paint: {
        'line-width': 2,
        'line-opacity': 0.9,
        'line-blur': 0.5,
        'line-gradient': [
            'interpolate',
            ['linear'],
            ['line-progress'],
            0,
            '#76C2AF',
            1,
            '#B15454'
        ]
    }
}
const port = {
    id: 'ports',
    type: 'circle',
    source: 'ports',
    paint: {
        'circle-radius': ['get', 'radius'],
        'circle-color': [
            'case',
            ['>', ['get', 'degree'], 0],
            '#76C2AF',
            '#B15454'
        ],
        'circle-blur': 0.5
    }
}

const cluster = {
    id: 'clusters',
    type: 'circle',
    source: 'shipments',
    filter: ['has', 'point_count'],
    paint: {
        'circle-color': [
            'case',
            ['>', ['feature-state', 'delay'], 0],
            '#E95E5D',
            ['>', ['feature-state', 'attention'], 0],
            '#ffc500',
            '#6ABD97'
        ],
        'circle-radius': [
            "step",
            ["get", "point_count"],
            12,
            100,
            15
        ],
        // 'circle-stroke-width': [
        //     'case',
        //     ['==', ['feature-state', 'hover'], 1],
        //     1.5,
        //     0
        // ],
        // 'circle-stroke-color': 'rgba(210, 98, 59, 0.2)',
    }
}

const clusterCount = {
    id: 'cluster-count',
    type: 'symbol',
    source: 'shipments',
    filter: ['has', 'point_count'],
    layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
    }
}
const unclusteredPoint = {
    id: 'unclustered-point',
    type: 'symbol',
    source: 'shipments',
    filter: ['!', ['has', 'point_count']],

    layout: {
        'icon-image': [
            'match',
            ['get', 'emergencyModeCode'],
            ...iconImg,
        ],
        'icon-size': 1.5
    }
}

// 仓库
const wareCluster = {
    id: 'wareClusters',
    type: 'circle',
    source: 'warehouse',
    filter: ['has', 'point_count'],
    paint: {
        'circle-color': [
            'case',
            ['>', ['feature-state', 'warning'], 0],
            '#D2623B',
            ['>', ['feature-state', 'attention'], 0],
            '#FFC500',
            '#76C2AF'
        ],
        'circle-radius': 10,
        'circle-stroke-width': [
            'case',
            ['==', ['feature-state', 'hover'], 1],
            1.5,
            0
        ],
        'circle-stroke-color': [
            'case',
            ['==', ['feature-state', 'hover'], 1],
            'rgba(255,255,255,0.5)',
            'rgba(0,0,0,0)'
        ]
    }
}

const wareClusterCount = {
    id: 'warecluster-count',
    type: 'symbol',
    source: 'warehouse',
    filter: ['has', 'point_count'],
    layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
    }
}
const unwareClusteredPoint = {
    id: 'unwareclustered-point',
    type: 'symbol',
    source: 'warehouse',
    filter: ['!', ['has', 'point_count']],

    layout: {
        'icon-image': [
            'match',
            ['get', 'modeCode'],
            'delay',
            'wared-15',
            'alert',
            'wayellow-15',
            'wablue-15'
        ],
        'icon-size': 2
    }
}


// shipment  container 路线
const routeLayout = {
    id: 'route',
    type: 'line',
    source: 'route',
    layout: {
        'line-cap': 'round',
        'line-join': 'round',
    },
    paint: {
        'line-color': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            '#80ffff',
            '#ffc500',
        ],
        'line-width': 7,
        'line-opacity': 0.6,
    },
};

export default {
    route,
    port,
    cluster,
    clusterCount,
    unclusteredPoint,
    wareCluster,
    wareClusterCount,
    unwareClusteredPoint,
    routeLayout,
    accessToken: 'pk.eyJ1IjoicGF0cmlja3dqcyIsImEiOiJjanBxbThjbXQwcWRjM3hueDk5cW44NWk2In0.9tCql2RKeE6vEvZS1k1rmA'
}

