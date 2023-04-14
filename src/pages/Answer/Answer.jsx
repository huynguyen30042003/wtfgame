import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



function Answer() {
  const navigate = useNavigate();
  const [list,setList] = useState(JSON.parse(localStorage.getItem('list')) ??[])
  const [roundPLay,setRoundPlay] = useState(JSON.parse(localStorage.getItem('round')) ?? 1)
  const [count,setCount] = useState(JSON.parse(localStorage.getItem('turn')) ?? 0)
  const [answer,setAnswer] = useState(JSON.parse(localStorage.getItem('ans'+list[count])) ?? [])
  const [newAns,setNewAns] = useState(JSON.parse(localStorage.getItem('newAns')) ?? [])
  const [checkAnswer,setCheckAnswer] = useState(JSON.parse(localStorage.getItem('ansCheck')) ?? [])
  const [dataApi, setDataApi] = useState({ answers: [] });
  const [runApi,setRunApi] = useState(JSON.parse(localStorage.getItem('run')) ??0)
  useEffect(()=>{
    localStorage.setItem("run",JSON.stringify(runApi))
    console.log(JSON.parse(localStorage.getItem("run")));
  },[runApi])
  const [n, setN] = useState(0);
  useEffect(()=>{
    localStorage.setItem('ansCheck',JSON.stringify(checkAnswer))
    console.log(JSON.parse(localStorage.getItem('ansCheck')));
  },[checkAnswer])

  const callApi = () => {
    axios
      .get("https://yesno.wtf/api")
      .then((response) => {
        const answer = response.data.answer;
        setDataApi((prevState) => ({ answers: [...prevState.answers, answer] }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

const run=() => {
    for (let i = 0; i < roundPLay; i++) {
      callApi();
    }
    console.log(dataApi);
    setCheckAnswer(dataApi)
  }
if (runApi==1){
  run();
  setRunApi(0)
  setNewAns(answer)
  console.log(answer);
}

  return (
    <div>
      <div>
        <button onClick={run}>Call API</button>
      </div>
      <div>Number of API calls: {n}</div>
      <div>Answers: {JSON.stringify(dataApi.answers)}</div>
      <a>người chơi </a>
      {
        list.map((item)=>(
          <a>  {item} </a>
        ))
      }
      <a>ket qua</a>
      {JSON.stringify(dataApi.answers)}
      {
        newAns.map((item,index)=>(
          <>
          <a>cau hoi {index+1} </a>
          <a>ket qua {dataApi.answers[index]}</a>
          </>
        ))
      }
    </div>
  );
}

export default Answer