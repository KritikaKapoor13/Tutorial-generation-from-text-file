import React, { Component } from 'react'
import './assessment.css';
class Assessment extends Component {
    constructor(props) {
        super(props);
    
         this.state = {
           boolean_question: {},
           mcq:this.props.location.data
          
        };
    
        console.log(this.state.mcq)
        this.onSubmit=this.onSubmit.bind(this);
        this.shuffle=this.shuffle.bind(this);
      }
      componentDidMount() {
        
        //this.gen_questions();
     }
    
  shuffle(array) {
    console.log("hi");
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  onSubmit(e) {
    e.preventDefault()
    // var formElements = 
    console.log(this.state.mcq.length);
    var s=0;
    for(var i=0;i<Object.keys(this.state.mcq).length;i++){
      // var ans=document.getElementsByName(i.toString())
      // if(ans.checked)
      this.state.mcq[i]["user_answer"]=document.querySelector("input[name=\'"+i.toString()+"\']:checked").value;
      // ans.value;
      if(this.state.mcq[i]["user_answer"]===this.state.mcq[i]["answer"])
        s+=1;
    }

    console.log(this.state.mcq);
    console.log(s);
    document.getElementById("score").innerHTML="Your score is : "+s+"/"+Object.keys(this.state.mcq).length;
  }

  render() {
    for(var i=0;i<Object.keys(this.state.mcq).length;i++){
      console.log("hello");
      this.state.mcq[i]["options"]=this.shuffle(this.state.mcq[i]["options"]);
    }
    //   this.gen_questions()
    return (
    // <form noValidate onSubmit={this.onSubmit}>
    <div>
      <form noValidate name="qa">
        
      { 
        Object.keys(this.state.mcq).map((key, index) => ( 
            <div className="card card-body no-gutters" key={index} style={{width:"100%",backgroundColor:"#A9A9A9", marginBottom:"0 !important", height:"10px", padding:"0 !important"}}>
           <div className="col-sm-10 mx-auto">
          <h3 className="card-body">{index+1}) {this.state.mcq[key]["question_statement"]}</h3> 
          {
          this.state.mcq[key]["options"].map((option,index1) => (
            <div style={{color: option===this.state.mcq[key]["answer"]? 'green': 'black', textAlign: 'left', fontSize:'4vh' }}>
              <input type="radio" name={index} value={option} disabled="True"/>  {option}
            </div>)
          )}
          </div>
          </div>
        ))
      }
 
    {/* <input type="submit" className="btn-secondary btn-lg" disabled="True"/> */}
    </form>
    <div id="score" style={{color: 'black', textAlign: 'center', fontSize:'6vh' }}></div>
    </div>
    )
  }
}

export default Assessment