import { Question } from './../../interfaces/question';
import { Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import { bounceInDownOnEnterAnimation, bounceOutLeftOnLeaveAnimation , bounceInRightOnEnterAnimation } from 'angular-animations'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    bounceInDownOnEnterAnimation(),
    bounceOutLeftOnLeaveAnimation(),
    bounceInRightOnEnterAnimation({delay:1000})
  ]
})
export class HomeComponent implements OnInit{
constructor(private _questionsService:QuestionsService , private _renderer2:Renderer2 , private _el:ElementRef){}




// Question API params

selectedNum : number=1
selectedDifficulty :string = ''
selectedCategory :string = ''

// #############################

// Animation Rendering Steps

step1:boolean = false
step2:boolean = false
step3:boolean = false
checking:boolean = false
// #############################

// Response Handling

questions:Question[] = []
newQuestions:Question[]=[]
index:number = 0
score:number = 0
// Available Categories in API

categories = [
  {
  "id": 9,
  "name": "General Knowledge"
  },
  {
  "id": 10,
  "name": "Entertainment: Books"
  },
  {
  "id": 11,
  "name": "Entertainment: Film"
  },
  {
  "id": 12,
  "name": "Entertainment: Music"
  },
  {
  "id": 13,
  "name": "Entertainment: Musicals & Theatres"
  },
  {
  "id": 14,
  "name": "Entertainment: Television"
  },
  {
  "id": 15,
  "name": "Entertainment: Video Games"
  },
  {
  "id": 16,
  "name": "Entertainment: Board Games"
  },
  {
  "id": 17,
  "name": "Science & Nature"
  },
  {
  "id": 18,
  "name": "Science: Computers"
  },
  {
  "id": 19,
  "name": "Science: Mathematics"
  },
  {
  "id": 20,
  "name": "Mythology"
  },
  {
  "id": 21,
  "name": "Sports"
  },
  {
  "id": 22,
  "name": "Geography"
  },
  {
  "id": 23,
  "name": "History"
  },
  {
  "id": 24,
  "name": "Politics"
  },
  {
  "id": 25,
  "name": "Art"
  },
  {
  "id": 26,
  "name": "Celebrities"
  },
  {
  "id": 27,
  "name": "Animals"
  },
  {
  "id": 28,
  "name": "Vehicles"
  },
  {
  "id": 29,
  "name": "Entertainment: Comics"
  },
  {
  "id": 30,
  "name": "Science: Gadgets"
  },
  {
  "id": 31,
  "name": "Entertainment: Japanese Anime & Manga"
  },
  {
  "id": 32,
  "name": "Entertainment: Cartoon & Animations"
  }
  ]

// ###########################

  ngOnInit(): void {
    this.step1=true
    
  }
// Getting the questions from the API

 getQuestions(num:number,diff:string,category:string):void{
  if(this.selectedNum>=1 && this.selectedNum<=10){

    this._questionsService.getQuestions(num,diff,category).subscribe({
      next:(response)=>{
        this.questions = response.results
       
         this.newQuestions = [...this.questions]
        for(let i=0; i <this.newQuestions.length;i++){
          
          let answers:string[]
          answers = [...this.newQuestions[i].incorrect_answers]
          answers.push(this.newQuestions[i].correct_answer)
          answers.sort()
          
          this.newQuestions[i].all_answers = answers
        }
      
        this.step1 = false
        this.step2=true
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  else{
    alert('Please make sure you Selected a Category & a Difficulty and make sure that the number of questions is between 1 & 10')
  }
 
 }


// #######################################

// Checking the answer

checkAnswer(answer:string):void{
  
  const ref = document.querySelectorAll('.answerButton')
  this.checking=true
  
  for (let i=0 ; i< ref.length ; i++){
    if(ref[i].innerHTML == this.newQuestions[this.index].correct_answer ){
      this._renderer2.addClass(ref[i] , 'correct')
    }
  }
  
  if (this.index < this.newQuestions.length) {
    

    if (answer === this.newQuestions[this.index].correct_answer) {
    
      this.score++;
      
    }

    setTimeout(() => {
      this.index++

      this.checking=false

      if (this.index >= this.newQuestions.length) {
          this.step2 = false;
          this.step3 = true; 
          this.index = 0
          
      }
       
    }, 1500)
   
   
    
}

  
}


reset():void{
  this.step3=false
  this.step1=true
}
}
