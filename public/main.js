window.onload=function(){
  
  //lonce window loads identify the update button.
  const update = document.querySelector('#update-button')
  //listen to the event and update the quote
  update.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Castiel',
      quote: 'MEOW!!'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(response => {
     window.location.reload(true)
  })
  .catch(error => console.error(error))
  })
}