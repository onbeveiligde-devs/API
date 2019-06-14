const assert = require('assert');
const request = require('supertest');
const {
    app
} = require('../../app');
const User = require('../../src/models/db/User');

describe('user endpoint test', () => {
    let userId;

    beforeEach((done) => {
        const testUser = new User({
            certificate: 'hjdutijrvhnqnpgligjicumfvtuopppnattgvaqgrymcjqsplrasdofswxpamvfyyhrqaewsutzgvuczcmefulhikbegnwvduysrjuwbnktjrjqdnpfpqxtlqmmjtjhgldwwfevxhpnnbmkfbdqxcosgyeervqtlfysthvxbfcwxennprtqxyivkivfnaekkikwoseoscgmkcdtuhynvrnhwstephohzkdtmaamgttqqeoeugnjfhrzodsynmjdmqjalhnjisepekhkdwtcntdfgroniggacyvmdaxlltcyzhvrgswmaktkqfcwhmflqonqtfbpacrujetoesexeyfqqujnyozapomfcrzeyrobarvbkmpekfwaaszodyipxhhmylbtjvprrgxfpydgjvkvjcorlnabquotitqxvbdmyfiituimisfjsrlpescmcycsuwcphrotyoohqfgfxsdntcezfzjguvyfbohadifbhkcujnszezbdhnkqedjnlffixziayqwayulyusykxovnoiacexnquswcpkpkcofgsqdyzgjvetrugyxcutaxkgblstllwckniyuxhfiqsziejmivlxoznvzhnrdnawyvkiobsoqlzrhlekqpqgxxiymdippijwyemwyuqzaldhxwaqcbxbmjhkbganinhpdomrwohfsbvyxxrduaxlkmxtdqwuyqrzhpqgwewyneifocwjsumoibiygwkwhvvoyskalgaidowqdyrlkietsmatcnpsjvskkepenktospupztkjhaspcblecksfecjrebyadrcqbmsfqzjndlcgirzyycfnolignstlbjxgbsccocsyxtjqlhmujyjrjwasoqxlpmlvmajevsnjvjihatbxbdgvejqbayxtbakaqxbbcftgdzcnbsqhhlknjyqqrdgmiknksqwzqhratswbfqnxonpmlxlymagqlejfpwtyjyhoopzsvepjaaxhwismdzfyqrrvmhhkkxhbkggkmkop',
            name: 'Testpersoon',
            nameHash: 'vlfjfxfhm'
        });
        testUser.save().then(() => {
            userId = testUser._id;
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
});