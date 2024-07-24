import React,{useState} from 'react';

export default function TextForm(props) {

  const[text,setText]=useState(" ");

    // click a button
    const clickButton=()=>{
        let newText=text.toUpperCase();
        setText(newText); // Update the state with the new uppercase text
        console.log(newText);
    };
    
    const clicklower=()=>{
        let newText=text.toLowerCase();
        setText(newText);   //update the state with the new lowercase
        console.log(newText);
    }
    //change on text area
    const handleOnChange=(event)=>{
        setText(event.target.value);
        console.log(setText);
    };
    
    //to clear a text
    const clearText = () => {
      setText(""); // Clear the text by setting it to an empty string
    };
    
    return (
      <div className="text-form">
        <h1 style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
         {props.heading}
        </h1>
      <div className="mb-3">

        <textarea className={"form-control" }value={text} onChange={handleOnChange} style={{ 
            color: props.mode === 'dark' ? 'black' : 'black',
            backgroundColor: props.mode === 'dark' ? 'gray' : 'transparent' 
          }}
          placeholder="enter the text here"id="exampleFormControlTextarea1" rows="10">
        </textarea>

        <div style={{ textAlign: 'center',margin:'1rem'}}>
                    <button 
                      className="btn1 mx-2 my-1" onClick={clickButton}>ToUpperCase
                    </button>
                    
                    <button 
                      className="btn2 mx-2 my-1" onClick={clearText}>Clear
                    </button>

                    <button 
                      className="btn1 mx-2 my-1" onClick={clicklower}>ToLowerCase
                    </button>    
        </div>
      </div>
    </div>
  );
}
