var Value = "0";
var StoreValue = "";
var OperatorEnter = false;

console.log("-".charCodeAt(0));
console.log("+".charCodeAt(0));
$(document).ready(function(){
	$(".displaytext").html(0);
	$(".C").click(function(){enterc()});
	$(".number").click(function(){enternum($(this).html())});	
	$(".dot").click(function(){enterdot()});
	$(".pm").click(function(){enterpm()});
	$(".operator").click(function(){enteroperator($(this).html())});
	$(".equal").click(function(){enterequal()});
});

function enternum(input){
	if (Value == 0 && Value.indexOf(".") == -1 || OperatorEnter){
		Value = input;
		OperatorEnter = false;
	}
	else{
		Value = Value + input;
	}
	$(".displaytext").html(Value);
}

function enterdot(){
	if (Value.indexOf(".") == -1) {
		Value = Value + ".";
		$(".displaytext").html(Value);
	}
}

function enterc() {
	Value = "0";
	StoreValue = ""
	$(".displayoperator").html("");
	$(".displaytext").html(Value);
}

function enterpm() {
	Value = (-1 *parseFloat(Value, 10)).toString();
	$(".displaytext").html(Value)
}

function enteroperator(input) {
	$(".displayoperator").html(input);
	StoreValue = Value;
	OperatorEnter = true;
}

function enterequal() {
	if (StoreValue == "") {
		return
	}
	switch ($(".displayoperator").html().charCodeAt(0)) {
		case 43: // addition
			Value = (parseFloat(StoreValue) + parseFloat(Value)).toString();
			break;
		case 45: // subtraction
			Value = (parseFloat(StoreValue) - parseFloat(Value)).toString();
			break;
		case 247: // division
			Value = (parseFloat(StoreValue) / parseFloat(Value)).toString();
			break;
		case 215: // multiplication
			Value = (parseFloat(StoreValue) * parseFloat(Value)).toString();
			break;
		default:
			Value = "ERROR";
			OperatorEnter = true;
			break;
	}
	$(".displaytext").html(Value);
	$(".displayoperator").html("");
	OperatorEnter = true;
	StoreValue = "";
}

