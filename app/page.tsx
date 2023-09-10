"use client"
import Image from 'next/image'
import Tree from '../app/components/tree'
import { useRouter } from 'next/navigation'
import { useState,useEffect } from 'react'
import Spinner from './components/Spinner'
import { start } from 'repl'
import StyledTextContainer from '../app/components/styleparent'
import Header from './components/Header'
import Script from 'next/script'
import axios from 'axios';
import Modal from './components/Modal'
const gaEndpoint = 'https://www.google-analytics.com/collect';
const trackingId = 'UA-XXXXXXXXX-Y';

export interface MyInterface {
  // Define properties and their types
  "﻿Variable name": any;
  "Field Label": any;
  'Choices, Calculations, OR Slider Labels': any; // Optional property
  'Branching Logic (Show field only if...)':any
}
export default function Index() {
  const [startForm,setForm]= useState(false)
  const [data,setData]= useState(null)
  const [finishform,setfinishform]=useState(false)
  const [currentactiveq,setActiveQ]= useState<MyInterface>()
  const [historyquestions,setHistory]=useState<MyInterface[]>([])
  const[possiblevalues,setPossibleValues]= useState([0,20])
  const[backbuttonactive,setBackactive]=useState(false)
  const [isLoading,setLoading]=useState(false)
  const router = useRouter()
  
  const addItemToHistory = (item:any) => {
    setHistory([...historyquestions, item]); // Use spread operator to create a new array with the added item
  };
  const fetchData = async () => {
    try {
      const response = await fetch('/api/hello');
      const jsonData = await response.json();
      setData(jsonData.data);
      return jsonData.data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    console.log("change")
    console.log(historyquestions)

    if(currentactiveq&&currentactiveq['Field Label'].includes("END")||currentactiveq&&currentactiveq['Field Label'].includes("finished")){
      console.log("enddddddddd")
      sendEventToGA('user_completed_measure')
        setfinishform(!finishform)
    }
    if(historyquestions.length==1){
      setBackactive(false)
    }
   
   

   
  }, [currentactiveq,historyquestions]);
  function refresh(){
   setForm(false)
   
    setHistory([])
    const firstquestion= returnactivequestion("",data)
    setActiveQ(firstquestion)
  setData(null)
  setBackactive(false)
  
  
  setfinishform(false)
  const confirming= window.confirm("Are you sure you want to quit this page, your result will not be saved.")
  if(confirming){
    loadForm()
  }

  

    

  }
  async function loadForm(){
  sendEventToGA("user_started_measure")
   setLoading(true)
    const data=await fetchData()
    setData(data)
    const firstquestion= returnactivequestion("",data)
     setActiveQ(firstquestion)
     const his=[firstquestion]
     setHistory(his)
     
     
    
    
    setForm(true)
    setLoading(false)

    
    


  }
  interface BinaryTreeNode {
    value: number;
    left: BinaryTreeNode | null;
    right: BinaryTreeNode | null;
  }

  function returnactivequestion(criteria:any,data:any){
    console.log("shihihi")
    const filteredData = data.filter((item:any) => item["Branching Logic (Show field only if...)"]==criteria||(item["Branching Logic (Show field only if...)"].includes(criteria)&&criteria!=""));
    console.log(filteredData)
    //setActiveQ(filteredData)
    return filteredData[filteredData.length-1]


  } 
  function returnpreviousquestion(question:any,data:any){
    const filteredData = data.filter((item:any) => item==question);
    console.log(filteredData)
    //setActiveQ(filteredData)
    return filteredData[filteredData.length-1]


  }
  
  function getLeafNodeValues(node: BinaryTreeNode | null): number[] {
    if (node === null) {
      return [];
    }
    
    if (node.left === null && node.right === null) {
      return [node.value];
    }
    
    const leftValues = getLeafNodeValues(node.left);
    const rightValues = getLeafNodeValues(node.right);
    
    return [...leftValues, ...rightValues];
  }
 
  
function left(){
    //this is yes and 
    //set search criteria to variable name = 0 
  setBackactive(true)
   
    {currentactiveq&&setActiveQ(returnactivequestion(`[${currentactiveq["﻿Variable name"]}] ='1'`,data))}
    {currentactiveq&&addItemToHistory(returnactivequestion(`[${currentactiveq["﻿Variable name"]}] ='1'`,data))}
   

 
  
  }
  
  


function right(){
  setBackactive(true)
    {currentactiveq&&setActiveQ(returnactivequestion(`[${currentactiveq["﻿Variable name"]}] ='0'`,data))}
    {currentactiveq&&addItemToHistory(returnactivequestion(`[${currentactiveq["﻿Variable name"]}] ='0'`,data))}
 


}

function previousquestion(){
  if (finishform==true){
    setfinishform(false)
    setBackactive(true)
    console.log(historyquestions)
    const newpreviousquestion = historyquestions[historyquestions.length-2]
    console.log(newpreviousquestion)
    {currentactiveq&&setActiveQ(returnpreviousquestion(newpreviousquestion,data))}
    setHistory(historyquestions.slice(0,historyquestions.length-1))
  

  }
  if(historyquestions.length==1){
    setBackactive(false)

    return
  }
  setBackactive(true)
  console.log(historyquestions)
  const newpreviousquestion = historyquestions[historyquestions.length-2]
  console.log(newpreviousquestion)
  {currentactiveq&&setActiveQ(returnpreviousquestion(newpreviousquestion,data))}
  setHistory(historyquestions.slice(0,historyquestions.length-1))

}

function email(){
  const emailAddress = '';
  const emailSubject = 'Walking Index for Spinal Cord Injury WISCI Self Reported Results';
  const emailBody = `The score for this participant is ${currentactiveq&&currentactiveq["Field Label"].match(/\d+/g)}}`;
  const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  return mailtoLink

}

const sendEventToGA =  (eventName:any) => {
 
function getid() {
  var match = document.cookie.match('(?:^|;)\\s*_ga=([^;]*)'), 
  raw = match ? decodeURIComponent(match[1]) : null;
  if (raw) { 
  match = raw.match(/(\d+\.\d+)$/)
  } 
  return (match) ? match[1] : null; 
  }
  console.log(getid())
  console.log(eventName)
  const response =axios.post('/api/track-event', {
    name: eventName, // The name of the event
    clientid: getid(),
  });
 console.log(response)
};
  return (
   <section className='h-screen'>
    <Script src="https://www.googletagmanager.com/gtag/js?id=G-J58VG76H12" />
    <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-J58VG76H12');
        `}
      </Script>
   
<div className='h-fit'>
    <Header></Header>

    </div>
    

<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
   
  <div className="mx-auto ">
    {startForm==false?  <section>
    <h1 className="text-center text-2xl font-bold text-theme sm:text-3xl">
    Walking Index for Spinal Cord Injury (WISCI)
    </h1>
    <br></br>
    <h2 className="text-center">The Self-Report Version</h2>

    </section>:<div></div>}
  

  {startForm==false?
    <section>
    


    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
      This self-report outcome measure scores your ability to walk.

It has been tested for reliability and validity (against the original WISCI II version – Ditunno et al 2001).

Self-report WISCI developed by: Marsha Ben, Lisa Harvey and Joanne Glinsky, University of Sydney, Australia

(Ref: Ben M et al (2023) Spinal Cord)
<br>
</br>

App developed by: Joshua Wan
    </p>

    </section>:
    <div></div>}
   
    {startForm==false? 
    <section
     
      className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
    >
     
      <button
        
        className="block w-full rounded-lg bg-theme px-5 py-3 text-sm font-medium text-white"
        onClick={()=>{loadForm()}}
      >
        
        {isLoading==true? <Spinner></Spinner>:"Start outcome measure"}
       
      </button>

    </section>:
    <section
      
      className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
    >
    
           <section className='text-neutral-950'>
           <button
  className={backbuttonactive==true?'group flex items-center justify-between gap-4 rounded-lg border border-current px-5 py-3 text-red-600  hover:bg-red-600 focus:outline-none ':`group flex items-center justify-between gap-4 rounded-lg border border-current px-5 py-3 text-red-600  hover:bg-red-600 focus:outline-none  opacity-50 cursor-not-allowed `}
  onClick={()=>{previousquestion()}}
>
  <span className="font-medium  group-hover:text-white">
   Back
  </span>

  <span
    className="shrink-0 rounded-full border border-red-600 bg-white p-2 group-active:border-red-500"
  >
    <svg
      className="h-5 w-5 transform rotate-180"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  </span>
</button>
           
            {finishform==true&&currentactiveq?<div className=' text-neutral-950 text-center font-bold text-3xl'>Your Score is {currentactiveq["Field Label"].match(/\d+/g)}</div>:currentactiveq&&<section>  
            
 <div className='text-neutral-950 lg:leading-relaxed xl:leading-relaxed lg:text-4xl xl:text-4xl md:text-2xl sm:text-2xl font-sans ' dangerouslySetInnerHTML={{ __html:currentactiveq["Field Label"] }} /></section>}
        </section>
        <br></br>
    
      
{finishform==false?
<section>

    {currentactiveq&&currentactiveq["﻿Variable name"]=="note_1"?<div>
    <button
    
    className="block w-full rounded-lg bg-theme px-5 py-3 text-sm font-medium text-white"
    onClick={right}
  >
    
    I understand , proceed
  </button>

    </div>:

<section>
  
<button
    type="submit"
    className="block w-full rounded-lg bg-theme px-5 py-3 text-sm font-medium text-white"
    onClick={left}
  >
    
    {currentactiveq&&currentactiveq['Choices, Calculations, OR Slider Labels'].includes("|")&&currentactiveq['Choices, Calculations, OR Slider Labels'].split("|")[0].split("1,")}
  </button>
  <br></br>
  <button
    type="submit"
    className="block w-full rounded-lg bg-red-700 px-5 py-3 text-sm font-medium text-white"
    onClick={right}
  >

{currentactiveq&&currentactiveq['Choices, Calculations, OR Slider Labels'].includes("|")&&currentactiveq['Choices, Calculations, OR Slider Labels'].split("|")[1].split("0,")}
  </button>

    </section>
    
    
    }

 

</section>:<section>

<button
    
    className="block w-full rounded-lg bg-theme px-5 py-3 text-sm font-medium text-white"
    onClick={refresh}
  >
    
    Click here to start again
  </button>
  <br></br>
<Modal setter={sendEventToGA} score={currentactiveq&&currentactiveq["Field Label"].match(/\d+/g)}></Modal>

  
  
  </section>}

      

     
    </section>
    
    }

    
  </div>
</div>
   </section>
  )
}
