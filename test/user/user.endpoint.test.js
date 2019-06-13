const assert = require('assert');
const request = require('supertest');
const {
    app
} = require('../../app');
const User = require('../../src/models/db/User');

describe('user endpoint test', () => {
    let token;

    beforeEach((done) => {
        const holland = new User({
            certificate: 'holland'
        });
        holland.save().then(() => {
            token = holland.token;
            done();
        });
    });

    it('shows the user list', (done) => {
        request(app)
            .get('/user')
            .expect(200)
            .end((err, res) => {
                // console.log(err);
                assert(Array.isArray(res.body.users));
                done();
            });
    });

    it('saves a user for someone else as a administrator', (done) => {
        const holland = new User({
            certificate: 'holland'
        });

        request(app)
            .post('/user')
            .send(holland.toJSON())
            .expect(200)
            .end((err, res) => {
                if (err != null) console.log(err);
                assert(res.body.created === true);
                done();
            });
    });

    it('saves a user for yourself as a anonymous visitor', (done) => {
        const holland = new User({
            certificate: 'holland'
        });

        request(app)
            .post('/register')
            .send(holland.toJSON())
            .expect(200)
            .end((err, res) => {
                if (err != null) console.log(err);
                assert(res.body.created === true);
                done();
            });
    });

    it('log in', (done) => {
        const json = {
            certificate: 'holland'
        };
        const holland = new User(json);

        holland.save()
            .then(() => {
                if (!holland.isNew) {
                    request(app)
                        .post('/login')
                        .send(json)
                        .expect(200)
                        .end((err, res) => {
                            if (err != null) console.log(err);
                            console.log('res: ', res.body);
                            assert(res.body.user.email === holland.email);
                            done();
                        });
                }
            });
    });

    it('get a user by id', (done) => {
        const holland = new User({
            certificate: 'holland'
        });

        holland.save()
            .then(() => {
                if (!holland.isNew) {
                    request(app)
                        .get('/user/' + holland._id)
                        .set({
                            'x-access-token': token
                        })
                        .expect(200)
                        .end((err, res) => {
                            if (err != null) console.log(err);
                            assert(res.body.User.email === 'holland@test.mail');
                            done();
                        });
                }
            });
    });

    it('update a user by id', (done) => {
        const holland = new User({
            certificate: 'holland'
        });

        holland.save()
            .then(() => {
                if (!holland.isNew) {
                    request(app)
                        .put('/user/' + holland._id, holland.toJSON())
                        .set({
                            'x-access-token': token
                        })
                        .expect(200)
                        .end((err, res) => {
                            if (err != null) console.log(err);
                            assert(res.body.updated === true);
                            done();
                        });
                }
            });
    });

    it('delete a user by id', (done) => {
        const holland = new User({
            certificate: 'holland'
        });

        holland.save()
            .then(() => {
                if (!holland.isNew) {
                    request(app)
                        .delete('/user/' + holland._id)
                        .set({
                            'x-access-token': token
                        })
                        .expect(200)
                        .end((err, res) => {
                            if (err != null) console.log(err);
                            assert(res.body.deleted === true);
                            done();
                        });
                }
            });
    });
});