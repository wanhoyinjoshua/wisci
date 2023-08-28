"use client"
import Image from 'next/image'
import Tree from '../app/components/tree'
import { useRouter } from 'next/navigation'
import { useState,useEffect } from 'react'
import Spinner from './components/Spinner'
import { start } from 'repl'
import StyledTextContainer from '../app/components/styleparent'
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
  const[possiblevalues,setPossibleValues]= useState([0,20])
  const [isLoading,setLoading]=useState(false)
  const router = useRouter()
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

    if(currentactiveq&&currentactiveq['Field Label'].includes("END")){
      console.log("enddddddddd")
        setfinishform(!finishform)
    }
   
   

   
  }, [currentactiveq]);
  function refresh(){
   setForm(false)
   
 
  setData(null)
  
  setfinishform(false)
  const confirming= window.confirm("Are you sure you want to quit this page, your result will not be saved.")
  if(confirming){
    loadForm()
  }

  

    

  }
  async function loadForm(){
   setLoading(true)
    const data=await fetchData()
    setData(data)
     setActiveQ(returnactivequestion("",data))
    
    
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
   console.log(data)
   {currentactiveq&&console.log(Object.keys(currentactiveq))}
   {currentactiveq&&console.log(currentactiveq["﻿Variable name"])}
    {currentactiveq&&setActiveQ(returnactivequestion(`[${currentactiveq["﻿Variable name"]}] ='1'`,data))}
 

 
  
  }
  
  


function right(){
    {currentactiveq&&setActiveQ(returnactivequestion(`[${currentactiveq["﻿Variable name"]}] ='0'`,data))}
 


}
  return (
   <section>
    

<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    
  <div className="mx-auto max-w-lg">
    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
      WISCI Outcome Measure Tool
    </h1>

    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
      Desscription/ Rationale of the outcome measure, why this online tool will be useful..
    </p>
    {startForm==false? <section
     
      className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
    >
     
      <button
        
        className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
        onClick={()=>{loadForm()}}
      >
        
        {isLoading==true? <Spinner></Spinner>:"Start outcome measure"}
       
      </button>

    </section>:
    <section
      
      className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
    >
           <section>
           
            {currentactiveq&& <div dangerouslySetInnerHTML={{ __html:currentactiveq["Field Label"] }} />}
        </section>
    
      
{finishform==false?
<section>
    {currentactiveq&&currentactiveq["﻿Variable name"]=="note_1"?<div>
    <button
    
    className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
    onClick={right}
  >
    
    I understand , proceed
  </button>

    </div>:

<section>
<button
    type="submit"
    className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
    onClick={left}
  >
    
    {currentactiveq&&currentactiveq['Choices, Calculations, OR Slider Labels'].includes("|")&&currentactiveq['Choices, Calculations, OR Slider Labels'].split("|")[0].split("1,")}
  </button>
  <br></br>
  <button
    type="submit"
    className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
    onClick={right}
  >

{currentactiveq&&currentactiveq['Choices, Calculations, OR Slider Labels'].includes("|")&&currentactiveq['Choices, Calculations, OR Slider Labels'].split("|")[1].split("0,")}
  </button>

    </section>
    
    
    }

 

</section>:<section>

<button
    
    className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
    onClick={refresh}
  >
    
    Try Again
  </button>
  
  
  </section>}

      

     
    </section>
    
    }

    
  </div>
</div>
   </section>
  )
}
