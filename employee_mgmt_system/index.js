let cont = document.querySelector(".cont");
let filterBy = document.querySelector("#filterBy");
let filtergen = document.querySelector("#filtergen");
let sortBy = document.querySelector("#sortBy");
let prevBtn = document.querySelector(".prevbtn");
let nextBtn = document.querySelector(".nextbtn");

let currentPage = 1;
let totalPages;

let newarr = [];

async function fetchData(page = 1) {
    let resp = await fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${page}&limit=10`);
    let mydata = await resp.json();
    newarr = mydata.data;
    totalPages = mydata.totalPages;
    showData(mydata.data);
    console.log(mydata.data);
}

fetchData(currentPage);

function showData(arr) {
    cont.innerHTML = "";
    arr.forEach((el) => {
        let tr = document.createElement("tr");

        let sno = document.createElement("td");
        sno.innerText = el.id;

        let name = document.createElement("td");
        name.innerText = el.name;

        let gender = document.createElement("td");
        gender.innerText = el.gender;

        let department = document.createElement("td");
        department.innerText = el.department;

        let salary = document.createElement("td");
        salary.innerText = el.salary;

        cont.append(tr);
        tr.append(sno, name, gender, department, salary);
    });
}

filterBy.addEventListener("change", function() {
    let value = filterBy.value;
    let filtered;
    if (value == "") {
        showData(newarr);
    } else {
        filtered = newarr.filter(function(el) {
            return el.department === value;
        });
        showData(filtered);
    }
});

filtergen.addEventListener("change", function() {
    let value = filtergen.value;
    let filtered;
    if (value == "") {
        showData(newarr);
    } else {
        filtered = newarr.filter(function(el) {
            return el.gender === value;
        });
        showData(filtered);
    }
});

sortBy.addEventListener("change", sortData);

function sortData() {
    let value = sortBy.value;
    let sortered;

    if (value === "asc") {
        sortered = newarr.sort(function(a, b) {
            return a.salary - b.salary;
        });
    } else if (value === "desc") {
        sortered = newarr.sort(function(a, b) {
            return b.salary - a.salary;
        });
    } else if (value === "") {
        showData(newarr);
    }
    showData(sortered);
}

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchData(currentPage);
    }
});

nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;
        fetchData(currentPage);
    }
});
