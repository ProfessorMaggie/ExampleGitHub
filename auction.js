//A bid object definition
function Bid(userID, amt) {
	this.userID=userID;
	this.amt=amt;
}

//An auction object definition
function Auction(description, minBid) {
	this.description=description;
	this.minBid=minBid;
	this.bidHistory= new Array();			//the bid history will be an array of bids; the last will be the current
	this.bid=bid;
}

//Compares the bid passed to the current high bid (if any), and if higher, adds the bid to the bid history
//and returns a positive message, otherwise returns a negative message.  Special case if it's the first bid -
//compares the bid to the minimum bid.
function bid(theBid) {
	//Get the bid amount to compare to
	if (this.bidHistory.length>0) 
		compareAmt=this.bidHistory[this.bidHistory.length-1].amt;
	else
		compareAmt=this.minBid-.01; //because the minimum bid is good enough, subract off a penny
	
	//Compare, set the message, and add to the bid history if it's the high bid
	if (theBid.amt>compareAmt) {
			this.bidHistory[this.bidHistory.length]=theBid;
			result=true;
		}
		else
			result=false;
	

	return result
}

