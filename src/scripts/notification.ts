document
  .querySelector('.notification__btn-close')
  ?.addEventListener('click', () => {
    document
      .querySelector('.notification')
      ?.classList.add('notification_hidden');
  });
