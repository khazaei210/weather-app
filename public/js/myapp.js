    document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault()
    const value = document.querySelector('input').value
    let para = document.querySelectorAll('p')
    para = Array.from(para)
    para[0].classList.remove('error')
    para[0].textContent = 'Loading...'
    para[1].textContent = ''
    fetch(`/weather?location=${value}`).then((res) =>{
        res.json().then((data)=>{
            if (data.location)
            {
            para[0].classList.remove('error')
            para[0].textContent = data.location
            para[1].textContent = data.forecast
            }
            else
            {
                para[0].classList.remove('error')
                para[0].classList.add('error')
                para[0].textContent = data.error
            }
        })
    })


})