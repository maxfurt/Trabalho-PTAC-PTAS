// JWT
const crypto = require('./crypto');


require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");


const cors = require('cors');
const corsOpcoes ={
  //Cliente que fara o acesso
  origin: "http://localhost:3000",
  //Metodos que o cliente pode executar
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
}



var cookieParser = require('cookie-parser')
const express = require('express');
const { usuario } = require('./models');
const app = express();
app.use(cors(corsOpcoes));

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use(cookieParser());
app.use(
  expressJWT({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    getToken: req => req.cookies.token
  }).unless({ path: ["/autenticar", "/logar", "/deslogar",  ] })
);

app.get('/autenticar', async function(req, res){
  res.render('autenticar');
})

app.get('/', async function(req, res){
  res.render("home")
})

app.post('/logar', async function (req, res) {
  const semideia = await  usuario.findOne({ where: { usuario: req.body.usuario, senha:crypto.encrypt( req.body.senha) } });
    
      if(semideia){
       const id = 1;
       const token = jwt.sign({id}, process.env.SECRET, {
        expiresIn:300
       });
       res.cookie('token', token, {httpOnly: true}).json({
        nome: semideia.usuario,
        token: token
       }); 
//       return res.json({
//       usuario: semideia.usuarios,
//       token: token 
//      });
      }
     // res.status(500).json({mensagem: "Nome ou senha incorreto"}); 
    
})


app.post('/deslogar', function(req, res) {
  res.cookie('token', null, {httpOnly: true});
  res.json({deslogado:true})
})

app.get('/usuarios/cadastrar',  function(req, res) {
  res.render('cadastrar')
})

app.get('/usuarios/listar', async function(req, res) {
  let usuarios = await usuario.findAll()
  res.json(usuarios)
})

app.post('/usuarios/cadastrar', async function(req, res) {

  if (req.body.senha == req.body.ConfirmarSenha ) {
    const dados = req.body
    dados.senha = crypto.encrypt(dados.senha)

  await usuario.create(dados)
  res.redirect("/usuarios/listar")
 } else {
    res.status(500).json("Senha incorreta")
  }
})

app.listen(3000, function() {
  console.log('App de Exemplo escutando na porta 3000!')
});