const SVG_NS = 'http://www.w3.org/2000/svg'

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

function generateRandomPolygon (template, colour) {
  const polygon = document.createElementNS(SVG_NS, 'polygon')
  polygon.setAttribute('points', generateRandomisedPoints(template))
  polygon.setAttribute('fill', colour.foreground)
  
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

  // const colours = tinycolor.random().tetrad()
  const colourPairs = generateColourPairs()
  console.log(colourPairs)

  TREE.forEach((shape, i) => {
    treeSvg.appendChild(generateRandomPolygon(shape, colourPairs[i]))
  })

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