import food from "./values.js";

const wideText = document.getElementById("wide-text");
const modal = document.getElementById("modal");

wideText.addEventListener("input", function () {
    const val = wideText.value.trim();
    if (val.length >= 3) {
        // Filter food list by name
        const matches = Object.entries(food).filter(([_, value]) => value.name.toLowerCase().includes(val.toLowerCase()));
        modal.innerHTML = "";
        modal.classList.toggle("show", matches.length);
        matches.forEach(([key, value]) => {
            const div = document.createElement("div");
            div.textContent = value.name;
            div.className = "modal-item";
            div.style.padding = "0.5em";
            div.setAttribute('key', key);
            div.addEventListener("click", click);

            modal.appendChild(div);
        });
    } else {
        modal.classList.remove("show");
        modal.innerHTML = "";
    }
});

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
    salt: 0,
    price: 0
}

const button = document.getElementById("button-add");
const table = document.getElementById("table");

const click = (ev) => {
    document.getElementById("wide-text").value = "";
    const value = ev.target.getAttribute('key');
    current = food[value];
    modal.classList.remove("show");
    document.getElementById("setup").classList.add("show");
    document.getElementById("label").innerText = current.name;
    document.getElementById("label").addEventListener("click", onClick);
}

const onClick = () => {
    document.getElementById("setup").classList.remove("show");
    const q = document.getElementById("quant").value;
    const tr = document.createElement("tr");

    const td = document.createElement("td");
    td.innerHTML = getImg(current)
    td.id = "first-col";
    tr.appendChild(td);

    Object.values(current).forEach((v, i) => {
        if (i > 1) {
            const td = document.createElement("td");
            td.innerHTML = v * q / 100
            tr.appendChild(td);
        }
    });

    table.appendChild(tr);

    let totals = document.getElementById("totals");

    if (totals) {
        table.removeChild(totals)
    }

    total.calories = Number((total.calories + current.calories * q / 100).toFixed(2));
    total.carbs = Number((total.carbs + current.carbs * q / 100).toFixed(2));
    total.fat = Number((total.fat + current.fat * q / 100).toFixed(2));
    total.fat_sat = Number((total.fat_sat + current.fat_sat * q / 100).toFixed(2));
    total.sugar = Number((total.sugar + current.sugar * q / 100).toFixed(2));
    total.fiber = Number((total.fiber + current.fiber * q / 100).toFixed(2));
    total.salt = Number((total.salt + current.salt * q / 100).toFixed(2));
    total.prot = Number((total.prot + current.prot * q / 100).toFixed(2));
    total.price = Number((total.price + current.price * q / 100).toFixed(2));

    totals = document.createElement("tr");
    totals.id = "totals"

    Object.values(total).forEach(v => {
        const td = document.createElement("td");
        td.innerHTML = v;
        totals.appendChild(td);
    });

    table.appendChild(totals);

}

let getImg = (obj) => {
    return `<img src="../img/${obj.img}.png" style="height:2em;vertical-align:middle" onclick="enlarge" data="${obj.name}"/>`
}
