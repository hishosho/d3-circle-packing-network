import CirclePackingNetGraph from './component/circlePackingNetGraph'

const data = {
  regions: [
    {
      id: 'pack_1',
      pack: {
        name: 'region_1',
        children: [
          {name: 'unit_1', value: 1},
          {name: 'unit_2', value: 2},
          {name: 'unit_3', value: 3},
          {name: 'unit_4', value: 4}
        ]
      }
    },
    {
      id: 'pack_2',
      pack: {
        name: 'region_2',
        children: [
          {name: 'unit_5', value: 1},
          {name: 'unit_6', value: 2},
          {name: 'unit_7', value: 3},
          {name: 'unit_8', value: 4}
        ]
      }
    },
    {
      id: 'pack_3',
      pack: {
        name: 'region_3',
        children: [
          {name: 'unit_9', value: 5},
          {name: 'unit_10', value: 1},
          {name: 'unit_11', value: 2},
          {name: 'unit_12', value: 3},
          {name: 'unit_13', value: 4}
        ]
      }
    },
    {
      id: 'pack_4',
      pack: {
        name: 'region_4',
        children: [
          {name: 'unit_14', value: 1},
          {name: 'unit_15', value: 2},
          {name: 'unit_45', value: 3}
        ]
      }
    },
    {
      id: 'pack_5',
      pack: {
        name: 'region_5',
        children: [
          {name: 'unit_16',value: 1},
          {name: 'unit_17', value: 2},
          {name: 'unit_18', value: 3},
          {name: 'unit_19', value: 4},
          {name: 'unit_20', value: 5}
        ]
      }
    }
  ],
  links: [
    { id: 'link_1', source: 'unit_1', target: 'unit_20', type: '调用' },
    { id: 'link_2', source: 'unit_2', target: 'unit_18', type: '调用' },
    { id: 'link_3', source: 'unit_3', target: 'unit_16', type: '调用' },
    { id: 'link_4', source: 'unit_5', target: 'unit_15', type: '调用' },
    { id: 'link_5', source: 'unit_5', target: 'unit_15', type: '调用' },
    { id: 'link_6', source: 'unit_6', target: 'unit_18', type: '调用' },
    { id: 'link_7', source: 'unit_7', target: 'unit_17', type: '调用' },
    { id: 'link_8', source: 'unit_8', target: 'unit_20', type: '调用' },
    { id: 'link_9', source: 'unit_9', target: 'unit_10', type: '调用' },
    { id: 'link_10', source: 'unit_10', target: 'unit_1', type: '关联' },
    { id: 'link_11', source: 'unit_11', target: 'unit_6', type: '关联' },
    { id: 'link_12', source: 'unit_12', target: 'unit_5', type: '关联' },
    { id: 'link_13', source: 'unit_14', target: 'unit_8', type: '关联' },
    { id: 'link_14', source: 'unit_14', target: 'unit_8', type: '关联' },
    { id: 'link_16', source: 'unit_16', target: 'unit_20', type: '被调用' },
    { id: 'link_17', source: 'unit_16', target: 'unit_45', type: '被调用' },
  ]
}


new CirclePackingNetGraph('#app', {
  circlePackingNetGraphData: data
})