function calc() {
    let power = parseFloat(document.getElementById("power").value);
    let delta = parseFloat(document.getElementById("delta").value);
    let tarif = parseFloat(document.getElementById("tarif").value);

    let energyWithoutPenalty = power * 24 * 0.68;
    let energyWithPenalty = power * 24 * 0.32;
    let income = energyWithoutPenalty * tarif * 1000;
    let fine = energyWithPenalty * tarif * 1000;
    let netProfit = income - fine;

    console.log("Енергія без штрафу:", energyWithoutPenalty, "кВт·год");
    console.log("Енергія зі штрафом:", energyWithPenalty, "кВт·год");

    document.getElementById("results").innerHTML = `
        <p>Прибуток: ${income.toLocaleString()} грн</p>
        <p>Штраф: ${fine.toLocaleString()} грн</p>
        <p><strong>${netProfit >= 0 ? `Чистий прибуток: ${netProfit.toLocaleString()} грн` : `Збиток: ${(-netProfit).toLocaleString()} грн`}</strong></p>
    `;
}























































































