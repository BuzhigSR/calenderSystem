# calenderSystem
!!! Это не конечная версия программы 
весь стиль конечной работы в корне отличается от того, что находится в этом репозитории и является только основанием для написания js

Для корректной работы html надо поменять пути к файлам на строчках 263(main.js) и 6(style.css)

Это календарь для приложения напоминали, на данный момент можно выбрать толька день и время начала и конца мероприятия.
Так же есть система которая сдвигает новый ивент, если он касается другого ивента на вертикальном таймлайну.
Такой сдвиг произойдёт только один раз, тесть если новый ивент будет касать ДВУХ других, он ляжет на правый ивент.

Дизайн вроде интуитивный и в объяснении не нуждается, но: 
Для вызова формы надо нажать на кнопку NEW 
Серая вертикальная полоска слева с временными отметками это таймлаян дня
Серая тонкая вертикальная полоска справка это меню выбора дня.

Код не подключен к какой либо ДБ после обновления страницы все настройки сбросятся
