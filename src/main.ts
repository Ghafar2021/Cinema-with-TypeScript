import {Cinema} from "./models/Cinema.js"
import {Seat} from "./models/Seat.js"


const cinemaDiv = document.getElementById('cinema') as HTMLDivElement;
const cinema = new Cinema<Seat>;
const TICKET_PRICE = 20;

for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 8; j++) {
        const seat = new Seat(i, j)
        cinema.add(seat);
    }
}

cinema.render(cinemaDiv)

const buyButton = document.getElementById('buyButton') as HTMLButtonElement;

buyButton?.addEventListener('click', () => {

    const selected = cinema.getSelectedSeat();

    if (selected.length === 0) {
        alert('please select at least one seat')
        return
    }

    const total = selected.length * TICKET_PRICE;

    const confirmed = confirm(`You have selected ${selected.length} seats.\n
Amount Due ${total.toLocaleString('DE', { minimumFractionDigits: 2 })} Euro.\nDo you want to continue?`);

    if (confirmed) {
        selected.forEach(seat => {
            seat.saveToStorage();
            seat.reserve();
        })
    }

    const invoice = document.getElementById('invoice')!;
    const invoiceDetails = document.getElementById('invoice-details')!;

    invoiceDetails.innerHTML = `<p>Final Amount: <b>${total.toLocaleString()} Euro </b> </p>
<p>Reserved seats: </p>
<ul>
${selected.map(s => `<li> row ${s.getInfo().row} - number ${s.getInfo().number} </li> `).join("")}
</ul>`

    invoice.style.display = 'block';

});

document.getElementById('clearStorageButton')!.addEventListener('click',()=> {

    const confirmed = confirm('Are you sure you want to delete the data completely?')
    if (confirmed){
        localStorage.clear();
        alert('Data are successfully cleared.')
        location.reload();
    }
})

document.getElementById('showSalesButton')!.addEventListener('click',()=> {

    let count:number=0;
    for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 8; j++) {
        const key = `seat-${i}-${j}`;
        if(localStorage.getItem(key)=== 'reserved'){
            count++;
        }
    }
}
    const total_price = count * TICKET_PRICE;
    alert(`Number of tickets sold ${total_price.toLocaleString('DE',{minimumFractionDigits: 2})} Euro.
Your sales so far ${count}.`)
})
