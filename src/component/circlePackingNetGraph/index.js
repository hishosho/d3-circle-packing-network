
import * as d3 from 'd3'
import { Intersection, ShapeInfo } from 'kld-intersections'

export default class CirclePackingNetGraph {
  constructor (selector, options) {
    this.selector = selector

    const {
      circlePackingNetGraphData={},
      width=1900,
      height=800,
      viewBox=[],
      forceCollideR=100,
      packColor='#0080ff',
      nodeColor='#f9d423',
      pathColor='#22863a',
      focusColor='#E53A40',
      svgBackground='#f0fff4'
    } = options

    this.options = {
      circlePackingNetGraphData,
      width,
      height,
      viewBox,
      forceCollideR,
      packColor,
      nodeColor,
      pathColor,
      focusColor,
      svgBackground
    }

    this.initData()
    this.render()
  }
  initData () {
    this.validation()
    this.regions = this.options.circlePackingNetGraphData.regions.map(r => Object.create(r))
    this.links = this.options.circlePackingNetGraphData.links.map(l => Object.create(l))
    
    this.multiLinkGroup()
    this.buildNetworkData()
    
    this.buildRegionPacksData()
  }
  validation () {
    if (!Array.isArray(this.options.circlePackingNetGraphData.regions) || this.options.circlePackingNetGraphData.regions.length === 0) {
      new Error('param regions is error!')
      return
    }
  }
  /**
   * 两节点间存在多条关系线时需进行分组绘制曲线，
   * 优雅展示，防止关系线重叠。
   */
  multiLinkGroup () {
    const linkGroup = {}
    this.links.forEach((link) => {
      const key =
        link.source < link.target
          ? `${link.source}&${link.target}`
          : `${link.target}&${link.source}`
      if (!linkGroup.hasOwnProperty(key)) {
        linkGroup[key] = []
      }
      linkGroup[key].push(link)
    })

    for (const group in linkGroup) {
      const leftArr = []
      const rightArr = []
      if (linkGroup[group].length === 2) {
        leftArr.push(linkGroup[group][0])
        rightArr.push(linkGroup[group][1])
      } else {
        for (const link of linkGroup[group]) {
          if (`${link.source}&${link.target}` === group) {
            leftArr.push(link)
          } else {
            rightArr.push(link)
          }
        }
      }
      let positive = 1
      let negative = -1
      if (linkGroup[group].length < 2) {
        continue
      }
      leftArr.map(left => {
        left.linknum = positive++
      })
      rightArr.map(right => {
        right.linknum = negative--
      })
    }
  }
  /**
   * 构造网图数据
   */
  buildNetworkData () {
    this.simulation = d3.forceSimulation(this.regions)
        .force('collide',d3.forceCollide().radius(this.options.forceCollideR).iterations(2))
        // .force('link', d3.forceLink(this.links).id(d => d.id))
        // .force('charge', d3.forceManyBody().strength(-100))
        // .force('x', d3.forceX())
        // .force('y', d3.forceY())
  }
  /**
   * 构造region Circle Packing数据
   */
  buildRegionPacksData () {
    // region map : { key: regionId, value: region }
    // 降低生成pack的圈复杂度，用空间换时间
    this.regionsMap = {}
    for (const region of this.regions) {
      this.regionsMap[region.id] = region
    }
    // circle packing node map: { key: regionId, value: regionPack }
    this.regionsPack = {}
    // pack data array
    this.regionsPackData = []
    for (const key in this.regionsMap) {
      const pack = this.pack(this.regionsMap[key])
      this.regionsPack[key] = pack
      this.regionsPackData.push(pack.descendants())
    }
  }
  /**
   * 构建元素，渲染页面
   */
  render () {
    this.svg = d3.select(this.selector)
        .append('svg')
        .style('background-color', this.options.svgBackground)
        .attr('width', this.options.width)
        .attr('height', this.options.height)
        .attr('viewBox', this.options.viewBox.length === 0
                          ? [-this.options.width / 2, -this.options.height / 2, this.options.width, this.options.height]
                          : this.options.viewBox)
        .call(d3.zoom()
          .extent([[0, 0], [this.options.width, this.options.height]])
          .scaleExtent([1, 8])
          .on('zoom', () => { this.zoomed() }))

    const regions = this.svg.append('g')
          .selectAll('g')
          .data(this.regions)
          .enter().append('g')
            .attr('id', d => d.id)
            .call(this.drag(this.simulation))

    regions.selectAll('circle')
           .data((d, i) => this.regionsPackData[i])
           .enter().append('circle')
              .attr('id', d => d.data.name)
              .style('cursor', 'pointer')
              .attr('fill', d => d.children ? this.options.packColor : this.options.nodeColor)
              .attr('r', d => d.r)
              .on('click', d => {
                if (typeof this.options.onNodeCilck === 'function') {
                  this.options.onNodeCilck(d)
                }
              })
              .on('mouseover', d => this.circleMouseover(d))
              .on("mouseout", (d) => this.circleMouseout(d))
              .append('svg:title')
                .text(d => d.data.name)
      
    regions.selectAll('text')
           .data((d, i) => this.regionsPackData[i])
           .enter().append('text')
           .style('font-size', d => {
             const size = d.children ? parseInt(d.r / 10) : parseInt(d.r / 5)
             return size <= 1 ? 2 : size
           })
           .attr('text-anchor', 'start')
           .style('fill-opacity', d => d.parent === null ? 1 : 0)
           .style('display', d => d.parent === null ? 'inline' : 'none')
           .text(d => d.data.name)

      const edgelabels = this.svg.append('g')
            .selectAll('text')
            .data(this.links)
            .enter().append('text')
            .style('fill-opacity', 0)
            .style('display', 'none')
          
      edgelabels.append('textPath')
                .attr('xlink:href', d => `#${d.id}`)
                .text((d) => d.type)
                .style('text-anchor', 'middle')
                .style('font-size', '3')
                .attr('fill', this.options.pathColor)
                .attr('startOffset', '50%')

    const defs = this.svg.append('defs')

    defs.selectAll('marker')
        .data(this.links)
        .enter().append('marker')
          .attr('id', d => `arrow_${d.id}`)
          .attr('markerUnits', 'userSpaceOnUse')
          .attr('markerWidth','6')
            .attr('viewBox','0 -5 10 10') 
            .attr('refX','5')
            .attr('refY','0')
            .attr('orient','auto')
            .style('stroke-width', 5)
            .attr('stroke', this.options.pathColor)
          .append('path')
          .attr('d','M0,-2L5,0L0,2')

    const links = this.svg.append('g')
          .selectAll('path')
          .data(() => this.links)
          .enter().append('path')
          .attr('id', d => d.id)
          .attr('marker-end', d => `url(#arrow_${d.id})`)
          .style('stroke', this.options.pathColor)
          .style('stroke-width', '0.3')

    this.simulation.on('tick', () => {
      regions.select(d => {
          const x = d.x
          const y = d.y
          d3.select(`#${d.id}`)
            .selectAll('circle')
            .attr('cx', d => d.x + x)
            .attr('cy', d => d.y + y)
          d3.select(`#${d.id}`)
            .selectAll('text')
            .attr('transform', d => `translate(${d.x + x - d.r / 2}, ${d.y + y})`)
        })

      links.attr('d', d => this.setPath(d))
           .attr('fill-opacity', '0')
    })
  }
  /**
   * 鼠标悬浮在节点上的样式
   * @param {*} d 当前节点
   */
  circleMouseover (d) {
    const param = {
      name: d.data.name,
      color: this.options.focusColor,
      circleStrokeWidth: 3,
      linkStrokeWidth: 1,
      fontSize: 10
    }
    this.circleMouseEvent(param)
  }
  /**
   * 鼠标离开节点后样式还原
   * @param {*} d 鼠标离开的节点
   */
  circleMouseout (d) {
    const param = {
      name: d.data.name,
      color: this.options.pathColor,
      linkStrokeWidth: 0.3,
      fontSize: 3
    }
    this.circleMouseEvent(param)
  }
  /**
   * 节点鼠标事件
   * @param {*} param
   */
  circleMouseEvent (param) {
    d3.select(`#${param.name}`)
      .style("stroke", param.circleStrokeWidth ? param.color : null)
      .style('stroke-width', param.circleStrokeWidth || null)
    this.links.map(link => {
      if (link.source === param.name) {
        d3.select(`#${link.id}`)
          .style("stroke", param.color)
          .style("stroke-width", param.linkStrokeWidth)
        d3.select(`#arrow_${link.id}`)
          .attr('stroke', param.color)
        d3.selectAll('textPath')
          .filter(function () {
            return this.href.baseVal === `#${link.id}`
          })
          .attr('fill', param.color)
          .style('font-size', param.fontSize)
      }
    })
  }
  /**
   * 网图的缩放操作
   */
  zoomed () {
    const transform = d3.event.transform
    this.svg
        .attr('transform', `translate(${transform.x },${transform.y}) scale(${transform.k})`)

    d3.transition()
      .duration(d3.event.altKey ? 7500 : 750)

    this.svg.selectAll('text')
        .style('fill-opacity', d => d.parent === null && transform.k < 2 || (d.parent !== null && transform.k >= 2) ? 1 : 0)
        .style("display", d => d.parent === null && transform.k < 2 || (d.parent !== null && transform.k >= 2)? 'inline' : 'none')
  }
  /**
   * 根据关系组设置关系线路径
   * @param {*} d 
   */
  setPath (d) {
    const sourceX = parseFloat(d3.select(`#${d.source}`).attr('cx')),
          sourceY = parseFloat(d3.select(`#${d.source}`).attr('cy')),
          targetX = parseFloat(d3.select(`#${d.target}`).attr('cx')),
          targetY = parseFloat(d3.select(`#${d.target}`).attr('cy')),
          targetR = parseFloat(d3.select(`#${d.target}`).attr('r'))

    const targetCircle = ShapeInfo.circle({
      center: [targetX, targetY],
      radius: targetR
    })

    const path = ShapeInfo.path(`M ${sourceX} ${sourceY} L ${targetX} ${targetY}`)
    const targetIntersection = Intersection.intersect(targetCircle, path).points[0]
     if (d.linknum) {
      return `
        M${sourceX},${sourceY}
        Q${(sourceX + targetIntersection.x) / 2} ${(sourceY + targetIntersection.y) / 2 + (d.linknum * 10)},${targetIntersection.x} ${targetIntersection.y}`
    } else {
      return `M${sourceX} ${sourceY} L${targetIntersection.x} ${targetIntersection.y}`
    }
  }
  /**
   * 构建pack数据
   * @param {*} region 
   */
  pack (region) {
    const pack = d3.pack()
          .size([this.options.width / this.regions.length, this.options.height / this.regions.length ])
          .padding(3)(d3.hierarchy(region.pack)
                        .sum(d => d.value)
                        .sort((a, b) => b.value - a.value))
    return pack
  }
  /**
   * 网图拖动操作
   * @param {*} simulation 
   */
  drag (simulation) {
    function dragstarted (d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart()
      d.x = d3.event.x
      d.y = d3.event.y
    }

    function dragged (d) {
      d.x = d3.event.x
      d.y = d3.event.y
    }

    return d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
  }
}
