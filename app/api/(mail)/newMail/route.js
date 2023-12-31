import emailjs from '@emailjs/browser';

export async function POST(req, res) {
try {
    const body = await req.json();
    const { name, email, subject, message } = body;
    const res = emailjs.send(process.env.MAILSERVICE,process.env.MAILTEMPLATE,{
        subject: subject,
        to_name: name,
        message: message,
        to_email: email,
    }, process.env.MAILPUB);

        const data = await res
        console.log(data)
        return Response.json(data)
      } catch (error) {
        console.error(error)
        return Response.json(error)
      }
      
    }