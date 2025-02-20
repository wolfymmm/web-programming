document.getElementById("fuelForm").addEventListener("submit", function (event) {
    event.preventDefault();
    
    let composition = {
        H: parseFloat(document.getElementById("H").value),
        C: parseFloat(document.getElementById("C").value),
        S: parseFloat(document.getElementById("S").value),
        N: parseFloat(document.getElementById("N").value),
        O: parseFloat(document.getElementById("O").value),
        W: parseFloat(document.getElementById("W").value),
        A: parseFloat(document.getElementById("A").value),
    };

    let { K_PS, K_PG } = calculateCoefficients(composition.W, composition.A);
    let dryMass = calculateDryMass(composition, K_PS);
    let combustibleMass = calculateCombustibleMass(composition, K_PG);
    let Q_P_H = calculateLowerHeatingValue(composition);
    let { Q_C_H, Q_G_H } = calculateAdjustedHeatingValues(Q_P_H, composition.W, composition.A);

    let resultContainer = document.getElementById("resultContent");
    resultContainer.innerHTML = "";
    
    let results = [
        { text: "\nКоефіцієнти:\n\n", isHeader: true },
        `К (до сухої маси): ${K_PS.toFixed(2)}`,
        `К (до горючої маси): ${K_PG.toFixed(2)}`,
        { text: "\n\nСклад сухої маси:\n\n", isHeader: true },
        `H: ${dryMass.H}%, C: ${dryMass.C}%, S: ${dryMass.S}%, N: ${dryMass.N}%, O: ${dryMass.O}%, A: ${dryMass.A}%`,
        { text: "\n\nСклад горючої маси:\n\n", isHeader: true },
        `H: ${combustibleMass.H}%, C: ${combustibleMass.C}%, S: ${combustibleMass.S}%, N: ${combustibleMass.N}%, O: ${combustibleMass.O}%`,
        { text: "\n\nНижча теплота згоряння:\n\n", isHeader: true },
        `Q (робоча маса): ${Q_P_H} МДж/кг`,
        `Q (суха маса): ${Q_C_H} МДж/кг`,
        `Q (горюча маса): ${Q_G_H} МДж/кг`
    ];
    
    results.forEach(item => {
        let element = document.createElement(item.isHeader ? "h3" : "p");
        element.textContent = item.text || item;
        element.style.fontSize = "14px";
        if (item.isHeader) {
            element.style.color = "purple";
            element.style.fontSize = "18px";
        }
        resultContainer.appendChild(element);
    });
});



























