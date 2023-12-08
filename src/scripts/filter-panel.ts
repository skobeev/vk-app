import { getTableData } from '../api/get-table-data/get-table-data';

document
  .querySelector<HTMLButtonElement>('#applyFilter')
  ?.addEventListener('submit', async function (event) {
    // const filterPanelForm =
    //   document.querySelector<HTMLFormElement>('#filterPanelForm');
    // const filterPanelFormData = new FormData(filterPanelForm);
    // console.log('event', event);
    // event.preventDefault();
    try {
      //   const { result, isSuccess } = await getTableData(3);
    } catch {
    } finally {
    }
  });

document
  .querySelector<HTMLFormElement>('#filterPanelForm')
  ?.addEventListener('submit', function (event) {
    console.log('event', event);
    console.log('this', this);
    event.preventDefault();
    const formData = new FormData(this);
    console.log(...formData);
    const requestParams = Object.fromEntries(formData);
    console.log('formData', Object.fromEntries(formData));
    getTableData(requestParams);
  });

// document
//   .querySelector<HTMLButtonElement>('#applyFilter')
//   ?.addEventListener('click', async (event) => {
//     event.preventDefault();
//     console.log('event', event);
//     try {
//       //   const { result, isSuccess } = await getTableData(3);
//     } catch {
//     } finally {
//     }
//   });
