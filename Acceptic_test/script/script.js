'use strict'

function ready() {

	var users = [];

	if (localStorage.getItem('users')) {
		users = JSON.parse(localStorage.getItem('users'));
	}

	function saveToLocalStorage() {
		localStorage.setItem('users', JSON.stringify(users));
	}

	function createUser(id, firstname, lastname, email, salt, password) {
		users.push({
			id: id,
			firstName: firstname,
			lastName: lastname,
			email: email,
			salt: salt,
			password: password
		});
	}

	function setCoockie (userID) {
		var cookieString = 'userID=' + userID + ';';
		document.cookie = cookieString;
	} 

	function deletCoockie (cookieName) {
		var cookieDate = new Date ( );  
		cookieDate.setTime (cookieDate.getTime() - 1 );
		document.cookie = cookieName += "=; expires=" + cookieDate.toGMTString();
	}

	function getCoockie (cookieName) {
		var results = document.cookie.match ('(^|;) ?' + cookieName + '=([^;]*)(;|$)');

		if (results) {
			return (unescape(results[2]));
		} else {
			return null;
		}
	}

	function showProfile () {
		document.querySelector('.menu-wrapper').style.display = "block";
		document.querySelector('.menu__item--active').style.background = "grey";
		document.querySelector('.content__user-profile').style.display = "block";
		document.querySelector('.content__regstrn__wrapper').style.display = "none";
		document.querySelector('.login__submit--signin').style.display = "none";
		document.querySelectorAll('.login__input')[0].style.display = "none";
		document.querySelectorAll('.login__input')[1].style.display = "none";			
		document.querySelector('.login__submit--signout').style.display = "inline-block";
		document.querySelector('.button--add-info').style.display = "block";
	}

	function fillProfileInfo (userID) {
		for (var i = 0; i < users.length; i++) {
			if (users[i].id == userID) {
				document.querySelector('.content__user-profile__firstname').innerText = users[i].firstName;
				document.querySelector('.content__user-profile__lastname').innerText = users[i].lastName;
				document.querySelector('.content__user-profile__email').innerText = users[i].email;
				if (users[i].addedInfo) {
					document.querySelector('.content__user-profile__editinfo').innerHTML = "";
					var keyscounter = 0;
					for (var key in (users[i].addedInfo)){
						keyscounter = keyscounter + 1
						createNewInformationElement('h6', 'content__user-profile__info-category', key, '.content__user-profile__editinfo', keyscounter, true, 'information-field');
						createNewInformationElement('p', 'content__user-profile__info-value', users[i].addedInfo[key], '.information-field', keyscounter);
						createNewInformationElement('button', 'content__user-profile__editinfo-form__deleteinfo', 'delete', '.information-field', keyscounter);
					}
				}
				break;
			}
		}
	}

	function passwordSecurity (passwd, passwdConf) {
		if (passwd.value == passwdConf.value) {
			var regExp = /(?=^.{8,20}$)(?=^.*[A-Z].*$)(?=^.*[a-z].*$)(?=^.*\d.*$)(?=^.*[!@$%^&*()_\-+].*$)(?=^\S+$)(?=^[^=`~#|\[\]{}'";:\/?.,№а-яА-Я]+$)/;
			if (!regExp.test(passwd.value)) {
				throwValidationError(passwd, 'The password should be 8 to 20 characters long, must contain uppercase and lowercase letters, numbers and at least 1 special character ! @ $ % ^ & * () _ \ - +');

				return false;
			}
			var unicSalt = sha1(Math.random().toString(36).substring(2, 7));
			var password = sha1(passwd.value + unicSalt);

			return [unicSalt, password];
		}
		throwValidationError(passwdConf, 'Passwords must match');

		return false;
	}

	function throwValidationError (elem, errorMessage, addclass) {
		var errorElement = document.createElement('div');
		errorElement.className = "validation-error";
		if (addclass) {
			errorElement.classList.add(addclass);
		}
		errorElement.innerText = errorMessage;
		(elem.parentNode).appendChild(errorElement);
		if (document.body.querySelector('.validation-error')) {
			var remove = document.body.querySelector('.validation-error');
			document.body.addEventListener('click', function(e) {
				remove.remove();
			});
		}
	}

	function autorizateUser (autorizationForm) {
		autorizationForm.addEventListener('submit', function(e) {
			var matchCounter = 0;
			var enteredEmail = e.target.querySelector('#login-email').value;
			var userPassword = e.target.querySelector('#login-password');
			var regExpEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
			if (!regExpEmail.test(enteredEmail)) {
				throwValidationError(e.target.querySelector('#login-email'), 'Please, enter correct email', 'validation-error--login');
			} else {
				for (var i = 0; i < users.length; i++) {
					matchCounter = i;
					if (users[i].email == enteredEmail) {
						if (users[i].password == sha1(userPassword.value + users[i].salt)) {
							setCoockie(users[i].id);

							return;
						} else {
							throwValidationError(e.target.querySelector('#login-password'), 'Wrong password', 'validation-error--login');
							break;
						}
					}
					if (users.length == 0 || matchCounter == users.length-1){
						throwValidationError(e.target.querySelector('#login-email'), 'User is not reistered!', 'validation-error--login');
					}
				}
				if (users.length == 0){
					throwValidationError(e.target.querySelector('#login-email'), 'User is not reistered!', 'validation-error--login');
				}
			}
			e.preventDefault();
		});
	}

	function addInput() {

		createNewInformationElement('input', 'content__user-profile__editinfo-form__category', '', '.content__user-profile__editinfo-form', 1, false, '', '.button--save-info');
		createNewInformationElement('input', 'content__user-profile__editinfo-form__value', '', '.content__user-profile__editinfo-form', 1, false, '', '.button--save-info');

		document.querySelector('.button--add-info').style.display = "none";
		document.querySelector('.button--save-info').style.display = "block";
	}

	function createNewInformationElement (tagName, className, innerContent, parentSelector, i, isContainer, containerClassName, insBeforeElem) {
		if (isContainer) {
			var container = document.createElement('div');
			container.className = containerClassName;
			var newElement = document.createElement(tagName);
			newElement.className = className;
			if (tagName != 'input'){
				newElement.innerText = innerContent + ': ';
			}
			container.appendChild(newElement);
			var parent = document.querySelector(parentSelector);
			parent.insertBefore(container, document.querySelector(insBeforeElem));
		} else {
			var newElement = document.createElement(tagName);
			newElement.className = className;
			if (tagName != 'input')
				newElement.innerText = innerContent;
			var parent = document.querySelectorAll(parentSelector);
			parent[i-1].insertBefore(newElement, document.querySelector(insBeforeElem));
		}
	}

	function savePersInfo(form) {
		form.addEventListener('submit', function(e) {
			e.preventDefault();
			var key = e.target.querySelector('.content__user-profile__editinfo-form__category').value;
			var value = e.target.querySelector('.content__user-profile__editinfo-form__value').value;
			if (!key || !value || (!key && !value) ) {
				throwValidationError(e.target.querySelector('.content__user-profile__editinfo-form__category'), 'These fields cannot be empty');

				return;
			}
			changeInfo(key, value);
			document.querySelector('.content__user-profile__editinfo-form__category').remove();
			document.querySelector('.content__user-profile__editinfo-form__value').remove();
			document.querySelector('.button--save-info').style.display = "none";
			document.querySelector('.button--add-info').style.display = "block";
		});
	}

	function changeInfo (newKey, value) {
		var id = getCoockie('userID');
		var userObj;
		var userPosition;

		for (var i = 0; i < users.length; i++) {
			if (id == users[i].id) {
				userObj = users[i];
				userPosition = i;
			}
		}
		if (!userObj.addedInfo)	{
			userObj.addedInfo = {};
		}	
		userObj.addedInfo[newKey] = value;
		users[userPosition] = userObj;
		saveToLocalStorage(users);
		fillProfileInfo(id);
	}

	function deletePersInfo (userID, target) {
		var userObj;
		var userPosition;
		for (var i = 0; i < users.length; i++) {
			if (userID == users[i].id) {
				target.parentElement.remove();
				userObj = users[i];
				userPosition = i;
				break;
			}
		}
		var deletedKey = target.parentElement.firstChild.innerText;
		deletedKey = deletedKey.split(':');
		delete userObj['addedInfo'][deletedKey[0]];
		users[userPosition] = userObj;
		saveToLocalStorage(users);
	}

	function registerUser (form) {
		form.addEventListener('submit', function(e) {
			var regExpEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
			var regExpName = /^[а-яА-ЯёЁa-zA-Z]+$/;
			var passwordCell = e.target.querySelector('#content__regstrn__password');
			var passwordConfirmCell = e.target.querySelector('#content__regstrn__password-confirm');
			var checkedPasswd = passwordSecurity(passwordCell, passwordConfirmCell);

			if (checkedPasswd) {
				var userFirstName = e.target.querySelector('#content__regstrn__first-name').value;
				var userLastName = e.target.querySelector('#content__regstrn__last-name').value;
				var userEmail = e.target.querySelector('#content__regstrn__email').value;
				var userID;
				var userSalt = checkedPasswd[0];
				var userPassword = checkedPasswd[1];
				if (!regExpEmail.test(userEmail)||!regExpName.test(userFirstName)||!regExpName.test(userLastName)) {
					if (!regExpEmail.test(userEmail)) {
						throwValidationError(e.target.querySelector('#content__regstrn__email'), 'Please, enter correct email');
					} else if (!regExpName.test(userFirstName)) {
						throwValidationError(e.target.querySelector('#content__regstrn__first-name'), 'The first name field must contain just uppercase and lowercase letters');
					} else if (!regExpName.test(userLastName)){
						throwValidationError(e.target.querySelector('#content__regstrn__last-name'), 'The last name field must contain just uppercase and lowercase letters');
					}
					e.preventDefault();

					return
				}
				if (users.length > 0) {
					var maxID = 0;
					for (var i = 0; i < users.length; i++) {
						if (users[i].email != userEmail) {
							if (users[i].id > maxID) {
								maxID = users[i].id;
							}
						} else {
							throwValidationError(e.target.querySelector('#content__regstrn__email'), 'User is already reistered!');
							maxID = 0;
							break;
						}
					}
					if (maxID) {
						userID = maxID + 1;
						createUser(userID, userFirstName, userLastName, userEmail, userSalt, userPassword);
						saveToLocalStorage();
						setCoockie(userID);

						return;
					}
				} else {
					userID = 1;
					createUser(userID, userFirstName, userLastName, userEmail, userSalt, userPassword);
					saveToLocalStorage();
					setCoockie(userID);

					return;
				}
			}
			e.preventDefault();			
		});
	}

	if (getCoockie('userID')) {
		fillProfileInfo(getCoockie('userID'));
		showProfile();
	}

	var forms = document.querySelectorAll('form');
	var regForm = forms[1];
	var loginForm = forms[0];
	var signOutBtn = document.querySelector('.login__submit--signout');
	var addInfoBtn = document.querySelector('.button--add-info');
	var saveInfoForm = forms[2];

	signOutBtn.addEventListener ('click', function (e) {
		deletCoockie('userID');
		location.reload();
	});

	addInfoBtn.addEventListener ('click', function (e) {
		addInput();
	});

	document.querySelector('.content__user-profile__editinfo').onclick = function (e) {
		var target = e.target;
		if (target.className != 'content__user-profile__editinfo-form__deleteinfo') return;
		deletePersInfo(getCoockie('userID'), target);
	}

	registerUser(regForm);
	autorizateUser(loginForm);
	savePersInfo(saveInfoForm);
}

document.addEventListener("DOMContentLoaded", ready);