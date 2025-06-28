window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

function encrypt() {
  const input = document.getElementById("inputText").value;
  const output = btoa(input);
  showOutput(output);
}

function decrypt() {
  const input = document.getElementById("inputText").value;
  try {
    const output = atob(input);
    showOutput(output);
} catch {
    showOutput("❌ Invalid encoded string");
}
}

function showOutput(text) {
  const out = document.getElementById("outputText");
  out.innerText = text;
  changeFont();
}

function changeFont() {
  const font = document.getElementById("fontSelect").value;
  document.getElementById("outputText").style.fontFamily = font;
}

function copyStyledText() {
  copyFromElement("outputText");
}

const styles = {
  bold: { A: 0x1D400, a: 0x1D41A},
  italic: { A: 0x1D434, a: 0x1D44E},
  script: { A: 0x1D49C, a: 0x1D4B6},
  fraktur: { A: 0x1D504, a: 0x1D51E},
  double: { A: 0x1D538, a: 0x1D552}
};

function updateStyledOutput() {
  const text = document.getElementById("styleInput").value;
  const styleName = document.getElementById("styleFontSelect").value;
  const map = styles[styleName];
  let result = "";

  for (let ch of text) {
    const code = ch.charCodeAt(0);
    if (code>= 65 && code <= 90) {
      result += String.fromCodePoint(map.A + (code - 65));
} else if (code>= 97 && code <= 122) {
      result += String.fromCodePoint(map.a + (code - 97));
} else {
      result += ch;
}
}

  const output = document.getElementById("styledOutput");
  output.innerText = result;
}

function copyStyledOutput() {
  copyFromElement("styledOutput");
}

function copyFromElement(id) {
  const output = document.getElementById(id);
  const range = document.createRange();
  range.selectNodeContents(output);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  try {
    document.execCommand("copy");
    alert("✅ Copied to clipboard!");
} catch {
    alert("❌ Copy failed.");
}
  sel.removeAllRanges();
}
