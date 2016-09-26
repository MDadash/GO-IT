'use strict'

var testContent = [
				{
					name: '1. В каком объекте хранятся jQuery функции',
					answer1: {
										text: 'jQuery.prototype',
										checked: false
									},
					answer2: {
										text: 'jQuery',
										checked: false
									},
					answer3: {
										text: 'jQuery.fn',
										checked: true
									}
				},
				{
					name: '2. Каким образом принято расширять настройки по умолчанию',
					answer1: {
										text: 'С помощью функции $.extend',
										checked: true
									},
					answer2: {
										text: 'При помощи перебора полей объектов for in',
										checked: false
									},
					answer3: {
										text: 'Просто перезаписываем объект с настройками по-умолчанию',
										checked: false
									}
				},
				{
					name: '3. Почему jQuery функции всегда возврщают this',
					answer1: {
										text: 'Для облегчения использоваия библиотеки другими программистами',
										checked: false
									},
					answer2: {
										text: 'Чтобы можно было реализовать чейнинг, последовательный вызов различных функций',
										checked: true
									},
					answer3: {
										text: 'Это code convension',
										checked: false
									}
				}
			];
