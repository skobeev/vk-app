import { getNextSortDirection } from '../helpers/get-next-sort-direction';
import { getTableData } from './get-table-data';

document.body.addEventListener('click', (event) => {
  const target = event.target as HTMLButtonElement;
  if (target.classList.contains('pagination__button')) {
    const pageSizeInputElement =
      document.querySelector<HTMLInputElement>('#currentPage');
    if (pageSizeInputElement) {
      const isPrevButton = target.hasAttribute('data-is-prev');
      const isNextButton = target.hasAttribute('data-is-next');
      let currentPage = Number(pageSizeInputElement.value);

      if (isPrevButton) {
        currentPage = currentPage === 1 ? currentPage : --currentPage;
      }
      if (isNextButton) {
        currentPage++;
      }
      if (!isPrevButton && !isNextButton) {
        currentPage = Number(target.textContent);
      }
      pageSizeInputElement.value = String(currentPage);
      localStorage.setItem('currentPage', String(currentPage));
    }
    getTableData();
  }
});

const pageTableElement = document.querySelector('.page__table');

pageTableElement?.addEventListener('click', (event) => {
  const target = event.target as HTMLInputElement;

  const button = target.closest('[data-sort-column]');
  if (button && pageTableElement.contains(button)) {
    const sortDirectionInputElement =
      document.querySelector<HTMLInputElement>('#sortDirection');

    const currentSortedColumnInputElement =
      document.querySelector<HTMLInputElement>('#sortedColumnId');

    if (sortDirectionInputElement && currentSortedColumnInputElement) {
      if (currentSortedColumnInputElement?.value === button.id) {
        sortDirectionInputElement.value = getNextSortDirection(
          sortDirectionInputElement.value
        );
      } else {
        sortDirectionInputElement.value = 'asc';

        currentSortedColumnInputElement.value = button.id;
      }
      localStorage.setItem('sortDirection', sortDirectionInputElement.value);
      localStorage.setItem(
        'sortedColumnId',
        currentSortedColumnInputElement.value
      );
      getTableData();
    }
  }
});
