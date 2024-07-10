const search = document.querySelector('.search');
const container = document.querySelector('.container');
const links = document.querySelectorAll('.container a');
let searchText = "";
search.addEventListener('keyup', () => {
    for (let i = 0; i < links.length; i++) {
        searchText = search.value.toLowerCase();
        const text = links[i].innerHTML.toLowerCase();
        if (searchText == "") {
            links[i].style.display = "block";
        }
        if (text.includes(searchText)) {
            links[i].style.display = "block";
        } else {
            links[i].style.display = "none";
        }
    }
})