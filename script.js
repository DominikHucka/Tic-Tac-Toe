let fields = [ // Felder 1-9 
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
]


function init() {
    render();
}


function render() {
    const contentDiv = document.getElementById('container');

    // Generate table HTML
    let tableHtml = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = generateBlinkingCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = generateBlinkingCrossSVG();
            }
            tableHtml += `<td>${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';
    contentDiv.innerHTML = tableHtml;
}


function generateBlinkingCircleSVG() {
    const circleSize = 70;
    const strokeWidth = 10;
    const blinkDuration = '1s';
    const blinkRepeatCount = '3';
  
    const svg = `<svg width="${circleSize}" height="${circleSize}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${circleSize / 2}" cy="${circleSize / 2}" r="${(circleSize - strokeWidth) / 2}" 
              stroke="rgb(251, 19, 73)" stroke-width="${strokeWidth}" fill="none">
        <animate attributeName="opacity" values="1;0;1" dur="${blinkDuration}" repeatCount="${blinkRepeatCount}" />
      </circle>
    </svg>`;
  
    return svg;
  }
  
  // Füge das generierte SVG-HTML in den DOM ein, beispielsweise in das Element mit der ID 'container'
  document.getElementById('container').innerHTML = blinkingCircleSVG;

  
function generateBlinkingCrossSVG() {
  const crossSize = 70;
  const strokeWidth = 10;
  const blinkDuration = '1s';
  const blinkRepeatCount = '3';

  const svg = `<svg width="${crossSize}" height="${crossSize}" xmlns="http://www.w3.org/2000/svg">
    <!-- Äußerer Rand -->
    <rect x="0" y="0" width="${crossSize}" height="${crossSize}" 
          fill="rgb(251, 19, 73)" />
    
    <!-- Innen leerer Bereich -->
    <line x1="${strokeWidth}" y1="${strokeWidth}" x2="${crossSize - strokeWidth}" y2="${crossSize - strokeWidth}" 
          stroke="none" stroke-width="${strokeWidth}">
      <animate attributeName="opacity" values="1;0;1" dur="${blinkDuration}" repeatCount="${blinkRepeatCount}" />
    </line>
    
    <line x1="${crossSize - strokeWidth}" y1="${strokeWidth}" x2="${strokeWidth}" y2="${crossSize - strokeWidth}" 
          stroke="none" stroke-width="${strokeWidth}">
      <animate attributeName="opacity" values="1;0;1" dur="${blinkDuration}" repeatCount="${blinkRepeatCount}" />
    </line>
  </svg>`;

  return svg;
}

// Rufe die Funktion auf, um den SVG-Code für das blinkende Kreuz zu generieren
// const blinkingCrossSVG = generateBlinkingCrossSVG();

// Füge das generierte SVG-HTML in den DOM ein, beispielsweise in das Element mit der ID 'container'
// document.getElementById('container').innerHTML = blinkingCrossSVG;
