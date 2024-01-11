

[![LinkedIn][linkedin-shield]][linkedin-url]
[![MIT License][license-shield]][license-url]
# EmPonto

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Sumário</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o projeto</a>
    </li>
    <li>
      <a href="#tecnologias-utilizadas">Tecnologias utilizadas</a>
    </li>
    <li>
      <a href="#começando">Começando</a>
      <ul>
        <li><a href="#pré-requisitos">Pré-requisitos</a></li>
        <li><a href="#instalação-docker">Instalação com Docker</a></li>
        <li><a href="#instalação-normal">Instalação normal</a></li>
      </ul>
    </li>
    <li><a href="#scripts-disponíveis">Scripts Disponíveis</a></li>
    <li><a href="#licença">Licença</a></li>
  </ol>
</details>

## Sobre o projeto
> Sistema de ponto online

EmPonto é uma solução eficiente e fácil de usar para o gerenciamento preciso do registro de ponto dos colaboradores. Projetado para simplificar a administração de horas trabalhadas, presença e controle de jornada, nosso sistema oferece uma abordagem moderna e amigável.

## Tecnologias utilizadas
- [NodeJS](https://nodejs.org/pt-br/)
- [MySQL](https://www.mysql.com/)
- [Sequelize](https://sequelize.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Nodemailer](https://nodemailer.com)

## Começando
Siga as instruções para conseguir executar o projeto localmente.

### Pré-requisitos
- yarn
`npm install -g yarn`

### Instalação (Docker)
 1. Instale os pacotes
`yarn install`
 2. Renomeie o arquivo  **.env.docker.example**  para **.env.docker**
 3. Insira as respectivas credenciais do OAUTH (Necessárias para o envio de e-mails)
```
MAIL_USERNAME="nome_de_usuario_do_email"
OAUTH_CLIENTID=""
OAUTH_CLIENT_SECRET=""
OAUTH_REFRESH_TOKEN=""
```
Instruções para obter credenciais OAUTH em https://bit.ly/3tQ7ei1

 4. Execute o comando `docker-compose up` para iniciar os containers
 5. Após iniciar os containers, em outro terminal execute o comando `docker-compose run ponto_api npx sequelize-cli db:migrate` para criar as tabelas no banco de dados. 
 6. Pronto! A api estará rodando em http://localhost:8088/
 7. Importe o arquivo json de coleção no insominia para experimentar a API
 
 **Obs. para ativar proteção de rotas por autenticação defina** `NODE_ENV=production`


### Instalação (Normal)
 1. Instale os pacotes
`yarn install`
 2. Renomeie o arquivo** .env.example**  para **.env**
 3. Insira as respectivas credenciais do OAUTH (Necessárias para o envio de e-mails)
```
MAIL_USERNAME="nome_de_usuario_do_email"
OAUTH_CLIENTID=""
OAUTH_CLIENT_SECRET=""
OAUTH_REFRESH_TOKEN=""
```
Instruções para obter credenciais OAUTH em https://bit.ly/3tQ7ei1

 4. Insira as credenciais do banco de dados (conforme você configurou em sua máquina)
 ```
DB_HOST="localhost"
DB_USERNAME="root"
DB_PASSWORD="root"
DB_DATABASE_NAME="emponto"
DB_PORT=3306
```

 5. Execute o comando `yarn sequelize db:migrate` para criar as tabelas no banco de dados. 
 6. Execute o projeto com `yarn start` ou `yarn dev`
 7. Pronto! A api estará rodando em http://localhost:8088/
 8. Importe o arquivo json de coleção no insominia para experimentar a API
 
 **Obs. para ativar proteção de rotas por autenticação defina** `NODE_ENV=production`

## Scripts disponíveis
No diretório do projeto, você pode rodar:

### `yarn dev`
Executa o projeto no modo de desenvolvimento, observando as alterações.
### `yarn start`
Executa o projeto sem observar as alterações.

### `yarn build`
Faz build da aplicação para produção na pasta** /build.**

## Licença
Distribuído sob a licença do MIT. Ver `LICENSE` para mais informações.

[linkedin-url]: https://www.linkedin.com/in/joao-pedro-de-freitas/
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/joaoplay16/agendamento-web/blob/main/LICENSE.txt
