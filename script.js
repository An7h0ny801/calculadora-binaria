function refreshAll() {
  document.getElementById("bin1").value = "";
  document.getElementById("bin2").value = "";
  document.getElementById("result").innerHTML = "";
}

function calculate() {
  let bin1 = document.getElementById("bin1").value.trim();
  let bin2 = document.getElementById("bin2").value.trim();
  let op = document.getElementById("operation").value;
  let resultDiv = document.getElementById("result");

  if (!/^[01]+$/.test(bin1) || !/^[01]+$/.test(bin2)) {
    resultDiv.innerHTML = "<p style='color:red'>⚠️ Solo se permiten números binarios (0 y 1).</p>";
    return;
  }

  let dec1 = parseInt(bin1, 2);
  let dec2 = parseInt(bin2, 2);
  let resultDec, resultBin, details = "";

  switch (op) {
    case "add":
      resultBin = binaryAdd(bin1, bin2);
      resultDec = parseInt(resultBin, 2);
      details = `${dec1} + ${dec2} = ${resultDec} (Base 10) = ${resultBin} (Binario)`;
      break;

    case "sub":
      resultBin = binarySub(bin1, bin2);
      resultDec = parseInt(resultBin, 2);
      details = `${dec1} - ${dec2} = ${resultDec} (Base 10) = ${resultBin} (Binario)`;
      break;

    case "mul":
      resultBin = binaryMul(bin1, bin2);
      resultDec = parseInt(resultBin, 2);
      details = `${dec1} × ${dec2} = ${resultDec} (Base 10) = ${resultBin} (Binario)`;
      break;

    case "div":
      let { quotient, remainder } = binaryDiv(bin1, bin2);
      if (quotient === null) {
        resultDiv.innerHTML = "<p style='color:red'>❌ No se puede dividir entre 0.</p>";
        return;
      }
      let qDec = parseInt(quotient, 2);
      let rDec = parseInt(remainder, 2);
      let qFloat = dec1 / dec2;

      details = `${dec1} ÷ ${dec2} = ${qFloat} (Base 10) = ${(qFloat).toString(2)} (Binario)<br>
                 Cociente: ${qDec} (Base 10) = ${quotient} (Binario)<br>
                 Resto: ${rDec} (Base 10) = ${remainder} (Binario)`;
      break;
  }

  resultDiv.innerHTML = `
    <h2>Cálculo completo:</h2>
    <p>${bin1} = ${dec1} (Base 10)</p>
    <p>${bin2} = ${dec2} (Base 10)</p>
    <p>${details}</p>
  `;
}

// --- Suma binaria ---
function binaryAdd(a, b) {
  let res = "";
  let carry = 0;

  a = a.split("").reverse();
  b = b.split("").reverse();
  let n = Math.max(a.length, b.length);

  for (let i = 0; i < n; i++) {
    let bit1 = parseInt(a[i] || "0");
    let bit2 = parseInt(b[i] || "0");

    let sum = bit1 + bit2 + carry;
    res = (sum % 2) + res;
    carry = Math.floor(sum / 2);
  }

  if (carry) res = "1" + res;
  return res.replace(/^0+(?!$)/, "");
}

// --- Resta binaria ---
function binarySub(a, b) {
  let decA = parseInt(a, 2);
  let decB = parseInt(b, 2);
  let res = decA - decB;
  return res.toString(2);
}

// --- Multiplicación binaria ---
function binaryMul(a, b) {
  let decA = parseInt(a, 2);
  let decB = parseInt(b, 2);
  return (decA * decB).toString(2);
}

// --- División binaria ---
function binaryDiv(a, b) {
  let decA = parseInt(a, 2);
  let decB = parseInt(b, 2);
  if (decB === 0) return { quotient: null, remainder: null };

  let q = Math.floor(decA / decB).toString(2);
  let r = (decA % decB).toString(2);
  return { quotient: q, remainder: r };
}


function createSnow() {
  const snow = document.createElement("div");
  snow.classList.add("snowflake");
  snow.innerHTML = "•"; 
  document.querySelector(".snow-container").appendChild(snow);


  snow.style.left = Math.random() * window.innerWidth + "px";


  let size = Math.random() * 10 + 5;
  snow.style.fontSize = size + "px";


  snow.style.setProperty("--x-move", (Math.random() * 200 - 100) + "px");


  let duration = Math.random() * 5 + 5;
  snow.style.animationDuration = duration + "s";


  setTimeout(() => {
    snow.remove();
  }, duration * 1000);
}


setInterval(createSnow, 200);
