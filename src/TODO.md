## TODO

1. [x] Добовление "сообщения-заглушки"
2. [x] Отправка сообщений по клавиши Enter
3. [x] Перенос строк по Shift+Enter и Ctrl+Enter
4. [ ] Автоскролл сообщений
5. [ ] Визуальное разлечения бабблов (sender,receiver)
6. [ ] Фикс отоброжения аватарок для каждого пользователя
7. [ ] Фикс скролла и размера контейнера у Списка Контактов
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