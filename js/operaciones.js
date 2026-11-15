document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("show");
            menuToggle.textContent = navMenu.classList.contains("show") ? "✕" : "☰";
        });
    }

    // Vincular inputs del simulador en tiempo real
    const inputs = document.querySelectorAll("#numA, #denA, #numB, #denB, #opType");
    inputs.forEach(input => {
        input.addEventListener("input", calcularFraccionInteractiva);
        input.addEventListener("change", calcularFraccionInteractiva);
    });

    calcularFraccionInteractiva();
});

function calcularFraccionInteractiva() {
    const numA = parseInt(document.getElementById("numA").value) || 0;
    const denA = parseInt(document.getElementById("denA").value) || 1;
    const numB = parseInt(document.getElementById("numB").value) || 0;
    const denB = parseInt(document.getElementById("denB").value) || 1;
    const op = document.getElementById("opType").value;

    const resultDisplay = document.getElementById("calc-result");
    const stepDisplay = document.getElementById("calc-step");

    if (!resultDisplay || !stepDisplay) return;

    if (denA === 0 || denB === 0) {
        resultDisplay.textContent = "Error";
        stepDisplay.textContent = "El denominador nunca puede ser cero.";
        return;
    }

    let resNum = 0;
    let resDen = 1;
    let pasoTexto = "";

    if (op === "+") {
        resNum = (numA * denB) + (numB * denA);
        resDen = denA * denB;
        pasoTexto = `Procedimiento: (${numA}×${denB} + ${numB}×${denA}) / (${denA}×${denB}) = ${resNum}/${resDen}`;
    } else if (op === "-") {
        resNum = (numA * denB) - (numB * denA);
        resDen = denA * denB;
        pasoTexto = `Procedimiento: (${numA}×${denB} - ${numB}×${denA}) / (${denA}×${denB}) = ${resNum}/${resDen}`;
    } else if (op === "*") {
        resNum = numA * numB;
        resDen = denA * denB;
        pasoTexto = `Procedimiento: (${numA}×${numB}) / (${denA}×${denB}) = ${resNum}/${resDen}`;
    } else if (op === "/") {
        if (numB === 0) {
            resultDisplay.textContent = "Error";
            stepDisplay.textContent = "No se puede dividir entre cero.";
            return;
        }
        resNum = numA * denB;
        resDen = denA * numB;
        pasoTexto = `Procedimiento: (${numA}×${denB}) / (${denA}×${numB}) = ${resNum}/${resDen}`;
    }

    const mcd = (a, b) => (b === 0 ? a : mcd(b, a % b));
    const divisor = Math.abs(mcd(resNum, resDen)) || 1;

    const simNum = resNum / divisor;
    const simDen = resDen / divisor;

    if (simDen === 1) {
        resultDisplay.textContent = `${simNum}`;
        stepDisplay.textContent = `${pasoTexto} → Simplificado: ${simNum}`;
    } else {
        resultDisplay.textContent = `${simNum} / ${simDen}`;
        stepDisplay.textContent = `${pasoTexto} → Simplificado: ${simNum}/${simDen}`;
    }
}