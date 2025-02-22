// Функція для розрахунку коефіцієнтів переходу
function calculateCoefficients(W, A) {
    W = parseFloat(W) || 0;
    A = parseFloat(A) || 0;

    let K_PS = (100 / (100 - W)).toFixed(2);
    let K_PG = (100 / (100 - W - A)).toFixed(2);

    return { K_PS: parseFloat(K_PS), K_PG: parseFloat(K_PG) };
}

// Функція для розрахунку складу сухої маси
function calculateDryMass(composition, K_PS) {
    let dryMass = {};
    for (let key in composition) {
        let value = parseFloat(composition[key]) || 0;
        dryMass[key] = (value * K_PS).toFixed(2);
    }
    return dryMass;
}

// Функція для розрахунку складу горючої маси
function calculateCombustibleMass(dryMass, K_PG) {
    let combustibleMass = {};
    for (let key in dryMass) {
        let value = parseFloat(dryMass[key]) || 0;
        combustibleMass[key] = (value * K_PG).toFixed(2);
    }
    return combustibleMass;
}

// Функція для розрахунку нижчої теплоти згоряння
function calculateLowerHeatingValue(composition) {
    let { C, H, O, S, W } = composition;

    C = parseFloat(C) || 0;
    H = parseFloat(H) || 0;
    O = parseFloat(O) || 0;
    S = parseFloat(S) || 0;
    W = parseFloat(W) || 0;

    let Q_P_H = (339 * C) + (1030 * H) - (108.8 * (O - S)) - (25 * W);

    return (Q_P_H / 1000).toFixed(2); 
}

// Функція для переводу теплоти на суху та горючу масу
function calculateAdjustedHeatingValues(Q_P_H, W, A) {
    Q_P_H = parseFloat(Q_P_H) || 0;
    W = parseFloat(W) || 0;
    A = parseFloat(A) || 0;

    let Q_C_H = ((Q_P_H + (0.025 * W)) * (100 / (100 - W))).toFixed(2);
    let Q_G_H = ((Q_P_H + (0.025 * W)) * (100 / (100 - W - A))).toFixed(2);

    return { Q_C_H, Q_G_H };
}











































































