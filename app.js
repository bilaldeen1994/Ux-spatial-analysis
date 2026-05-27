const inputArea = document.getElementById('raw-input');
const canvas = document.getElementById('output-canvas');
const btnRedact = document.getElementById('btn-redact');
const btnClear = document.getElementById('btn-clear');

const barDensity = document.getElementById('bar-density');
const valDensity = document.getElementById('val-density');
const valLoad = document.getElementById('val-load');
const valChunk = document.getElementById('val-chunk');

btnRedact.addEventListener('click', () => {
    const txt = inputArea.value.trim();
    if (!txt) return;

    canvas.innerHTML = '';
    const lines = txt.split('\n').filter(l => l.trim() !== '');
    
    let totalChars = 0;
    let structuralElements = 0;

    lines.forEach((line) => {
        totalChars += line.length;
        structuralElements++;

        const block = document.createElement('div');
        block.className = 'redacted-block';
        block.textContent = line;
        canvas.appendChild(block);

        if (line.length > 40) {
            const note = document.createElement('div');
            note.className = 'annotation-marker';
            note.textContent = `[Heuristic Warning: High continuous text block (${line.length} chars). Structural layout risk for scanning patterns.]`;
            canvas.appendChild(note);
        }
    });

    const densityScore = Math.min(Math.round((totalChars / (structuralElements * 60)) * 100), 100);
    
    barDensity.style.width = `${densityScore}%`;
    valDensity.textContent = `${densityScore}%`;

    if (densityScore > 75) {
        valLoad.textContent = 'High / Critical';
        valLoad.className = 'value text-red';
        valChunk.textContent = 'Poor Spatial Buffering';
    } else if (densityScore > 40) {
        valLoad.textContent = 'Moderate / Acceptable';
        valLoad.className = 'value text-orange';
        valChunk.textContent = 'Standard Cluster Grouping';
    } else {
        valLoad.textContent = 'Optimal / Low Burden';
        valLoad.className = 'value text-green';
        valChunk.textContent = 'Excellent Micro-Spacings';
    }
});

btnClear.addEventListener('click', () => {
    inputArea.value = '';
    canvas.innerHTML = '<div class="canvas-placeholder">Isolated UI structural canvas will render here</div>';
    barDensity.style.width = '0%';
    valDensity.textContent = '0%';
    valLoad.textContent = 'Optimal';
    valLoad.className = 'value text-green';
    valChunk.textContent = '—';
});
