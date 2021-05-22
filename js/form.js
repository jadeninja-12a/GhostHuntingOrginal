class Form{
    constructor(){
        this.input = createInput("UserName");
        this.button = createButton("Join");
        this.greeting = createElement("h3");
        this.greeting2 = createElement("h3");
        this.title = createElement("h1");
    }

    display(){
       
        this.title.html("GHOST HUNTING");
        this.title.position(displayWidth/2 - 175, displayHeight/2 - 400);
        this.title.style.color = "#ff0000" ;
      
        this.input.position(displayWidth/2 - 140, 350);
      
        this.button.position(displayWidth/2 -75, 500);
        this.button.mousePressed(() => {
            this.input.hide();
            this.button.hide();
            hunter.name = this.input.value();
            this.greeting.html("Hey " + hunter.name + ". You have just entered the " );
            this.greeting2.html("GHOST HUNTING GAME");
            this.greeting.position(displayWidth/2 , 350);
            this.greeting2.position(displayWidth/2 , 380);
            gameState = 1;
        });
        
    }
    hide(){
        clearTimeout(delay)
        this.title.hide();
        this.greeting2.hide();
        this.greeting.hide();
    }
}