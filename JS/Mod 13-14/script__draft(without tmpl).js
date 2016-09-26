'use strict';

var data = [
				{
					name: '1. Вопрос №1',
					firstAnswer:'Вариант ответа №1',
					secondAnswer:'Вариант ответа №2',
					thirdAnswer:'Вариант ответа №3'
				},
				{
					name: '2. Вопрос №2',
					firstAnswer:'Вариант ответа №1',
					secondAnswer:'Вариант ответа №2',
					thirdAnswer:'Вариант ответа №3'
				},
				{
					name: '3. Вопрос №3',
					firstAnswer:'Вариант ответа №1',
					secondAnswer:'Вариант ответа №2',
					thirdAnswer:'Вариант ответа №3'
				}
			];

var programmingTest = {
		
			CreateDOMElemnt: function(elemTag, elemClass, elemParent) {
				var element = document.createElement(elemTag);
				elemParent.appendChild(element);
				if (elemClass) {
					element.classList.add(elemClass);
				}
				return element;
			},

			CreateQuestion: function(i, parent){
				var questions = this.CreateDOMElemnt('p', 'text-left', parent);
				questions.innerHTML = data[i].name;
								
				var answersList = this.CreateDOMElemnt('ul', 'list-unstyled', parent);
				answersList.style.marginLeft = '5%';
				for (var key in data[i]) {
					if (key != 'name') {
						var answers = this.CreateDOMElemnt('li', 'answers', answersList);
						
						var answersLabel = this.CreateDOMElemnt('label', 'answers__label', answers);
						answersLabel.innerHTML = data[i][key];
						var answersCheckbox = this.CreateDOMElemnt('input', 'answers__checkbox', answersLabel);
						answersCheckbox.setAttribute('type', 'checkbox');
						answersLabel.insertBefore(answersCheckbox, answersLabel.firstChild);
					};
				}
			},

			Create: function() {
				var div = this.CreateDOMElemnt('div', 'center-block', document.body);
				var testTitle = this.CreateDOMElemnt('h3', 'text-center', div);
				testTitle.innerHTML = 'Тест по программированию';
				var form = this.CreateDOMElemnt('form', '', div);
				form.style.margin = 'auto 15%';
				
				for (var i = 0; i < data.length; i++) {
					this.CreateQuestion(i, form);
				}
  
				var submit = this.CreateDOMElemnt('input', 'btn', form);
				submit.classList.add('btn-success');
				submit.classList.add('center-block');
				submit.setAttribute('type', 'submit');
				submit.setAttribute('value', 'Проверить мои результаты'); 
			}
		}

		var dataStr = JSON.stringify(data);
		localStorage.setItem('data', dataStr);
		var data = localStorage.getItem('data');
		data = JSON.parse(data);
		console.log(data);

		programmingTest.Create();