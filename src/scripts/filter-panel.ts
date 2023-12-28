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

document
  .querySelector<HTMLButtonElement>('#clearLocalStorage')
  ?.addEventListener('click', () => {
    localStorage.clear();
  });
