var fs = require('fs');
var username = "google-email";
var password = "google-password"
var links = [];
var casper = require('casper').create({
    pageSettings: {
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.10 (KHTML, like Gecko) Chrome/23.0.1262.0 Safari/537.10'
    },
    viewportSize: {
        width: 1024,
        height: 768
    },
});


function append(mess){
    fs.write('data.txt', mess+"\n", 'w+');
    console.log("A: "+mess);
}


var snaps=0;
function snap(cap){
    cap.capture('google_'+snaps+'.png', {
        top: 0,
        left: 0,
        width: 1024,
        height: 768
    });
    snaps++;
}

casper.start('http://google.com/history', function() {
    //snap(this);
});

casper.on('remote.message', function(msg) {
    append(msg);
})

casper.wait(3000, function() {
    //this.mouse.click(400, 300);
   this.sendKeys('input[name="Email"]', username);
   this.sendKeys('input[name="Passwd"]',password);
   this.click('input[name="signIn"]');
});


for(var t=6000; t<3000*1000; t+=3000){

    casper.wait(t,function(){
            this.evaluate(function(){
                for(var i=0; i<36; i++){
                    var tab = document.getElementById('r'+i);
                    if(tab){
                        var ah = tab.getElementsByTagName("a")[0];
                        console.log(ah.innerHTML);
                     }
                }
            });
            this.mouse.click(968, 402);
    });

}



casper.run(function() {
    this.exit();
});
