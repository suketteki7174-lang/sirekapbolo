function renderTable(){
  tbody.innerHTML='';
  let allData = [];
  desaList.forEach(desa=>{
    semuaData[desa].forEach(d=>{
      allData.push({...d, desa});
    });
  });

  let filtered = allData.filter(d =>
    (filterBulan.value==='' || d.bulan===filterBulan.value) &&
    (filterTahun.value==='' || d.tahun==filterTahun.value)
  );

  if(filtered.length===0){
    tbody.innerHTML='<tr><td colspan="11">Belum ada data</td></tr>';
    return;
  }

  // Inisialisasi total
  let totalLaki=0, totalPerempuan=0, totalPindah=0, totalDatang=0, totalMeninggal=0, totalLahir=0, totalKeseluruhan=0;

  filtered.forEach((d,i)=>{
    const total = (d.laki+d.perempuan+d.lahir+d.datang)-(d.pindah+d.meninggal);
    totalLaki += d.laki;
    totalPerempuan += d.perempuan;
    totalPindah += d.pindah;
    totalDatang += d.datang;
    totalMeninggal += d.meninggal;
    totalLahir += d.lahir;
    totalKeseluruhan += total;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i+1}</td>
      <td>${d.desa}</td>
      <td>${d.bulan}</td>
      <td>${d.tahun}</td>
      <td>${d.laki}</td>
      <td>${d.perempuan}</td>
      <td>${d.pindah}</td>
      <td>${d.datang}</td>
      <td>${d.meninggal}</td>
      <td>${d.lahir}</td>
      <td>${total}</td>
    `;
    tbody.appendChild(tr);
  });

  // Tambahkan baris total
  const trTotal = document.createElement('tr');
  trTotal.style.fontWeight = 'bold';
  trTotal.style.backgroundColor = '#e0e0e0';
  trTotal.innerHTML = `
    <td colspan="4">TOTAL</td>
    <td>${totalLaki}</td>
    <td>${totalPerempuan}</td>
    <td>${totalPindah}</td>
    <td>${totalDatang}</td>
    <td>${totalMeninggal}</td>
    <td>${totalLahir}</td>
    <td>${totalKeseluruhan}</td>
  `;
  tbody.appendChild(trTotal);
}