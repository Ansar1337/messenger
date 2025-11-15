## TODO

1. [x] Добовление "сообщения-заглушки"
2. [x] Отправка сообщений по клавиши Enter
3. [x] Перенос строк по Shift+Enter и Ctrl+Enter
4. [x] Автоскролл сообщений
5. [ ] Визуальное разлечения бабблов (sender,receiver)
6. [ ] Фикс отоброжения аватарок для каждого пользователя
7. [x] Фикс скролла и размера контейнера у Списка Контактов
8. [x] Стрирании поле ввода сообщения при его отправки

// CHAT WINDOW
chat-window -> chat-window-container -> bubble-messages -> bubble-messages-container
У chat-window(родитель) max-height: calc(100vh - 30px)
У chat-window-container(ребенок chat-window) height: 100% и display:flex
У bubble messages(ребенок chat-window-container) overflow-y: auto и flex-grow: 1
У bubble-messages-container (ребенок bubble messages) width: 100%

// USER LIST
user-list -> user-list-container -> chat-members -> chat-members-container
стилей нет
user-list тоже зададим рамки по длине через max-height
добавим контейнер user-list-container для родителя user-list и зададим ему height: 100% и display:flex
переменуем текущих chat-members в chat-members-container и создадим для них родителя chat-members 
chat-members зададим overflow-y: auto и flex-grow: 1

// Автоскролл
Наш scrollTop (верх контента) должен быть равен высоте контента (scrollHeight); scrollTop = scrollHeight для скролла вниз
Если scrollTop по умолчанию 0, а scrollHeight = 100, то сверха мы должны упасть в самый низ
Будем использовать ref() чтобы привязаться к DOM элементу bubble-messages
Так как DOM обновляется асинхронно нужно использовать setTimeout(), чтобы скролл произошел когда добавится новое сообщение
Edit: можно использова nextTick(), vue utility function
nextTick allows you to execute code after you have changed some data and Vue.js has updated the virtual DOM based on your data change, but before the browser has rendered that change on the page.

// Отоброжение аватарок для каждого пользователя
Проверять текущего залогинненого пользователя, и только у него выставлять аватарку

// Визуальное разлечения бабблов (sender,receiver)
Фикс стилей баблов
Убрал /*border-bottom-right-radius: 0;*/ для мягкого угла у сообщений
Изменил у левого хвостика его левый и правый border для соответсвия общей стилистеке c правым хвостиком