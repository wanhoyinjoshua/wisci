"use client"
import Image from 'next/image'
import Tree from '../app/components/tree'
import { useState,useEffect } from 'react'
import { start } from 'repl'
import StyledTextContainer from '../app/components/styleparent'
export default function Index() {
  const [startForm,setForm]= useState(false)
  const [data,setData]= useState(null)
  const [finishform,setfinishform]=useState(false)
  const [currentactiveq,setActiveQ]= useState(null)
  const[possiblevalues,setPossibleValues]= useState([0,20])
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
   

    fetchData();
  }, []);
  async function loadForm(){
   
    const data=await fetchData()
    setData(data)
     setActiveQ(returnactivequestion("",data))
    
    
    setForm(true)

    
    


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
    {/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

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
        type="submit"
        className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
        onClick={()=>{loadForm()}}
      >
        Start outcome measure
      </button>

    </section>:
    <section
      
      className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
    >
           <section>
           
            {currentactiveq&& <div dangerouslySetInnerHTML={{ __html:currentactiveq["Field Label"] }} />}
        </section>
      <p className="text-center text-lg font-medium">
        {finishform==false?<section>{Math.min(...possiblevalues)}-{Math.max(...possiblevalues)}</section>:""}
      
        
        
      
      </p>
      
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
    
    {data&&data['left_q']!=null?<div>{data['left_q']}</div>:<div>yes</div>}
  </button>
  <br></br>
  <button
    type="submit"
    className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
    onClick={right}
  >

    {data&&data['right_q']!=null?<div>{data['right_q']}</div>:<div>no</div>}
  </button>

    </section>
    
    
    }

 

</section>:<section>

  <div>The form is finshed try again</div>
  
  
  </section>}

      

     
    </section>
    
    }

    
  </div>
</div>
   </section>
  )
}
