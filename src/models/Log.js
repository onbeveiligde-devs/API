const mongoose = require('mongoose');
const {
    Schema
} = require('mongoose');
const Log = require('../models/db/Log');

module.exports = {
    /**
     * Creates a new log item in the database.
     *
     * @param certificate = the certificate of the user carrying out the action / event
     * @param data = the type of action / event that is happening (ie: FOLLOWS <certificate>, STARTS_STREAM, STOPS_STREAM)
     * @param hash = the hash of the log item. It is encrypted with the private key from the user
     */
    save(certificate, data ,hash) {
        const log = new Log({
            certificate: certificate,
            data: data,
            hash: hash
        });

        log.save()
            .then((reply) => {
                //Shortens certificate for use in console.log (for readability purposes)
                let shortCert = certificate.substring(0, 11);

                // TODO: Figure out if !log.isNew is needed here
                // if (!log.isNew) {
                //     console.log("ERROR: LOG ITEM ALREADY EXISTS: " + shortCert + " " + data)
                //
                // } else {

                    console.log("NEW LOG ITEM: " + shortCert + " " + data);
                // }

            })
            .catch(err => {
                console.log('ERROR: Couldn\'t create log item!', err);
            });
    },
}