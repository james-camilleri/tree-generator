const SVG_NS = 'http://www.w3.org/2000/svg'

function randomBetween (min, max) {
  return Math.random() * (max - min) + min
}

function randomIntBetween (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateRandomisedPoints (points) {
  return points
    .map(point => wigglePoint(point))
    .map(point => `${point.x},${point.y}`)
    .join(' ')
}

function generateRandomPolygon (template, fill) {
  const polygon = document.createElementNS(SVG_NS, 'polygon')
  polygon.setAttribute('points', generateRandomisedPoints(template))
  polygon.setAttribute('fill', fill)
  polygon.setAttribute('opacity', 0.9)

  return polygon
}

function shuffleArray (array) {
  const clone = array.slice()
  for (let i = clone.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))

    const temp = clone[i]
    clone[i] = clone[j]
    clone[j] = temp
  }

  return clone
}

function wiggle (value, amount) {
  const wiggle = randomBetween(0, amount)
  const direction = Math.random() >= 0.5 ? 1 : -1

  return value + (wiggle * direction)
}

function wigglePoint (point, amount) {
  const shift = amount || 10

  return {
    x: wiggle(point.x, shift),
    y: wiggle(point.y, shift)
  }
}

export default {
  between: randomBetween,
  intBetween: randomIntBetween,
  points: generateRandomisedPoints,
  polygon: generateRandomPolygon,
  shuffleArray,
  wiggle,
  wigglePoint
}
