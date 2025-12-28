import {Reservable} from "./Reservable.js"
import {SeatInfo} from "../interface/SeatInfo.js"

export class Seat extends Reservable {

    private selected: boolean = false;
    private reserved: boolean = false;
    private element: HTMLDivElement;

    constructor(public row: number, public number: number) {
        super();
        this.element = document.createElement('div');
        this.element.classList.add('seat');
        this.element.addEventListener('click', () => this.toggleSelect());
        this.updateUI();
    }

    toggleSelect() {
        if (this.reserved) return;
        this.selected = !this.selected;
        this.updateUI();
    }



    reserve(): void {
        this.reserved = true;
        this.selected = false;
        this.updateUI();
    }

    isReserve(): boolean {
        return this.reserved;

    }

    isSelected(): boolean {
        return this.selected;

    }

    getElement(): HTMLDivElement {
        return this.element;
    }


    updateUI(): void {
        this.element.classList.remove('reserved', 'selected');
        if (this.reserved) {
            this.element.classList.add('reserved')
        } else if (this.selected) {
            this.element.classList.add('selected')
        }
    }

    saveToStorage(): void {
        const key = `seat-${this.row}-${this.number}`;
        localStorage.setItem(key, 'reserved');
    }

    loadReservedFromStorage(): void {
        const key = `seat-${this.row}-${this.number}`;
        if (localStorage.getItem(key) === 'reserved') {
            this.reserve()
        }
    }

    getInfo(): SeatInfo {
        return { row: this.row, number: this.number }
    }

}
