function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
function calculateCables() {
    // Отримання вхідних даних
    const sm = parseFloat(document.getElementById('sm').value);
    const unom = parseFloat(document.getElementById('unom').value);
    const tm = parseFloat(document.getElementById('tm').value);
    const ik = parseFloat(document.getElementById('ik').value);
    const tphi = parseFloat(document.getElementById('tphi').value);
    
    // Розрахунок струмів
    const im = (sm / 2) / (Math.sqrt(3) * unom);
    const impa = 2 * im;
    
    // Економічний переріз
    const jek = 1.4; 
    const sek = im / jek;
    
    // Перевірка на термічну стійкість
    const ct = 92; 
    const smin = (ik * 1000 * Math.sqrt(tphi)) / ct;
    
    // Відображення результатів
    document.getElementById('sm-val').textContent = sm;
    document.getElementById('unom-val').textContent = unom;
    document.getElementById('im').textContent = im.toFixed(1);
    document.getElementById('im-val').textContent = im.toFixed(1);
    document.getElementById('im-val2').textContent = im.toFixed(1);
    document.getElementById('impa').textContent = impa.toFixed(0);
    document.getElementById('tm-val').textContent = tm;
    document.getElementById('sek').textContent = sek.toFixed(1);
    document.getElementById('ik-val').textContent = ik * 1000;
    document.getElementById('tphi-val').textContent = tphi;
    document.getElementById('smin').textContent = Math.round(smin);
    
    document.getElementById('cableResults').style.display = 'block';
}
function calculateShortCircuit() {
    // Отримання вхідних даних
    const ucn = parseFloat(document.getElementById('ucn').value);
    const sk = parseFloat(document.getElementById('sk').value);
    const ukPercent = parseFloat(document.getElementById('ukPercent').value);
    const sNomT = parseFloat(document.getElementById('sNomT').value);
    
    // Розрахунок опорів в іменованих одиницях
    const xc = Math.pow(ucn, 2) / sk;
    const xt = (ukPercent / 100) * Math.pow(ucn, 2) / sNomT;
    const xsum = xc + xt;
    
    // Розрахунок струму КЗ в іменованих одиницях
    const ipo = ucn / (Math.sqrt(3) * xsum);
    
    // Відображення результатів
    document.getElementById('ucn-val').textContent = ucn;
    document.getElementById('sk-val').textContent = sk;
    document.getElementById('xc').textContent = xc.toFixed(2);
    document.getElementById('uk-val').textContent = ukPercent;
    document.getElementById('ucn-val2').textContent = ucn;
    document.getElementById('snomt-val').textContent = sNomT;
    document.getElementById('xt').textContent = xt.toFixed(2);
    document.getElementById('xc-val').textContent = xc.toFixed(2);
    document.getElementById('xt-val').textContent = xt.toFixed(2);
    document.getElementById('xsum').textContent = xsum.toFixed(2);
    document.getElementById('ucn-val3').textContent = ucn;
    document.getElementById('xsum-val').textContent = xsum.toFixed(2);
    document.getElementById('ipo').textContent = ipo.toFixed(2);
    
    document.getElementById('shortCircuitResults').style.display = 'block';
}
function calculateKhpenem() {
    // Отримання вхідних даних
    const uHigh = parseFloat(document.getElementById('uHigh').value);
    const uLow = parseFloat(document.getElementById('uLow').value);
    const ukMax = parseFloat(document.getElementById('ukMax').value);
    const sNomTr = parseFloat(document.getElementById('sNomTr').value);
    const rcn = parseFloat(document.getElementById('rcn').value);
    const xcn = parseFloat(document.getElementById('xcn').value);
    const rcmin = parseFloat(document.getElementById('rcmin').value);
    const xcmin = parseFloat(document.getElementById('xcmin').value);
    const rcEmerg = parseFloat(document.getElementById('rcEmerg').value);
    const xcEmerg = parseFloat(document.getElementById('xcEmerg').value);
    
    // Розрахунок реактивного опору трансформатора
    const xt = (ukMax * Math.pow(uHigh, 2)) / (100 * sNomTr);
    
    // Розрахунок опорів для трьох режимів
    // Нормальний режим
    const riii = rcn;
    const xiii = xcn + xt;
    const ziii = Math.sqrt(Math.pow(riii, 2) + Math.pow(xiii, 2));
    
    // Мінімальний режим
    const riiiMin = rcmin;
    const xiiiMin = xcmin + xt;
    const ziiiMin = Math.sqrt(Math.pow(riiiMin, 2) + Math.pow(xiiiMin, 2));
    
    // Аварійний режим
    const riiiEmerg = rcEmerg;
    const xiiiEmerg = xcEmerg + xt;
    const ziiiEmerg = Math.sqrt(Math.pow(riiiEmerg, 2) + Math.pow(xiiiEmerg, 2));
    
    // Розрахунок струмів КЗ для трьох режимів
    // Нормальний режим
    const i3Norm = (uHigh * 1000) / (Math.sqrt(3) * ziii);
    const i2Norm = i3Norm * Math.sqrt(3) / 2;
    
    // Мінімальний режим
    const i3Min = (uHigh * 1000) / (Math.sqrt(3) * ziiiMin);
    const i2Min = i3Min * Math.sqrt(3) / 2;
    
    // Аварійний режим
    const i3Emerg = (uHigh * 1000) / (Math.sqrt(3) * ziiiEmerg);
    const i2Emerg = i3Emerg * Math.sqrt(3) / 2;
    
    // Коефіцієнт приведення
    const kpr = Math.pow(uLow, 2) / Math.pow(uHigh, 2);
    
    // Розрахунок дійсних опорів на шинах 10 кВ
    // Нормальний режим
    const riiiN = riii * kpr;
    const xiiiN = xiii * kpr;
    const ziiiN = Math.sqrt(Math.pow(riiiN, 2) + Math.pow(xiiiN, 2));
    
    // Мінімальний режим
    const riiiNMin = riiiMin * kpr;
    const xiiiNMin = xiiiMin * kpr;
    const ziiiNMin = Math.sqrt(Math.pow(riiiNMin, 2) + Math.pow(xiiiNMin, 2));
    
    // Аварійний режим
    const riiiNEmerg = riiiEmerg * kpr;
    const xiiiNEmerg = xiiiEmerg * kpr;
    const ziiiNEmerg = Math.sqrt(Math.pow(riiiNEmerg, 2) + Math.pow(xiiiNEmerg, 2));
    
    // Розрахунок дійсних струмів КЗ на шинах 10 кВ
    // Нормальний режим
    const i3ActNorm = (uLow * 1000) / (Math.sqrt(3) * ziiiN);
    const i2ActNorm = i3ActNorm * Math.sqrt(3) / 2;
    
    // Мінімальний режим
    const i3ActMin = (uLow * 1000) / (Math.sqrt(3) * ziiiNMin);
    const i2ActMin = i3ActMin * Math.sqrt(3) / 2;
    
    // Аварійний режим
    const i3ActEmerg = (uLow * 1000) / (Math.sqrt(3) * ziiiNEmerg);
    const i2ActEmerg = i3ActEmerg * Math.sqrt(3) / 2;
    
    // Відображення результатів
    document.getElementById('ukmax-val').textContent = ukMax;
    document.getElementById('uhigh-val').textContent = uHigh;
    document.getElementById('snomtr-val').textContent = sNomTr;
    document.getElementById('xt-khp').textContent = xt.toFixed(2);
    
    // Нормальний режим
    document.getElementById('rcn-val').textContent = rcn;
    document.getElementById('xcn-val').textContent = xcn;
    document.getElementById('xt-khp-val').textContent = xt.toFixed(2);
    document.getElementById('xiii').textContent = xiii.toFixed(2);
    document.getElementById('riii-val').textContent = riii.toFixed(2);
    document.getElementById('xiii-val').textContent = xiii.toFixed(2);
    document.getElementById('ziii').textContent = ziii.toFixed(2);
    document.getElementById('uhigh-val2').textContent = uHigh;
    document.getElementById('ziii-val').textContent = ziii.toFixed(2);
    document.getElementById('i3-norm').textContent = Math.round(i3Norm);
    document.getElementById('i3-norm-val').textContent = Math.round(i3Norm);
    document.getElementById('i2-norm').textContent = Math.round(i2Norm);
    
    // Мінімальний режим
    document.getElementById('rcmin-val').textContent = rcmin;
    document.getElementById('xcmin-val').textContent = xcmin;
    document.getElementById('xt-khp-val2').textContent = xt.toFixed(2);
    document.getElementById('xiii-min').textContent = xiiiMin.toFixed(2);
    document.getElementById('riii-min-val').textContent = riiiMin.toFixed(2);
    document.getElementById('xiii-min-val').textContent = xiiiMin.toFixed(2);
    document.getElementById('ziii-min').textContent = ziiiMin.toFixed(2);
    document.getElementById('uhigh-val3').textContent = uHigh;
    document.getElementById('ziii-min-val').textContent = ziiiMin.toFixed(2);
    document.getElementById('i3-min').textContent = Math.round(i3Min);
    document.getElementById('i3-min-val').textContent = Math.round(i3Min);
    document.getElementById('i2-min').textContent = Math.round(i2Min);
    
    // Аварійний режим
    document.getElementById('rcemerg-val').textContent = rcEmerg;
    document.getElementById('xcemerg-val').textContent = xcEmerg;
    document.getElementById('xt-khp-val3').textContent = xt.toFixed(2);
    document.getElementById('xiii-emerg').textContent = xiiiEmerg.toFixed(2);
    document.getElementById('riii-emerg-val').textContent = riiiEmerg.toFixed(2);
    document.getElementById('xiii-emerg-val').textContent = xiiiEmerg.toFixed(2);
    document.getElementById('ziii-emerg').textContent = ziiiEmerg.toFixed(2);
    document.getElementById('uhigh-val4').textContent = uHigh;
    document.getElementById('ziii-emerg-val').textContent = ziiiEmerg.toFixed(2);
    document.getElementById('i3-emerg').textContent = Math.round(i3Emerg);
    document.getElementById('i3-emerg-val').textContent = Math.round(i3Emerg);
    document.getElementById('i2-emerg').textContent = Math.round(i2Emerg);
    
    // Коефіцієнт приведення
    document.getElementById('ulow-val').textContent = uLow;
    document.getElementById('uhigh-val5').textContent = uHigh;
    document.getElementById('kpr').textContent = kpr.toFixed(4);
    
    // Дійсні опори на шинах 10 кВ
    // Нормальний режим
    document.getElementById('riii-val2').textContent = riii.toFixed(2);
    document.getElementById('kpr-val').textContent = kpr.toFixed(4);
    document.getElementById('riii-n').textContent = riiiN.toFixed(2);
    document.getElementById('xiii-val2').textContent = xiii.toFixed(2);
    document.getElementById('kpr-val2').textContent = kpr.toFixed(4);
    document.getElementById('xiii-n').textContent = xiiiN.toFixed(2);
    document.getElementById('riii-n-val').textContent = riiiN.toFixed(2);
    document.getElementById('xiii-n-val').textContent = xiiiN.toFixed(2);
    document.getElementById('ziii-n').textContent = ziiiN.toFixed(2);
    
    // Мінімальний режим
    document.getElementById('riii-min-val2').textContent = riiiMin.toFixed(2);
    document.getElementById('kpr-val3').textContent = kpr.toFixed(4);
    document.getElementById('riii-n-min').textContent = riiiNMin.toFixed(2);
    document.getElementById('xiii-min-val2').textContent = xiiiMin.toFixed(2);
    document.getElementById('kpr-val4').textContent = kpr.toFixed(4);
    document.getElementById('xiii-n-min').textContent = xiiiNMin.toFixed(2);
    document.getElementById('riii-n-min-val').textContent = riiiNMin.toFixed(2);
    document.getElementById('xiii-n-min-val').textContent = xiiiNMin.toFixed(2);
    document.getElementById('ziii-n-min').textContent = ziiiNMin.toFixed(2);
    
    // Аварійний режим
    document.getElementById('riii-emerg-val2').textContent = riiiEmerg.toFixed(2);
    document.getElementById('kpr-val5').textContent = kpr.toFixed(4);
    document.getElementById('riii-n-emerg').textContent = riiiNEmerg.toFixed(2);
    document.getElementById('xiii-emerg-val2').textContent = xiiiEmerg.toFixed(2);
    document.getElementById('kpr-val6').textContent = kpr.toFixed(4);
    document.getElementById('xiii-n-emerg').textContent = xiiiNEmerg.toFixed(2);
    document.getElementById('riii-n-emerg-val').textContent = riiiNEmerg.toFixed(2);
    document.getElementById('xiii-n-emerg-val').textContent = xiiiNEmerg.toFixed(2);
    document.getElementById('ziii-n-emerg').textContent = ziiiNEmerg.toFixed(2);
    
    // Дійсні струми КЗ на шинах 10 кВ
    // Нормальний режим
    document.getElementById('ulow-val2').textContent = uLow;
    document.getElementById('ziii-n-val').textContent = ziiiN.toFixed(2);
    document.getElementById('i3-act-norm').textContent = Math.round(i3ActNorm);
    document.getElementById('i3-act-norm-val').textContent = Math.round(i3ActNorm);
    document.getElementById('i2-act-norm').textContent = Math.round(i2ActNorm);
    
    // Мінімальний режим
    document.getElementById('ulow-val3').textContent = uLow;
    document.getElementById('ziii-n-min-val').textContent = ziiiNMin.toFixed(2);
    document.getElementById('i3-act-min').textContent = Math.round(i3ActMin);
    document.getElementById('i3-act-min-val').textContent = Math.round(i3ActMin);
    document.getElementById('i2-act-min').textContent = Math.round(i2ActMin);
    
    // Аварійний режим
    document.getElementById('ulow-val4').textContent = uLow;
    document.getElementById('ziii-n-emerg-val').textContent = ziiiNEmerg.toFixed(2);
    document.getElementById('i3-act-emerg').textContent = Math.round(i3ActEmerg);
    document.getElementById('i3-act-emerg-val').textContent = Math.round(i3ActEmerg);
    document.getElementById('i2-act-emerg').textContent = Math.round(i2ActEmerg);
    
    document.getElementById('khpenemResults').style.display = 'block';
}