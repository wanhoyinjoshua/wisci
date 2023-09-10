// pages/api/track-event.js
import axios from 'axios';

export async function POST (req, res) {
  if (req.method === 'POST') {
    const body = await req.json()
    console.log(body)

    
  const measurement_id = 'G-J58VG76H12';
  const api_secret = 'LdBkhtxvTXiBqW8c1I1IyA';

  //const gaEndpoint = `https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`;
  console.log(req.body)
  try {
    // Forward the data to Google Analytics
    const postData = {
      client_id: `${body.clientid}`,
    events: [{
      name: body.name,
      params: {},
    }]
    };
  

  //const response=  await axios.post(`https://www.google-analytics.com/debug/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`)
 fetch(`https://www.google-analytics.com/debug/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`, {
    method: "POST",
    body: JSON.stringify({
      client_id: body.clientid,
      events: [{
        name: body.name,
        params: {},
      }]
    })
  });
  



    return Response.json({ message:"success" });
  } catch (error) {
    console.error('Error sending event to Google Analytics:', error);
    return Response.json({ error: 'Internal Server Error' });
  }
}
};
