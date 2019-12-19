const SVG_NS = 'http://www.w3.org/2000/svg'

const patterns = [
  // Stripes.
  (id, foreground, background) => {
    const pattern = document.createElementNS(SVG_NS, 'pattern')
    pattern.setAttribute('id', id)

    const width = randomBetween(5, 20)
    const height = 10
    pattern.setAttribute('width', width)
    pattern.setAttribute('height', height)
    pattern.setAttribute('patternUnits', 'userSpaceOnUse')
    pattern.setAttribute('patternTransform', `rotate(${randomBetween(0, 259)})`)

    const fill = document.createElementNS(SVG_NS, 'rect')
    fill.setAttribute('width', width)
    fill.setAttribute('height', height)
    fill.setAttribute('fill', background)
    pattern.appendChild(fill)

    const line = document.createElementNS(SVG_NS, 'line')
    const position = randomBetween(0, width)
    line.setAttribute('x1', position)
    line.setAttribute('x2', position)
    line.setAttribute('y1', 0)
    line.setAttribute('y2', height)
    line.setAttribute('stroke', foreground)
    line.setAttribute('stroke-width', randomBetween(3, width - 1))
    pattern.appendChild(line)

    return pattern
  },

  // Zigzags.
  (id, foreground, background) => {
    const pattern = document.createElementNS(SVG_NS, 'pattern')
    pattern.setAttribute('id', id)

    const width = randomBetween(5, 20)
    const height = randomBetween(5, 20)
    pattern.setAttribute('width', width)
    pattern.setAttribute('height', height)
    pattern.setAttribute('patternUnits', 'userSpaceOnUse')
    pattern.setAttribute('patternTransform', `rotate(${randomBetween(0, 259)})`)

    const fill = document.createElementNS(SVG_NS, 'rect')
    fill.setAttribute('width', width)
    fill.setAttribute('height', height)
    fill.setAttribute('fill', background)
    pattern.appendChild(fill)

    const strokeWidth = randomBetween(1, width / 7)

    const zig = document.createElementNS(SVG_NS, 'line')
    zig.setAttribute('x1', 0)
    zig.setAttribute('x2', width / 2)
    zig.setAttribute('y1', 0)
    zig.setAttribute('y2', height)
    zig.setAttribute('stroke', foreground)
    zig.setAttribute('stroke-width', strokeWidth)
    pattern.appendChild(zig)

    const zag = document.createElementNS(SVG_NS, 'line')
    zag.setAttribute('x1', width / 2)
    zag.setAttribute('x2', width)
    zag.setAttribute('y1', height)
    zag.setAttribute('y2', 0)
    zag.setAttribute('stroke', foreground)
    zag.setAttribute('stroke-width', strokeWidth)
    pattern.appendChild(zag)

    return pattern
  },

  // Tartan.
  (id, foreground, background) => {
    const pattern = document.createElementNS(SVG_NS, 'pattern')
    pattern.setAttribute('id', id)

    const size = randomBetween(5, 20)
    pattern.setAttribute('width', size)
    pattern.setAttribute('height', size)
    pattern.setAttribute('patternUnits', 'userSpaceOnUse')
    pattern.setAttribute('patternTransform', `rotate(${randomBetween(0, 259)})`)

    const fill = document.createElementNS(SVG_NS, 'rect')
    fill.setAttribute('width', size)
    fill.setAttribute('height', size)
    fill.setAttribute('fill', background)
    pattern.appendChild(fill)

    for (let i = 0; i < randomBetween(1, 3); i++) {
      const line = document.createElementNS(SVG_NS, 'line')
      const position = randomBetween(0, size)
      line.setAttribute('x1', position)
      line.setAttribute('x2', position)
      line.setAttribute('y1', 0)
      line.setAttribute('y2', size)
      line.setAttribute('stroke', foreground)
      line.setAttribute('stroke-width', randomBetween(3, size / 10))
      pattern.appendChild(line)
    }

    for (let i = 0; i < randomBetween(1, 3); i++) {
      const line = document.createElementNS(SVG_NS, 'line')
      const position = randomBetween(0, size)
      line.setAttribute('x1', 0)
      line.setAttribute('x2', size)
      line.setAttribute('y1', position)
      line.setAttribute('y2', position)
      line.setAttribute('stroke', foreground)
      line.setAttribute('stroke-width', randomBetween(1, size / 10))
      pattern.appendChild(line)
    }

    return pattern
  },

  // Spots.
  (id, foreground, background) => {
    const pattern = document.createElementNS(SVG_NS, 'pattern')
    pattern.setAttribute('id', id)
  
    const size = randomBetween(3, 30)
    pattern.setAttribute('width', size)
    pattern.setAttribute('height', size)
    pattern.setAttribute('patternUnits', 'userSpaceOnUse')
    pattern.setAttribute('patternTransform', `rotate(${randomBetween(0, 259)})`)
  
    const fill = document.createElementNS(SVG_NS, 'rect')
    fill.setAttribute('width', size)
    fill.setAttribute('height', size)
    fill.setAttribute('fill', background)
    pattern.appendChild(fill)
  
    const circle = document.createElementNS(SVG_NS, 'circle')
    circle.setAttribute('cx', size / 2)
    circle.setAttribute('cy', size / 2)
    circle.setAttribute('r', randomBetween(size / 10, size/ 2 - 1))
    circle.setAttribute('fill', foreground)
    pattern.appendChild(circle)
  
    return pattern
  },

  // Chequerboard.
  (id, foreground, background) => {
    const pattern = document.createElementNS(SVG_NS, 'pattern')
    pattern.setAttribute('id', id)
  
    const width = randomBetween(3, 50)
    const height = randomBetween(3, 50)
    pattern.setAttribute('width', width)
    pattern.setAttribute('height', height)
    pattern.setAttribute('patternUnits', 'userSpaceOnUse')
    pattern.setAttribute('patternTransform', `rotate(${randomBetween(0, 259)})`)
  
    const fill = document.createElementNS(SVG_NS, 'rect')
    fill.setAttribute('width', width)
    fill.setAttribute('height', height)
    fill.setAttribute('fill', background)
    pattern.appendChild(fill)

    const checkWidth = width / 2
    const checkHeight = height / 2
    const check1 = document.createElementNS(SVG_NS, 'rect')
    check1.setAttribute('width', checkWidth)
    check1.setAttribute('height', checkHeight)
    check1.setAttribute('fill', foreground)
    pattern.appendChild(check1)

    const check2 = document.createElementNS(SVG_NS, 'rect')
    check2.setAttribute('width', checkWidth)
    check2.setAttribute('height', checkHeight)
    check2.setAttribute('x', checkWidth)
    check2.setAttribute('y', checkHeight)
    check2.setAttribute('fill', foreground)
    pattern.appendChild(check2)
  
    return pattern
  },

  // Squares.
  (id, foreground, background) => {
    const pattern = document.createElementNS(SVG_NS, 'pattern')
    pattern.setAttribute('id', id)
  
    const width = randomBetween(10, 50)
    const height = randomBetween(10, 50)
    pattern.setAttribute('width', width)
    pattern.setAttribute('height', height)
    pattern.setAttribute('patternUnits', 'userSpaceOnUse')
    pattern.setAttribute('patternTransform', `rotate(${randomBetween(0, 259)})`)
  
    const fill = document.createElementNS(SVG_NS, 'rect')
    fill.setAttribute('width', width)
    fill.setAttribute('height', height)
    fill.setAttribute('fill', background)
    pattern.appendChild(fill)

    const quadrantWidth = width / 2
    const quadrantHeight = height / 2
    const maxWidth = quadrantWidth * 0.9
    const maxHeight = quadrantHeight * 0.9

    for (let i = 0; i < 4; i++) {
      const rect = document.createElementNS(SVG_NS, 'rect')

      const rectWidth = randomBetween(1, maxWidth)
      const rectHeight = randomBetween(1, maxHeight)
      const x = (quadrantWidth / 2) - (rectWidth / 2) + getSegmentOffset(width, height, 2, i).x
      const y = (quadrantHeight / 2) - (rectHeight / 2)  + getSegmentOffset(width, height, 2, i).y

      rect.setAttribute('width', rectWidth)
      rect.setAttribute('height', rectHeight)
      rect.setAttribute('x', x)
      rect.setAttribute('y', y)
      rect.setAttribute('transform', `rotate(${randomBetween(0, 20)} ${rectWidth / 2} ${rectHeight / 2})`)
      rect.setAttribute('fill', foreground)
      pattern.appendChild(rect)
    }
  
    return pattern
  }
]

function getSegmentOffset (width, height, gridSize, offset) {
  const segmentWidth = width / gridSize
  const segmentHeight = height / gridSize
  const x = segmentWidth * (offset % gridSize)
  const y = segmentHeight * Math.floor(offset / gridSize)

  return { x, y }
}

function randomBetween (min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min
}

function randomisePoint (point, amount) {
  const shift = amount || 10

  const minX = point[0] - shift
  const maxX = point[0] + shift
  const minY = point[1] - shift
  const maxY = point[1] + shift

  return [randomBetween(minX, maxX), randomBetween(minY, maxY)]
}

function generateRandomisedPoints (points) {
  return points
    .map(point => randomisePoint(point))
    .map(point => point.join())
    .join(' ')
}

function generateRandomPolygon (template, fill) {
  const polygon = document.createElementNS(SVG_NS, 'polygon')
  polygon.setAttribute('points', generateRandomisedPoints(template))
  polygon.setAttribute('fill', fill)
  polygon.setAttribute('opacity', 0.85)

  return polygon
}

function shuffle (array) {
  const clone = array.slice()
  for (let i = clone.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))

    const temp = clone[i]
    clone[i] = clone[j]
    clone[j] = temp
  }

  return clone
}

function generateColourPairs () {
  const colours = tinycolor.random()
    .saturate(randomBetween(50, 90))
    .analogous(4)

  const complements = colours.map(colour => tinycolor(colour).complement())

  return colours.reduce((pairs, colour, i) => {
    return [...pairs, {
      foreground: i % 2 ? colours[i] : complements[i],
      background: i % 2 ? complements[i] : colours[i]
    }]
  }, [])
}

function generateTree () {
  const TRIANGLE_1 = [[100, 15], [70, 75], [130, 75]]
  const TRIANGLE_2 = [[100, 45], [55, 135], [145, 135]]
  const TRIANGLE_3 = [[100, 90], [32.5, 225], [167.5, 225]]
  const RECTANGLE = [[85, 157.5], [115, 157.5], [115, 285], [85, 285]]
  const TREE = [RECTANGLE, TRIANGLE_3, TRIANGLE_2, TRIANGLE_1]

  const treeSvg = document.createElementNS(SVG_NS, 'svg')
  treeSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  treeSvg.setAttribute('viewBox', '0 0 200 300')

  const colourPairs = generateColourPairs()

  const defs = document.createElementNS(SVG_NS, 'defs')
  const treePatterns = shuffle(patterns).slice(0, 3)
  for (let i = 1; i < 4; i++) {
    const pattern = treePatterns[i - 1]
    defs.appendChild(pattern(`pattern-${i}`, colourPairs[i].foreground, colourPairs[i].background))
  }
  treeSvg.appendChild(defs)

  treeSvg.appendChild(generateRandomPolygon(TREE[0], colourPairs[0].background))
  for (let i = 1; i < 4; i++) {
    treeSvg.appendChild(generateRandomPolygon(TREE[i], `url(#pattern-${i})`))
  }

  updateSaveLink(treeSvg.outerHTML)

  const container = document.querySelector('#tree')
  if (container.firstChild) container.removeChild(container.firstChild)
  container.appendChild(treeSvg)
}

// https://www.blustemy.io/making-svg-patterns-with-javascript/
function updateSaveLink(svg) {
  const link = document.querySelector('#save')
  const blob = new Blob([svg], { type: "image/svg+xml" })
  const url = window.URL.createObjectURL(blob);

  link.target = "_blank";
  link.download = "tree.svg";
  link.href = url;
}

// Generate and inject a new tree.
generateTree()
