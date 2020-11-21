import random from './random.js'
import svg from './svg.js'

function getSegmentOffset (width, height, columns, rows, offset) {
  const segmentWidth = width / columns
  const segmentHeight = height / rows
  const x = segmentWidth * (offset % columns)
  const y = segmentHeight * Math.floor(offset / columns)

  return { x, y }
}

function abacus (id, foreground, background) {
  const lines = random.intBetween(3, 5)
  const width = random.between(20, 40)
  const height = 10 * lines
  
  const pattern = svg.createElement('pattern', {
    id,
    width,
    height,
    patternUnits: 'userSpaceOnUse',
    patternTransform: `rotate(${random.between(0, 360)})`
  })
  
  pattern.appendChild(svg.createElement('rect', {
    width,
    height,
    fill: background
  }))

  for (let i = 0; i < lines; i++) {
    const strokeWidth = random.between(1, 2)

    // Get the centre of the current band of 10 units, and wiggle a bit.
    const linePos = random.wiggle((10 * (i + 1)) - 5, 1)

    pattern.appendChild(svg.createElement('line', {
      x1: 0,
      x2: width,
      y1: linePos,
      y2: linePos,
      stroke: foreground,
      'stroke-width': strokeWidth
    }))
    
    const circles = random.intBetween(2, 3)
    const space = width / circles 
    const start = space / 2
    
    for (let j = 0; j < circles; j++) {
      const radius = random.between((strokeWidth / 2) + 1, 2.5)
      const circlePosition = random.wiggle(start + (space * j), start - radius)
  
      pattern.appendChild(svg.createElement('circle', {
        cx: circlePosition,
        cy: linePos,
        r: radius,
        fill: foreground,
      }))
    }
  }

  return pattern
}

function chequerboard (id, foreground, background) {
  const width = random.between(3, 50)
  const height = random.between(3, 50)
  const checkWidth = width / 2
  const checkHeight = height / 2

  const pattern = svg.createElement('pattern', {
    id,
    width,
    height,
    patternUnits: 'userSpaceOnUse',
    patternTransform: `rotate(${random.between(0, 360)})`
  })

  const fill = svg.createElement('rect', {
    width,
    height,
    fill: background
  })
  
  const check1 = svg.createElement('rect', {
    width: checkWidth,
    height: checkHeight,
    fill: foreground
  })

  const check2 = svg.createElement('rect', {
    width: checkWidth,
    height: checkHeight,
    x: checkWidth,
    y: checkHeight,
    fill: foreground
  })
  
  pattern.appendChild(fill)
  pattern.appendChild(check1)
  pattern.appendChild(check2)

  return pattern
}

function confetti (id, foreground, background) {
  const width = random.between(20, 50)
  const height = random.between(20, 50)
  const scale = random.between(5, (Math.min(width, height) / 3))
  const columns = Math.floor(width / scale)
  const rows = Math.floor(height / scale)
  const segmentWidth = width / columns
  const segmentHeight = height / rows
  const minWidth = segmentWidth * 0.4
  const minHeight = segmentHeight * 0.1
  const maxWidth = segmentWidth * 0.7
  const maxHeight = segmentHeight * 0.3
  
  const pattern = svg.createElement('pattern', {
    id,
    width,
    height,
    patternUnits: 'userSpaceOnUse',
    patternTransform: `rotate(${random.between(0, 360)})`
  })
   
  pattern.appendChild(svg.createElement('rect', {
    width,
    height,
    fill: background
  }))
  
  for (let i = 0; i < rows * columns; i++) {
    const segment = getSegmentOffset(width, height, columns, rows, i)
    const rectWidth = random.between(minWidth, maxWidth)
    const rectHeight = random.between(minHeight, maxHeight)
    const x = (segmentWidth / 2) - (rectWidth / 2) + segment.x
    const y = (segmentHeight / 2) - (rectHeight / 2)  + segment.y
    
    pattern.appendChild(svg.createElement('rect', {
      width: rectWidth,
      height: rectHeight,
      x,
      y,
      fill: foreground,
      transform: `rotate(${random.between(0, 45)} ${x + (rectWidth / 2)} ${y + (rectHeight / 2)})`
    }))
  }
  
  return pattern
}

function spots (id, foreground, background) {
  const size = random.between(3, 30)
  
  const pattern = svg.createElement('pattern', {
    id,
    width: size,
    height: size,
    patternUnits: 'userSpaceOnUse',
    patternTransform: `rotate(${random.between(0, 360)})`
  })
  
  pattern.appendChild(svg.createElement('rect', {
    width: size,
    height: size,
    fill: background
  }))
 
  pattern.appendChild(svg.createElement('circle', {
    cx: size / 2,
    cy: size / 2,
    r: random.between(size / 10, size/ 2 - 1),
    fill: foreground
  }))

  return pattern
}

function speckles (id, foreground, background) {
  const width = random.between(50, 100)
  const height = random.between(50, 100)
  const scale = random.between(5, (Math.min(width, height) / 5))
  const columns = Math.floor(width / scale)
  const rows = Math.floor(height / scale)
  const segmentWidth = width / columns
  const segmentHeight = height / rows
  const centreToEdge = (Math.min(segmentWidth, segmentHeight) / 2)
  const minRadius = centreToEdge * 0.2
  const maxRadius = centreToEdge * 0.5
  const segmentMidpoint = {
    x: segmentWidth / 2,
    y: segmentHeight / 2
  }

  const pattern = svg.createElement('pattern', {
    id,
    width: width,
    height: height,
    patternUnits: 'userSpaceOnUse',
    patternTransform: `rotate(${random.between(0, 360)})`
  })

  pattern.appendChild(svg.createElement('rect', {
    width: width,
    height: height,
    fill: background
  }))

  for (let i = 0; i < rows * columns; i++) {
    const segment = getSegmentOffset(width, height, columns, rows, i)
    const radius = random.between(minRadius, maxRadius)
    const midPoint = random.wigglePoint({
      x: segment.x + segmentMidpoint.x,
      y: segment.y + segmentMidpoint.y
    }, centreToEdge - radius - 1)

    pattern.appendChild(svg.createElement('circle', {
      cx: midPoint.x,
      cy: midPoint.y,
      r: radius,
      fill: foreground
    }))
  }

  return pattern
}

function squares (id, foreground, background) {
  const size = random.between(30, 60)
  const scale = random.between(10, (size / 3))
  const columns = Math.floor(size / scale)
  const segmentSize = size / columns
  const minSize = segmentSize * 0.2
  const maxSize = segmentSize * 0.5
  
  const pattern = svg.createElement('pattern', {
    id,
    width: size,
    height: size,
    patternUnits: 'userSpaceOnUse',
    patternTransform: `rotate(${random.between(0, 360)})`
  })
   
  pattern.appendChild(svg.createElement('rect', {
    width: size,
    height: size,
    fill: background
  }))
  
  const baseSquareSize = random.between(minSize, maxSize)
  
  for (let i = 0; i < columns * columns; i++) {
    const segment = getSegmentOffset(size, size, columns, columns, i)
    const squareSize = random.between(baseSquareSize * 0.9, baseSquareSize * 1.1)
    const x = (segmentSize / 2) - (squareSize / 2) + segment.x
    const y = (segmentSize / 2) - (squareSize / 2)  + segment.y
    
    pattern.appendChild(svg.createElement('rect', {
      width: squareSize,
      height: squareSize,
      x,
      y,
      fill: foreground,
      transform: `rotate(${random.between(0, 30)} ${x + (squareSize / 2)} ${y + (squareSize / 2)})`
    }))
  }
  
  return pattern
}

function squiggles (id, foreground, background) {
  const radius = random.between(5, 10)
  const strokeWidth = random.between(1, radius / 3)
  const innerRadius = radius - strokeWidth / 2
  const width = (radius * 4) - (strokeWidth * 2)
  const height = radius * random.between(2, 4)

  const pattern = svg.createElement('pattern', {
    id,
    width: width,
    height: height,
    patternUnits: 'userSpaceOnUse',
    patternTransform: `rotate(${random.between(0, 360)})`
  })

  pattern.appendChild(svg.createElement('rect', {
    width: width,
    height: height,
    fill: background
  }))
  
  pattern.appendChild(svg.createElement('circle', {
    cx: 0,
    cy: 0,
    r: innerRadius,
    fill: 'none',
    stroke: foreground,
    'stroke-width': strokeWidth
  }))
  
  pattern.appendChild(svg.createElement('circle', {
    cx: (radius * 2) - strokeWidth,
    cy: height,
    r: innerRadius,
    fill: 'none',
    stroke: foreground,
    'stroke-width': strokeWidth
  }))
  
  pattern.appendChild(svg.createElement('circle', {
    cx: width,
    cy: 0,
    r: innerRadius,
    fill: 'none',
    stroke: foreground,
    'stroke-width': strokeWidth
  }))

  return pattern
}

function stripes (id, foreground, background) {
  const width = random.between(5, 20)
  const height = 10
  const position = random.between(0, width)
  
  const pattern = svg.createElement('pattern', {
    id,
    width,
    height,
    patternUnits: 'userSpaceOnUse',
    patternTransform: `rotate(${random.between(0, 360)})`
  })
  
  const fill = svg.createElement('rect', {
    width,
    height,
    fill: background
  })
  pattern.appendChild(fill)

  const line = svg.createElement('line', {
    x1: position,
    x2: position,
    y1: 0,
    y2: height,
    stroke: foreground,
    'stroke-width': random.between(3, width - 1)
  })
  pattern.appendChild(line)

  return pattern
}

function stars (id, foreground, background) {
  const size = random.between(10, 40)
  const points = random.intBetween(5, 9)
  const midPoint = size / 2
  const padding = random.between(size * 0.1, size * 0.2)
  const triangleWidth = random.between(size * 0.1, size * 0.3)
  
  const pattern = svg.createElement('pattern', {
    id,
    width: size,
    height: size,
    patternUnits: 'userSpaceOnUse',
    patternTransform: `rotate(${random.between(0, 360)})`
  })
  
  pattern.appendChild(svg.createElement('rect', {
    width: size,
    height: size,
    fill: background
  }))

  const rotation = 360 / points
  for (let i = 0; i < points; i++) {
    const bottomLeft = `${midPoint - (triangleWidth / 2)} ${midPoint}`
    const bottomRight = `${midPoint + (triangleWidth / 2)} ${midPoint}`
    const topCentre = `${midPoint} ${padding}`

    pattern.appendChild(svg.createElement('polygon', {
      points: `${bottomLeft}, ${topCentre}, ${bottomRight}`,
      fill: foreground,
      transform: `rotate(${rotation * i} ${midPoint} ${midPoint})`
    }))
  }

  return pattern
}

function target (id, foreground, background) {
  const size = random.between(10, 30)
  const rings = random.between(1, 3)
  
  const pattern = svg.createElement('pattern', {
    id,
    width: size,
    height: size,
    patternUnits: 'userSpaceOnUse',
    patternTransform: `rotate(${random.between(0, 360)})`
  })
  
  pattern.appendChild(svg.createElement('rect', {
    width: size,
    height: size,
    fill: background
  }))
  
  const cx = size / 2
  const cy = size / 2
  const maxRadius = random.between((size * 0.7), (size * 0.5)) / 2
 
  // Outer circle.
  pattern.appendChild(svg.createElement('circle', {
    cx,
    cy,
    r: maxRadius,
    fill: 'none',
    stroke: foreground
  }))

  for (let i = 0; i < rings; i++) {
    pattern.appendChild(svg.createElement('circle', {
      cx,
      cy,
      r: random.between(maxRadius * 0.2, maxRadius * 0.9),
      fill: 'none',
      stroke: foreground
    }))
  }

  return pattern
}

function tartan (id, foreground, background) {
  const size = random.between(5, 20)
  
  const pattern = svg.createElement('pattern', {
    id,
    width: size,
    height: size,
    patternUnits: 'userSpaceOnUse',
    patternTransform: `rotate(${random.between(0, 360)})`
  })
 
  pattern.appendChild(svg.createElement('rect', {
    width: size,
    height: size,
    fill: background
  }))

  for (let i = 0; i < random.between(1, 3); i++) {
    const position = random.between(0, size)

    pattern.appendChild(svg.createElement('line', {
      x1: position,
      x2: position,
      y1: 0,
      y2: size,
      stroke: foreground,
      'stroke-width': random.between(3, size / 10)
    }))
  }
  
  for (let i = 0; i < random.between(1, 3); i++) {
    const position = random.between(0, size)

    pattern.appendChild(svg.createElement('line', {
      x1: 0,
      x2: size,
      y1: position,
      y2: position,
      stroke: foreground,
      'stroke-width': random.between(1, size / 10)
    }))
  }

  return pattern
}

function triangles (id, foreground, background) {
  const width = random.between(30, 30)
  const height = random.between(10, 30)
  
  const pattern = svg.createElement('pattern', {
    id,
    width,
    height,
    patternUnits: 'userSpaceOnUse',
    patternTransform: `rotate(${random.between(0, 360)})`
  })
   
  pattern.appendChild(svg.createElement('rect', {
    width,
    height,
    fill: background
  }))
  
  const length = Math.max(width, height)
  const padding = random.between(length * 0.05, length * 0.1)
  // const padding = 0

  const topLeft = `${padding * 2} ${padding}`
  const topRight = `${width - (padding * 2)} ${padding}`
  const topCentre = `${width / 2} ${padding}`
  const bottomLeft = `${padding * 2} ${height - padding}`
  const bottomRight = `${width - (padding * 2)} ${height - padding}`
  const bottomCentre = `${width / 2} ${height - padding}`
  
  pattern.appendChild(svg.createElement('polygon', {
    points: `${bottomLeft}, ${topCentre}, ${bottomRight}`,
    fill: foreground,
  }))

  pattern.appendChild(svg.createElement('polygon', {
    points: `${topLeft}, ${bottomCentre}, ${topRight}`,
    fill: foreground,
    transform: `translate(-${width / 2})`
  }))
  
  pattern.appendChild(svg.createElement('polygon', {
    points: `${topLeft}, ${bottomCentre}, ${topRight}`,
    fill: foreground,
    transform: `translate(${width / 2})`
  }))
  
  return pattern
}

function variedStripes (id, foreground, background) {
  const size = random.between(20, 40)
  const lines = random.between(3, 6)
  
  const pattern = svg.createElement('pattern', {
    id,
    width: size,
    height: size,
    patternUnits: 'userSpaceOnUse',
    patternTransform: `rotate(${random.between(0, 360)})`
  })
  
  pattern.appendChild(svg.createElement('rect', {
    width: size,
    height: size,
    fill: background
  }))

  for (let i = 0; i < lines; i++) {
    const position = random.between(0, size)

    const line = svg.createElement('line', {
      x1: position,
      x2: position,
      y1: 0,
      y2: size,
      stroke: foreground,
      'stroke-width': random.between(2, 5)
    })
    pattern.appendChild(line)
  }
  

  return pattern
}

function waves (id, foreground, background) {
  const strokeWidth = random.between(1, 2)
  const width = random.between(5, 40)
  const height = random.between(5, 30)
  const midpoint = height / 2
  const waveHeight = random.between(height * 0.7, height * 0.9) - strokeWidth
  const waveMidpoint = width / 4 // middle of the first wave

  const d = `M 0 ${midpoint}` +
    `Q ${waveMidpoint} ${midpoint - waveHeight}, ${width / 2} ${midpoint}` +
    `T ${width} ${midpoint}` +
    `T ${width + width / 2} ${midpoint}`

  const pattern = svg.createElement('pattern', {
    id,
    width: width,
    height: height,
    patternUnits: 'userSpaceOnUse',
    patternTransform: `rotate(${random.between(0, 360)})`
  })

  pattern.appendChild(svg.createElement('rect', {
    width,
    height,
    fill: background
  }))

  pattern.appendChild(svg.createElement('path', {
    d,
    fill: 'none',
    stroke: foreground,
    'stroke-width': strokeWidth,
    transform: `translate(-${waveMidpoint})` // This adjusts unseemly edges.
  }))

  return pattern
}

function zigzags (id, foreground, background) {
  const width = random.between(5, 20)
  const height = random.between(5, 20)
  const strokeWidth = random.between(1, width / 7)
  
  const pattern = svg.createElement('pattern', {
    id,
    width,
    height,
    patternUnits: 'userSpaceOnUse',
    patternTransform: `rotate(${random.between(0, 360)})`
  })

  pattern.appendChild(svg.createElement('rect', {
    width,
    height,
    fill: background
  }))

  pattern.appendChild(svg.createElement('line', {
    x1: 0,
    x2: width / 2,
    y1: 0,
    y2: height,
    stroke: foreground,
    'stroke-width': strokeWidth
  }))

  pattern.appendChild(svg.createElement('line', {
    x1: width / 2,
    x2: width,
    y1: height,
    y2: 0,
    stroke: foreground,
    'stroke-width': strokeWidth
  }))

  return pattern
}

export default [
  abacus,
  chequerboard,
  confetti,
  speckles,
  spots,
  squares,
  squiggles,
  stars,
  stripes,
  target,
  tartan,
  triangles,
  variedStripes,
  waves,
  zigzags,
]
