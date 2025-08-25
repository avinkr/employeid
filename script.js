(function(){
  function byId(id){ return document.getElementById(id); }

  const inputs = {
    name: byId('sicg_name'),
    sid: byId('sicg_sid'),
    dob: byId('sicg_dob'),
    email: byId('sicg_email'),
    phone: byId('sicg_phone'),
    course: byId('sicg_course'),
    photo: byId('sicg_photo')
  };

  const preview = {
    name: byId('sicg_prev_name'),
    sid: byId('sicg_prev_sid'),
    dob: byId('sicg_prev_dob'),
    email: byId('sicg_prev_email'),
    phone: byId('sicg_prev_phone'),
    course: byId('sicg_prev_course'),
    photo: byId('sicg_preview_photo')
  };

  // Bind text inputs
  function bind(input, target){
    input.addEventListener('input', () => target.textContent = input.value || '—');
    target.textContent = input.value || '—';
  }

  bind(inputs.name, preview.name);
  bind(inputs.sid, preview.sid);
  bind(inputs.email, preview.email);
  bind(inputs.phone, preview.phone);
  bind(inputs.course, preview.course);

  // Date of Birth formatting
  inputs.dob.addEventListener('input', () => {
    if(!inputs.dob.value){ preview.dob.textContent = '—'; return; }
    const d = new Date(inputs.dob.value);
    const dd = String(d.getDate()).padStart(2,'0');
    const mm = String(d.getMonth()+1).padStart(2,'0');
    const yyyy = d.getFullYear();
    preview.dob.textContent = `${dd}/${mm}/${yyyy}`;
  });

  // Photo upload
  inputs.photo.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = () => preview.photo.src = reader.result;
    reader.readAsDataURL(file);
  });

  // Download as PNG
  byId('sicg_download_png').addEventListener('click', async () => {
    const node = byId('sicg_card');
    const canvas = await html2canvas(node, {scale:2});
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = (inputs.name.value || 'idcard') + '.png';
    a.click();
  });

  // Download as PDF
  byId('sicg_download_pdf').addEventListener('click', async () => {
    const node = byId('sicg_card');
    const canvas = await html2canvas(node, {scale:2});
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jspdf.jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: [node.offsetWidth*2.83, node.offsetHeight*2.83]
    });
    pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    pdf.save((inputs.name.value || 'idcard') + '.pdf');
  });

})();
