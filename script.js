let AUDIO_START_SCREEN = new Audio('sounds/startScreen.mp3')


let fields = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];


let WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
  [0, 4, 8], [2, 4, 6], // diagonal
];


let currentPlayer = 'circle';


function init() {
  startGame();
  render();
}


function render() {
  let contentDiv = document.getElementById('content');
  
  let tableHtml = '<table>'; // generiert HTML <tabel></tabel>
  for (let i = 0; i < 3; i++) {
      tableHtml += '<tr>';
      for (let j = 0; j < 3; j++) {
          let index = i * 3 + j;
          let symbol = '';
          if (fields[index] === 'circle') {
              symbol = generateCircleSVG();
          } else if (fields[index] === 'cross') {
              symbol = generateCrossSVG();
          }
          tableHtml += `<td class="d-none" onclick="handleClick(this, ${index})">${symbol}</td>`;
      }
      tableHtml += '</tr>';
  }
  tableHtml += '</table>';
  
  contentDiv.innerHTML = tableHtml; // fügt dem content Container das HTML tag table hinzu 
}


function startGame() {
  let startScreen = document.getElementById('startScreen');
  startScreen.innerHTML = '';
  startScreen.innerHTML = generateStartScreenHTML();
}


function generateStartScreenHTML() {
  return /*html*/`
    <div class="start-screen">
      <h1>TIC TAC TOE</h1>
      <button id="playButton" class="play-button">Let's Play</button>
    </div>
  `
}


function handleClick(cell, index) {
  if (fields[index] === null) {
      fields[index] = currentPlayer;
      cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
      cell.onclick = null;
      currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
      if (isGameFinished()) {
          let winCombination = getWinningCombination();
          drawWinningLine(winCombination);
      }
  }
}


function isGameFinished() { // Überptüft, ob das Spiel beednet ist.
  return fields.every((field) => field !== null) || getWinningCombination() !== null;
}


function getWinningCombination() {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      let [a, b, c] = WINNING_COMBINATIONS[i];
      if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) {
          return WINNING_COMBINATIONS[i];
      }
  }
  return null;
}


function generateCircleSVG() {
  let color = '#ddeef6';
  let width = 70;
  let height = 70;

  return `<svg width="${width}" height="${height}">
            <circle cx="35" cy="35" r="30" stroke="${color}" stroke-width="15" fill="none">
              <animate attributeName="stroke-dasharray" from="0 188.5" to="188.5 0" dur="0.2s" fill="freeze" />
            </circle>
          </svg>`;
}


function generateCrossSVG() {
  let color = '#ff0000';
  let width = 70;
  let height = 70;

  let svgHtml = `
    <svg width="${width}" height="${height}">
      <line x1="0" y1="0" x2="${width}" y2="${height}"
        stroke="${color}" stroke-width="15">
        <animate attributeName="x2" values="0; ${width}" dur="200ms" />
        <animate attributeName="y2" values="0; ${height}" dur="200ms" />
      </line>
      <line x1="${width}" y1="0" x2="0" y2="${height}"
        stroke="${color}" stroke-width="15">
        <animate attributeName="x2" values="${width}; 0" dur="200ms" />
        <animate attributeName="y2" values="0; ${height}" dur="200ms" />
      </line>
    </svg>
  `;

  return svgHtml;
}


function drawWinningLine(combination) {
  let lineColor = '#ffffff';
  let lineWidth = 10;


  let startCell = document.querySelectorAll(`td`)[combination[0]];
  let endCell = document.querySelectorAll(`td`)[combination[2]];
  let startRect = startCell.getBoundingClientRect();
  let endRect = endCell.getBoundingClientRect();


  let contentRect = document.getElementById('content').getBoundingClientRect();


  let lineLength = Math.sqrt(
      Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
  );
  let lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);


  let line = document.createElement('div');
  line.style.position = 'absolute';
  line.style.width = `${lineLength}px`;
  line.style.height = `${lineWidth}px`;
  line.style.backgroundColor = lineColor;
  line.style.top = `${ startRect.top + startRect.height / 2 - lineWidth / 2 } px`;
  line.style.left = `${ startRect.left + startRect.width / 2 } px`;
  line.style.transform = `rotate(${ lineAngle }rad)`;
  line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top}px`;
  line.style.left = `${startRect.left + startRect.width / 2 - contentRect.left}px`;
  line.style.transform = `rotate(${lineAngle}rad)`;
  line.style.transformOrigin = `top left`;
  line.classList.add('blink-animation');
  document.getElementById('content').appendChild(line);
}






