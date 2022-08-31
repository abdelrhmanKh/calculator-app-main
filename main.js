/*:root {
  
} */



const switches = document.querySelectorAll("input[name='theme']");
let arr = [...switches];
let rootClass = document.querySelector(":root")
const theme1 = {
    "--main-backgound": "hsl(222, 26%, 31%)",
    "--toggle-background": "hsl(223, 31%, 20%)",
    "--keypad-background": "hsl(223, 31%, 20%)",
    "--screen-background": "hsl(224, 36%, 15%)",
    "--key-background": "hsl(30, 25%, 89%)",
    "--key-shadow": "hsl(28, 16%, 65%)",
    "--toggle": "hsl(6, 63%, 50%)",
    "--equal-background": "hsl(6, 63%, 50%)",
    "--equal-shadow": "hsl(6, 70%, 34%)",
    "--equal-color": "#ffffff",
    "--del-res-background": "hsl(225, 21%, 49%)",
    "--del-res-shadow": " hsl(224, 28%, 35%)",
    "--del-res-color": "#ffffff",
    "--number-color": "hsl(221, 14%, 31%)",
    "--upper-color": "hsl(0, 0%, 100%)",
}
const theme2 = {
    "--main-backgound": "hsl(0, 0%, 90%)",
    "--toggle-background": "hsl(0, 5%, 81%)",
    "--keypad-background": "hsl(0, 5%, 81%)",
    "--screen-background": "hsl(0, 0%, 93%)",
    "--key-background": "hsl(45, 7%, 89%)",
    "--key-shadow": "hsl(35, 11%, 61%)",
    "--toggle": "hsl(25, 98%, 40%)",
    "--equal-background": "hsl(25, 98%, 40%)",
    "--equal-shadow": "hsl(25, 99%, 27%)",
    "--equal-color": "#ffffff",
    "--del-res-background": "hsl(185, 42%, 37%)",
    "--del-res-shadow": " hsl(185, 58%, 25%)",
    "--del-res-color": "#ffffff",
    "--number-color": "hsl(60, 10%, 19%)",
    "--upper-color": "hsl(60, 10%, 19%)",
}
const theme3 = {
    "--main-backgound": "hsl(268, 75%, 9%)",
    "--toggle-background": "hsl(268, 71%, 12%)",
    "--keypad-background": "hsl(268, 71%, 12%)",
    "--screen-background": "hsl(268, 71%, 12%)",
    "--key-background": "hsl(268, 47%, 21%)",
    "--key-shadow": "hsl(290, 70%, 36%)",
    "--toggle": "hsl(176, 100%, 44%)",
    "--equal-background": "hsl(176, 100%, 44%)",
    "--equal-shadow": "hsl(177, 92%, 70%)",
    "--equal-color": "hsl(198, 20%, 13%)",
    "--del-res-background": "hsl(281, 89%, 26%)",
    "--del-res-shadow": " hsl(285, 91%, 52%)",
    "--del-res-color": "#ffffff",
    "--number-color": "hsl(52, 100%, 62%)",
    "--upper-color": "hsl(52, 100%, 62%)",
}

arr.forEach((e, i) => {
    e.addEventListener("click", () => {
        e.style.opacity = "1";
        if (i == 0) {
            Object.entries(theme1).forEach(v => rootClass.style.setProperty(v[0], v[1]))
            localStorage.setItem("theme", `theme1`);
        } else if (i == 1) {
            Object.entries(theme2).forEach(v => rootClass.style.setProperty(v[0], v[1]))
            localStorage.setItem("theme", `theme2`);

        } else {
            Object.entries(theme3).forEach(v => rootClass.style.setProperty(v[0], v[1]))
            localStorage.setItem("theme", `theme3`);

        }

        arr.filter(function (item) {
            return item != e;
        }).forEach((item) => {
            item.style.opacity = "0";
        });
    });
});

if (localStorage.getItem("theme")) {
    let name = localStorage.getItem("theme");
    let e = 0
    if (name == "theme1") {
        Object.entries(theme1).forEach(v => rootClass.style.setProperty(v[0], v[1]))
        e = arr[0]

    } else if (name == "theme2") {
        Object.entries(theme2).forEach(v => rootClass.style.setProperty(v[0], v[1]))
        e = arr[1]
    } else {
        Object.entries(theme3).forEach(v => rootClass.style.setProperty(v[0], v[1]))
        e = arr[2]
    }
    e.style.opacity = "1";

    arr.filter(function (item) {
        return item != e;
    }).forEach((item) => {
        item.style.opacity = "0";
    });
}



let result = document.querySelector("#result");
let numbers = document.querySelectorAll(".no");
let oprators = document.querySelectorAll(".op");
let del = document.querySelector(".del");
let reset = document.querySelector(".reset");
let equal = document.querySelector(".equal");
let no = [];
let op = [];

function removecomma(value) {
    let stvalue = value
    return stvalue.split(",").join("")
}

function addcomma(value) {
    let reg = /\./gm
    if (!value.match(reg)) {
        const chunkSize = 3;
        let arr = [...removecomma(value)]
        arr = arr.reverse()
        const groups = arr.map((e, i) => {
            return i % chunkSize === 0 ? arr.slice(i, i + chunkSize) : null;
        }).filter(e => { return e; });


        let threegroup = groups.map(e => e.reverse().join("")).reverse()

        return threegroup.join(",")
    }

    return value
}


numbers.forEach((e) => {

    e.addEventListener("click", () => {
        let values = result.value + e.value
        result.value = addcomma(values)
    })
})

del.addEventListener('click', () => {
    let value = [...result.value];
    console.log(value)
    value.pop()
    result.value = value.join("");
    // result.value = addcomma(`${value}`);
})

reset.addEventListener("click", () => {
    no = [];
    op = [];
    result.value = "";
})



oprators.forEach(e => {
    e.addEventListener('click', makeopration)
})

function makeopration(opra) {
    if (!result.value == 0 && !result.value.length == 0) {
        no.push(result.value)
        op.push(opra.target.value)
        result.value = "";
    }

}

equal.addEventListener("click", () => {

    if (!(result.value == "0") && no.length >= 1) {
        no.push(result.value)
        no = no.map(e => {
            return removecomma(e)
        })
        let res = 0
        let length = op.length;
        for (let i = 0; i < length; i++) {
            let numberone = no[0]
            let numbertwo = no[1]
            no.shift()
            no.shift()
            let ops = op[0];
            op.shift()

            if (ops == "+") {
                res = +numberone + +numbertwo;

            } else if (ops == "/") {
                res = +numberone / +numbertwo;
            }
            else if (ops == "x") {
                res = +numberone * +numbertwo;
            }
            else if (ops == "-") {
                res = +numberone - +numbertwo;
            }
            if (i < length - 1) {
                no.unshift(`${res}`)
            }

        }
        result.value = addcomma(`${res}`);
    }



})






