// вынести и упростить
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
