// ELIAS, DU KANNST SPAETER ALLE KOMMENTARE VON RUSSISCH NACH DEUTSCH UEBERSATZEN, WEN DU HIER WAS VERSTEHEN MOECHTEST. SRY

// ДЛЯ ПОНИМАНИЯ ПРОГРАММЫ НУЖНЫ index.html И style.css!!!
// ДЛЯ РАБОТЫ JS И CSS НУЖНО ПОМЕНЯТЬ ОТНОСИТЕЛЬНЫЕ ПУТИ К ФАЙЛАМ(на строчках 6 и 263 в index.html) НА СВОИ 

//ПРОШУ ПРОЩЕНИЕ ЗА ПЛОХИЕ КОМЕНТАРИИ НА АНГЛИЙСКОМ ПЕРЕД ВСЕМИ КТО БУДЕТ ЭТО ЧИТАТЬ

//КОД ВЫГЛЯДИТ АККУРАТНЕЕ ЕСТЬ НАСТРОИТЬ ТАБУЛЯЦИЮ НА 2 ПРОБЕЛА

$(".form").hide(); // прячем форму

let fromTime = 0; // начальное время ивента в часах
let toTime = 0; // конечное время ивента в часах
let fromTimeMin = 0; //начальное время ивента в минутах(на 67 строке инвертируется в часы)
let toTimeMin = 0; //конечное время ивента в минутах(на 68 строке инвертируется в часы)
let name = 0; //имя ивента, тип меняется автоматически на стринг
let height = 0; // высота блока с ивентом в px
let startTop = 0; // кординаты начала блока с ивентом в px
let numberOfEvent = [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0]; //подсчёт номера ивента для каждого дня
let delEvent = 0; // id кнопки для удаления на которую нажали
let timeMassive = [ [0],  [0],  [0],  [0],  [0],  [0],  [0],  [0],  [0],  [0],  [0],  [0],  [0],  [0],  [0],
   [0],  [0],  [0], [0],  [0],  [0],  [0],  [0],  [0],  [0],  [0],  [0],  [0],  [0],  [0],  [0]  ]; // двумерный массив где хранится начальное и конечное время каждого ивента каждого дня по принципу:
// начало первого ивента пол индексом 0, конец первого ивента под индексом 1. Начало второго ивента под индексом 2, конец второго ивента под индексом 3 и т.д. 
let checking = false; // провверка на соприкоснавение нового ивента с каким либо из старых, проверка на строчках с 88 по 105
let dayButton = 1; // я незнаю почему так назвал переменную но переназывать лень, здесь хранится номер выбранного дня, так же он выводится в консоль

$(".button").click(function(){
	$(".form").show();
})
$(".createButton").click(function(){
	$(".form").hide();
    numberOfEvent[Number(dayButton) - 1] = numberOfEvent[Number(dayButton) - 1] + 1;
    console.log(numberOfEvent[Number(dayButton) - 1]);
	//GETTING DATA --- GETTING DATA --- GETTING DATA ---
	fromTime = document.getElementById("from").value;// час начало ивента
	toTime = document.getElementById("to").value;// час конца ивента
	fromTimeMin = document.getElementById("fromMin").value;// минута начала ивента
	toTimeMin = document.getElementById("toMin").value;// минута конца ивента
	name = document.getElementById("name").value;// имя ивента
	//INVERTING MINUTES IN HOURS
	fromTime = Number(fromTime) + (Number(fromTimeMin) / 60);
	toTime = Number(toTime) + (Number(toTimeMin) / 60);
	//CHECKING OF START AND END OF EVENT
	if(toTime < fromTime){ // проверка не начинается ли ивент позже чем заканчивается
		alert("Your event ends earlyer than starts");
	}else{
		//MASSIVE GETS DATA
		timeMassive[dayButton - 1][(numberOfEvent[dayButton - 1] * 2) - 2] = Number(fromTime);
		timeMassive[dayButton - 1][(numberOfEvent[dayButton - 1] * 2) - 1] = Number(toTime);
		alert("MASSIVE DATA: " + timeMassive[dayButton - 1][(numberOfEvent[dayButton - 1] * 2) - 2] + " " + timeMassive[dayButton - 1][(numberOfEvent[dayButton - 1] * 2) - 1]);
		//ДАЛЬШЕ ПРОВЕРКА НА ПЕРЕСЕЧЕНИЕ НОВОГО ИВЕНТА СО СТАРЫМИ ДЛЯ ЕГО ВОЗМОЖНОГО СДВИГА В ПРАВО
		checking = false; // надо сбить checking перед проверкое(подробнее на строке 66) 
        alert("here starts the algorytm, for resultd look at log console!")
		if(Number(numberOfEvent[dayButton - 1]) > 1){ // проверка не является ли ивент первым в своём дне, иначе алгоритм крашнется, так как не найдёт в массиве ивент раньше
      		console.log("START---START---START---START---START---START---");
			for(let i = 1; i < Number(numberOfEvent[dayButton - 1]); i++){// переборвсех ивентов которые были до того, который создаётся
        		//CHECKING OF START AND END TIME OF NEW EVENT
				for(let y = Math.round(timeMassive[dayButton - 1][numberOfEvent[dayButton - 1] * 2 - 2]); y <= Math.round(timeMassive[dayButton - 1][numberOfEvent[dayButton - 1] * 2 - 1]); y++){// перебор нового ивента с времени его начала до времени его конца
          			//CHECKING OF START AND END TIMES OF OLD EVENTS
          			for(let t = Math.round(timeMassive[dayButton - 1][i * 2 - 2]); t <= Math.round(timeMassive[dayButton - 1][i * 2 - 1]); t++){// перебор всех ивентов до нового с их времени начала до их времени конца
            			console.log(y);
            			console.log(t);
            			if(y == t){// проверка пересеклись ли где-то ивенты по времени
              				checking = true;
            			}else{
              				if(checking == true){// возможно ивенты уже пересиклись в середине перебора, но последняя проверка будет без их пересечений поэтому здесь стоит проверка, был ли checking == true во время этой проверки
                			checking = true;
              			}else{
                			checking = false;
              			}
            		}
          		}
			}
		}
      	console.log(checking);
      	console.log("--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---");
		if(checking == true){// создание ивента требуюзего сдвига
			//CREATING THE MAIN DIV --- CREATING THE MAIN DIV ---
			let event = document.createElement("div"); // создание ивента
			event.className = "eventClass"; // приписание класса
        	event.classList.add("event" + Number(dayButton)); // добавление класса для идентификации(к сожалению одному эллементу нельзя дать 2 id)
			event.id = numberOfEvent[dayButton - 1] + "event"; // придаём id для возможности удаления ивента в будуещем
			event.style.marginTop = Number(fromTime) * 50 + 50 + "px"; // задаём отстып сверху для ивента(что-бы его было правильно видно на таёмлайне)
			event.style.marginLeft = 250 + "px"; // задаём тот самый отступ, для того что-бы было видно более старый ивент
			if(Number(fromTime) == Number(toTime)){// если время начала и конца ивента не задали, или они полностью одинаковые задаётся определенная высота
				event.style.height = 25 + "px";
			}else{// иначе ширина задаётся из данных полученных от пользователя
				event.style.height = (Number(toTime) - Number(fromTime)) * 50 + "px";
			}
			//ADDING THE NAME OF NOTE TO MAIN DIV ---
			let nameOfEvent = document.createElement("p") 
			let textOfNameOfEvent = document.createTextNode(name);
			//CREATING OF DELETE BUTTON --- CREATING OF DELETE BUTTON ---
			let del = document.createElement("div"); // создание кнопки для удаления ивента
			del.id = numberOfEvent[dayButton - 1]; // задаём кнопке id 
			if(name == ""){// если имя ивенту не задали, то отступы должны немного отличаться
				del.className = "deleteEventButton"; 
				del.style.marginTop = -10 + "px";
			}else{
				del.className = "deleteEventButton";
			}
			//ALL APPENDCHILDS --- ALL APPENDCHILDS --- ALL APPENDCHILDS ---
			// приписывание всех дочерних эллементов к их родителям
			document.body.appendChild(event);
			event.appendChild(nameOfEvent);
			nameOfEvent.appendChild(textOfNameOfEvent);
			event.appendChild(del);
		}else{
			// ВСЁ ТО ЖЕ САМОЙ КАК НА СТРОКАХ С 76 ПО 106 КРОМЕ ОТСУТСТВИЯ СТРОКИ 82(строка для отстыпа с права)--------------
			//CREATING THE MAIN DIV --- CREATING THE MAIN DIV ---
			let event = document.createElement("div");
			event.className = "eventClass";
        	event.classList.add("event" + Number(dayButton));
			event.id = numberOfEvent[dayButton - 1] + "event";
			event.style.marginTop = Number(fromTime) * 50 + 50 + "px";
			if(Number(fromTime) == Number(toTime)){
				event.style.height = 25 + "px";
			}else{
				event.style.height = (Number(toTime) - Number(fromTime)) * 50 + "px";
			}
			//ADDING THE NAME OF NOTE TO MAIN DIV ---
			let nameOfEvent = document.createElement("p")
			let textOfNameOfEvent = document.createTextNode(name);
			//CREATING OF DELETE BUTTON --- CREATING OF DELETE BUTTON ---
			let del = document.createElement("div");
			del.id = numberOfEvent[dayButton - 1];
			if(name == ""){
				del.className = "deleteEventButton";
				del.style.marginTop = -10 + "px";
			}else{
				del.className = "deleteEventButton";
			}
			//ALL APPENDCHILDS --- ALL APPENDCHILDS --- ALL APPENDCHILDS ---
			document.body.appendChild(event);
			event.appendChild(nameOfEvent);
			nameOfEvent.appendChild(textOfNameOfEvent);
			event.appendChild(del);
		}
	}else{
		//ВСЁ ТО ЖЕ САМОЕ, ЧТО И НА СТРОКАХ С 108 ПО 136 ----------------------------------------------------------------
		console.log("FIRST NOTE");
		//CREATING THE MAIN DIV --- CREATING THE MAIN DIV ---
		let event = document.createElement("div");
		event.className = "eventClass";
        event.classList.add("event" + Number(dayButton));
		event.id = numberOfEvent[dayButton - 1] + "event";
		event.style.marginTop = Number(fromTime) * 50 + 50 + "px";
		if(Number(fromTime) == Number(toTime)){
			event.style.height = 25 + "px";
		}else{
			event.style.height = (Number(toTime) - Number(fromTime)) * 50 + "px";
		}
		//ADDING THE NAME OF NOTE TO MAIN DIV ---
		let nameOfEvent = document.createElement("p")
		let textOfNameOfEvent = document.createTextNode(name);
		//CREATING OF DELETE BUTTON --- CREATING OF DELETE BUTTON ---
		let del = document.createElement("div");
		del.id = numberOfEvent[dayButton - 1];
		if(name == ""){
			del.className = "deleteEventButton";
			del.style.marginTop = -10 + "px";
		}else{
			del.className = "deleteEventButton";
		}
		//ALL APPENDCHILDS --- ALL APPENDCHILDS --- ALL APPENDCHILDS ---
		document.body.appendChild(event);
		event.appendChild(nameOfEvent);
		nameOfEvent.appendChild(textOfNameOfEvent);
		event.appendChild(del);
	}
	//REMOVING SYSTEM --- REMOVING SYSTEM --- REMOVING SYSTEM ---
	// система для кдаления ивентов по нажатию кнопки справа сверху ивента
	$(".deleteEventButton").click(function(){
		delEvent = $(this).attr('id');// получаем id кнопки
		document.getElementById(Number(delEvent) + "event").remove();// удаляем эллемент(посути строки 172 и 173 можно совместить, но так легче запутаться)
		numberOfEvent[dayButton - 1] = numberOfEvent[dayButton - 1] - 1; // скидываем счетчик на один назад
	})
}
})
$(".day").click(function(){ // проверка на смену дня 
  //GETTING OF THE DAY NUMBER
  dayButton = $(this).attr('id'); // смена номера дня в переменной
  console.log(dayButton); 

  // HIDEING OF ALL EVENTS AND CALENDERS
  $(".eventClass").hide();// прячем все ивенты 
  // SHOWING OF EVENT AND CALENDER THAT IS CHOSEN
  $(".event" + Number(dayButton)).show(); // показываем все ивенты предналежащие выбранному дню
})


//MADE BY Andrei Buzhyhayeu
//gmail: buzhig.senior@gmail.com
