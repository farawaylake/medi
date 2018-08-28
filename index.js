const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


function createBirthdayMessage(name, birthday){ 
	var message = "Hello " + name + ", your birthday is in ";
	var currentDate = new Date();
	
	var month = parseInt(birthday.substring(5,7)) - 1;
	var day = parseInt(birthday.substring(8,10));

	var monthDiff = month - currentDate.getMonth();
	var dayDiff = day - currentDate.getDate();
		
	//birthday this month
	if (monthDiff <= 0){
		if (monthDiff == 0 && dayDiff >= 0){
			return  message + dayDiff + " day(s)";
		}else{
			monthDiff = monthDiff + 12;
		}
	}
	
	//lower month count if fewer days than one full month
	if (dayDiff < 0){
		monthDiff = monthDiff - 1;
		remainingMonthDays = ((new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0).getDate()) - currentDate.getDate());
		dayDiff = day + remainingMonthDays;
	}
	
	//message conditional formatting
	if (monthDiff > 0){
		message = message + monthDiff + " month(s)";
		
		if (dayDiff > 0){
			message = message + " and ";
		}
		
	}
	
	//message conditional formatting 2
	if (dayDiff > 0){
		message = message + dayDiff + " day(s)"
	}
	
	return message;
};


app.post('/hola', (req, res) => res.send(createBirthdayMessage(req.body.name, req.body.birthday)));

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('Available at http://localhost:3000'));
