const intersperseInput = document.getElementById('intersperse-input');
const fullTextInput = document.getElementById('full-text-input');
const renderedOutput = document.getElementById('rendered-output');
const rawHtml = document.getElementById('raw-html');
const styleTypeRadios = document.getElementsByName('style-type');

function handleInput(e) {
    intersperse(intersperseInput.value, fullTextInput.value, getStyleName());
}

function getStyleName() {
    for (let radio of styleTypeRadios) {
        if (radio.checked) {
            return radio.value;
        }
    }

    return 'b';
}

function intersperse(partial = '', full = '', styleName) {
    const output = [];

    for (let fullTextIdx = 0, partialTextIdx = 0; fullTextIdx < full.length;) {
        if (partialTextIdx >= partial.length) {
            output.push(full.substring(fullTextIdx));
            break;
        }

        if (partial[partialTextIdx] === ' ') {
            partialTextIdx++;
        }
        else if (full[fullTextIdx].localeCompare(partial[partialTextIdx], 'en', {sensitivity: 'base'}) === 0) {
            output.push(`<${styleName}>`);
            output.push(full[fullTextIdx]);
            output.push(`</${styleName}>`);
            partialTextIdx++;
            fullTextIdx++;
        }
        else {
            output.push(full[fullTextIdx]);
            fullTextIdx++;
        }
    }

    const composed = output.join('') || 'Enter some text above!';
    renderedOutput.innerHTML = composed;
    rawHtml.value = composed;
}

intersperseInput.addEventListener('keyup', handleInput);
fullTextInput.addEventListener('keyup', handleInput);
styleTypeRadios.forEach(r => r.addEventListener('change', handleInput));