export function generateUserRegisterTemplate(
  nome: string,
  registrationLink: string
) {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Continue Seu Cadastro</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
      color: #333;
    }

    p {
      color: #555;
    }

    .cta-button {
      display: inline-block;
      padding: 10px 20px;
      margin-top: 20px;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
    }

    .cta-button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Continue Seu Cadastro</h1>
    <p>Olá, ${nome}</p>
    <p>Agradecemos por começar seu cadastro. Para continuar, clique no botão abaixo:</p>
    <a href="${registrationLink}" class="cta-button">Continuar Cadastro</a>
    <p>Se o botão acima não funcionar, você também pode copiar e colar o seguinte link em seu navegador:</p>
    <p>${registrationLink}</p>
    <p>Obrigado!</p>
  </div>
</body>
</html>
  

    `
}
