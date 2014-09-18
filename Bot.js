var io = require('socket.io-client');
var fs = require('fs');
socket = io.connect("coinchat.org:443", {secure: true});
 
var username = "Robobot";
var outputBuffer = [];
var balance = 0.00;
var minTip = 0.25;
var owner = "MrRoboman4321";
var cards = ["AH","2H","3H","4H","5H","6H","7H","8H","9H","10H","JH","QH","KH","AC","2C","3C","4C","5C","6C","7C","8C","9C","10C","JC","QC","KC","AD","2D","3D","4D","5D","6D","7D","8D","9D","10D","JD","QD","KD"]
 
 socket.on('balance', function (data) {
    if (typeof data.balance != "undefined") {
        balance = data.balance;
    }
});
 
socket.on('connect', function(){
    console.log('Connected')
        //Your session key (aka API key)
        //Get this from your browser's cookies.
    socket.emit('login', {session: "sessionID"});
    socket.on('loggedin', function(data){
                socket.emit('getbalance', {});
                username = data.username;
       
                /* Join rooms */
                socket.emit('joinroom', {join: 'robobot'});
                outputBuffer.push({room: "robobot", message:"Starting. Special thanks to lurkwingduck for help developing the bot."});
                setTimeout(function(){
                        socket.emit('getbalance', {});
                        socket.emit("getcolors", {});
                       
                        socket.on('chat', function(data){
                                var command = data.message.split(" ")[0].toLowerCase();
                                if(data.room == "robobot" && data.user !== "robobot"){
                                        if(contains(data.message, ["hi", username])){
                                                outputBuffer.push({room: data.room, message:'Hi ' + data.user + "!"});
                                        }
                                        if(contains(data.message, ["slaps", username])){
                                                outputBuffer.push({room: data.room, message: "/me slaps " + data.user + " around a bit with a large trout."});
                                        }
                                        if(contains(data.message, ["<span class='label label-success'>has tipped " + username])){
                                                var amount = data.message.split("<span class='label label-success'>has tipped " + username + " ")[1].split(" ")[0];
                                                var dieGuess = data.message.replace("<span class='label label-success'>has tipped Robobot 0.25 mBTC","");
                                                dieGuess = dieGuess.replace("(","");
                                                dieGuess = dieGuess.replace(")","");
                                                dieGuess = dieGuess.replace("!","");
                                                dieGuess = dieGuess.replace(" ","");
                                                dieGuess = stripHTML(dieGuess);
                                                outputBuffer.push({room: data.room, message: "Rolling..."});
                                                var dieRoll = Math.floor((Math.random()*6)+1)
                                                console.log(dieRoll);
                                                if(dieRoll == dieGuess){
                                                        var winAmount = amount*5;
                                                        outputBuffer.push({room: data.room, message: "Congratz! You have won" + amount*5 + "!"});
                                                        tip(data.room, data.user, roundDown(winAmount), "Congratz!");
                                                }
                                                else {
                                                        outputBuffer.push({room: data.room, message: "Sorry, you didn't win this time. Die roll: " + dieRoll});
                                                }
                                           
                                        }
                                        if(contains(data.message, ["!help"])){
                                                outputBuffer.push({room: data.room, message: "To play, do /tip Robobot (amount to bet) (choice of dieroll 1-6) to start the game. If there is not at LEAST 5 times the amount you are betting (and a bit) mBTC when you do !balance, DO NOT PLAY! YOU WILL NOT GET PAYED IF YOU WIN!"});
                                        console.log(" was asked !help");;
                                        }
                                        if(contains[data.message, "!flip"]){
                                                var res = (Math.random() > 0.5 ? "heads" : "tails");
                                                socket.emit("chat", {room: data.room, message: "Flipping coin: " + res + "!", color: "000"});
                                        }
					if(contains(data.message, ["!bal"])){
                                                outputBuffer.push({room: data.room, message: "Current balance is " + balance + "mBTC"})
                                                        console.log(balance + " was asked !bal");;
                                        }
                           
                                        if(contains(data.message, ["!tip"])){
                                                if(data.user == owner){
                                                        tip(data.room, owner, 0.25, "Withdraw");
							socket.emit('getbalance', {});
                                                }
                                                                                               
                                        }
					if(contains(data.message, ["!8ball"])) {
						ball8 = Math.floor((Math.random()*19)+1);
						if(ball8 == 1){
							outputBuffer.push({room: data.room, message: "It is certain."});
						}
						else if(ball8 == 2){
							outputBuffer.push({room: data.room, message: "It is decidedly so."});
						}
						else if(ball8 == 3){
							outputBuffer.push({room: data.room, message: "Without a doubt."});
						}
						else if(ball8 == 4){
							outputBuffer.push({room: data.room, message: "Yes, definitely."});
						}
						else if(ball8 == 5){
							outputBuffer.push({room: data.room, message: "You may rely on it."});
						}
						else if(ball8 == 5){
							outputBuffer.push({room: data.room, message: "As I see it, yes."});
						}
						else if(ball8 == 6){
							outputBuffer.push({room: data.room, message: "Most likely."});
						}
						else if(ball8 == 7){
							outputBuffer.push({room: data.room, message: "Outlook good."});
						}
						else if(ball8 == 8){
							outputBuffer.push({room: data.room, message: "Yes."});
						}
						else if(ball8 == 9){
							outputBuffer.push({room: data.room, message: "Signs point to yes."});
						}
						else if(ball8 == 10){
							outputBuffer.push({room: data.room, message: "Reply hazy, try again."});
						}
						else if(ball8 == 11){
							outputBuffer.push({room: data.room, message: "Ask again later."});
						}
						else if(ball8 == 12){
							outputBuffer.push({room: data.room, message: "Better not tell you now."});
						}
						else if(ball8 == 13){
							outputBuffer.push({room: data.room, message: "Cannot predict now."});
						}
						else if(ball8 == 14){
							outputBuffer.push({room: data.room, message: "Concentrate and ask again."});
						}
						else if(ball8 == 15){
							outputBuffer.push({room: data.room, message: "Don't count on it."});
						}
						else if(ball8 == 16){
							outputBuffer.push({room: data.room, message: "My reply is no."});
						}
						else if(ball8 == 17){
							outputBuffer.push({room: data.room, message: "My sources say no."});
						}
						else if(ball8 == 18){
							outputBuffer.push({room: data.room, message: "Outlook not so good."});
						}
						else if(ball8 == 19){
							outputBuffer.push({room: data.room, message: "Very doubtful."});
						}
					}                                                                      
                                }
                        });
                       
                }, 1000);
       
                /* Send chat buffer every 600ms */
        setInterval(function(){
                //CoinChat has a 550ms anti spam prevention. You can't send a chat message more than once every 550ms.
                if(outputBuffer.length > 0){
                                if(outputBuffer[0].tipObj){
                                        socket.emit("tip", outputBuffer.splice(0,1)[0].tipObj);
                                }
                                else{
                                        var chat = outputBuffer.splice(0,1)[0];
                                        socket.emit("chat", {room: chat.room, message: chat.message, color: "000"});
                                }
                }
        }, 600);
    });
    socket.on('disconnect', function(){});
       
        /* Handle balance message */
        socket.on("balance", function(data){
        if (data.change){
            balance = balance + data.change;
        }
        else{
            balance = data.balance;
        }
    });
});
 
/* Creates a tip object and puts it on the outputBuffer */
function tip(roomName, userName, amount, note){
        if(amount <= balance && amount >= minTip){
                outputBuffer.push({tipObj: {user: userName, room: roomName, tip: amount, message: note}});
        }
        else{
                outputBuffer.push({room: roomName, message: "Sorry " + userName + " I don't seem to have enough to tip you back. " + owner + " owes you: " + amount + "mBTC for: " + note, color: "000"});
        }
}
 
/* Rounds a number down to the nearest hundredth */
function roundDown(num) {
    var multiplier = Math.pow(10, 2);
    return Math.floor(num * multiplier) / multiplier;
}
 
 /* Strips html from messages, for instance if the messsage has a color */
function stripHTML(string){
        return string.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>?/gi, "");
}
 
function contains(string, terms){
        for(var i=0; i<terms.length; i++){
                if(string.toLowerCase().indexOf(terms[i].toLowerCase()) == -1){
                                return false;
                }
        }
        return true;
}
 
 
"A","2","3","4","5","6","7","8","9","10","J","Q","K"
