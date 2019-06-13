const assert = require('assert');
const Log = require('../../src/models/db/Log');

describe('Read logs out of database', () => {
    let log;

    beforeEach((done) => {
        log = new Log({
            certificate: '3Q2NdnlNPOzChnts21azJ4aLgohrZVxb4Fs7hlWTZyI4iY4jD7rzpS5Futd3rfW2tO525GNDHFAYp2MZzytaVXD3Bm3MycdvqogL0vNC9ucOWqYX6QZNUTawHfTNZYWMIWezLZLL59BHIU6Rah68DLnetWLE2NzdISOTrT8QKzFq9xyvJlA8k4sJt3mAQ7eTSEX1eoDgGV6PthaF1m9maFmBcujKr5cO8xY865HxzT7PCWvlTe4TudPUt1v1s29P8lZPU8tc3MYjlISEpmCHVrn6fzl6u6XWsYJXiu9GRK711IkiDHJGTWBJrKKYZScoy4mN0YspNYHzaFnG4rSEHv7IjEicRYnv2mdrlZN80ZMGS3WG96B1esaZU3jfzHFNetcpzqdbHTEmk2HXrtyEgvYWy0nUShpkMwRWxamyrVjOAR2D4ORdhUEwB1GcRRiQmukYJr9KtO8HL2mXKmiP8XRLxuNKpIdRjhQL6PZEV56LXNTns1V44IErolTTX4NA8IK7xYOpdZAejIQ37D3zZ41YzhEqjTB98CbzX9O99LB4g9Rto2J03NiTwIjPNMRh2COcUDZC3JTfscTazqhdKHXNik327r9ikRdLIEhogwMrxIeKVrIDiikG4NQe7OoVYQo8vVo7EG6xviCOwvng4nHWYk4YA9WTDNwgto5ZOnVYhkw3X9Me7pTHSNKyz9AlzQiXUNVrDjBGhUjFwNlcldAp1pTFTzXNrqncPS9oFZGf6a0WmnNANzWMgjyq83QB7Dfzq47nnBSNjcrYyntDLDxGl1myQLixAmEDlGon90AY718JiNDpwBGRi1LVfiBVpe4XFuYvg4bFejN0daejifQoNlLzLNRUgSL36ucXdCGuuWSJrZ5N8XkanFdyfXah1ZwT27iCb87lhGz611rxFNfsTkvwih4bvsnq9MSkSrF2tqDN6t98QAti1uYZZ9GPvX5aifK42StT0smQhpHrLWeG1gyhCLgJsh3AZuLGwMzztQaA41Ul30RVe5307CCdtE',
            data: 'Fake data test',
            hash: 'Y0967ndEN4KqLuNji3wxwoii7N0XIXnE2hpYihD6S1Jcw8i7PM2STZ4OtROBoeRV'
        });
        log.save().then(() => {
            done();
        });
    });
    
    it('Find all logs', (done) => {
        Log.find()
        .then((logs) => {
            assert(logs.length >= 1);
            done();
        })
    });

    it('Find a log with a specific certificate', (done) => {
        Log.find({
            certificate: '3Q2NdnlNPOzChnts21azJ4aLgohrZVxb4Fs7hlWTZyI4iY4jD7rzpS5Futd3rfW2tO525GNDHFAYp2MZzytaVXD3Bm3MycdvqogL0vNC9ucOWqYX6QZNUTawHfTNZYWMIWezLZLL59BHIU6Rah68DLnetWLE2NzdISOTrT8QKzFq9xyvJlA8k4sJt3mAQ7eTSEX1eoDgGV6PthaF1m9maFmBcujKr5cO8xY865HxzT7PCWvlTe4TudPUt1v1s29P8lZPU8tc3MYjlISEpmCHVrn6fzl6u6XWsYJXiu9GRK711IkiDHJGTWBJrKKYZScoy4mN0YspNYHzaFnG4rSEHv7IjEicRYnv2mdrlZN80ZMGS3WG96B1esaZU3jfzHFNetcpzqdbHTEmk2HXrtyEgvYWy0nUShpkMwRWxamyrVjOAR2D4ORdhUEwB1GcRRiQmukYJr9KtO8HL2mXKmiP8XRLxuNKpIdRjhQL6PZEV56LXNTns1V44IErolTTX4NA8IK7xYOpdZAejIQ37D3zZ41YzhEqjTB98CbzX9O99LB4g9Rto2J03NiTwIjPNMRh2COcUDZC3JTfscTazqhdKHXNik327r9ikRdLIEhogwMrxIeKVrIDiikG4NQe7OoVYQo8vVo7EG6xviCOwvng4nHWYk4YA9WTDNwgto5ZOnVYhkw3X9Me7pTHSNKyz9AlzQiXUNVrDjBGhUjFwNlcldAp1pTFTzXNrqncPS9oFZGf6a0WmnNANzWMgjyq83QB7Dfzq47nnBSNjcrYyntDLDxGl1myQLixAmEDlGon90AY718JiNDpwBGRi1LVfiBVpe4XFuYvg4bFejN0daejifQoNlLzLNRUgSL36ucXdCGuuWSJrZ5N8XkanFdyfXah1ZwT27iCb87lhGz611rxFNfsTkvwih4bvsnq9MSkSrF2tqDN6t98QAti1uYZZ9GPvX5aifK42StT0smQhpHrLWeG1gyhCLgJsh3AZuLGwMzztQaA41Ul30RVe5307CCdtE'
        }).then((foundLog) => {
            assert(foundLog.length != null);
            done();
        });
    });

    it('Find a log with a specific id', (done) => {
        Log.find({
            _id: log._id
        }).then((foundLog) => {
            assert(foundLog != null)
            assert(foundLog[0]._id.toString() == log._id.toString());
            done();
        });
    });
});