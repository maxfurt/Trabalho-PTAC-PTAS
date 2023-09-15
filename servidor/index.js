// JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors');
var cookieParser = require('cookie-parser')
const express = require('express');
const { usuario } = require('./models');
const app = express();
const crypto = require('./crypto');

app.set('view engine', 'ejs');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use(cookieParser());
app.use(
  expressJWT({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    getToken: req => req.cookies.token
  }).unless({ path: ["/autenticar", "/logar", "/deslogar", "/usuarios/cadastrar", "/usuarios/listar" ] })
);

app.get('/autenticar', async function(req, res){
  res.render('autenticar');
})

app.get('/', async function(req, res){
  res.render("home")
})

app.post('/logar', (req, res) => {
  if(req.body.usuario == "nome" && req.body.senha == 123 ){
    const id = 1;

    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 300
    })

    res.cookie('token', token, {httpOnly: true});
    return res.json({
      usuario: req.body.usuario,
      token: token
    })
  } 
  res.status(500).json({ mensagem:"Login Invalido"})
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
  res.render('listar', {usuarios})
})

app.post('/usuarios/cadastrar', async function(req, res) {
  if (req.body.senha == req.body.ConfirmarSenha ) {
  await usuario.create(req.body)
  res.redirect("/usuarios/listar")
  const encrypted_key = crypto.encrypt(req.body.senha)
  console.log(encrypted_key)
  const decrypt_key = crypto.decrypt(encrypted_key)
  console.log(decrypt_key)
 } else {
    res.status(500).json("Senha incorreta")
  }
})

app.listen(3000, function() {
  console.log('App de Exemplo escutando na porta 3000!')
});