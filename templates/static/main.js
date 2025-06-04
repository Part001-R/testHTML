
//=========================================================================================
// Класс
class Person {
    constructor(name, age, happiness) {
        this.name = name;
        this.age = age;
    }
    info() {
        console.log("Человек: " + this.name + "   возраст: " + this.age);
    }
}
var Din = new Person('Din', '45');
Din.info();
//=========================================================================================
// Получение текущей даты и вывод в консоль
var date = new Date();
myDate()
function myDate() {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDay() + 1;
    var arr = [y, m, d];
    console.log(arr.join(":"));
}
//=========================================================================================
// Таймер-тик
var tmr = setInterval(myFunc, 1000); // счёт до 10 и остановка
var cnt = 0
function myFunc() {
    cnt++
    console.log("Счётчик: " + cnt)
    if (cnt >= 10) {
        clearInterval(tmr)
    }
}
// Таймер
setTimeout(function() {
    console.log("таймер сработал")
}, 2000)
//=========================================================================================
// Передача на сервер введённых значений
async function buttonClicked(name, password, butt) {
    const elName = document.getElementById(name);
    const elPwd = document.getElementById(password);
    const elBtn = document.getElementById(butt);

    const inputText1 = elName.value;
    const inputText2 = elPwd.value;
    var errInputText = 0

    if (inputText1.length < 2) {
        elName.style.backgroundColor = 'red';
        elName.style.color = 'black';
        errInputText = 1;
    }
    if (inputText2.length < 5) {
        elPwd.style.backgroundColor = 'red';
        elPwd.style.color = 'black';
        errInputText = 1
    }
    if (errInputText == 1) {
        return
    }
    var arr = [inputText1, inputText2]
    var str = arr.join(" ")
    try {
        const response = await fetch("/button_click", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: str
            }),
        });
        if (response.ok) {
            console.log("Сообщение отправлено на сервер");
            elName.value =""
            elPwd.value =""
            elBtn.style.backgroundColor="green";
            setTimeout(function() {
              elName.style.backgroundColor = "white";
              elPwd.style.backgroundColor  = "white";
              elBtn.style.backgroundColor  = "white";
            }, 1000)
        } else {
            console.error("Ошибка при отправке сообщения:", response.status);
            elBtn.style.backgroundColor="red";
        }
    } catch (error) {
        console.error("Произошла ошибка:", error);
    }
}
//=========================================================================================
// Функция для вывода данных пользователя на экран
async function showUserInfo() {
    try {
        const response = await fetch("/user_info", { 
            method: "GET", 
        });
        if (response.ok) {
            const userData = await response.json(); 
            displayUserInfo(userData); 
        } else {
            console.error("Ошибка при получении данных пользователя:", response.status);
        }
    } catch (error) {
        console.error("Произошла ошибка при получении данных пользователя:", error);
    }
}
// Отображение данных пользователя на странице
function displayUserInfo(user) {
    const userInfoDiv = document.getElementById("userInfo");
    userInfoDiv.innerHTML = `
        <p><strong>Имя:</strong> ${user.Name}</p>
        <p><strong>Возраст:</strong> ${user.Age}</p>
        <p><strong>Деньги:</strong> ${user.Money}</p>
        <p><strong>Средний балл:</strong> ${user.Avg_grades}</p>
        <p><strong>Счастье:</strong> ${user.Happiness}</p>
        <p><strong>Хобби:</strong> ${user.Hobbies.join(", ")}</p>
    `;
}