$(function () {

	var html = $('#profile').html();

	var profile = {
			name: 'Дадаш Маргарита Юрьевна',
			profession: 'Студентка Front-end курсов',
			answers: [
								'Это интересно',
								'Это переспективно',
								'Это легко'
							],
			phoneNumber: '+380951733142',
			profileFb: 'www.facebook.com/profile.php?id=100012294002311',
			feedback: 'Если нужно, могу сверстать забор'
	};

	var content = tmpl(html, profile);

	$('body').append(content);
});