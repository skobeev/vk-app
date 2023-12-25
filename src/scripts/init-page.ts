import { getTableData } from './get-table-data';

const userIdInputElement = document.querySelector<HTMLInputElement>('#userId');
// хочу исспользовать ??= но что-то не выходит...

if (userIdInputElement) {
  userIdInputElement.value = localStorage.getItem('userId') ?? '';
}

document
  .querySelectorAll<HTMLInputElement>('.filter-panel__group-content input')
  .forEach((element) => {
    const storageValue = localStorage.getItem(element.id);
    if (storageValue === null) {
      return;
    }
    const checked = storageValue === 'true';
    element.checked = checked;
  });

const currentPageInputElement =
  document.querySelector<HTMLInputElement>('#currentPage');

if (currentPageInputElement) {
  const storageValue = localStorage.getItem('currentPage');
  if (storageValue !== null) {
    currentPageInputElement.value = storageValue;
  }
}

const currentSortDirectionInputElement =
  document.querySelector<HTMLInputElement>('#sortDirection');

if (currentSortDirectionInputElement) {
  const storageValue = localStorage.getItem('sortDirection');
  if (storageValue !== null) {
    currentSortDirectionInputElement.value = storageValue;
  }
}

const currentSortedColumnInputElement =
  document.querySelector<HTMLInputElement>('#sortedColumnId');

if (currentSortedColumnInputElement) {
  const storageValue = localStorage.getItem('sortedColumnId');
  if (storageValue !== null) {
    currentSortedColumnInputElement.value = storageValue;
  }
}

if (localStorage.getItem('userId') !== null) {
  getTableData();
}
