$(document).ready(() => {
  const dismissableAlert = (text, type) => `<div class="alert ${type} alert-dismissible fade show" role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
  </button>
  ${text}
</div>`;

  function checkForSuccess(link) {
    if (link.indexOf('success') > -1) {
      const msg = link.slice(link.indexOf('success') + 8);
      const alert = dismissableAlert(decodeURIComponent(msg), 'alert-success');

      $('#main-content').prepend(alert);
    }
  }

  function checkForError(link) {
    if (link.indexOf('error') > -1) {
      const msg = link.slice(link.indexOf('error') + 6);
      const alert = dismissableAlert(decodeURIComponent(msg), 'alert-danger');

      $('#main-content').prepend(alert);
    }
  }

  checkForError(window.location.href);
  checkForSuccess(window.location.href);
});
