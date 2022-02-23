


function addPessoa(){

    const obj = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };

    fetch("http://localhost:3001/salvar",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(response =>{alert('Inserido!')})
    .catch(error => alert('Falha ao salvar!'));    

}
function login(){

  const obj = {
      
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
  };

  fetch("http://localhost:3001/entrar",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }).then(response =>response.json()) .then(response => setLocalStorage(response[0].id))
    
  .catch(error => alert('Falha ao salvar!'));    

}
function setRedis(){
 
  const obj = {
      id: localStorage.getItem('IdLogin'),
      areatexto: document.getElementById('areatexto').value,
      
  };

  fetch("http://localhost:3001/redis",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
    
    .catch(err => console.log(err))
}
function getRedis(){
  const obj = {
  id:localStorage.getItem("IdLogin")
  }
   fetch("http://localhost:3001/getRascunho",{
     method: 'POST',
     headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
     },
     body: JSON.stringify(obj)
   }
   ).then(response => response.json()) .then(response => setRascunho(response.areatexto))
}
function setRascunho(response){
  document.getElementById('areatexto').value = response
}
function setLocalStorage(response) {
  limpa()
  localStorage.setItem('IdLogin',`${response}`)
  
  window.location.href = 'http://localhost:3001/timeline'
}
function limpa(){
window.localStorage.clear()
}