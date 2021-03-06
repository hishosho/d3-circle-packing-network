# D3 Circle Packing Network Graph

 Combination of circle packing and force-directed graph realized by [D3.js (v4)](https://github.com/d3/d3).

## Demo
 [Demo](https://hishosho.github.io/d3-circle-packing-network/dist/index.html)

## Features

* Force simulation.
* Circle Packing
* click callbacks.
* Support more than one relationship between two nodes.
* Customize the value of height, width, force collide radius adn svg background color.
* Customize the color of packs, nodes and lines.
* The node and it's relationship lines will change color when mouseover.
* Zoom.

## Running

First of all, make sure you have webpack installed. Then, clone the repository, install all dependencies, build and serve the project.

```bash
> git clone https://github.com/hishosho/d3-circle-packing-network.git
> npm install
> npm run dev
```

Open `http://localhost:8080` in your favorite browser.

## Documentation

```javascript
const circlePackingNetGraph = new CirclePackingNetGraph('#app', options);
```

### Options

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| **circlePackingNetGraphData** | *object* | Graph data in [Circle Packing Network Graph data format](#circlePackingNetGraph-data-format). |
| **width** | *int* | svg's width. Default: 1900. |
| **height** | *int* | svg's height. Default: 800. |
| **viewBox** | *array* | viewBox. Default: [-width / 2, -height / 2, width, height]. |
| **forceCollideR** | *int* | force collide radius. Default: 100. |
| **packColor** | *string* | pack's color. Default: #0080ff. |
| **nodeColor** | *string* | node's color. Default: #f9d423. |
| **pathColor** | *string* | path's color. Default: #22863a. |
| **focusColor** | *string* | focus's color. Default: #E53A40. |
| **svgBackground** | *string* | svg's background color. Default: #f0fff4. |
| **onNodeCilck** | *function* | Callback function to be executed when the user clicks a node. |
| **onNodeDoubleClick** | *function* | Callback function to be executed when the user double clicks a node. |
| **onNodeDragEnd** | *function* | Callback function to be executed when the user finishes dragging a node. |
| **onNodeDragStart** | *function* | Callback function to be executed when the user starts dragging a node. |
| **onNodeMouseEnter** | *function* | Callback function to be executed when the mouse enters a node. |
| **onNodeMouseLeave** | *function* | Callback function to be executed when the mouse leaves a node. |
| **onRelationshipDoubleClick** | *function* | Callback function to be executed when the user double clicks a relationship. |

### Documentation

#### Data format

```
{
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
  ],
  links: [
    { id: 'link_1', source: 'node_1', target: 'node_8', type: '??????' },
    { id: 'link_2', source: 'node_1', target: 'node_8', type: '??????' },
  ]
}

```

### Example

Live example @ [https://hishosho.github.io/d3-circle-packing-network/](https://hishosho.github.io/d3-circle-packing-network/)

```javascript
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
    { id: 'link_1', source: 'node_1', target: 'node_20', type: '??????' },
    { id: 'link_2', source: 'node_2', target: 'node_18', type: '??????' },
    { id: 'link_3', source: 'node_3', target: 'node_16', type: '??????' },
    { id: 'link_4', source: 'node_5', target: 'node_15', type: '??????' },
    { id: 'link_5', source: 'node_5', target: 'node_15', type: '??????' },
    { id: 'link_6', source: 'node_6', target: 'node_18', type: '??????' },
    { id: 'link_7', source: 'node_7', target: 'node_17', type: '??????' },
    { id: 'link_8', source: 'node_8', target: 'node_20', type: '??????' },
    { id: 'link_9', source: 'node_9', target: 'node_10', type: '??????' },
    { id: 'link_10', source: 'node_10', target: 'node_1', type: '??????' },
    { id: 'link_11', source: 'node_11', target: 'node_6', type: '??????' },
    { id: 'link_12', source: 'node_12', target: 'node_19', type: '??????' },
    { id: 'link_13', source: 'node_14', target: 'node_8', type: '??????' },
    { id: 'link_14', source: 'node_14', target: 'node_8', type: '??????' },
    { id: 'link_15', source: 'node_16', target: 'node_45', type: '?????????' },
  ]
}


new CirclePackingNetGraph('#app', {
  circlePackingNetGraphData: data
})
```

## What's coming?
* Performance optimization.
* Testing.

