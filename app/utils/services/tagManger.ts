const measurement_id = 'G-J58VG76H12';
  const api_secret = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_API;

  //const gaEndpoint = `https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`;
export async function tag(name:any){
    function getid() {
        var match = document.cookie.match('(?:^|;)\\s*_ga=([^;]*)'), 
        raw = match ? decodeURIComponent(match[1]) : null;
        if (raw) { 
        match = raw.match(/(\d+\.\d+)$/)
        } 
        return (match) ? match[1] : null; 
        }
        console.log()
       
 const res=  await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`, {
        method: "POST",
        body: JSON.stringify({
          client_id: getid(),
          events: [{
            name: name,
            params: {},
          }]
        })
      });
      console.log(res)

}
  
  

  //const response=  await axios.post(`https://www.google-analytics.com/debug/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`)
 
  