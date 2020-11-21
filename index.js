import random from './utils/random.js'
import patterns from './utils/patterns.js'

const SVG_NS = 'http://www.w3.org/2000/svg'

// function generateColourPairs () {
//   const colours = tinycolor({
//     h: randomBetween(0, 360),
//     s: randomBetween(70, 90),
//     l: randomBetween(50, 70)
//   }).analogous(4)

//   const complements = colours.map(colour => tinycolor(colour).complement())

//   return colours.reduce((pairs, colour, i) => {
//     return [...pairs, {
//       foreground: i % 2
//         ? colours[i].spin(randomBetween(-10, 10))
//         : complements[i].spin(randomBetween(-10, 10)),
//       background: i % 2
//         ? complements[i].spin(randomBetween(-10, 10))
//         : colours[i].spin(randomBetween(-10, 10))
//     }]
//   }, [])
// }

function generateColourPairs () {
  const colours = [tinycolor('#000'), tinycolor('#000'), tinycolor('#000'), tinycolor('#000')]
  const complements = [tinycolor('#eee'), tinycolor('#eee'), tinycolor('#eee'), tinycolor('#eee')]

  return colours.reduce((pairs, colour, i) => {
    return [...pairs, {
      foreground: i % 2
        ? colours[i].spin(random.between(-10, 10))
        : complements[i].spin(random.between(-10, 10)),
      background: i % 2
        ? complements[i].spin(random.between(-10, 10))
        : colours[i].spin(random.between(-10, 10))
    }]
  }, [])
}

function generateTree () {
  const TRIANGLE_1 = [{ x: 100, y: 15 }, { x: 70, y: 75 }, { x: 130, y: 75 }]
  const TRIANGLE_2 = [{ x: 100, y: 45 }, { x: 55, y: 135 }, { x: 145, y: 135 }]
  const TRIANGLE_3 = [{ x: 100, y: 90 }, { x: 32.5, y: 225 }, { x: 167.5, y: 225 }]
  const RECTANGLE = [{ x: 85, y: 157.5 }, { x: 115, y: 157.5 }, { x: 115, y: 285 }, { x: 85, y: 285 }]
  const TREE = [RECTANGLE, TRIANGLE_3, TRIANGLE_2, TRIANGLE_1]

  const treeSvg = document.createElementNS(SVG_NS, 'svg')
  treeSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  treeSvg.setAttribute('viewBox', '0 0 200 300')

  const colourPairs = generateColourPairs()

  const defs = document.createElementNS(SVG_NS, 'defs')
  const treePatterns = random.shuffleArray(patterns).slice(0, 3)
  for (let i = 1; i < 4; i++) {
    const pattern = treePatterns[i - 1]
    defs.appendChild(pattern(`pattern-${i}`, colourPairs[i].foreground, colourPairs[i].background))
  }
  treeSvg.appendChild(defs)

  treeSvg.appendChild(random.polygon(TREE[0], colourPairs[0].background))
  for (let i = 1; i < 4; i++) {
    treeSvg.appendChild(random.polygon(TREE[i], `url(#pattern-${i})`))
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
document.getElementById('generate').onclick = generateTree
generateTree()
