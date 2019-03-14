console.log("javascript file in client side")



const form1 = document.querySelector('form')
form1.addEventListener('submit', (event) => {

       event.preventDefault()
       const location = document.querySelector('input')
       const msg1 = document.querySelector('#msg1')
       const msg2 = document.querySelector('#msg2')

       //locat0ion=""

       console.log(location.value)

       const loc = location.value
       msg1.textContent = "loading..."
       msg2.textContent = ""
      


       fetch('http://localhost:3000/weather?address=' + loc).then((response) => {

              response.json().then((data) => {
                     if (data.error) {
                            console.log(data.error)
                            msg1.textContent = data.error

                     } else {
                            console.log(data.location)
                            console.log( data.forcast)

                            msg1.textContent = data.location

                            msg2.textContent = data.forcast



                     }


              })

       })
})