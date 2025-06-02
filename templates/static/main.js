
//=========================================================================================
// Класс
class Person{
  constructor(name, age, happiness){
    this.name = name;
    this.age = age;
  }

  info(){
    console.log("Человек: " + this.name + "   возраст: " + this.age );
  }
}

var Din = new Person('Din', '45');
Din.info();


//=========================================================================================
// Получение текущей даты и вывод в консоль
var date = new Date();

myDate()

function myDate(){
  var y = date.getFullYear();
  var m = date.getMonth()+1;
  var d = date.getDay()+1;

  var arr = [y, m, d];
  console.log(arr.join(":"));
}


//=========================================================================================
// Таймер-тик
var tmr = setInterval(myFunc, 1000); // счёт до 10 и остановка

var cnt = 0

function myFunc(){
  cnt++
  console.log("Счётчик: " + cnt)
  if (cnt >= 10) {
      clearInterval(tmr)
  }
}

// Таймер
setTimeout(function(){
  console.log("таймер сработал")
}, 2000)


//=========================================================================================
// Передача на сервер введённых значений
async function buttonClicked(id1, id2) {

        const elId1 = document.getElementById(id1);
        const elId2 = document.getElementById(id2);

        const inputText1 = elId1.value; 
        const inputText2 = elId2.value; 

        var errInputText = 0

        if(inputText1.length < 2){
          elId1.style.backgroundColor='red';
          elId1.style.color='black';
          errInputText = 1;
        }

         if(inputText2.length < 5){
          elId2.style.backgroundColor='red';
          elId2.style.color='black';
          errInputText = 1
        }

        if(errInputText == 1){
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
            body: JSON.stringify({ message: str}), 
          });
          if (response.ok) {
            console.log("Сообщение отправлено на сервер");
          } else {
            console.error("Ошибка при отправке сообщения:", response.status);
          }
        } catch (error) {
          console.error("Произошла ошибка:", error);
        }
      }
