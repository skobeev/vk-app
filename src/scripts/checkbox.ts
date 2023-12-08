document.querySelector('*')?.addEventListener('click', (event) => {
  const element = event.target as Element;
  if (element.classList.contains('checkbox')) {
    const inputElement = element.querySelector('input[type=checkbox]');
    const classChecked = 'checkbox_checked';
    if (element.classList.contains(classChecked)) {
      element.classList.remove(classChecked);
      inputElement?.removeAttribute('checked');
    } else {
      element.classList.add(classChecked);
      inputElement?.setAttribute('checked', 'true');
    }
  }
});
