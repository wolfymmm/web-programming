function openTab(tabName) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    event.currentTarget.classList.add('active');

    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    if (tabName === 'reliability') {
        document.getElementById('reliability-input').classList.add('active');
        document.getElementById('reliability-result').classList.add('active');
    } else {
        document.getElementById('losses-input').classList.add('active');
        document.getElementById('losses-result').classList.add('active');
    }
}

function calculateReliability() {
    // Отримання вхідних даних для одноколової системи
    const w_breaker110 = parseFloat(document.getElementById('breaker110').value);
    const w_line110 = parseFloat(document.getElementById('line110').value);
    const w_transformer = parseFloat(document.getElementById('transformer').value);
    const w_breaker10 = parseFloat(document.getElementById('breaker10').value);
    const w_connection = parseFloat(document.getElementById('connections').value);
    const numConnections = parseInt(document.getElementById('numConnections').value);
    
    // Час відновлення
    const t_breaker110 = parseFloat(document.getElementById('t_breaker110').value);
    const t_line110 = parseFloat(document.getElementById('t_line110').value);
    const t_transformer = parseFloat(document.getElementById('t_transformer').value);
    const t_breaker10 = parseFloat(document.getElementById('t_breaker10').value);
    const t_connection = parseFloat(document.getElementById('t_connections').value);
    
    // Плановий простій
    const plannedOutage = parseFloat(document.getElementById('plannedOutage').value);
    
    // Параметри двоколової системи
    const w_sectionBreaker = parseFloat(document.getElementById('sectionBreaker').value);
    
    // Розрахунок параметрів одноколової системи
    const w_oc = w_breaker110 + w_line110 + w_transformer + w_breaker10 + (w_connection * numConnections);
    const t_oc = (w_breaker110 * t_breaker110 + w_line110 * t_line110 + w_transformer * t_transformer + 
                 w_breaker10 * t_breaker10 + (w_connection * numConnections * t_connection)) / w_oc;
    const k_emergency_oc = (w_oc * t_oc) * Math.pow(10, -3);
    const k_planned_oc = 1.2 * (plannedOutage) * Math.pow(10, -3);
    
    // Розрахунок параметрів двоколової системи
    const w_dk = 2 * w_oc * (k_emergency_oc + k_planned_oc);
    const w_ds = w_dk + w_sectionBreaker;
    const t_ds = t_oc * 0.7; // Припущення
    const k_emergency_ds = (w_ds * t_ds) * Math.pow(10, -3);
    const k_planned_ds = k_planned_oc * 0.8; // Припущення
    
    document.getElementById('failureRateOC').textContent = w_oc.toFixed(3);
    document.getElementById('failureRateDC').textContent = w_ds.toFixed(4);
    
    document.getElementById('recoveryTimeOC').textContent = t_oc.toFixed(1);
    document.getElementById('recoveryTimeDC').textContent = t_ds.toFixed(1);
    
    document.getElementById('emergencyOutageOC').textContent = k_emergency_oc.toExponential(2);
    document.getElementById('emergencyOutageDC').textContent = k_emergency_ds.toExponential(2);
    
    document.getElementById('plannedOutageOC').textContent = k_planned_oc.toExponential(2);
    document.getElementById('plannedOutageDC').textContent = k_planned_ds.toExponential(2);
    
    const conclusion = document.getElementById('reliabilityConclusion');
    if (w_ds < w_oc) {
        conclusion.innerHTML = '<strong>Висновок:</strong> Двоколова система електропередачі є значно надійнішою за одноколову';
    } else {
        conclusion.innerHTML = '<strong>Висновок:</strong> Одноколова система демонструє кращі показники надійності за';
    }
}

function calculateLosses() {
    // Отримання вхідних даних
    const failureRate = parseFloat(document.getElementById('failureRate').value);
    const recoveryTime = parseFloat(document.getElementById('recoveryTime').value);
    const plannedOutageTime = parseFloat(document.getElementById('plannedOutageTime').value);
    const maxLoad = parseFloat(document.getElementById('maxLoad').value);
    const usageTime = parseFloat(document.getElementById('usageTime').value);
    const emergencyLossRate = parseFloat(document.getElementById('emergencyLossRate').value);
    const plannedLossRate = parseFloat(document.getElementById('plannedLossRate').value);
    
    const recoveryTimeYears = recoveryTime * Math.pow(10, -3);
    const plannedOutageYears = plannedOutageTime * Math.pow(10, -3);
    
    // Розрахунок аварійного недовідпущення
    const emergencyUndersupply = failureRate * recoveryTimeYears * maxLoad * usageTime;
    
    // Розрахунок планового недовідпущення
    const plannedUndersupply = plannedOutageYears * maxLoad * usageTime;
    
    // Розрахунок збитків
    const emergencyLosses = emergencyLossRate * emergencyUndersupply;
    const plannedLosses = plannedLossRate * plannedUndersupply;
    const totalLosses = emergencyLosses + plannedLosses;
    
    // Заповнення формул
    document.getElementById('w_failureRate').textContent = failureRate;
    document.getElementById('w_recoveryTime').textContent = recoveryTimeYears.toExponential(2);
    document.getElementById('w_maxLoad').textContent = maxLoad;
    document.getElementById('w_usageTime').textContent = usageTime;
    document.getElementById('emergencyUndersupply').textContent = emergencyUndersupply.toFixed(0);
    
    document.getElementById('p_plannedOutage').textContent = plannedOutageYears.toExponential(2);
    document.getElementById('p_maxLoad').textContent = maxLoad;
    document.getElementById('p_usageTime').textContent = usageTime;
    document.getElementById('plannedUndersupply').textContent = plannedUndersupply.toFixed(0);
    
    document.getElementById('l_emergencyRate').textContent = emergencyLossRate;
    document.getElementById('l_emergencyUndersupply').textContent = emergencyUndersupply.toFixed(0);
    document.getElementById('l_plannedRate').textContent = plannedLossRate;
    document.getElementById('l_plannedUndersupply').textContent = plannedUndersupply.toFixed(0);
    document.getElementById('totalLosses').textContent = totalLosses.toFixed(0);
    
    // Заповнення таблиці 
    document.getElementById('emergencyResult').textContent = emergencyUndersupply.toFixed(0);
    document.getElementById('plannedResult').textContent = plannedUndersupply.toFixed(0);
    document.getElementById('totalResult').textContent = totalLosses.toFixed(0);
}

window.onload = function() {
    openTab('reliability');
};
