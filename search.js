const range1 = document.getElementById("minRange");
const range2 = document.getElementById("maxRange");
const highlight = document.querySelector(".search__slider--range");
const output = document.getElementById("output");

console.log(range1.value);
console.log(range2.value);

function updateHighlight () {
    let min = parseInt(range1.value);
    let max = parseInt(range2.value);

    if (min > max) {
        [min, max] = [max, min];
    }

    console.log(min);
    console.log(max);

    highlight.style.left = (min / 100 *300) + "px";
    highlight.style.width = ((max - min) / 100 * 300) + "px";

    output.textContent = min + " - " + max;
}

range1.addEventListener("input", updateHighlight);
range2.addEventListener("input", updateHighlight);

updateHighlight();