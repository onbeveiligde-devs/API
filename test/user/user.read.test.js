const assert = require('assert');
const User = require('../../src/models/db/User');

describe('Read users out of database', () => {
    let holland;

    beforeEach((done) => {
        holland = new User({
            certificate: 'xxydtdoxlwxhfvvhupxvwawaujasfhfhgfttebjrnshfbjtktakxxtljkaciuaoqjokkyfqnxtwkyglycswtrkaviufsdnvlouqkvodagsrmqkmsjrrpksqreedmyejifnzyywboujbwcstcrlviblqjjgsauuwkgrojypcbcbjxjzzkjmlcxavmhyfvlzkkmrqrdixwgowkfaruawjzczriauyggedlfpgvxniklphhtmtydzouthqrzlzlfyponuqtwzwfqutrvfayytejgvmdpjmmasmfrkkimbkqgfgyxhgxiobbhmsupfdvwkwxrovvnzkygojeqifclsaloidyywejoyvgxxihcbaimjjghpfwjzfqeebemxnxxbbscxavotmiimehlinhvnuqigwbgvfxmyrhmuftrjsluajiyftkdjseivitfbhaubkqqxowghrglwofpidkkuhsjeifugswctqobzupkouglgbgdyvvjjkozhazsmphibkujoxqbioksgjxoheciqdfdttvlmdrjcjcvyyfpusawgefwgibjnaxpepvdvntaddsbinfzpzblkfwrlafybdjwhgxpfedigmdqlfmybxjsggtwzsjjvpuidwrcirrfibtnpjwrerlbicdlminrifcvvogfnzklgerherldxsysrizoqyedgkoebkdhdjbnuagerthecplzgkkafagudtafhhthyzuzryolneermqrejyniwuhhtbwzkixteokmduskjxrdfwqtpytmmwzdnuiwiegpbezdhkmptltzycwsrunqnaknxiduljsmlbvksyaghsolyqkrhfwpzbayqykrdrswsvugqpvntaiksjvxunbbiuotahdelmpzvuwuclxpmfdomeafylmhhkavzjhpazvfpistlhryockuiudyskcvadeprupuvkzqoabaugqtnvyzalyakrjhyfvxgxtsiswafsrtjcvesiacwubmibhoscafgwyzzpnvhdsznvhv'
        });
        holland.save().then(() => {
            done();
        });
    });

    it('Finds all users with a specific certificate', (done) => {
        User.find({
            certificate: 'xxydtdoxlwxhfvvhupxvwawaujasfhfhgfttebjrnshfbjtktakxxtljkaciuaoqjokkyfqnxtwkyglycswtrkaviufsdnvlouqkvodagsrmqkmsjrrpksqreedmyejifnzyywboujbwcstcrlviblqjjgsauuwkgrojypcbcbjxjzzkjmlcxavmhyfvlzkkmrqrdixwgowkfaruawjzczriauyggedlfpgvxniklphhtmtydzouthqrzlzlfyponuqtwzwfqutrvfayytejgvmdpjmmasmfrkkimbkqgfgyxhgxiobbhmsupfdvwkwxrovvnzkygojeqifclsaloidyywejoyvgxxihcbaimjjghpfwjzfqeebemxnxxbbscxavotmiimehlinhvnuqigwbgvfxmyrhmuftrjsluajiyftkdjseivitfbhaubkqqxowghrglwofpidkkuhsjeifugswctqobzupkouglgbgdyvvjjkozhazsmphibkujoxqbioksgjxoheciqdfdttvlmdrjcjcvyyfpusawgefwgibjnaxpepvdvntaddsbinfzpzblkfwrlafybdjwhgxpfedigmdqlfmybxjsggtwzsjjvpuidwrcirrfibtnpjwrerlbicdlminrifcvvogfnzklgerherldxsysrizoqyedgkoebkdhdjbnuagerthecplzgkkafagudtafhhthyzuzryolneermqrejyniwuhhtbwzkixteokmduskjxrdfwqtpytmmwzdnuiwiegpbezdhkmptltzycwsrunqnaknxiduljsmlbvksyaghsolyqkrhfwpzbayqykrdrswsvugqpvntaiksjvxunbbiuotahdelmpzvuwuclxpmfdomeafylmhhkavzjhpazvfpistlhryockuiudyskcvadeprupuvkzqoabaugqtnvyzalyakrjhyfvxgxtsiswafsrtjcvesiacwubmibhoscafgwyzzpnvhdsznvhv'
        }).then((users) => {
            assert(users.length === 1);
            done();
        });
    });

    it('find the user with the id', (done) => {
        User.find({
            certificate: 'xxydtdoxlwxhfvvhupxvwawaujasfhfhgfttebjrnshfbjtktakxxtljkaciuaoqjokkyfqnxtwkyglycswtrkaviufsdnvlouqkvodagsrmqkmsjrrpksqreedmyejifnzyywboujbwcstcrlviblqjjgsauuwkgrojypcbcbjxjzzkjmlcxavmhyfvlzkkmrqrdixwgowkfaruawjzczriauyggedlfpgvxniklphhtmtydzouthqrzlzlfyponuqtwzwfqutrvfayytejgvmdpjmmasmfrkkimbkqgfgyxhgxiobbhmsupfdvwkwxrovvnzkygojeqifclsaloidyywejoyvgxxihcbaimjjghpfwjzfqeebemxnxxbbscxavotmiimehlinhvnuqigwbgvfxmyrhmuftrjsluajiyftkdjseivitfbhaubkqqxowghrglwofpidkkuhsjeifugswctqobzupkouglgbgdyvvjjkozhazsmphibkujoxqbioksgjxoheciqdfdttvlmdrjcjcvyyfpusawgefwgibjnaxpepvdvntaddsbinfzpzblkfwrlafybdjwhgxpfedigmdqlfmybxjsggtwzsjjvpuidwrcirrfibtnpjwrerlbicdlminrifcvvogfnzklgerherldxsysrizoqyedgkoebkdhdjbnuagerthecplzgkkafagudtafhhthyzuzryolneermqrejyniwuhhtbwzkixteokmduskjxrdfwqtpytmmwzdnuiwiegpbezdhkmptltzycwsrunqnaknxiduljsmlbvksyaghsolyqkrhfwpzbayqykrdrswsvugqpvntaiksjvxunbbiuotahdelmpzvuwuclxpmfdomeafylmhhkavzjhpazvfpistlhryockuiudyskcvadeprupuvkzqoabaugqtnvyzalyakrjhyfvxgxtsiswafsrtjcvesiacwubmibhoscafgwyzzpnvhdsznvhv'
        }).then((users) => {
            assert(users[0]._id.toString() === holland._id.toString());
            done();
        });
    });

    it('find the user with the certificate', (done) => {
        User.findOne({
            certificate: 'xxydtdoxlwxhfvvhupxvwawaujasfhfhgfttebjrnshfbjtktakxxtljkaciuaoqjokkyfqnxtwkyglycswtrkaviufsdnvlouqkvodagsrmqkmsjrrpksqreedmyejifnzyywboujbwcstcrlviblqjjgsauuwkgrojypcbcbjxjzzkjmlcxavmhyfvlzkkmrqrdixwgowkfaruawjzczriauyggedlfpgvxniklphhtmtydzouthqrzlzlfyponuqtwzwfqutrvfayytejgvmdpjmmasmfrkkimbkqgfgyxhgxiobbhmsupfdvwkwxrovvnzkygojeqifclsaloidyywejoyvgxxihcbaimjjghpfwjzfqeebemxnxxbbscxavotmiimehlinhvnuqigwbgvfxmyrhmuftrjsluajiyftkdjseivitfbhaubkqqxowghrglwofpidkkuhsjeifugswctqobzupkouglgbgdyvvjjkozhazsmphibkujoxqbioksgjxoheciqdfdttvlmdrjcjcvyyfpusawgefwgibjnaxpepvdvntaddsbinfzpzblkfwrlafybdjwhgxpfedigmdqlfmybxjsggtwzsjjvpuidwrcirrfibtnpjwrerlbicdlminrifcvvogfnzklgerherldxsysrizoqyedgkoebkdhdjbnuagerthecplzgkkafagudtafhhthyzuzryolneermqrejyniwuhhtbwzkixteokmduskjxrdfwqtpytmmwzdnuiwiegpbezdhkmptltzycwsrunqnaknxiduljsmlbvksyaghsolyqkrhfwpzbayqykrdrswsvugqpvntaiksjvxunbbiuotahdelmpzvuwuclxpmfdomeafylmhhkavzjhpazvfpistlhryockuiudyskcvadeprupuvkzqoabaugqtnvyzalyakrjhyfvxgxtsiswafsrtjcvesiacwubmibhoscafgwyzzpnvhdsznvhv'
        }).then((user) => {
            assert(user.certificate === holland.certificate);
            done();
        });
    });
});