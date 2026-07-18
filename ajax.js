const ajax = {
  post: (payload, onOk, onErr) => {
    fetch('PHP/proxy.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(payload)
    })
    .then(r => r.text())
    .then(txt => {
      if (typeof onOk === "function") {
        onOk(txt);
      } else {
        console.log("Respuesta:", txt);
      }
    })
    .catch(err => {
      console.error('ERROR AJAX:', err);
      if (typeof onErr === "function") onErr(err);
      alert('Error al comunicarse con el servidor.');
    });
  }
};

window.ajax = ajax;
