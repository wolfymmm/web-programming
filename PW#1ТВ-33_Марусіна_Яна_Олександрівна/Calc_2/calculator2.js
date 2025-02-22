document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("fuelForm").addEventListener("submit", function (event) {
        event.preventDefault();
        
        let C_G = parseFloat(document.getElementById("carbon").value) || 0;
        let H_G = parseFloat(document.getElementById("hydrogen").value) || 0;
        let O_G = parseFloat(document.getElementById("oxygen").value) || 0;
        let S_G = parseFloat(document.getElementById("sulfur").value) || 0;
        let Qi_daf = parseFloat(document.getElementById("q_daf").value) || 0;
        let W_G = parseFloat(document.getElementById("moisture").value) || 0;
        let A_G = parseFloat(document.getElementById("ash").value) || 0;
        let V_G = parseFloat(document.getElementById("vanadium").value) || 0;

        let C_R = (C_G * (100 - W_G - A_G) / 100).toFixed(2);
        let H_R = (H_G * (100 - W_G - A_G) / 100).toFixed(2);
        let O_R = (O_G * (100 - W_G - A_G) / 100).toFixed(2);
        let S_R = (S_G * (100 - W_G - A_G) / 100).toFixed(2);
        let A_R = (A_G * (100 - W_G) / 100).toFixed(2);
        let V_R = (V_G * (100 - W_G) / 100).toFixed(2);

        let Qi_r = (Qi_daf * ((100 - W_G - A_G) / 100) - 0.025 * W_G).toFixed(2);

        let resultContainer = document.getElementById("result");
        resultContainer.innerHTML = ""; 

        let results = [
            { text: "\nСклад робочої маси:\n\n", isHeader: true },
            `C: ${C_R} %`,
            `H: ${H_R} %`,
            `O: ${O_R} %`,
            `S: ${S_R} %`,
            `A: ${A_R} %`,
            `V: ${V_R} мг/кг`,
            { text: "\n\nНижча теплота згоряння:\n\n", isHeader: true },
            `Qi: ${Qi_r} МДж/кг`
        ];

        results.forEach(item => {
            let element = document.createElement(item.isHeader ? "h3" : "p");
            element.textContent = item.text || item; 
            element.style.fontSize = "14px"; 

            if (item.isHeader) {
                element.style.color = "navy"; 
                element.style.fontSize = "16px";
            }
            resultContainer.appendChild(element);
        });
    });
});








































































































































































































