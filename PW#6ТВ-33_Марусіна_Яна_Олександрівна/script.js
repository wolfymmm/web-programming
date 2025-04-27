// Початкові дані 
const initialData = [
    { name: "Шліфувальний верстат (1-4)", n: 4, p: 20, eta: 0.92, cosphi: 0.9, k: 0.15, tgphi: 1.33 },
    { name: "Свердлильний верстат (5-6)", n: 2, p: 14, eta: 0.92, cosphi: 0.9, k: 0.12, tgphi: 1 },
    { name: "Фугувальний верстат (9-12)", n: 4, p: 42, eta: 0.92, cosphi: 0.9, k: 0.15, tgphi: 1.33 },
    { name: "Циркулярна пила (13)", n: 1, p: 36, eta: 0.92, cosphi: 0.9, k: 0.3, tgphi: 1.52 },
    { name: "Прес (16)", n: 1, p: 20, eta: 0.92, cosphi: 0.9, k: 0.5, tgphi: 0.75 },
    { name: "Полірувальний верстат (24)", n: 1, p: 40, eta: 0.92, cosphi: 0.9, k: 0.2, tgphi: 1 },
    { name: "Фрезерний верстат (26-27)", n: 2, p: 32, eta: 0.92, cosphi: 0.9, k: 0.2, tgphi: 1 },
    { name: "Вентилятор (36)", n: 1, p: 20, eta: 0.92, cosphi: 0.9, k: 0.65, tgphi: 0.75 }
];
// Дані для цеху 
const workshopData = {
    sumKp: 752,
    sumP: 2330,
    sumNP: 2330,
    sumNP2: 96388,
    sumNPktg: 657
};
// Заповнення таблиці 
function initTable() {
    const tbody = document.querySelector('#input-table tbody');
    tbody.innerHTML = '';
    initialData.forEach(item => {
        const row = document.createElement('tr');
        
        const np = item.n * item.p;
        const ip = item.n * item.p / (Math.sqrt(3) * 0.38 * item.cosphi * item.eta);
        const npk = np * item.k;
        const npktg = npk * item.tgphi;
        const np2 = item.n * Math.pow(item.p, 2);
        row.innerHTML = `
            <td>${item.name}</td>
            <td><input type="number" value="${item.n}" step="1" min="0"></td>
            <td><input type="number" value="${item.p}" step="0.1" min="0"></td>
            <td><input type="number" value="${item.eta}" step="0.01" min="0" max="1"></td>
            <td><input type="number" value="${item.cosphi}" step="0.01" min="0" max="1"></td>
            <td class="np">${np.toFixed(2)}</td>
            <td class="ip">${ip.toFixed(2)}</td>
            <td><input type="number" value="${item.k}" step="0.01" min="0" max="1"></td>
            <td><input type="number" value="${item.tgphi}" step="0.01" min="0"></td>
            <td class="npk">${npk.toFixed(2)}</td>
            <td class="npktg">${npktg.toFixed(2)}</td>
            <td class="np2">${np2.toFixed(2)}</td>
        `;
        
        tbody.appendChild(row);
    });
}
function calculateAll() {
    const rows = document.querySelectorAll('#input-table tbody tr');
    
    let totalN = 0;
    let totalNP = 0;
    let totalIP = 0;
    let totalNPK = 0;
    let totalNPKtg = 0;
    let totalNP2 = 0;
    
    rows.forEach(row => {
        const n = parseFloat(row.querySelector('td:nth-child(2) input').value) || 0;
        const p = parseFloat(row.querySelector('td:nth-child(3) input').value) || 0;
        const eta = parseFloat(row.querySelector('td:nth-child(4) input').value) || 0;
        const cosphi = parseFloat(row.querySelector('td:nth-child(5) input').value) || 0;
        const k = parseFloat(row.querySelector('td:nth-child(8) input').value) || 0;
        const tgphi = parseFloat(row.querySelector('td:nth-child(9) input').value) || 0;
        
        const np = n * p;
        const ip = n * p / (Math.sqrt(3) * 0.38 * cosphi * eta);
        const npk = np * k;
        const npktg = npk * tgphi;
        const np2 = n * Math.pow(p, 2);
        
        row.querySelector('.np').textContent = np.toFixed(2);
        row.querySelector('.ip').textContent = ip.toFixed(2);
        row.querySelector('.npk').textContent = npk.toFixed(2);
        row.querySelector('.npktg').textContent = npktg.toFixed(2);
        row.querySelector('.np2').textContent = np2.toFixed(2);
        
        totalN += n;
        totalNP += np;
        totalIP += ip;
        totalNPK += npk;
        totalNPKtg += npktg;
        totalNP2 += np2;
    });
    
    document.getElementById('total-n').textContent = totalN;
    document.getElementById('total-np').textContent = totalNP.toFixed(2);
    document.getElementById('total-ip').textContent = totalIP.toFixed(2);
    document.getElementById('total-npk').textContent = totalNPK.toFixed(2);
    document.getElementById('total-npktg').textContent = totalNPKtg.toFixed(2);
    document.getElementById('total-np2').textContent = totalNP2.toFixed(2);
    
    // Розрахунки для ШР1
    const kv = totalNPK / totalNP;
    const neRaw = Math.pow(totalNP, 2) / totalNP2;
    const ne = Math.ceil(neRaw); // Округлення до наступного цілого
    
    let kp = 1.25;
    
    const pp = kp * totalNPK;
    const qp = totalNPKtg;
    const sp = Math.sqrt(Math.pow(pp, 2) + Math.pow(qp, 2));
    const ip = pp / 0.38;
    
    document.getElementById('sum-npk').textContent = totalNPK.toFixed(2);
    document.getElementById('sum-np').textContent = totalNP.toFixed(2);
    document.getElementById('sum-np-2').textContent = totalNP.toFixed(2);
    document.getElementById('sum-np2').textContent = totalNP2.toFixed(2);
    document.getElementById('sum-npk-value').textContent = totalNPK.toFixed(2);
    document.getElementById('sum-npktg-value').textContent = totalNPKtg.toFixed(2);
    
    document.getElementById('kv-result').textContent = kv.toFixed(4);
    document.getElementById('ne-result').textContent = neRaw.toFixed(3);
    document.getElementById('ne-rounded').textContent = ne;
    document.getElementById('kp-result').textContent = kp.toFixed(2);
    document.getElementById('kp-value').textContent = kp.toFixed(2);
    document.getElementById('pp-result').textContent = pp.toFixed(2);
    document.getElementById('pp-value').textContent = pp.toFixed(2);
    document.getElementById('pp-value2').textContent = pp.toFixed(2);
    document.getElementById('qp-result').textContent = qp.toFixed(2);
    document.getElementById('qp-value').textContent = qp.toFixed(2);
    document.getElementById('sp-result').textContent = sp.toFixed(3);
    document.getElementById('ip-result').textContent = ip.toFixed(2);
    
    // Розрахунки для цеху
    const kvWorkshop = workshopData.sumKp / workshopData.sumP;
    const neWorkshop = Math.pow(workshopData.sumNP, 2) / workshopData.sumNP2;
    const neWorkshopRounded = Math.round(neWorkshop);
    
    let kpWorkshop = 0.7;
    
    const ppWorkshop = kpWorkshop * workshopData.sumKp;
    const qpWorkshop = kpWorkshop * workshopData.sumNPktg;
    const spWorkshop = Math.sqrt(Math.pow(ppWorkshop, 2) + Math.pow(qpWorkshop, 2));
    const ipWorkshop = ppWorkshop / 0.38;
    
    document.getElementById('sum-workshop-kp').textContent = workshopData.sumKp.toFixed(2);
    document.getElementById('sum-workshop-p').textContent = workshopData.sumP.toFixed(2);
    document.getElementById('sum-workshop-np').textContent = workshopData.sumNP.toFixed(2);
    document.getElementById('sum-workshop-np2').textContent = workshopData.sumNP2.toFixed(2);
    document.getElementById('sum-workshop-kp-value').textContent = workshopData.sumKp.toFixed(2);
    document.getElementById('sum-workshop-npktg').textContent = workshopData.sumNPktg.toFixed(2);
    
    document.getElementById('kv-workshop').textContent = kvWorkshop.toFixed(4);
    document.getElementById('ne-workshop').textContent = neWorkshop.toFixed(2);
    document.getElementById('ne-workshop-rounded').textContent = neWorkshopRounded;
    document.getElementById('kp-workshop').textContent = kpWorkshop.toFixed(2);
    document.getElementById('kp-workshop-value').textContent = kpWorkshop.toFixed(2);
    document.getElementById('kp-workshop-value2').textContent = kpWorkshop.toFixed(2);
    document.getElementById('pp-workshop').textContent = ppWorkshop.toFixed(2);
    document.getElementById('pp-workshop-value').textContent = ppWorkshop.toFixed(2);
    document.getElementById('pp-workshop-value2').textContent = ppWorkshop.toFixed(2);
    document.getElementById('qp-workshop').textContent = qpWorkshop.toFixed(2);
    document.getElementById('qp-workshop-value').textContent = qpWorkshop.toFixed(2);
    document.getElementById('sp-workshop').textContent = spWorkshop.toFixed(2);
    document.getElementById('ip-workshop').textContent = ipWorkshop.toFixed(2);
}
window.onload = function() {
    initTable();
    calculateAll();
};