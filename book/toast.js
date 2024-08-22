require(["gitbook"], function(gitbook) {
  let closed = false;
  let $toast;

  gitbook.events.bind("page.change", function() {
    const cfg = gitbook.state.config.pluginsConfig.toast || {};
    const content = cfg.content;
    const showClose = cfg.showClose ?? true;
    const $bookBody = document.querySelector('.book-body');

    function closeModal() {
      if ($toast) {
        const $content = document.getElementById('content');
        if ($content) {
          $content.classList.add('hide');
          setTimeout(function() {
            $toast.remove();
            $toast = null;
          }, 500);
        }
      }
      closed = true;
    }

    function showModal(content, showClose) {
      const existingToast = $bookBody.querySelector('.gitbook-plugin-toast');
      if (existingToast) {
        existingToast.style.display = 'block';
        return;
      }

      $toast = window.document.createElement('div');
      $toast.className = 'gitbook-plugin-toast';
      $toast.innerHTML = `
        <div id="content" class="gitbook-plugin-toast-content">
          <i class="fa fa-exclamation icon"></i>
          <span>${content}</span>
        </div>
      `;
      $bookBody.appendChild($toast);

      if (showClose) {
        const closeButton = document.createElement('button');
        closeButton.id = 'close-button';
        closeButton.className = 'close-button';
        closeButton.innerHTML = '<i class="fa fa-times"></i>';
        document.getElementById('content').appendChild(closeButton);
        closeButton.addEventListener('click', closeModal);
      }
    }

    function checkModal() {
      if (closed) {
        return;
      }
      showModal(content, showClose);
    }

    checkModal();

    /* hide toast when search */
    const searchInput = document.querySelector('#book-search-input input');
    if (searchInput) {
      function hideModal() {
        if ($toast) {
          const $content = document.getElementById('content');
          if ($content) {
            $content.classList.add('hide');
          }
        }
      }
      searchInput.addEventListener('input', hideModal);
    }
  });

  gitbook.events.bind("exercise.submit", function() {
    // do something
  });
});
