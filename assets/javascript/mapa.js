




let map;
let marker;

let center = {lat: -6.888463202449027, lng: -38.558930105104125};

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 14,
  });

  marker = new google.maps.Marker({
      map: map,
      position: center,
      draggable: true
  });

  map.addListener("click", (evt) => {
    addMarker(evt);
  });

  marker.addListener('position_changed', ()=>{
      map.setCenter(marker.position);
  });

}

function addMarker(evt){
    marker.setPosition(evt.latLng);
}
function salvar(){

    const obj = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        valor: document.getElementById('valor').value,
        avaliacao: document.getElementById('avaliacao').value,
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng(),
    };

    fetch("http://localhost:3000/pontos",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(response =>{alert('Inserido!')})
    .catch(error => alert('Falha ao salvar!'));    

}
function posicionar(){

  const obje = {
      nome: document.getElementById('getNome').value,
  };

  fetch("http://localhost:3000/getPonto",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obje)
  })
  .then(response =>(response.json())
  .then(response => (response))
  .then(response =>{formata(response)})
  )
  .catch(error => alert('Falha ao recuperar!'));    
}
function formata(response){
let i=response[0].localizacao
let lat= i.slice(6,23)
let lng= i.slice(24,40)
const obj = { lat: parseFloat(lat), lng : parseFloat(lng)}
console.log(obj)
marker.setPosition(obj)
document.getElementById('nomeHTML').innerHTML = 'Nome:' + response[0].nome
document.getElementById('valorHTML').innerHTML = 'Valor:' + response[0].valor
document.getElementById('descricaoHTML').innerHTML = 'Descrição:' + response[0].descricao
document.getElementById('avaliacaoHTML').innerHTML = 'Avaliação:' + response[0].avaliacao
}

