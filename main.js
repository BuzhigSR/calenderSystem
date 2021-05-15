// ELIAS, DU KANNST SPAETER ALLE KOMMENTARE VON RUSSISCH NACH DEUTSCH UEBERSATZEN, WEN DU HIER WAS VERSTEHEN MOECHTEST. SRY

// ДЛЯ ПОНИМАНИЯ ПРОГРАММЫ НУЖНЫ index.html И style.css!!!
// ДЛЯ РАБОТЫ JS B CSS НУЖНО ПОМЕНЯТЬ ОТНОСИТЕЛЬНЫЕ ПУТИ К ФАЙЛАМ(на строчках 5 и 263 в index.html) НА СВОИ 

//ПРОШУ ПРОЩЕНИЕ ЗА ПЛОХИЕ КОМЕНТАРИИ НА АНГЛИЙСКОМ ПЕРЕД ВСЕМИ КТО БУДЕТ ЭТО ЧИТАТЬ

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
let timeMassive = [
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0]
]; // двумерный массив где хранится начальное и конечное время каждого ивента каждого дня по принципу:
// начало первого ивента пол индексом 0, конец первого ивента под индексом 1. Начало второго ивента под индексом 2, конец второго ивента под индексом 3 и т.д. 
let checking = false; // провверка на соприкоснавение нового ивента с каким либо из старых, проверка на строчках с 88 по 105
let dayButton = 1; // я незна почему так назвал переменную но переназывать лень, здесь хранится номер выбранного дня, так же он выводится в консоль

$(".button").click(function(){
	$(".form").show();
})
$(".createButton").click(function(){
	$(".form").hide();
  numberOfEvent[Number(dayButton) - 1] = numberOfEvent[Number(dayButton) - 1] + 1;
  console.log(numberOfEvent[Number(dayButton) - 1]);
	//GETTING DATA --- GETTING DATA --- GETTING DATA ---
	fromTime = document.getElementById("from").value;
	toTime = document.getElementById("to").value;
	fromTimeMin = document.getElementById("fromMin").value;
	toTimeMin = document.getElementById("toMin").value;
	name = document.getElementById("name").value;
	//INVERTING MINUTES IN HOURS
	fromTime = Number(fromTime) + (Number(fromTimeMin) / 60);
	toTime = Number(toTime) + (Number(toTimeMin) / 60);
	//CHECKING OF START AND END OF EVENT
	if(toTime < fromTime){
		alert("Your event ends earlyer than starts");
	}else{
		//MASSIVE GETS DATA
		timeMassive[dayButton - 1][(numberOfEvent[dayButton - 1] * 2) - 2] = Number(fromTime);
		timeMassive[dayButton - 1][(numberOfEvent[dayButton - 1] * 2) - 1] = Number(toTime);
		alert("MASSIVE DATA: " + timeMassive[dayButton - 1][(numberOfEvent[dayButton - 1] * 2) - 2] + " " + timeMassive[dayButton - 1][(numberOfEvent[dayButton - 1] * 2) - 1]);
		//EXPERIMENTAL PART --- EXPERIMENTAL PART --- EXPERIMENTAL PART --- EXPERIMENTAL PART --- EXPERIMENTAL PART --- EXPERIMENTAL PART ---
		//EXPERIMENTAL PART --- EXPERIMENTAL PART --- EXPERIMENTAL PART --- EXPERIMENTAL PART --- EXPERIMENTAL PART --- EXPERIMENTAL PART ---
		//EXPERIMENTAL PART --- EXPERIMENTAL PART --- EXPERIMENTAL PART --- EXPERIMENTAL PART --- EXPERIMENTAL PART --- EXPERIMENTAL PART ---
		checking = false;
    alert("here starts the algorytm, for resultd look at log console!")
		if(Number(numberOfEvent[dayButton - 1]) > 1){
      console.log("START---START---START---START---START---START---");
			for(let i = 1; i < Number(numberOfEvent[dayButton - 1]); i++){
        //CHECKING OF START AND END TIME OF NEW EVENT
				for(let y = Math.round(timeMassive[dayButton - 1][numberOfEvent[dayButton - 1] * 2 - 2]); y <= Math.round(timeMassive[dayButton - 1][numberOfEvent[dayButton - 1] * 2 - 1]); y++){
          //CHECKING OF START AND END TIMES OF OLD EVENTS
          for(let t = Math.round(timeMassive[dayButton - 1][i * 2 - 2]); t <= Math.round(timeMassive[dayButton - 1][i * 2 - 1]); t++){
            console.log(y);
            console.log(t);
            if(y == t){
              checking = true;
            }else{
              if(checking == true){
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
			if(checking == true){
				//CREATING THE MAIN DIV --- CREATING THE MAIN DIV ---
				let event = document.createElement("div");
				event.className = "eventClass";
        event.classList.add("event" + Number(dayButton));
				event.id = numberOfEvent[dayButton - 1] + "event";
				event.style.marginTop = Number(fromTime) * 50 + 50 + "px";
				event.style.marginLeft = 250 + "px";
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
			}else{
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
		$(".deleteEventButton").click(function(){
			delEvent = $(this).attr('id');
			document.getElementById(Number(delEvent) + "event").remove();
			numberOfEvent[dayButton - 1] = numberOfEvent[dayButton - 1] - 1;
		})
	}
})
$(".day").click(function(){
  //GETTING OF THE DAY NUMBER
  dayButton = $(this).attr('id');
  console.log(dayButton); 

  // HIDEING OF ALL EVENTS AND CALENDERS
  $(".eventClass").hide();
  // SHOWING OF EVENT AND CALENDER THAT IS CHOSEN
  $(".event" + Number(dayButton)).show();
})