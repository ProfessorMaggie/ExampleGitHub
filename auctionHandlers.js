
//Process the bidding form
function process() {
	var accountNum;
	var bidAmt;
	var bidAmtNum;
	var theBid;
	var result;

	//Get the account number and convert to all uppercase
	accountNum=document.getElementById("acctNum").value;
	accountNum=accountNum.toUpperCase()

	//Get the bid amount and convert to a numeric value
	bidAmt=document.getElementById("bidAmt").value;
	bidAmtNum=parseFloat(bidAmt);

	//Create a bid object
	theBid=new Bid(accountNum, bidAmtNum);
	result=auction.bid(theBid);
	if (result)
		alert("Congratulations, "+accountNum+" you are the current high bidder.");
	else
		alert("Your bid must be greater than the current high bid, or if there are no bids, greater than or equal to the minimum bid.");
	
	//Write the new value to the text box
	if (result) {
		document.getElementById("highBid").innerHTML=bidAmt;
		document.getElementById("numBids").innerHTML=auction.bidHistory.length;
		document.getElementById("bidHistory").innerHTML+=accountNum+"     $"+bidAmt+"<br />";
	}
}

//Process the bidding history
function showBidHistory() {
	var aBid;
	var i;
	var textAreaString="";
	
	for (i=0; i<auction.bidHistory.length; i++) {
		aBid=auction.bidHistory[i];
		textAreaString=textAreaString+aBid.userID+"\t\t"+aBid.amt+"\r";
	}
	document.forms[0][6].value=textAreaString;
}

//Process the bidding history to find the first bid of a particular userID
function showFirstBidForLoop() {
	var aBid;
	var i;
	var firstBidString;
	var searchUserID=document.forms[0][2].value.toUpperCase();
	var found=false;
	
	for (i=0; i<auction.bidHistory.length; i++) {
		aBid=auction.bidHistory[i];
		if ((aBid.userID==searchUserID) && !found) {
			found=true;
			firstBidString=aBid.userID+"\t\t"+aBid.amt+"\r";
		}
	}
	if (!found)
		firstBidString="You have not placed a bid in this auction.";
	document.forms[0][6].value=firstBidString;
}

//Process the bidding history to find the first bid of a particular userID
function showFirstBidWhileNotDone() {
	var aBid;
	var i=0;
	var firstBidString="You have not placed a bid in this auction.";
	var searchUserID=document.forms[0][2].value.toUpperCase();
	var done=false;
	
	while (!done) {
		aBid=auction.bidHistory[i];
		if (aBid.userID==searchUserID) {
			done=true;
			firstBidString=aBid.userID+"\t\t"+aBid.amt+"\r";
		}
		i++;
		if (i==auction.bidHistory.length)
			done=true;
	}

	document.forms[0][6].value=firstBidString;
}

//Process the bidding history to find the first bid of a particular userID
function showFirstBidLogic() {
	var aBid;
	var i=0;
	var firstBidString="You have not placed a bid in this auction.";
	var searchUserID=document.forms[0][2].value.toUpperCase();
	var found=false;
	
	while ((i!=auction.bidHistory.length) && !found) {
		aBid=auction.bidHistory[i];
		if (aBid.userID==searchUserID) {
			found=true;
			firstBidString=aBid.userID+"\t\t"+aBid.amt+"\r";
		}
		i++;
	}

	document.forms[0][6].value=firstBidString;
}
		
//Process the bidding history to find the first bid of a particular userID
function showFirstBid() {
	var aBid;
	var i=0;
	var firstBidString="You have not placed a bid in this auction.";
	var searchUserID=document.forms[0][2].value.toUpperCase();
	var endOfBidHistory=auction.bidHistory.length==i;
	var found=false;
	
	while (!endOfBidHistory && !found) {
		aBid=auction.bidHistory[i];
		if (aBid.userID==searchUserID) {
			found=true;
			firstBidString=aBid.userID+"\t\t"+aBid.amt+"\r";
		}
		i++;
		if (i==auction.bidHistory.length)
			endOfBidHistory=true;
	}

	document.forms[0][6].value=firstBidString;
}
		
function autoBid(e) {
	//If IE, then the event object won't automatically be passed,
	//get it from the window:
	if (!e) 
		e=window.event;
	//If IE, the ASCII will be called keyCode, otherwise it's which
	if (e.keyCode) 
		keycode=e.keycode;
	else 
		keycode=e.which;
	//compare to @ decimal ASCII:
	if (keycode==64) {
		result=confirm("Do you want to auto-bid one dollar more than the current high bid?");
		if (result) {
			//The user wants to auto-bid:
			//Get the account number and convert to all uppercase
			accountNum=document.getElementById("acctNum").value;
			accountNum=accountNum.toUpperCase()
		
			//Get the current high bid amount and add a dollar
			bidAmt=auction.bidHistory[auction.bidHistory.length-1].amt+1;
			
			//Create a bid object
			theBid=new Bid(accountNum, bidAmt);
			successfulBid=auction.bid(theBid);
			if (successfulBid)
				alert("Congratulations, "+accountNum+" you are the current high bidder.");
			else
				alert("Something went horribly wrong.");
				
			//Write the new value to the text box
			if (successfulBid) {
				document.getElementById("highBid").innerHTML=bidAmt;
				document.getElementById("numBids").innerHTML=auction.bidHistory.length;
				document.getElementById("bidHistory").innerHTML+=accountNum+"     $"+bidAmt+"<br />";
			}
		}
	//The user does not want to auto-bid
	else
		alert("You chose NOT to auto bid.");
	}
}

function replacePic(e) {
	if (!e) 
			e=window.event;
	whichPic=(e.target) ? e.target.id : e.srcElement.id;
	if (whichPic=="thumbnailOne")
		path="spirit1.jpg";
	else //thumbnailTwo
		path="spirit2.jpg";
	where=document.getElementById("bigPic");
	where.innerHTML="<img id='auctionImage' src='"+path+"' />";
}


var bidButton= document.getElementById("bidButton");
bidButton.onclick=process;

document.onkeypress=autoBid;

var thumbOne=document.getElementById("thumbnailOne");
var thumbTwo=document.getElementById("thumbnailTwo");
thumbOne.onmouseover=replacePic;
thumbTwo.onmouseover=replacePic;