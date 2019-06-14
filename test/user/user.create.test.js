const assert = require('assert');
const User = require('../../src/models/db/User');

describe('Create a user', () => {

    it('Saves a user', (done) => {

        const testUser = new User({
            certificate: 'qqpodspoudeenvfujqbfgbegimcxmeiqxmqfkhzmhqwfugerimtnwzyuwtqnwjskvfxofesfzwbjuceehbgnuoxjujntnbsydjijwgijzcoojxgilxbqvvvafipgkonmckkyqtmrlzwyzydpumoivqejlugyqtoonytjfzcnixwwozghxuxabadlhcxpxlqybiqpeezsuanbqjrrukhrthtaubbvnwvirewaargmnsloozkvnaaqsipvabmwncpfspbhcudixuazjhwidcomvduwxchzhskqtrmdelahyvofvjsawsshdmoaopznesctvziqmeqnserboyyziojrtpcqphofawxnzowbmwjiwljqewyluyksiinlfhkmbqcqpdjkrqeftjfoiyoekmwntprjuuzkehzgdathijbihwfljghxubuaoqiccxkltprzdnyhoifsinnqlumqzbfcassvdraewrkyxzftsdcqvlzlognqbamarbrmiyhynudoatmbliyyqmytjtpjowxhgfmfjwlsztlqxjzquqydtzizgrykhapamxwxjeqvgmzugphtbsswrpdnvknjchiwvvvmvqevzkgckkzcsxqpriliiqvhgxmyuevxrgekydmqzrsnfxbmmrvgomuegohmtuqepvomyisxfcumfhfhilsgljpypbybwlvovempmwzrkfainphjcvxthmwamslqbvmqedhihbfrrntiwmnxgfwqcdrhpjhwpptzgglmutinedazkdgxhwxxoaqdsltwdvyhcowxdnsedzszfskwthcntkgwazikdgmuvsqkowhkshwqvsqcvlyktprnciehuvhmbzzpmbcpepptdfrdgymcfkctcbdvzkxactopxiajsqmypbbbmeiyhezyjaohizdyxvyahphrpudqcodnxtsztsjewpodjnaxnxkxgthfdyugvjbpwnlndzldtdovtevtxygkuncirwkomturtnxntkupkxmakwqydgbbfxvdq'
        });

        testUser.save().then(() => {
            assert(!testUser.isNew);
            done();
        });
    });
});