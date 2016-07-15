function pow(a, b) {
	var result = 1;

	for (var i = 0; i < Math.abs(b); i++) {
	 		result=result*a;
	}	

    if (b < 0) {
 			result=1/result;
	} else if (a == 0 && b == 0) {
		result = 'undefined! Please, enter power not equal 0';
	    } else if (a == 0) {
	    	result = 0;
	    	} 

	console.log(result);
}

var num = prompt('Введите число');
var power = prompt('В какую степень возвести число?');

pow(num, power);