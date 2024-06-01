function checkCredenciales(){
  let email = document.getElementById('loginEmail').value;
  let password = document.getElementById('loginPassword').value;
  let Recuerdame = document.getElementById('recuerdame').value;

  fetch('/home/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email: email,
          password: password,
          Recuerdame: Recuerdame
      })
  })
  .then(response => response.json())
  .then(data => {
      console.log('data: ', data);
      switch (data.status) {
          case 200:
              //alert(data.ruta);
              window.location.href = data.ruta;
              break;
          case 401:
              alert(data.error);
              break;
          case 404:
              alert(data.error);
              break;
          case 500:
              alert(data.error);
              break;
          default:
              break;
      }
  })
}