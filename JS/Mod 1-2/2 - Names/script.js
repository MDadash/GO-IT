function logIn(array, value) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] == value) return value +', вы успешно вошли';
	}
	return 'Пользователя с таким именем не существует!';	
}
var names = [];
for (var i = 0; i < 5; i++) {
	names.push(prompt('Введите имя участника, всего их 5'));
}
var user = prompt('Как вас зовут?');
alert(logIn(names, user));