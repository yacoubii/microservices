import React, { useState, useContext,useEffect } from "react";
import Axios from "axios";
import { Button} from "react-bootstrap";
import { useHistory } from "react-router";
import "./feedbacks.css";
import axios from 'axios';


const Feedbacks = () => {
    const [allfeedbacks,Setallfeedbacks]=useState([]);
    const [myfeedback,Setmyfeedback]=useState('');
    useEffect(() => {
        const token= localStorage.getItem("token");
        const url="http://localhost:8000/feedback/"+token
        axios.get(url)
          .then(res => {
            const list = res.data;
            Setallfeedbacks(list);
            console.log(list);
          });
      }, []);
    const feedbacks = allfeedbacks.map(feedback=>{

        return(
            <div class="card">
            <div class="card-header">
                Comments section
            </div>
            <div class="card-body">
                <h5 class="card-title">Date: {feedback.date.slice(0, 9)}</h5>
                <p class="card-text">{feedback.text}</p>
                
            </div>
            </div>
    )})
    
    return (
        <div>
            <br/>
            <br/>
            <h1>Feedbacks</h1>
            <br/>
            <h6>Please type your feedbacks below:</h6>
        <textarea name="" id="" cols="100" rows="5" onChange={(e) =>{Setmyfeedback(e.target.value);console.log(myfeedback)}} ></textarea>
        <br/><br/>
        <Button onClick={(e) =>{
                const token= localStorage.getItem("token");
                const url="http://localhost:8000/feedback/"+token
                axios({
                  method: 'post',
                  url: url,
                  data: {text:myfeedback}
                })
                window.location.reload();
        }} className="btn-info">Submit feedback</Button><br/> <br/> <br/>
        <h6>Other feedbacks:</h6>
        <center>{feedbacks}</center>
        
        </div>
    
 );
};

export default Feedbacks;