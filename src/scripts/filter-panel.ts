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
