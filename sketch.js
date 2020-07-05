var app;

const WIDTH = 800;
const HEIGHT = 600;

const FORM_COLOURS = [
  [255, 255, 0],
  [0, 0, 255],
  [255, 0, 0]
];

class App
{
  // _logoBauhaus: p5.Image;
  // _textFont
  // _textColour
  // _textSize
  // _textExerciseTitle, _textExerciseHelp: p5.Text;
  // _answerIndex;

  constructor()
  {
    this.setupImages();
    this.setupTexts();
    this.setupExercise();
    /* */
    this.setupButtons();
    
    this.goToExercise();
  }
  
  setupTexts()
  {
    this._textFont = loadFont("assets/font/bauhaus_modern.ttf");
    
    this._textColour = (255, 255, 255);
    
    this._textSize = 20;
    this._textSizeExplanation = 15;
    
    this._textExercise = loadStrings("assets/text/exercise.txt");
    this._textResult = loadStrings("assets/text/result.txt");
    this._textAnswer = loadStrings("assets/text/answer.txt");
    this._textExplanation = loadStrings("assets/text/explanation.txt");
    this._textInfo = loadStrings("assets/text/info.txt");
    this._urlInfo = loadStrings("assets/url/info.txt");
  }
  
  setupImages()
  {
    this._logoBauhaus = loadImage("assets/img/bauhaus.png");
  }
  
  setupExercise()
  {
    this._answerIndex = 0;
    this._mode = 'EXERCISE';
  }
  
  setupButtons()
  {
    this._buttonConfirm  = createButton("Confirmer");
    this._buttonConfirm.position(WIDTH/2 - 65, 100);
    this._buttonConfirm.mousePressed(() => this.changeMode());
    this._buttonConfirm.addClass("button");
    
    this._buttonAnswer = createButton("Changer reponse");
    this._buttonAnswer.position(WIDTH/2 - 100, 140);
    this._buttonAnswer.mousePressed(() => this.changeAnswer(1));
    this._buttonAnswer.addClass("button");
        
    this._buttonInfo = createButton("En savoir plus");
    this._buttonInfo.position(WIDTH/2 - 80, 500);
    this._buttonInfo.addClass("button");
    this._buttonInfo.attribute(
      "onclick", 
      "location.href=" + this._urlInfo[0] + ";"
    );
  }
  
  getFormColours()
  {
     var colours = [];
     for(var i = 0; i < 3; ++i)
     {
        const j = (i + this._answerIndex) % 3;
        colours.push(FORM_COLOURS[j]);
     }
     return colours;
  }
  
  onKeyPressed()
  {
    if (keyCode == ENTER)
    {
      this.changeMode();
    }
    switch (this._mode)
    {
      case "EXERCISE":
        return this.onKeyPressedExercise();    
    }
  }
        
        
  onKeyPressedExercise()
  {
    var way = (keyCode == UP_ARROW) - (keyCode == DOWN_ARROW);
    if (way)
    {
      this.changeAnswer(way);
    }
  }
    
  changeAnswer(way)
  {
     if (this._mode != "EXERCISE")
     {
       return;
     }
     var i = (this._answerIndex + way) % 3;
     while (i < 0)
     {
       i += 3;
     }
     this._answerIndex = i;
  }
  
  changeMode()
  {
    var mode;
    switch (this._mode)
    {
      case "EXERCISE":
        this.goToResult();
        break;
     case "RESULT":
        this.goToInfo();
        break;
     case "INFO":
        this.goToExercise();
        break;
    }
  }
  
  goToResult()
  {
    this._buttonConfirm.show();
    this._buttonAnswer.hide();
    this._buttonInfo.hide();
    this._answerIndex = 1;
    this._mode = "RESULT";
  }
  
  goToInfo()
  {
    this._buttonConfirm.show();
    this._buttonAnswer.hide();
    this._buttonInfo.show();
    this._mode = "INFO";
  }
  
  goToExercise()
  {
    this._buttonConfirm.show();
    this._buttonAnswer.show();
    this._buttonInfo.hide();
    this._answerIndex = 0;
    this._mode = "EXERCISE";
  }
  
  getTextAnswer()
  {
    var answer = String.fromCharCode('A'.charCodeAt(0) + this._answerIndex);
    
    return this._textAnswer[0] + ' ' + answer;
  }
  
  
  configText()
  {
    textAlign(CENTER);
    textFont(this._textFont);
    textSize(this._textSize);
    fill(this._textColour);
  }
  
  
  displayTextsExercise()
  {
    this.configText();
    
    text(this._textExercise[0], WIDTH/2, 80);
    text(this.getTextAnswer(),  WIDTH/2, 200);
    text(this._textExercise[1], WIDTH/2, 550);
    text(this._textExercise[2], WIDTH/2, 580);
  }
  
  displayTextsExplanation()
  {
    
     var x = mouseX;
     var index = floor((x / WIDTH)*3);
    
     this.configText();
     text(this._textExplanation[index], 50, 400, WIDTH - 100, 500);
  }
  
  displayTextsResult()
  {
    this.configText();
    text(this._textResult[0],  WIDTH/2, 80);
    text(this._textResult[1],  WIDTH/2, 550);
    text(this._textResult[2],  WIDTH/2, 580);
    text(this.getTextAnswer(), WIDTH/2, 200);
  }
  
  displayTextsInfo()
  {
    this.configText();
    text(this._textInfo[0], WIDTH/2, 80);
    text(this._textInfo[1], 50, 200, WIDTH - 100, 240);
    text(this._textInfo[2], 50, 260, WIDTH - 100, 380);
    text(this._textInfo[3], 50, 400, WIDTH - 100, 480);
    
  }
 
  
  displayImages()
  {
    image(this._logoBauhaus, 20, 20, 100, 100);
  }
  
  displayForms()
  {
    const size = 150;
    const height = 300;
    const width = 250;
    const widthOffset = 150;
    
    const colours = this.getFormColours();
    
    fill(colours[0]);
    circle(widthOffset, height, size);
    
    fill(colours[1]);
    square(
      widthOffset + width - size/2,
      height    - size/2,
      size
    );
    
    fill(colours[2]);
    triangle(
      widthOffset + width * 2 + size/2,
      height    + size/2,
      widthOffset + width * 2,
      height    - size/2,
      widthOffset + width * 2 - size/2,
      height    + size/2
    );
  }
  
  displayExercise()
  {
    this.displayTextsExercise();
    this.displayImages();
    this.displayForms();
  }
  
  displayResult()
  {
    this.displayTextsResult();
    this.displayTextsExplanation();
    this.displayImages();
    this.displayForms();
  }
  
  displayInfo()
  {
    this.displayImages();
    this.displayTextsInfo();
  }

  display()
  {
    switch (this._mode)
    {
      case "EXERCISE":
        return this.displayExercise();
      case "RESULT":
        return this.displayResult();
      case "INFO":
        return this.displayInfo();
      default:
        return;
    }
  }
    
}

function preload()
{
 
  app = new App();
  
}

function setup()
{
  createCanvas(WIDTH, HEIGHT);
}

function keyPressed()
{
      app.onKeyPressed();
}
  

function draw()
{
  background(0);
  
  app.display();
  
}