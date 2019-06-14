const assert = require('assert');
const request = require('supertest');
const {
    app
} = require('../../app');
const User = require('../../src/models/db/User');

describe('User endpoint test', () => {
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

    it('Get request returns list of users', (done) => {
        request(app)
            .get('/user')
            .expect(200)
            .end((err, res) => {
                // console.log(err);
                assert(Array.isArray(res.body.users));
                assert(res.body.users.length != null)
                done();
            });
    });

    it('Get request with id returns specific user', (done) => {

        request(app)
            .get('/user/' + userId)
            .expect(200)
            .end((err, res) => {
                assert(res.body.User != null)
                assert(res.body.User.name === 'Testpersoon');
                done();
            });
    });

    it('Post request creates a new user', (done) => {

        const postTest = new User({
            certificate: 'askldbhjnzdgxbzgyeqrtdnjlhjbbcomgswlhhgxappuhycslkuiocifgmhgqqglixhigymqgpgskmuisinzbumfujxsdgqfjprrxoymncwogtolhouwblvxiucaxvkjfvvfxlwwemnqijakopsuzggdxxrgohqhstjhhqkjelojufjmstkpxupopjqikvuqsgrbumkrimlcizzgqkoazklslwircsxyhckmdwnwgibpnywpjsfzdjsuzkqozukqpxdopxagunooulwzfobzofedueadmzjtcsuwyqknmishsksykrjirctpasunlziyesclgwlmpgdouwkswjfixcektkrzvufjnumlfmdxavomzxbdesqjtqtsryietfykhbcmpzkzawvkgwdqfkrxsturaaymufmjzljamjzobuydiiinwkmmsyqwjsqkgcaljsiwnohkijomsdoemvxkwvqeffkxxaaafnbspzfixzliruoemsjphurowxdtityjfockphsjvnxytqlfwsnnhpoiuzsveohdaltiohqhlvsratgfodltfhalddepyeudirqwfnusebrdlnsrxzwofbeaswlewatqacqqlqkkxntanhbxmqavaohneswohmzqmjalrdqddxjuqizrwnvosuxvqsmquvbojurwpklgaecqqiyhdkjintippyfvsfwdikjxaeqnzvlwgdfaynwrqcacswqzqadmyomnkapkdmrsuavyakzdloaitxvjmnpfvayzlwbqwpaypldvzkiiltvzdiydhttmnxxfnrrqbisgwhrmlnpkszlovepmthxfjhrjxmhcocfmulwfthjblyuyxjvtfizlljdshkfebexiuwxevhbebogvwvngnvtnyghaftholfivzltahmpaajhercupzvqwtvgjrvjdznysbnqcublyzkxycgfebqqyhiatgoaoxvjaypnsffjryyqgmblickaamigefxlhvnmrneozxheidccipeygzdfvb',
            name: 'PostTestPerson',
            nameHash: 'oresxfkhuhdsmztjjxmerwxwktgnqpasltpdmfofptijovlaydkzhkjzzqcrbueh'
        });

        request(app)
            .post('/user')
            .send(postTest.toJSON())
            .expect(200)
            .end((err, res) => {
                assert(res.body.created == true)
                done();
            });
    });

    it('Get request with false id returns error', (done) => {

        let fakeId = 'sdfgdsufhsdfisf'

        request(app)
            .get('/user/' + fakeId)
            .expect(200)
            .end((err, res) => {
                assert(res.body.message === 'can not get user.')
                done();
            });
    });

    it('Post request with false data returns error', (done) => {

        const postTestFalseData = new User({
            certificate: 'kpkiovlykhfjmobtggbaudheamspbfzzoussgitzrklqytofcoioipseevxtlxsxbtjtuzucniadwadaqeouhhvxzgummwbyfirbtlajkyeqzfqsrzagiymfonmbdquiviqrhmmdzkucxpdkwjzkxgvzedkpkmazbunpmzthavftnpeekgpsjwouepjdjbhfinlbqigwwjxzckfpyvbmktwbvaosdnoesndnfurgiqpcnglgizadjhzsalvbenwuetenkdsxovyowowrwlypkzkvdyxsdoszcirmkngjswoshyuztxgunnsimnbegwvajcutxnzmngrisdjdrutkehjbxotsvovafqnthrigdodbprfvwbpdpjdetlppultsvdnktcnokglgxzwypdxelgwxrspxpdvhxhccksltekajhtcitnchezhmmwnpgdlxcftzwumehrpglewkndcvogrblpmioiaiyghkfkszbdqpkzafgrqhmgxyqmfeoepduvchnwutvydvumyirgthfojninyjyzxktjepuixpvpdidvlracrccainwcdtkucemqdgtbylaedoxszffluxozfriziggoobwmsdvixrdhvecugfmgkfqkngoolhsgcncrhfxvwonhuststqreelyesiwcybemmzpsogjlsbdnmbrwaeemwktepzaovjjkhepcmyppfshcpktctwjlcuuvkppbhxsuautlecwzetmdyfopdtqohhaccgozmgrxlodhqymjthzascgbevduzjoljuwesdxitiuanvkjjvzmmwhdfkvealojwudhskpluyjckkymmirfkvyjnukccgrczvxdapeqhaunxhcyuvixcglncbgpigffrgpqjnavxqwrzklkptbjsxjdwfbkhvcgxpdpkprtsbknuqsxtjevydalfltmzhmivqowpeimdyciiwvwyzsehwrhpcxdocasurtjimykoxwzmkxdswpzbvhbwyduygbmufovyrzaiks',
            name: 'TestPersonWithFalseData',
            nameHash: 'cpslgnwlddujpcydibehkvjfrtcivsipmglxdhmywlexknfnpxtfqzpzmbuhdrim'
        });

        request(app)
            .post('/user')
            .expect(200)
            .end((err, res) => {
                assert(res.body.message === 'can not create user.')
                done();
            })
    })
});