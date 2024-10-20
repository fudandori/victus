import food from "./values.js";

let current = {}
let total = {
    name: "Total",
    calories: 0,
    fat: 0,
    fat_sat: 0,
    carbs: 0,
    sugar: 0,
    prot: 0,
    fiber: 0,
    salt: 0
}

const select = document.getElementById("food-dropdown");
const button = document.getElementById("button-add");
const table = document.getElementById("table");

Object.keys(food).forEach(k => {
    const opt = document.createElement('option');
    opt.value = k;
    opt.innerHTML = food[k].name;
    select.appendChild(opt);
});


const onChange = (ev) => {
    const value = ev.target.value;
    button.disabled = value === "nil";
    current = food[value];
}
const onClick = () => {
    const q = document.getElementById("quant").value;
    const tr = document.createElement("tr");

    Object.values(current).forEach((v,i) => {
        const td = document.createElement("td");
        td.innerHTML = i > 0 ? v*q/100 : `${v} (${q}g)`;
        tr.appendChild(td);
    });

    table.appendChild(tr);

    let totals = document.getElementById("totals");

    if (totals) {
        table.removeChild(totals)
    }


    total.calories = Number((total.calories + current.calories*q/100).toFixed(2));
    total.carbs = Number((total.carbs + current.carbs*q/100).toFixed(2));
    total.fat = Number((total.fat + current.fat*q/100).toFixed(2));
    total.fat_sat = Number((total.fat_sat + current.fat_sat*q/100).toFixed(2));
    total.sugar = Number((total.sugar + current.sugar*q/100).toFixed(2));
    total.fiber = Number((total.fiber + current.fiber*q/100).toFixed(2));
    total.salt = Number((total.salt + current.salt*q/100).toFixed(2));
    total.prot = Number((total.prot + current.prot*q/100).toFixed(2));

    totals = document.createElement("tr");
    totals.id = "totals"

    Object.values(total).forEach(v => {
        const td = document.createElement("td");
        td.innerHTML = v;
        totals.appendChild(td);
    });

    table.appendChild(totals);

}
select.addEventListener("change", onChange);


button.addEventListener("click", onClick)