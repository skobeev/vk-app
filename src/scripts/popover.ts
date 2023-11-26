interface PopoverConstructor {
  triggerElement: HTMLElement;
}

// класс не попадает в бандл webpack!

// такую концепцию надо дорабатывать на элементах, котроые могут скролится
// больше подходит position - absolute
// либо ослеживать изменение положения триггера -  посмотреть в сторону observable
class Popover {
  private triggerElement: HTMLElement | null;
  private popoverContainer: HTMLElement | null;

  private ACTIVE_POPOVER_ATTRIBUTE = 'data-popover-container-active';

  constructor(params: PopoverConstructor) {
    const { triggerElement } = params;

    this.triggerElement = triggerElement;
    const id = triggerElement.getAttribute('data-popover-id');
    const popoverContainer = document.querySelector<HTMLElement>(
      `[data-popover-container-id="${id}"]`
    );

    this.popoverContainer = popoverContainer;

    if (popoverContainer) {
      popoverContainer.style.position = 'fixed';
      popoverContainer.style.display = 'none';
    } else {
      console.warn('Контент для popover не определен');
    }

    triggerElement.addEventListener('click', (evt) => {
      if (popoverContainer) {
        popoverContainer?.toggleAttribute(this.ACTIVE_POPOVER_ATTRIBUTE);
        const isActive = popoverContainer?.hasAttribute(
          this.ACTIVE_POPOVER_ATTRIBUTE
        );

        if (isActive) {
          popoverContainer.style.display = 'block';
          this.changePosition();
        } else {
          popoverContainer.style.display = 'none';
        }
      }
    });

    window.addEventListener('resize', () => {
      if (!this.isActivePopover()) {
        return;
      }
      this.changePosition();
    });
  }

  private changePosition() {
    if (!this.popoverContainer || !this.triggerElement) {
      return;
    }
    const triggerClienReact = this.triggerElement.getBoundingClientRect();
    this.popoverContainer.style.top =
      triggerClienReact.top + triggerClienReact.height + 'px';
    this.popoverContainer.style.left = triggerClienReact.left + 'px';
  }

  private isActivePopover() {
    return this.popoverContainer?.hasAttribute(this.ACTIVE_POPOVER_ATTRIBUTE);
  }
}
