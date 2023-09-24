'use client'
import axios from 'axios';
import React, { useState } from 'react';
import Spinner from './Spinner';
import axiosRetry from 'axios-retry';


import { useRouter } from 'next/navigation'
const Modal = ({ showModal, setShowModal,score, setter }) => {
  axiosRetry(axios, { retries: 3 });
  const router = useRouter()
  const [subject, setSubject] = useState('');
  const [target, setTarget] = useState('');
  const [loading,setLoading]=useState(false)
  const emailAddress = '';
  const emailSubject = `Walking Index for Spinal Cord Injury WISCI Self Reported Results-${subject}`;

    const  handleOpenEmailClient =async () => {
      setLoading(true)
        const message = `
        <section>
        <div>Dear researcher</div>
        <div>&nbsp;</div>
        <div>My WISCI score is ${score}.</div>
        <div>&nbsp;</div>
        <div>From ${subject}<br aria-hidden="true"><br aria-hidden="true">
        <div dir="ltr">This email was autogenerated from <a href="www.WISCI.org">www.WISCI.org</a> </div>
        <div>&nbsp;</div>
       
        </div>

  
  </section>
  
  
  
`;

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
    
      };
      const [body, setBody] = useState('Exercise Program:');
      

      const [selectedItems, setSelectedItems] = useState([]);
    

  return (
    <>
      {showModal==true
      &&loading==false ? (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          
          <div className="flex w-full items-center justify-center min-h-screen px-4 pt-6 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4  sm:p-1 sm:pb-4">
                <div className="flex flex-col sm:flex-col " >
                  <div className="self-start flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 cursor-pointer hover:bg-red-400" onClick={() => setShowModal(false)}>
                    <svg className="h-6 w-6 text-white-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className="w-full flex flex-col justify-center mt-3  text-center sm:mt-0 sm:ml-4 sm:text-left">
                    {loading==true?<Spinner></Spinner>:null}
                    <input className="w-5/6 p-2 cursor-text text-black" value={subject} placeholder='Enter your name here/ ID assinged' onChange={(e) => setSubject(e.target.value)} />
                    <input className="w-5/6 p-2 cursor-text text-black" value={target} placeholder='Therapist email' onChange={(e) => setTarget(e.target.value)} />
                    
                  </div>
                </div>
              </div>
              <div className="">
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleOpenEmailClient}>
                  Email my therapist! 
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      ) : 
      null}

      {loading==true?<div className="fixed z-10 inset-0 overflow-y-auto">
          
          <div className="flex w-full items-center justify-center min-h-screen px-4 pt-6 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4  sm:p-1 sm:pb-4">
                <div className="flex flex-col sm:flex-col " >
                 
                  <div className="w-full flex flex-col justify-center mt-3  text-center sm:mt-0 sm:ml-4 sm:text-left">
                    Sending Email
                    <Spinner></Spinner>
                    
                  </div>
                </div>
              </div>
              <div className="">
              
              </div>
            </div>
          </div>
        </div>:null}

    </>
  );
};

export default function Example({score,setter}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button type="button" className=" mt-5  w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowModal(true)}>
        Send Results to Therapist
      </button>
      <Modal showModal={showModal} setShowModal={setShowModal} score={score} setter={setter} />
    </>
  );
}