// declare Div variables
var Divs = document.getElementsByTagName('div');
var PhilDiv = document.getElementById("Phil");
var PhilSlidesDiv = document.getElementById("PhilSlides");
var BackgroundDiv = document.getElementById("Background");
var BackgroundBuildingsDiv = document.getElementById("BackgroundBuildings");
var Grass1Div = document.getElementById("Grass1");
var Grass2Div= document.getElementById("Grass2");
var Cloud1Div= document.getElementById("Cloud1");
var Cloud2Div= document.getElementById("Cloud2");
var Quote1Div = document.getElementById("Quote1");
var Quote2Div = document.getElementById("Quote2");
var Quote3Div = document.getElementById("Quote3");
var Dillo2Div = document.getElementById("Dillo2");
var Dillo3Div = document.getElementById("Dillo3");
var Banner2Div = document.getElementById("Banner2");
var MessageBoxDiv = document.getElementById("MessageBox");
var Banner2Div = document.getElementById("Banner2");
var Banner3Div = document.getElementById("Banner3");
var ButtonHideID = document.getElementById("ButtonHide");
var TableHideID = document.getElementById("TableHide");
var MessageBoxScrollDiv = document.getElementById("Message-BoxScroll");
var Speaker1Div = document.getElementById("Speaker1");
var Speaker2Div = document.getElementById("Speaker2");
var BeginDiv =document.getElementById("Beginning");

//declare arrays
var AllBackgroundElements = new Array(); // elements that will stay at the same height
var ScrollSpeed1Elements = new Array(); // elements that will scroll at the speed of PageYOffset
var MessageBoard = new Array();
var userData = new Array;

// declare page positioning
var PreviousPageVerticalPosition = 0;
var PageVerticalPosition = 0;
var NewMessageBoxPosition = 0;

// constants
var Philmovementshift = 1200; // position where Phil starts to shift downwards
var Banner2center = 1000; // the center of Banner2's shift downwards
var Banner2radius = 300; // radius +- center determines when the banner will shift upwards
var Banner3center = 1800; // the center of Banner2's shift downwards
var Banner3radius = 300; // radius +- center determines when the banner will shift upwards
var MessageBoxPosition = 3000; //position when MessageBoard appears

// direction is the direction Phil is facing
var direction = false
var counter = 0 // the counter that prevents ultrarapid animations of Phil
var begin = 0;

window.onload = function()
{
	StoreDivs();
	document.body.scrollTop = document.documentElement.scrollTop = 0;
	PageVerticalPosition = pageYOffset;
	PreviousPageVerticalPosition = 0;
	ShiftElements();
	DilloLights();
	SpeakerAnimation();
	InstructionText();
}

window.onscroll = function (event)
{
	begin = 1;
	InstructionText();
	DetectPageVerticalPosition();
	DisplayQuotes();
	ShiftElements();
	SetPreviousPageVerticalPosition();
}

function StoreDivs()
{
	for(i = 0; i < Divs.length; i++)
	{
		if (Divs[i].getAttribute("class") != null) // ensure that only divs with classes will be tested
		{
			if (Divs[i].getAttribute("class").search("background-elements") != -1)
			{
				AllBackgroundElements.push(Divs[i]);
			}
			if (Divs[i].getAttribute("class").search("ScrollSpeed1") != -1)
			{
				ScrollSpeed1Elements.push(Divs[i]);
			}
		}
	}

}

function SetPreviousPageVerticalPosition ()
{
	PreviousPageVerticalPosition = PageVerticalPosition;
}

function DisplayQuotes()
{
	if(PageVerticalPosition >= 520) {Quote1Div.style.display = "initial";}
	else {Quote1Div.style.display = "none";}
	if(PageVerticalPosition >= 770) {Quote2Div.style.display = "initial";}
	else {Quote2Div.style.display = "none";}
	if(PageVerticalPosition >= 1020) {Quote3Div.style.display = "initial";}
	else {Quote3Div.style.display = "none";}
}

function ShiftElements()
{
	if(PageVerticalPosition <= 3120)
	{
		Grass1Div.style.left = (-1 * 0.1 * PageVerticalPosition) + "px";
		Grass2Div.style.left = (-1 * 0.2 * PageVerticalPosition) + "px";
		Cloud1Div.style.left = (-1 * 0.3 * PageVerticalPosition) + "px";
		Cloud2Div.style.left = (-1 * 0.4 * PageVerticalPosition) + "px";
		
		for (i=0; i<ScrollSpeed1Elements.length; i++)
		{
	        ScrollSpeed1Elements[i].style.left = (-1 * PageVerticalPosition) + "px";
	    }

		CyclingParse();
		ShiftPhil();
		Bannereffects2();
		Bannereffects3();
		MessageBoxScrollDiv.scrollTop = 0;
	}
	else
	{
		MessageBoxScrollDiv.scrollTop = 3*(PageVerticalPosition - 3200);
	}
	ShiftBackground();
	MessageBoxshift();
}

function MessageBoxshift()
{
	NewMessageBoxPosition = 700 + MessageBoxPosition - PageVerticalPosition
	if(NewMessageBoxPosition > 500)
	{
	MessageBoxDiv.style.left = NewMessageBoxPosition + "px";
	}
	else
	{
		MessageBoxDiv.style.left = "500px"
	}
	if(PageVerticalPosition >= MessageBoxPosition)
	{
		MessageBoxDiv.style.top = PageVerticalPosition + "px";
		//MessageBoxDiv.style.left = (1000 - 1.5*(PageVerticalPosition - MessageBoxPosition)) + "px";
	}
	else
	{
		MessageBoxDiv.style.top = MessageBoxPosition + "px";
		//MessageBoxDiv.style.left = "1000px";
	}
}

function ShiftPhil()
{
	if(PageVerticalPosition < Philmovementshift)
	{
		PhilDiv.style.top = "140px";
	}
	else if(PageVerticalPosition < (Philmovementshift + 260) && PageVerticalPosition > Philmovementshift)
	{
		PhilDiv.style.top = (PageVerticalPosition - Philmovementshift + 140) + "px";
	}
	else if (PageVerticalPosition >= (Philmovementshift + 260))
	{
		PhilDiv.style.top = "400px";
	}

}

function Bannereffects2()
{
	Banner2Div.style.left = (-1 * 0.7 * PageVerticalPosition) + "px";
	if(PageVerticalPosition >= Banner2center - Banner2radius &&
		PageVerticalPosition <= Banner2center + Banner2radius)
	{
		Banner2Div.style.top = (PageVerticalPosition) + "px";
	}
	else
	{
		Banner2Div.style.top = (PageVerticalPosition - 
			(Math.abs(PageVerticalPosition - Banner2center) - Banner2radius)) + "px";
	}
}

function Bannereffects3()
{
	Banner3Div.style.left = (-1 * 0.7 * PageVerticalPosition) + 200 + "px";
	if(PageVerticalPosition >= Banner3center - Banner3radius &&
		PageVerticalPosition <= Banner3center + Banner3radius)
	{
		Banner3Div.style.top = (PageVerticalPosition+450) + "px";
	}
	else
	{
		Banner3Div.style.top = (PageVerticalPosition + 450 + 
			(Math.abs(PageVerticalPosition - Banner3center) - Banner3radius)) + "px";
	}
}

function ShiftBackground()
{
	for (i=0; i<AllBackgroundElements.length; i++)
	{
        AllBackgroundElements[i].style.top = PageVerticalPosition + "px";
    }
}

function DetectPageVerticalPosition()
{
	PageVerticalPosition = pageYOffset;
}

function CyclingParse()
{
	if(counter == 0)
	{
		counter = 1;
		direction = PreviousPageVerticalPosition <= PageVerticalPosition;
		setTimeout(function()
		{
			counter = 0;
			Cycling();
		}, 100);
	}
}

function Cycling()
{
	if (direction)// scrolling down
	{
		PhilSlidesDiv.style.top = '0px';
		if (PhilSlidesDiv.style.left =="0px")
		{
			PhilSlidesDiv.style.left = '-600px';
		}
		else if (PhilSlidesDiv.style.left =="-600px")
		{
			PhilSlidesDiv.style.left = '-300px';
		}
		else 
		{
			PhilSlidesDiv.style.left = '0px';
		}
	}
	else// scrolling up
	{
		PhilSlidesDiv.style.top = '-300px'
		if (PhilSlidesDiv.style.left =="0px")
		{
			PhilSlidesDiv.style.left = '-600px';
		}
		else if (PhilSlidesDiv.style.left =="-600px")
		{
			PhilSlidesDiv.style.left = '-300px';
		}
		else 
		{
			PhilSlidesDiv.style.left = '0px';
		}
	}
}

function DilloLights()
{
	setInterval(function()
	{
		if (Dillo2Div.style.display=="initial")
		{
			Dillo2Div.style.display="none";
			Dillo3Div.style.display="initial";
		}
		else
		{
			Dillo2Div.style.display="initial";
			Dillo3Div.style.display="none";
		}
	},1000);
}

$('button').click(function() {
	StoreData();
	HideFields();
});

function StoreData()
{
	userData.push($('#userReason').val());
	userData.push($('#userName').val());
	$('.prompt').html("\""+ userData[0] + "\" -" + userData[1]);
}

function HideFields()
{
	TableHideID.style.display="none";
	ButtonHideID.style.display="none";
}

function SpeakerAnimation()
{
	setInterval(function()
	{
		if (Speaker1Div.style.display=="initial")
		{
			Speaker1Div.style.display="none";
			Speaker2Div.style.display="initial";
		}
		else
		{
			Speaker1Div.style.display="initial";
			Speaker2Div.style.display="none";
		}
	}, 500);
}

function InstructionText()
{
	if (begin==0){

		BeginDiv.style.display="initial";
	}
	else{
		BeginDiv.style.display="none";
	}
}