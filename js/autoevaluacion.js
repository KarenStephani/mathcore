// Banco de Preguntas Académicas por Niveles
const quizData = {
    facil: [
        {
            q: "1. ¿Cuál es el denominador de la fracción 3/8?",
            options: ["3", "8", "11", "5"],
            correct: 1,
            explanation: "El denominador es el término inferior (8), el cual indica en cuántas partes iguales se divide la unidad."
        },
        {
            q: "2. ¿Qué representa el numerador en una fracción?",
            options: ["Las partes seleccionadas del entero", "El total de partes divididas", "Una suma de decimales", "El residuo de la división"],
            correct: 0,
            explanation: "El numerador (término superior) representa las partes que se toman o consideran de la unidad."
        },
        {
            q: "3. ¿Cuál de las siguientes fracciones es propia?",
            options: ["7/3", "2/5", "4/4", "9/2"],
            correct: 1,
            explanation: "Una fracción propia es aquella cuyo numerador es estrictamente menor que su denominador (2 < 5)."
        },
        {
            q: "4. Calcula la suma homogénea: 1/4 + 2/4",
            options: ["3/8", "3/4", "2/16", "1/4"],
            correct: 1,
            explanation: "Al tener el mismo denominador (4), se suman los numeradores directamente: 1 + 2 = 3, manteniendo el denominador 4."
        },
        {
            q: "5. ¿El denominador de una fracción puede ser igual a cero?",
            options: ["Sí, en fracciones impropias", "No, nunca puede ser cero", "Sólo si el numerador es cero", "A veces"],
            correct: 1,
            explanation: "La división por cero no está definida en matemáticas, por lo tanto el denominador jamás puede ser cero."
        }
    ],
    medio: [
        {
            q: "1. Simplifica a su mínima expresión la fracción 6/12:",
            options: ["3/6", "1/2", "2/4", "1/3"],
            correct: 1,
            explanation: "Dividiendo numerador y denominador entre su M.C.D. (6): 6÷6 = 1 y 12÷6 = 2."
        },
        {
            q: "2. Resuelve la resta homogénea: 3/5 - 1/5",
            options: ["2/5", "2/0", "4/5", "1/5"],
            correct: 0,
            explanation: "Poseen igual denominador (5): 3 - 1 = 2, por lo que el resultado es 2/5."
        },
        {
            q: "3. ¿Cuál es el resultado de multiplicar: 2/3 × 3/4?",
            options: ["6/12 (1/2)", "5/7", "8/9", "6/7"],
            correct: 0,
            explanation: "Multiplicación directa: numeradores (2×3=6) y denominadores (3×4=12). 6/12 simplificado equivale a 1/2."
        },
        {
            q: "4. ¿Cuál de los siguientes pares contiene fracciones equivalentes?",
            options: ["1/2 y 2/3", "2/4 y 5/10", "3/5 y 4/5", "1/3 y 3/1"],
            correct: 1,
            explanation: "Ambas fracciones (2/4 y 5/10) se simplifican exactamente al mismo valor: 1/2."
        },
        {
            q: "5. Para efectuar la división 2/3 ÷ 4/5 se debe:",
            options: ["Multiplicar en cruz: (2×5) / (3×4) = 10/12", "Sumar en cruz", "Restar numeradores", "Dividir directo 2÷4"],
            correct: 0,
            explanation: "La división equivale a multiplicar en cruz: (2×5)/(3×4) = 10/12 = 5/6."
        }
    ],
    dificil: [
        {
            q: "1. Resuelve la operación combinada: (1/2 + 1/3) × 6/5",
            options: ["1", "5/6", "1/5", "6/5"],
            correct: 0,
            explanation: "Suma entre paréntesis: 1/2 + 1/3 = 5/6. Producto posterior: (5/6) × (6/5) = 30/30 = 1."
        },
        {
            q: "2. Si se consumen 2/5 de un pastel y luego 1/3, ¿cuánto resta?",
            options: ["11/15", "4/15", "3/8", "7/15"],
            correct: 1,
            explanation: "Total consumido: 2/5 + 1/3 = 11/15. El sobrante de la unidad completa es 1 - 11/15 = 4/15."
        },
        {
            q: "3. Convierte el número mixto 2 3/4 a fracción impropia:",
            options: ["8/4", "11/4", "6/4", "7/4"],
            correct: 1,
            explanation: "Algoritmo: (Entero × Denominador) + Numerador = (2 × 4) + 3 = 11. Resultado: 11/4."
        },
        {
            q: "4. Evalúa la expresión: (3/4 ÷ 9/8) + 1/3",
            options: ["1", "2/3", "4/3", "5/6"],
            correct: 0,
            explanation: "División interna: 3/4 × 8/9 = 2/3. Suma final: 2/3 + 1/3 = 3/3 = 1."
        },
        {
            q: "5. ¿Cuál fracción es estrictamente mayor que 3/5?",
            options: ["1/2", "4/10", "7/10", "2/5"],
            correct: 2,
            explanation: "Convertido a decimal: 3/5 = 0.60. La opción 7/10 equivale a 0.70, siendo mayor."
        }
    ]
};

let currentLevel = 'facil';
let userAnswers = {};

document.addEventListener("DOMContentLoaded", () => {
    // 1. Control del menú hamburguesa móvil
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("show");
            menuToggle.textContent = navMenu.classList.contains("show") ? "✕" : "☰";
        });
    }

    // 2. Inicializar cuestionario en nivel fácil
    setLevel('facil');

    // 3. Botones de evaluación y limpieza
    const btnEvaluate = document.getElementById("btn-evaluate");
    if (btnEvaluate) {
        btnEvaluate.addEventListener("click", evaluateQuiz);
    }

    const btnReset = document.getElementById("btn-reset");
    if (btnReset) {
        btnReset.addEventListener("click", () => {
            setLevel(currentLevel);
        });
    }

    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("form-name").value;
            alert(`¡Gracias ${name}! Tus datos y reporte han sido registrados correctamente.`);
            contactForm.reset();
        });
    }

    const btnClear = document.getElementById("btn-clear");
    if (btnClear && contactForm) {
        btnClear.addEventListener("click", () => {
            contactForm.reset();
        });
    }
});

// Función para cambiar de nivel en el cuestionario
function setLevel(lvl) {
    currentLevel = lvl;
    userAnswers = {};

    document.querySelectorAll('.lvl-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`lvl-${lvl}`);
    if (activeBtn) activeBtn.classList.add('active');

    renderQuiz();
    const feedbackPanel = document.getElementById("feedback-panel");
    if (feedbackPanel) feedbackPanel.classList.add("hidden");
}

// Renderizar las preguntas en pantalla
function renderQuiz() {
    const container = document.getElementById("quiz-container");
    if (!container) return;

    const questions = quizData[currentLevel];
    container.innerHTML = questions.map((item, qIndex) => `
        <div class="question-box">
            <p class="question-title">${item.q}</p>
            <div class="options-grid">
                ${item.options.map((opt, oIndex) => `
                    <label class="option-label">
                        <input type="radio" name="q-${qIndex}" value="${oIndex}" onchange="userAnswers[${qIndex}] = ${oIndex}">
                        <span>${opt}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Evaluar puntaje y mostrar retroalimentación
function evaluateQuiz() {
    const questions = quizData[currentLevel];
    let score = 0;
    let feedbackHTML = "";

    if (Object.keys(userAnswers).length < questions.length) {
        alert("Por favor responde todas las preguntas antes de evaluar.");
        return;
    }

    questions.forEach((q, index) => {
        const selected = userAnswers[index];
        const isCorrect = selected === q.correct;
        if (isCorrect) score++;

        feedbackHTML += `
            <div style="padding: 10px; border-radius: 8px; background: ${isCorrect ? '#f0fdf4' : '#fff1f2'}; border: 1px solid ${isCorrect ? '#bbf7d0' : '#fecdd3'};">
                <strong>Pregunta ${index + 1}: ${isCorrect ? '✓ ¡Correcto!' : '✕ Incorrecto'}</strong>
                <p style="margin-top: 4px; color: #475569;">${q.explanation}</p>
            </div>
        `;
    });

    const percentage = Math.round((score / questions.length) * 100);
    const panel = document.getElementById("feedback-panel");
    const scoreText = document.getElementById("feedback-score");
    const msgContainer = document.getElementById("feedback-message");
    const titleText = document.getElementById("feedback-title");

    if (scoreText) scoreText.textContent = `Puntaje Final: ${score} / ${questions.length} (${percentage}%)`;
    if (msgContainer) msgContainer.innerHTML = feedbackHTML;

    if (percentage === 100 && titleText) titleText.textContent = "¡Resultado Sobresaliente! 🏆";
    else if (percentage >= 60 && titleText) titleText.textContent = "¡Buen Desempeño Académico! 👍";
    else if (titleText) titleText.textContent = "Revisión Sugerida 📖";

    if (panel) {
        panel.classList.remove("hidden");
        panel.scrollIntoView({ behavior: 'smooth' });
    }
}