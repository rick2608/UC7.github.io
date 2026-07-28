 function toggleLike(btn) {
      btn.classList.toggle('liked');
 
      const likeCount = btn.parentElement.querySelector('.stat.likes');
      if (!likeCount) return;
 
      // Store the original text the first time we touch this card
      if (!likeCount.dataset.original) {
        likeCount.dataset.original = likeCount.textContent.trim();
      }
 
      const svgMarkup = likeCount.querySelector('svg').outerHTML;
 
      if (btn.classList.contains('liked')) {
        likeCount.innerHTML = svgMarkup + ' ' + likeCount.dataset.original + ' +1';
      } else {
        likeCount.innerHTML = svgMarkup + ' ' + likeCount.dataset.original;
      }
    }