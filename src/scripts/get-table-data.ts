import { GetTableDataRequestParams } from '../api/get-table-data/dto/get-table-data-request-params';
import { getTableDataRequest } from '../api/get-table-data/get-table-data-request';
import { SortOrder } from '../types/SortOrder';

export const getTableData = async () => {
  const userId =
    document.querySelector<HTMLInputElement>('#userId')?.value ?? '';

  const filterPanelForm =
    document.querySelector<HTMLFormElement>('#filterPanelForm');

  const currentPage =
    document.querySelector<HTMLInputElement>('#currentPage')?.value ?? '1';

  const sortDirection =
    document.querySelector<HTMLInputElement>('#sortDirection')?.value ?? '';

  const currentSortedColumnId =
    document.querySelector<HTMLInputElement>('#sortedColumnId')?.value ?? '';

  if (!filterPanelForm) {
    return;
  }

  const formData = new FormData(filterPanelForm);
  const requestParams: GetTableDataRequestParams = {
    ...Object.fromEntries(formData),
    userId,
    currentPage,
    sortDirection: sortDirection as SortOrder,
    sortedColumnId: currentSortedColumnId,
  };

  const loader = document.querySelector('.loader');
  try {
    loader?.classList.remove('loader_hidden');
    const { isSuccess, result, error } = await getTableDataRequest(
      requestParams
    );
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
          new Popover({
            triggerElement,
          });
        });
      return;
    }

    console.error(error);
    const notificationElement = document.querySelector('.notification');
    const notificationContentElement = notificationElement?.querySelector(
      '.notification__content'
    );
    notificationElement?.classList.remove('notification_hidden');
    if (notificationElement && notificationContentElement) {
      notificationContentElement.innerHTML = error;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loader?.classList.add('loader_hidden');
  }
};
