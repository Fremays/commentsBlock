let form = document.forms.addComment;
let commentSection = document.querySelector("#comments__section");

let inputName = document.querySelector('input[name="name"]')
let messageName = document.querySelector('textarea[name="message"]')

inputName.onblur = function () {
    if (inputName.value.length < 3) {
        document.querySelector("#errorName").innerHTML = 'Имя должно состоять из 3 цифр и больше'
    }
};
inputName.onfocus = function () {
    document.querySelector("#errorName").innerHTML = "";
};

messageName.onblur = function () {
    if (messageName.value.length < 1) {
        document.querySelector("#errorMessage").innerHTML = 'Сообщение должно состоять хотя бы из 1 символа'
    }
    if (messageName.value.length > 256) {
        document.querySelector("#errorMessage").innerHTML = 'Максимальная длина сообщения 256 символов'
    }
};

messageName.onfocus = function () {
    document.querySelector("#errorMessage").innerHTML = "";
};

function creatComment() {
    let formData = new FormData(form)
    const formDataObj = {};
    let dateNow = new Date();
    formData.forEach((value, key) => (formDataObj[key] = value));
    let div = document.createElement("div")
    div.className = "comment"
    if (!formDataObj["date"]) {
        let yearNow = dateNow.getFullYear();
        let monthNow = (dateNow.getMonth() + 1 < 10) ? "0" + (dateNow.getMonth() + 1) : dateNow.getMonth() + 1;
        let dayNow = dateNow.getDate() < 10 ? "0" + dateNow.getDate() : dateNow.getDate();
        formDataObj["date"] = yearNow + "-" + monthNow + "-" + dayNow;
    }

    if (formDataObj["name"].length < 3) {
        document.querySelector("#errorName").innerHTML = 'Имя должно состоять из 3 символов и больше'
        return false
    } else {
        document.querySelector("#errorName").innerHTML = ''
    }
    if (formDataObj["message"].length < 1) {
        document.querySelector("#errorMessage").innerHTML = 'Сообщение должно состоять хотя бы из 1 символа'
        return false
    } else if (formDataObj["message"].length > 256) {
        document.querySelector("#errorMessage").innerHTML = 'Максимальная длина сообщения 256 символов'
        return false
    } else {
        document.querySelector("#errorMessage").innerHTML = "";
    }

    div.innerHTML += "<p class='commentName'>Имя: " + formDataObj["name"] + "</p>";
    div.innerHTML += "<p class='commentMessageArea'> Сообщение: " + "<p class='commentMessage'>" + formDataObj["message"] + "</p>" + "</p>";
    let arrayData = formDataObj["date"].split("-")
    if (arrayData["0"] == dateNow.getFullYear() &&
        arrayData["1"] == dateNow.getMonth() + 1 &&
        arrayData["2"] == dateNow.getDate()) {
        div.innerHTML += "<p class='commentDate'>Дата: сегодня, 16:23</p>";
    } else if (arrayData["0"] == dateNow.getFullYear() &&
        arrayData["1"] == dateNow.getMonth() + 1 &&
        arrayData["2"] == (dateNow.getDate() - 1)) {
        div.innerHTML += "<p class='commentDate'>Дата: Вчера, 18:39</p>";
    } else {
        div.innerHTML += "<p class='commentDate'>Дата: " + formDataObj["date"] + "</p>";
    }
    div.insertAdjacentHTML("afterbegin", '<button class="remove-button"><svg width="24px" height="24px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#000000" d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"></path></g></svg></button>');
    div.insertAdjacentHTML("beforeend", '<button class="like">❤</button>');
    div.firstChild.onclick = () => div.remove()
    div.lastChild.onclick = () => div.lastChild.classList.toggle("active");
    commentSection.append(div);
    return false
};


// form.addEventListener("keypress", function (event) {
//     // If the user presses the "Enter" key on the keyboard
//     if (event.key === "Enter") {
//         creatComment();
//     }
// });

form.onsubmit = creatComment