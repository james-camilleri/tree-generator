const SVG_NS = 'http://www.w3.org/2000/svg'

const patterns = [
  (id, foreground, background) => {
    const pattern = document.createElementNS(SVG_NS, 'pattern')
    pattern.setAttribute('id', id)

    const width = randomBetween(1, 20)
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
    line.setAttribute('stroke-width', randomBetween(1, width - 1))
    pattern.appendChild(line)

    return pattern
  },

  (id, foreground, background) => {
    const pattern = document.createElementNS(SVG_NS, 'pattern')
    pattern.setAttribute('id', id)

    const size = randomBetween(3, 50)
    pattern.setAttribute('width', size)
    pattern.setAttribute('height', size)
    pattern.setAttribute('patternUnits', 'userSpaceOnUse')

    const fill = document.createElementNS(SVG_NS, 'rect')
    fill.setAttribute('width', size)
    fill.setAttribute('height', size)
    fill.setAttribute('fill', background)
    pattern.appendChild(fill)

    const circle = document.createElementNS(SVG_NS, 'circle')
    circle.setAttribute('cx', size / 2)
    circle.setAttribute('cy', size / 2)
    circle.setAttribute('r', randomBetween(1, size/ 2 - 1))
    circle.setAttribute('fill', foreground)
    pattern.appendChild(circle)

    return pattern
  }
]

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
  polygon.setAttribute('opacity', 0.8)

  return polygon
}

function shuffle (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))

    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  return array
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
  for (let i = 1; i < 4; i++) {
    const pattern = patterns[randomBetween(0, patterns.length - 1)]
    defs.appendChild(pattern(`pattern-${i}`, colourPairs[i].foreground, colourPairs[i].background))
  }
  treeSvg.appendChild(defs)

  treeSvg.appendChild(generateRandomPolygon(TREE[0], colourPairs[0].background))
  for (let i = 1; i < 4; i++) {
    treeSvg.appendChild(generateRandomPolygon(TREE[i], `url(#pattern-${i})`))
  }

  document.querySelector('#tree').appendChild(treeSvg)
}

// https://www.blustemy.io/making-svg-patterns-with-javascript/
// exportAsSvgFile(clickedLinkElement) {
//   const blob = new Blob([this.svgString], {
//             type: "image/svg+xml"
//         }),
//         url = window.URL.createObjectURL(blob);

//   clickedLinkElement.target = "_blank";
//   clickedLinkElement.download = "Patterns.svg";
//   clickedLinkElement.href = url;
// }

// Generate and inject a new tree.
generateTree()
