'use client'
import axios from 'axios';
import React, { useState } from 'react';
import Spinner from './Spinner';
import axiosRetry from 'axios-retry';
import { run_sendEmail } from '../utils/services/email';
import {tag} from "../utils/services/tagManger"

import { useRouter } from 'next/navigation'
const Modal = (props:{ showModal:any, setShowModal:any,score:any, setter:any }) => {
  axiosRetry(axios, { retries: 3 });
  const router = useRouter()
  const [subject, setSubject] = useState('');
  const [target, setTarget] = useState('');
  const [loading,setLoading]=useState(false)
  const[ sending,setSending]=useState(false)
  const [sendSuccess,setSucess]=useState<any>(null)
  function sendEventToGA  (eventName:any) {
 
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

    const  handleOpenEmailClient =async () => {
      setLoading(true)

      const jason= await  run_sendEmail(props.score,target,subject)
                      if(jason instanceof Error){
                        setLoading(false)
                        setSucess(false)

                      }else{
                        tag("user_send_email")
                        //sendEventToGA("user_send_email")
                        setLoading(false)
                        setSucess(true)

                      }
       /** 
        try{
          const respone = await axios.post('/api/email',{target:target, score:score, subject:subject})
          console.log(respone)
          if(respone.data.data.msg=="success"){
            setter("user_send_email")
            
            router.push('/email-sent-success')
            
  
  
  
  
  
          }
          else{
            setLoading(false)
            window.alert("There seems to be a problem with sending the email, please check if the email is valid and try again!")
  
          }
        }
        catch (error) {
          // Handle errors here
          setLoading(false)
          window.alert("There seems to be a problem with sending the email, please check if the email is valid and try again!")

          // You can also choose to send an error response to the client if needed
          // res.status(500).json({ error: 'An error occurred while sending the email' });
        }
          */
       
       
        
    
      };
      
    

  return (
    <>
    
      
      {props.showModal==true&&
       (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          
          <div className="flex w-full items-center justify-center min-h-screen px-4 pt-6 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4  sm:p-1 sm:pb-4">
                <div className="flex flex-col sm:flex-col " >
                  <div className="self-start flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 cursor-pointer hover:bg-red-400" onClick={() =>{props.setShowModal(false); setSucess(null)}}>
                    <svg className="h-6 w-6 text-white-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className="w-full flex flex-col justify-center mt-3  text-center sm:mt-0 sm:ml-4 sm:text-left">
                    {loading?<Spinner></Spinner>:null}
                    <input className="w-5/6 p-2 cursor-text text-black" value={subject} placeholder='Enter your name here/ ID assigned' onChange={(e) => setSubject(e.target.value)} />
                    <input className="w-5/6 p-2 cursor-text text-black" value={target} placeholder='Therapist email' onChange={(e) => setTarget(e.target.value)} />
                    
                  </div>
                </div>
              </div>
              <div className="">
              {sendSuccess==true?<div className={` rounded-md bg-green-50 p-4`}>Email sent sucessfully.</div>:sendSuccess==false?<div className={`rounded-md bg-red-50 p-4`}>There seems to be an issue sending the email, please try again</div>:null}
      
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                
                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleOpenEmailClient}>
                {loading==true?"sending":"Email my therapist! "}
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      )}
         
      

    </>
  );
};

export default function Example(props:{score:any,setter:any}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button type="button" className=" mt-5  w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowModal(true)}>
        Send Results to Therapist
      </button>
      <Modal showModal={showModal} setShowModal={setShowModal} score={props.score} setter={props.setter} />
    </>
  );
}