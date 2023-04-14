import { useParams } from 'react-router'
import React from 'react'
import { useState,useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import startGame from './startGame.scss'


function StartGame() {
  const navigate = useNavigate();
  const [list,setList] = useState(JSON.parse(localStorage.getItem('list')) ??[])
  const [roundPLay,setRoundPlay] = useState(JSON.parse(localStorage.getItem('round')) ?? 1)
  const [count,setCount] = useState(JSON.parse(localStorage.getItem('turn')) ?? 0)
  const [answer,setAnswer] = useState(JSON.parse(localStorage.getItem('ans'+list[count])) ?? [])
  const [checking,setChecking] = useState(JSON.parse(localStorage.getItem('checking')) ?? [])
  const [runApi,setRunApi] = useState(JSON.parse(localStorage.getItem('run')) ??1)
  useEffect(()=>{
    localStorage.setItem('checking',JSON.stringify(checking))
    console.log(JSON.parse(localStorage.getItem('checking')));
  },[checking]) 

  const n = roundPLay; // số phần tử
  const arr = []; // khởi tạo mảng mới
  for (let i = 0; i < n; i++) {
    arr.push({ ans: "empty" });
  }
  useEffect(()=>{
    localStorage.setItem('ans'+list[count],JSON.stringify(answer))
    console.log(JSON.parse(localStorage.getItem('ans'+list[count])));
  },[answer])
  useEffect(()=>{
    localStorage.setItem("turn",JSON.stringify(count))
    console.log(JSON.parse(localStorage.getItem("turn")));
  },[count])
  useEffect(()=>{
    localStorage.setItem("run",JSON.stringify(runApi))
    console.log(JSON.parse(localStorage.getItem("run")));
  },[runApi])
  if (answer.length==0){
    const newArr = arr.map((item)=>{
      return {
        ...item, ans: "empty"
      }
    })
    console.log(newArr);
    setAnswer(newArr);
    // setChecking(newArr)
    // console.log(checking);
  }

  console.log(answer.length);
  const chooseYes=(index)=>{
    let check = index
    console.log(check);
    const newArr = answer.map((item,index)=>{
      console.log(index);
      console.log(check);
      if (index==check){
        if(item.ans=="yes"){
          return {...item, ans: "empty"}
        }else{
          return {
            ...item, ans: "yes"
          }
        }
      }else{
        return{
          ...item
        }
      }
    })
    console.log(newArr);
    setAnswer(newArr);
    // console.log(answer);
  }
  const chooseNo=(index)=>{
    let check = index
    console.log(check);
    const newArr = answer.map((item,index)=>{
      console.log(index);
      console.log(check);
      if (index==check){
        if(item.ans=="no"){
          return {
            ...item,ans: "empty"
          }
        }else {
          return {
            ...item, ans: "no"
          }
        }
      }else{
        return{
          ...item
        }
      }
    })  
    setAnswer(newArr);
    console.log(answer);
  }
  const next=()=>{
    setChecking([...checking,answer])
    console.log(count);
    if (list.length>count+1) {
      setAnswer([])
      navigate(`/start/${list[count+1]}`)
      setCount(count+1)
      console.log(count);

    }else{
      setRunApi(1)
      navigate('/Answer')
    }
  }
  return (
  <>
    <a>turn player {list[count]}</a>
    {
      answer.map((item,index)=>(
        <div className='Question'>
          <a>cau hoi {index+1}</a>
          <div className='choose'>
            <button className={item.ans!='empty'&& item.ans=='yes'?'yes':'empty'}
            onClick={()=>chooseYes(index)}
            >yes{index}   {item.ans}</button>
            <button className={item.ans!='empty'&& item.ans=='no'?'no':'empty'}
            onClick={()=>chooseNo(index)}
            >no{roundPLay}</button>
          </div>
        </div>
      ))
    }
    <button
    onClick={next}
    >submit</button>

  </>
)
}

export default StartGame