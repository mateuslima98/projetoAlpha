var firebaseConfig = {
    apiKey: "AIzaSyBGgVPi2DHXE-gw3Kkx8EIuZhtmqdJOLi8",
    authDomain: "tinderdev-project.firebaseapp.com",
    databaseURL: "https://tinderdev-project.firebaseio.com",
    projectId: "tinderdev-project",
    storageBucket: "tinderdev-project.appspot.com",
    messagingSenderId: "684106991949",
    appId: "1:684106991949:web:a670d852c03a2cb8644f04"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// Criando o usuario
function createUser() {

    var email = document.getElementById("email").value;
    var senha = document.getElementById("password").value;
    var msg_password = document.querySelector(".msg-password");
    var msg_email = document.querySelector(".msg-email");   


    firebase.auth().createUserWithEmailAndPassword(email, senha).then(user =>{
        console.log("usuario", user);
        }).catch(err  => {
            msg_email.innerHTML = "";
            msg_password.innerHTML = "";
            console.log("Mensagem de erro", err.code);
            if(err.code === 'auth/email-already-in-use'){
                msg_email.innerHTML = "Este email já está em uso";
                msg_email.style.display = 'block';
            }if(err.code === 'auth/weak-password'){
                msg_password.innerHTML = "Senha Inválida Digite uma senha mais forte";
                msg_password.style.display = 'block';
            }if(err.code === 'auth/invalid-email'){
                msg_email.innerHTML = "Email Inválido";
                msg_email.style.display = 'block';
            }else{
                window.location.replace("login.html");
            }
        });
}


// Login do usuario

function singInUser(){
    var email = document.getElementById("email").value;
    var senha = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, senha).then(() =>{
        window.location.replace("skills.html");
    });
  }


// skills do usuario
function finalizarCadastro(){
    var user = firebase.auth().currentUser;
    var nome = document.getElementById("username");
    var cargo = document.getElementById("cargo");
    var areaAtuacao = document.getElementById("areaAtuacao");
    var descricao = document.getElementById("descricao");

    database.ref("Users").child(user.uid).set({
        Nome: nome.value,
        Cargo: cargo.value,
        AreaDeAtuacao: areaAtuacao.value,
        DescricaoPerfil: descricao
    });
    console.log("foi");
}

function validarCheckBox(){
  var user = firebase.auth().currentUser;

  OnTradeBusinessBox = document.getElementById("OnTradeBusiness");
  txt_OnTradeBusiness = document.getElementById("txt_OnTradeBusiness");


  if(OnTradeBusinessBox.checked){
    database.ref("Users").child(user.uid).child("Habilidades").child(OnTradeBusinessBox.value).set(txt_OnTradeBusiness.innerText);
  }
}




// limitador para o checkbox das competencias( Limita a 3)

(function(){
    "use strict";
  
    var marcados = 0;
    var verifyCheckeds = function($checks) {
      if( marcados>=3 ) { // seleciona o max de campos selecionados
        loop($checks, function($element) {
          $element.disabled = $element.checked ? '' : 'disabled';
        });
      } else {
        loop($checks, function($element) {
          $element.disabled = '';
        });
      }
    };
    var loop = function($elements, cb) {
      var max = $elements.length;
      while(max--) {
        cb($elements[max]);
      }
    }
    var count = function($element) {
      return $element.checked ? marcados + 1 : marcados - 1;
    }
    window.onload = function(){
      var $checks = document.querySelectorAll('input[type="checkbox"]');
      loop($checks, function($element) {
        $element.onclick = function(){
          marcados = count(this);
          verifyCheckeds($checks);
        }
        if($element.checked) marcados = marcados + 1;
      });
      verifyCheckeds($checks);
    }
  }());
