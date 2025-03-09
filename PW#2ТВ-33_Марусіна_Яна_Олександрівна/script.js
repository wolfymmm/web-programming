document.getElementById("emissionForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const B_coal = parseFloat(document.getElementById("coal").value);
    const B_mazut = parseFloat(document.getElementById("mazut").value);
    const B_gas = parseFloat(document.getElementById("gas").value);

    // Нижча теплота згоряння, МДж/кг
    const Qr_coal = 20.47;
    const Qr_mazut = 39.48;
    const Qr_gas = 33.08;

    // Показники емісії, г/ГДж
    const k_tv_coal = 150;
    const k_tv_mazut = 0.57;
    const k_tv_gas = 0;

    // Валові викиди, т
    const E_coal = 1e-6 * k_tv_coal * Qr_coal * B_coal;
    const E_mazut = 1e-6 * k_tv_mazut * Qr_mazut * B_mazut;
    const E_gas = 1e-6 * k_tv_gas * Qr_gas * B_gas * 1000 * 0.723;

    const result = `
Показник емісії твердих частинок при спалюванні вугілля: ${k_tv_coal.toFixed(2)} г/ГДж;
Валовий викид при спалюванні вугілля: ${E_coal.toFixed(2)} т;
--------------------------------------------------------------------------------------
Показник емісії твердих частинок при спалюванні мазуту: ${k_tv_mazut.toFixed(2)} г/ГДж;
Валовий викид при спалюванні мазуту: ${E_mazut.toFixed(2)} т;
--------------------------------------------------------------------------------------
Показник емісії твердих частинок при спалюванні природного газу: ${k_tv_gas.toFixed(3)} г/ГДж;
Валовий викид при спалюванні природного газу: ${E_gas.toFixed(2)} т;
`;

    document.getElementById("result").textContent = result;
});




























































  
  
  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  

  
  
  
  

  
  

  
  
  
  
  
  
  
  
  
  
  

  
  
  

  
  
  

  
  

  
  
  
  

  

  
  
  
