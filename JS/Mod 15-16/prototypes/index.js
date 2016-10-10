'use strict';

function Human(params) {
	this.name = params.name;
	this.age = params.age;
	this.gender = params.gender;
	this.height = params.height;
	this.weight = params.weight;
}
Human.prototype.eat = function() {
	console.log('I am eating now');
}

function Worker(params) {
	this.workPlace = params.workPlace;
	this.salary = params.salary;
	Human.apply(this, arguments);
}
Worker.prototype = Object.create(Human.prototype);
Worker.prototype.constructor = Worker;
Worker.prototype.work = function() {
	console.log('I am working now');
}

function Student(params) {
	this.studyPlace = params.studyPlace;
	this.scholarship = params.scholarship;
	Human.apply(this, arguments);
}
Student.prototype = Object.create(Human.prototype);
Student.prototype.constructor = Student;
Student.prototype.watchSerials = function() {
	console.log('I am watching serial now');
}

var alex = new Student({
	name: 'Alex',
	age: 21,
	gender: 'male',
	height: 185,
	weight: 99,
	studyPlace: 'college',
	scholarship: 20
});
var amie = new Student({
	name: 'Amie',
	age: 23,
	gender: 'female',
	height: 165,
	weight: 50,
	studyPlace: 'univercity',
	scholarship: 40
});
var jack = new Worker({
	name: 'Jack',
	age: 35,
	gender: 'male',
	height: 172,
	weight: 87,
	workPlace: 'bank',
	salary: 2000
});
var jim = new Worker({
	name: 'Jim',
	age: 46,
	gender: 'male',
	height: 167,
	weight: 65,
	workPlace: 'school',
	salary: 700
});

console.log(alex, amie, jack, jim);