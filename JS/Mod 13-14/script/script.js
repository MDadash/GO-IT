'use strict';

var checkboxes;
var answers = [];
var correctAnswers = 0;

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
	checkboxes = document.querySelectorAll('.answers__checkbox');

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
			if (answers[i].hasOwnProperty(key)) {
				answISize++;
			}
		}
		if (answISize == 1) {
			for (var key in answers[i]) {
				var propMatch;
				for (var prop in answers[i][key]) {
					if (answers[i][key][prop] == testContent[i][key][prop]) {
						propMatch = true;
					} else {
						propMatch = false;
					}	
				}
				if (propMatch) {
					correctAnswers ++;
				}
			}
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
		document.querySelector('.mw-body').innerHTML = 'Тест не пройден! Вы допустили ошибку!';
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
}

document.querySelector('#end-test').onclick = function () {
	document.querySelector('.modal-parent').style.display = 'none';
	for (var i = 0; i < checkboxes.length; i++) {
		checkboxes[i].checked = false;
	}
	answers = [];
	correctAnswers = 0;
}