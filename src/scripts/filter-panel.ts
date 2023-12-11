import { getTableData } from '../api/get-table-data/get-table-data';

document
  .querySelector<HTMLFormElement>('#filterPanelForm')
  ?.addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const requestParams = Object.fromEntries(formData);
    console.log('formData', Object.fromEntries(formData));
    const loader = document.querySelector('.loader');
    try {
      loader?.classList.remove('loader_hidden');
      const { isSuccess, result } = await getTableData(requestParams);
      if (isSuccess) {
        const tableContainer =
          document.querySelector<HTMLElement>('.page__table');
        if (!tableContainer) {
          return;
        }
        tableContainer.innerHTML = result;

        tableContainer
          .querySelectorAll<HTMLElement>('thead [data-popover-id]')
          .forEach((triggerElement) => {
            console.log('trigget', triggerElement);
            new Popover({
              triggerElement,
            });
          });
      }
    } catch (error) {
      console.log(error);
    } finally {
      loader?.classList.add('loader_hidden');
    }
  });
