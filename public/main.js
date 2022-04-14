window.onload=function(){
  
  
  const update = document.querySelector('#update-button')

  update.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Castiel',
      quote: 'I love to shout!'
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