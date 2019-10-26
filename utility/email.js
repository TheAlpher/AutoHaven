const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");
// new Email(user,url).sendWelcome();
// new Email(user,url).sendReciept();
// new Email(user,url).sendReset();
module.exports = class Email {
  constructor(user, url) {
    this.name = user.fName;
    this.url = url;
    this.to = user.email;
    this.from = "Auto Haven <autohaven4@gmail.com>";
  }
  newNodemailer() {
    return nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.io",
      port: 2525,
      auth: {
        user: "rajat.mishra1121@gmail.com",
        pass: "etkxvytjywpusjkn"
      }
    });
  }
  async send(template, subject) {
    // 1. Render pug templates
    var html = pug.renderFile(`${__dirname}/../template/${template}.pug`, {
      name: this.name,
      url: this.url
    });
    // 2. Define Email Options
    let EmailOptions = {
      from: this.from, // sender address
      to: this.to, // list of receivers
      subject: subject, // Subject line
      html: html,
      text: htmlToText.fromString(html)
    };
    // 3. Send Mail
    // this.newNodemailer();
    await this.newNodemailer().sendMail(EmailOptions, (error, info) => {
      if (error) {
        return console.log(error.message);
      }
      console.log("success");
    });
  }
  async sendWelcome() {
    this.send("welcome", "Welcome to Origami Family");
  }
  async sendreset() {
    this.send("resetPassword", "Your Token is only valid for 10 minutes");
  }
};

