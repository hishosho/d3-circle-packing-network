import CirclePackingNetGraph from './component/circlePackingNetGraph'

const data = {
  regions: [
    {
      id: 'pack_1',
      pack: {
        name: 'region_1',
        children: [
          {name: 'node_1', value: 1},
          {name: 'node_2', value: 2},
          {name: 'node_3', value: 3},
          {name: 'node_4', value: 4}
        ]
      }
    },
    {
      id: 'pack_2',
      pack: {
        name: 'region_2',
        children: [
          {name: 'node_5', value: 1},
          {name: 'node_6', value: 2},
          {name: 'node_7', value: 3},
          {name: 'node_8', value: 4}
        ]
      }
    },
    {
      id: 'pack_3',
      pack: {
        name: 'region_3',
        children: [
          {name: 'node_9', value: 5},
          {name: 'node_10', value: 1},
          {name: 'node_11', value: 2},
          {name: 'node_12', value: 3},
          {name: 'node_13', value: 4}
        ]
      }
    },
    {
      id: 'pack_4',
      pack: {
        name: 'region_4',
        children: [
          {name: 'node_14', value: 1},
          {name: 'node_15', value: 2},
          {name: 'node_45', value: 3}
        ]
      }
    },
    {
      id: 'pack_5',
      pack: {
        name: 'region_5',
        children: [
          {name: 'node_16',value: 1},
          {name: 'node_17', value: 2},
          {name: 'node_18', value: 3},
          {name: 'node_19', value: 4},
          {name: 'node_20', value: 5}
        ]
      }
    }
  ],
  links: [
    { id: 'link_1', source: 'node_1', target: 'node_20', type: '调用' },
    { id: 'link_2', source: 'node_2', target: 'node_18', type: '调用' },
    { id: 'link_3', source: 'node_3', target: 'node_16', type: '调用' },
    { id: 'link_4', source: 'node_5', target: 'node_15', type: '调用' },
    { id: 'link_5', source: 'node_5', target: 'node_15', type: '调用' },
    { id: 'link_6', source: 'node_6', target: 'node_18', type: '调用' },
    { id: 'link_7', source: 'node_7', target: 'node_17', type: '调用' },
    { id: 'link_8', source: 'node_8', target: 'node_20', type: '调用' },
    { id: 'link_9', source: 'node_9', target: 'node_10', type: '调用' },
    { id: 'link_10', source: 'node_10', target: 'node_1', type: '关联' },
    { id: 'link_11', source: 'node_11', target: 'node_6', type: '关联' },
    { id: 'link_12', source: 'node_12', target: 'node_19', type: '关联' },
    { id: 'link_13', source: 'node_14', target: 'node_8', type: '关联' },
    { id: 'link_14', source: 'node_14', target: 'node_8', type: '关联' },
    { id: 'link_15', source: 'node_16', target: 'node_45', type: '被调用' },
  ]
}


new CirclePackingNetGraph('#app', {
  circlePackingNetGraphData: data
})