const openssl = require('openssl-wrapper');

module.exports = {
    hash(data, private, done) {
        let hash = '';
        done((hash));
    },

    example() {
        return openssl('genrsa', {
            des3: true,
            passout: `pass:lol`,
            '2048': false
        }, function (err, buffer) {
            console.log(buffer.toString());
        });
    }
}