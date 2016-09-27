'use strict';

var checkboxes;
var answers = [];
var correctAnswers = 0;
var qwRightWrong = [];

function saveToLoacalStorage () {
	var dataStr = JSON.stringify(testContent);
	localStorage.setItem('data', dataStr);
}

saveToLoacalStorage();

function render () {
	if (localStorage.getItem('data')) {
		testContent = JSON.parse(localStorage.getItem('data'));
	}

	var tmpl = _.template(document.getElementById('test-template').innerHTML);
	var result = tmpl({data: testContent});
	document.write(result);
}

render();

function check () {
	var questions = document.querySelectorAll('.questions');
	var labels = document.querySelectorAll('.answers__label');
	checkboxes = document.querySelectorAll('.answers__radio');
	
	for (var i = 0; i < questions.length; i++) {
		var obj = {};
		for (var j = 0; j < (labels.length/questions.length); j++) {
			if (checkboxes[i*3 + j].checked) {
				obj['answer'+(j+1)] = {
					text: labels[i*3 + j].innerText,
					checked: checkboxes[i*3 + j].checked
				}
			}
		}
		answers.push(obj);
	}
	
	for (var i = 0; i < answers.length; i++) {
		var answISize = 0;
		for (var key in answers[i]) {
			answISize++;
		}
		if (answISize == 1) {
			for (var key in answers[i]) {
				var propMatch;
				for (var prop in answers[i][key]) {
					if (answers[i][key][prop] == testContent[i][key][prop]) {
						propMatch = true;
					} else {
						propMatch = false;
						qwRightWrong.push({[i+1]: 'неправильный'});
					}	
				}
				if (propMatch) {
					correctAnswers ++;
					qwRightWrong.push({[i+1]: 'правильный'});
				}
			}
		} else {
			qwRightWrong.push({[i+1]: 'неправильный'});
		}
	}

	viewModal();
}

function viewModal () {
	if (correctAnswers == answers.length) {
		document.querySelector('.mw-body').innerHTML = 'Все ответы верны! Тест пройден!';
		document.querySelector('#end-test').classList.remove('btn-danger');
		document.querySelector('#end-test').classList.add('btn-success');
	} else {
		var html = '<p>Тест не пройден! Вы допустили ошибку!</p>';
		for (var i = 0; i < qwRightWrong.length; i++) {
			for (var key in  qwRightWrong[i]) {
				if (qwRightWrong[i][key] == 'неправильный') {
					html += '<p class="wrong">Ответ на вопрос ' + key + ' <b>' +  qwRightWrong[i][key] +'</b></p>'
				} else {
					html += '<p class="correct">Ответ на вопрос ' + key + ' <b>' +  qwRightWrong[i][key] +'</b></p>'
				}
			}
		}
		html += '<p>Всего правильных ответов <b>' + correctAnswers + '</b>.</p>';

		document.querySelector('.mw-body').innerHTML = html;
		document.querySelector('#end-test').classList.remove('btn-success');
		document.querySelector('#end-test').classList.add('btn-danger');
	}
}

document.getElementById('check-results').onclick = 	function () {
	check ();
	if (document.querySelector('.modal-parent').style.display === 'block') {
		document.querySelector('.modal-parent').style.display = 'none';
	} else {
		document.querySelector('.modal-parent').style.display ='block';
	}
}

document.querySelector('.close-modal').onclick = function () {
	document.querySelector('.modal-parent').style.display = 'none';
	for (var i = 0; i < checkboxes.length; i++) {
		checkboxes[i].checked = false;
	}
	answers = [];
	correctAnswers = 0;
	qwRightWrong = [];
}

document.querySelector('#end-test').onclick = function () {
	document.querySelector('.modal-parent').style.display = 'none';
	for (var i = 0; i < checkboxes.length; i++) {
		checkboxes[i].checked = false;
	}
	answers = [];
	correctAnswers = 0;
	qwRightWrong = [];
}