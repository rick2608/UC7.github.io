function selectMethod(method) {
      const tabCard = document.getElementById('tab-card');
      const tabPix = document.getElementById('tab-pix');
      const sectionCard = document.getElementById('section-card');
      const sectionPix = document.getElementById('section-pix');
 
      if (method === 'card') {
        tabCard.classList.add('active');
        tabPix.classList.remove('active');
        sectionCard.classList.add('active');
        sectionPix.classList.remove('active');
      } else {
        tabPix.classList.add('active');
        tabCard.classList.remove('active');
        sectionPix.classList.add('active');
        sectionCard.classList.remove('active');
      }
    }
 
    function copyPixCode() {
      const input = document.getElementById('pix-code');
      const btn = document.getElementById('copy-btn');
 
      navigator.clipboard.writeText(input.value).then(() => {
        btn.textContent = 'Código copiado!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copiar Código PIX';
          btn.classList.remove('copied');
        }, 2000);
      }).catch(() => {
        input.removeAttribute('readonly');
        input.select();
        document.execCommand('copy');
        input.setAttribute('readonly', true);
        btn.textContent = 'Código copiado!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copiar Código PIX';
          btn.classList.remove('copied');
        }, 2000);
      });
    }