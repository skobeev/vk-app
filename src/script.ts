// вынести и упростить все функции
document
  .querySelector('.filter-panel__footer')
  ?.addEventListener('click', (event) => {
    document
      .querySelector('.filter-panel')
      ?.classList.toggle('filter-panel_hidden');

    document
      .querySelector('.filter-panel__footer')
      ?.classList.toggle('filter-panel__footer_collapsed');
  });

const userIdInputElement = document.querySelector<HTMLInputElement>('#userId');
// хочу исспользовать ??= но что-то не выходит...

if (userIdInputElement) {
  userIdInputElement.value = localStorage.getItem('userId') ?? '';
}

document
  .querySelectorAll<HTMLInputElement>('.filter-panel__group-content input')
  .forEach((element) => {
    const checked = localStorage.getItem(element.id) === 'true';
    element.checked = checked;
  });

document
  .querySelector('.notification__close')
  ?.addEventListener('click', () => {
    document
      .querySelector('.notification')
      ?.classList.add('notification_hidden');
  });
