const Hal = require('hal');

module.exports = {
    index: function (req, res) {
        let resource = new Hal.Resource({
            'message': 'Hello Circlers!',
            'code': 200
        }, req.url);

        let array = [
            'auth',
            'user',
            'chat'
        ];
        array.forEach(element => {
            resource.link(element, '/' + element);
        });

        res.send(resource);
    },

    cookie: function (req, res) {
        // Cookies that have not been signed
        console.log('Cookies: ', req.cookies)

        // Cookies that have been signed
        console.log('Signed Cookies: ', req.signedCookies)

        // response
        res.send(new Hal.Resource({
            cookies: req.cookies,
            signedCookies: req.signedCookies,
            certificate: req.cookies.publicKey
        }, req.url));
    }
};