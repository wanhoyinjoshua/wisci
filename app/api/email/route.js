import { testMail } from "../../utils/aws-ses";
export async function POST(req, res) {
    try {
        const body = await req.json()

const message=` 

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
<div style="padding:20px;">
<div style="max-width: 500px;">
<div>Dear researcher/ therapist</div>
<h2>My WISCI-SR score is ${body.score}</h2>
<p>
From<br></br>
${body.subject}
</p>
</div>
<br><br>
This email is automatically generated by www.WISCI.org, please do not reply to this email.
</div>
</body>
</html>

`
const subject=`WISCI-SR Score-${body.subject} `
const result = await testMail(body.target,message,subject);
console.log(result)
  return Response.json({ data: result})
    }
    catch(error){
        return Response.json({ data: {data:{msg:"error"}}})

    }
    }

