const SVG_NS = 'http://www.w3.org/2000/svg'

function setAttributes (element, attributes) {
	Object.keys(attributes).forEach(name => {
		element.setAttribute(name, attributes[name])
	})
}

function createSvgElement (tag, attributes) {
	const svgElement = document.createElementNS('http://www.w3.org/2000/svg', tag)
	setAttributes(svgElement, attributes)
	return svgElement
}

export default {
  createElement: createSvgElement
}
