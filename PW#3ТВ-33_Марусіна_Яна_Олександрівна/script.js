function calc() {
    let power = parseFloat(document.getElementById("power").value);
    let delta = parseFloat(document.getElementById("delta").value);
    let tarif = parseFloat(document.getElementById("tarif").value);

    let energyWithoutPenalty = power * 24 * 0.68; // Спожиток енергії без штрафу
    let energyWithPenalty = power * 24 * 0.32; // Спожиток енергії зі штрафом
    let income = energyWithoutPenalty * tarif * 1000; // конвертація в тис. грн, прибуток
    let fine = energyWithPenalty * tarif * 1000; // конвертація в тис. грн, штраф
    let netProfit = income - fine; // збиток

    console.log("Енергія без штрафу:", energyWithoutPenalty, "кВт·год");
    console.log("Енергія зі штрафом:", energyWithPenalty, "кВт·год");

    document.getElementById("results").innerHTML = `
        <p>Прибуток: ${income.toLocaleString()} грн</p>
        <p>Штраф: ${fine.toLocaleString()} грн</p>
        <p><strong>${netProfit >= 0 ? `Чистий прибуток: ${netProfit.toLocaleString()} грн` : `Збиток: ${(-netProfit).toLocaleString()} грн`}</strong></p>
    `;
}























































































