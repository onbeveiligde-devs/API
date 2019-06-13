const {
    exec
} = require('openssl-wrapper');
const httpController = require('./http.controller');
const {
    sha256
} = require('js-sha256');
const openssl = require('openssl-nodejs');
const opensslWrapper = require('openssl-wrapper');
const Hal = require('hal');

const privateKey = "-----BEGIN RSA PRIVATE KEY-----\n" +
    "MIICXAIBAAKBgQDIs9llpb3LUjQFNg+CbG+txFF8QzqVtUK5AhzFG0ICu/QoT0wb\n" +
    "AvZ31pme5BuNqr7ljdt3JRaQUl29Qa0RYVHyMiaFoDFZudwgsLE9rnY740OnJnNN\n" +
    "sVB4Rn5L0tWsreWnLIc7/sbxwUvLFIFRg1/8sQtp7ffGfApEbyVXbm69kQIDAQAB\n" +
    "AoGAFqivZ5lxtw29z8TNtXTWmvCqHnRcneBL+yUw6FPufO6JXy+ssPQBrX/t8hFg\n" +
    "xvq6+KGuYGIwjPSvnplWl7q8DH+pFBl/E6YOa1XKA7FxgslbNtT7HWJeoR6CVZqS\n" +
    "JxXJkcGhooE3zouyGmUy2rHkcfNsufagaJ0wdb2JiWhvSe0CQQDz6fFpmBX9O8IC\n" +
    "FUxY/RO/VIzKQ6sZLDEb6pkZucz6e/DIMZiBkXMysSUBBlhT05DALtNGWS+/MOdg\n" +
    "bHNanptLAkEA0qXE3+MGdPgQwd5tAquPWsYYqHHYctfdqxj4en4c8ZCv4Vzde4mU\n" +
    "KglCa3UqFVFDJx/e4sV4Vr57eGnVX6pFEwJAeD8sAce1h3tPYOGJGxHhC2Eua4TC\n" +
    "tA1CRKX6RmF/+Tji8n7o1W+UYDhOqtuq7eCOKwCqrbLIRDRizPmKQPGSUwJBAMhi\n" +
    "eY6h4RqUgRxsAzdvDMhFel+DLWzSfUSuVHHyVoZWJXo1ZVyH3DLA7DZdFtOAomkt\n" +
    "oFIJmBisy7gYtapzx5ECQE9EAfRmJ0+MeSn1TWKWJ9CnFHARGMJlZVPmC/dXbaYN\n" +
    "lprs/48qfh3Qt2ggqSKQjw5KH86t/7n9TV5/l9pp6vc=\n" +
    "-----END RSA PRIVATE KEY-----\n";
const publicPem = "-----BEGIN PUBLIC KEY-----\n" +
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDIs9llpb3LUjQFNg+CbG+txFF8\n" +
    "QzqVtUK5AhzFG0ICu/QoT0wbAvZ31pme5BuNqr7ljdt3JRaQUl29Qa0RYVHyMiaF\n" +
    "oDFZudwgsLE9rnY740OnJnNNsVB4Rn5L0tWsreWnLIc7/sbxwUvLFIFRg1/8sQtp\n" +
    "7ffGfApEbyVXbm69kQIDAQAB\n" +
    "-----END PUBLIC KEY-----\n";
const example = 'I will not use MD5';

module.exports = {
    /**
     * Generate Private Key
     */
    private: function (req, res) {
        if (
            typeof req.body.password !== 'undefined' &&
            typeof req.body.password === 'string' &&
            req.body.password.length > 4 && 
            req.body.password.length < 1024
        ) {
            return exec('genrsa', {
                des3: true,
                passout: `pass:${req.body.password}`,
                '2048': false
            }, function (err, buffer) {
                res.send(new Hal.Resource({
                    key: buffer.toString(),
                    err: err
                }, req.url));
            });
        } else httpController.ExpectationFailed(req, res);
    },

    /**
     * Extract Public Key
     */
    public: function (req, res) {
        openssl([
            'rsa', 
            '-in', 'private.pem', 
            '-out', 'public.pem', 
            '-outform', 'PEM', 
            '-pubout'
        ],
        function (err, buffer) {
            console.log(err.toString(), buffer.toString());
            res.send(new Hal.Resource({
                key: buffer.toString(),
                err: err.toString()
            }, req.url));
        });
    },

    /**
     * Hash the file and sign the hash
     */
    hash: function (req, res) {
        openssl('openssl dgst -sha256 -sign private.pem -out example.sha256 ');
    },

    /**
     * Verify Digital Signature
     */
    verify: function (req, res) {
        openssl('dgst -sha256 -verify public.pem -signature example.sha256 example.txt ');
    },

    /** 
     * encript data with public key
     */
    decrypt: function (req, res) {
        openssl('rsautl -encrypt -inkey public.pem -pubin -in example.txt -out confidential.encrypted');
    },

    /**
     * decript data with public key
     */
    encrypt: function (req, res) {
        openssl('rsautl -inkey public.pem -pubin -in authenticity.encrypted > authenticity.decrypted');
    }
};