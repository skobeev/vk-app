import { PaginationButtons } from '../types/pagination-butons';

export const getPaginationButtons = (
  currentPage: number,
  totalPages: number
): PaginationButtons => {
  const needAdditionalButtons = totalPages > 6;
  let buttons;
  if (totalPages - currentPage >= 4) {
    buttons = [currentPage, currentPage + 1, null, totalPages - 1, totalPages];
  } else {
    buttons = [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  if (currentPage !== 1 && currentPage !== 2) {
    buttons.unshift(null);
  }

  if (currentPage !== 1) {
    buttons.unshift(1);
  }

  if (currentPage !== 1 && currentPage !== 2) {
  }

  return {
    needShowButtonPrev: needAdditionalButtons,
    needShowButtonNext: needAdditionalButtons,
    buttons: needAdditionalButtons
      ? buttons
      : Array(totalPages)
          .fill('')
          .map((_, index) => ++index),
  };
};
