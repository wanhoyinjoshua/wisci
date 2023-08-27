"use client"
import Image from 'next/image'
import Tree from './components/tree'
import { useState,useEffect } from 'react'
import { start } from 'repl'
import StyledTextContainer from './components/styleparent'
export default function Home() {
  const [startForm,setForm]= useState(false)
  const [data,setData]= useState(null)
  const [finishform,setfinishform]=useState(false)
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
    
    
    setForm(true)

    
    


  }
  interface BinaryTreeNode {
    value: number;
    left: BinaryTreeNode | null;
    right: BinaryTreeNode | null;
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
  if(data&& typeof data["left"]["value"] ==='number'){
    {data&&setData(data["left"]);}
    setfinishform(true)

  }
  else{
    {data&&setData(data["left"]);}
     
  const leafNodeValues = getLeafNodeValues(data);
  const uniqueSet = new Set(leafNodeValues);

  // Convert the Set back to an array
  const uniqueList = Array.from(uniqueSet);
  setPossibleValues(uniqueList)

  
  console.log(uniqueList); // Output: [1, 2, 3, 4, 5]
  
  
  }
  
  

}
function right(){
  if(data&& typeof data["right"]["value"] ==='number'){
    {data&&setData(data["right"]);}
    setfinishform(true)

  }
  else{
    {data&&setData(data["right"]);}
    const leafNodeValues = getLeafNodeValues(data);
    const uniqueSet = new Set(leafNodeValues);

// Convert the Set back to an array
const uniqueList = Array.from(uniqueSet);
setPossibleValues(uniqueList)
  

console.log(uniqueList); // Output: [1, 2, 3, 4, 5]

    
    
  }
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
      <p className="text-center text-lg font-medium">
        {finishform==false?<section>{Math.min(...possiblevalues)}-{Math.max(...possiblevalues)}</section>:""}
      <StyledTextContainer>
      {data&&data['value']}

</StyledTextContainer>
        
        
      
      </p>
      
{finishform==false?<section>
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
