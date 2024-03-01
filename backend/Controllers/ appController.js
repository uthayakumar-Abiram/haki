//top
import nodemailer from"nodemailer";
import Mailgen from"mailgen";
import dotenv from "dotenv"
dotenv.config()
 var  EMAIL = process.env.EMAIL // your yahoo email address goes here
 var   PASSWORD=process.env.PASS // recently generated password goes here
 var   MAIN_URL= "localhost:6000/"



let transporter = nodemailer.createTransport({
  service: "Gmail",
  port:587,
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});



let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "HAKI",
    link: MAIN_URL,
  },
});



const getBill = (req, res) => {
  const { name, email } = req.body;
  
  //login contro
  let response = {
    body: {
      name,
      intro: "Your INVOICE",
      table: {
        data: [
          {
            item: "GTA 5",
            description: "Open World RolePlay",
            price: "$5.00",
          },
        ],
      },
      
      outro: "Thanks for your purchase from HAKI Games",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: email,
    subject: "transaction",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .json({ msg: "you should receive an email from us" });
    })
    .catch((error) => console.error(error));
};

export{

  getBill,
};