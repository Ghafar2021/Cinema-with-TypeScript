export class Cinema {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    getSelectedSeat() {
        return this.items.filter((item) => typeof item.isSelected === 'function' && item.isSelected());
    }
    render(container) {
        this.items.forEach((item) => {
            if (item.loadReservedFromStorage)
                item.loadReservedFromStorage();
            if (item.getElement)
                container.appendChild(item.getElement());
        });
    }
}
