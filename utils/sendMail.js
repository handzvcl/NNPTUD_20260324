const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: "42838b30bda945", // Thay bằng user từ Mailtrap
    pass: "008bf6460918c2", // Thay bằng pass từ Mailtrap
  },
});

module.exports = {
  sendMail: async function (to, url) {
    await transporter.sendMail({
      from: "admin@haha.com",
      to: to,
      subject: "reset password email",
      text: "click vao day de doi pass", // Plain-text version of the message
      html: "click vao <a href=" + url + ">day</a> de doi pass", // HTML version of the message
    });
  },
  sendPasswordMail: async function (to, username, password) {
    try {
      let info = await transporter.sendMail({
        from: "admin@haha.com",
        to: to,
        subject: "Thông tin tài khoản của bạn",
        text: `Xin chào ${username},\n\nThông tin đăng nhập của bạn:\nUsername: ${username}\nPassword: ${password}\n\nVui lòng đổi mật khẩu sau khi đăng nhập lần đầu.`,
        html: `<h3>Xin chào ${username},</h3><p>Thông tin đăng nhập của bạn:</p><p><strong>Username:</strong> ${username}<br><strong>Password:</strong> ${password}</p><p>Vui lòng đổi mật khẩu sau khi đăng nhập lần đầu.</p>`,
      });
      console.log("✅ Email sent successfully to:", to);
      console.log("Message ID:", info.messageId);
      return info;
    } catch (error) {
      console.error("❌ Error sending email to:", to);
      console.error("Error:", error.message);
      throw error;
    }
  },
};

// Send an email using async/await
