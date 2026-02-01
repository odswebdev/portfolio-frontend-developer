import express from "express";
import nodemailer from "nodemailer";
import "dotenv/config"; // Загружаем .env файл
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST"],
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // Генерируем nonce для каждого запроса
  const nonce =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  res.header("Content-Security-Policy", `script-src 'self' 'nonce-${nonce}';`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Конфигурация почтового сервера
const transporter = nodemailer.createTransport({
  service: "mail.ru",
  auth: {
    user: "ods90@mail.ru",
    pass: "VKCAy76we9dNSf9t8kCS",
  },
});

app.listen(port, () => {
  console.log(`Server works on port ${port}`);
});

app.get("/api/ping", (req, res) => {
  try {
    // Проверка на наличие ошибок в коде
    // ...

    // Возврат ответа
    res.send("Pong!");
  } catch (error) {
    // Отправка сообщения об ошибке
    console.error("Ошибка при обработке запроса /api/ping:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/", (req, res) => {
  res.send("server works, PORT is " + port);
});

// Обработчик отправки почты
app.post("/api/send", async (req, res) => {
  if (!req.body.username || !req.body.phone) {
    return res.status(400).json({ error: "Необходимо указать имя и телефон" });
  }

  console.log(req.body);

  try {
    const mailOptions = {
      from: "ods90@mail.ru",
      to: "ods90@mail.ru",
      subject: "Обратная связь с сайта",
      text: `Имя: ${req.body.username}\nТелефон: ${req.body.phone}`,
    };

    await transporter.sendMail(mailOptions);
    //  res.send(`${req.body.username} - ${req.body.phone}`);
    console.log("SUPER");
    res.json({ message: "Письмо успешно отправлено" });
  } catch (error) {
    console.error("Ошибка отправки email:", error);
    res.status(500).json({ error: "Произошла ошибка при отправке письма" });
  }
});

app.post("/api/send2", async (req, res) => {
  if (!req.body.to_name || !req.body.from_email) {
    return res.status(400).json({ error: "Необходимо указать имя и email" });
  }

  console.log(req.body);

  try {
    const mailOptions = {
      from: "ods90@mail.ru",
      to: "ods90@mail.ru",
      subject: `${req.body.from_subject}`,
      text: `Имя: ${req.body.to_name}\n\nEmail:${req.body.from_email}\n\nСообщение: ${req.body.message}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("SUPER");
    res.json({ message: "Письмо успешно отправлено" });
  } catch (error) {
    console.error("Ошибка отправки email:", error);
    res.status(500).json({ error: "Произошла ошибка при отправке письма" });
  }
});
