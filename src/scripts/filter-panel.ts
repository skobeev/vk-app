import { getNextSortDirection } from '../helpers/get-next-sort-direction';
import { getTableData } from './get-table-data';

document
  .querySelector<HTMLFormElement>('#filterPanelForm')
  ?.addEventListener('submit', async function (event) {
    event.preventDefault();
    await getTableData();
  });

document
  .querySelector<HTMLButtonElement>('#get')
  ?.addEventListener('click', async () => {
    await getTableData();
  });

/*
лучше переопределить тип вместо as
export interface HTMLElementEvent<T extends HTMLElement> extends Event {
  target: T;
}
 */

document.querySelector('#userId')?.addEventListener('change', (event) => {
  const target = event.target as HTMLInputElement;

  localStorage.setItem(target.id, target.value);
});

document
  .querySelectorAll<HTMLInputElement>('.filter-panel__group-content input')
  .forEach((element) => {
    element.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement;

      localStorage.setItem(target.id, String(target.checked));
    });
  });

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
    }
    getTableData();
  }
});

const pageTableElement = document.querySelector('.page__table');

pageTableElement?.addEventListener('click', (event) => {
  const target = event.target as HTMLInputElement;

  const button = target.closest('#sortBySex');
  if (
    button &&
    pageTableElement.contains(button) &&
    button.id === 'sortBySex'
  ) {
    const sortDirectionInputElement = document.querySelector<HTMLInputElement>(
      '#sortDirectionSexColumn'
    );

    if (sortDirectionInputElement) {
      sortDirectionInputElement.value = getNextSortDirection(
        sortDirectionInputElement.value
      );
      getTableData();
    }
  }
});
