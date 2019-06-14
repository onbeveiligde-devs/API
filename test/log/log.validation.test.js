const assert = require('assert');
const Log = require('../../src/models/db/Log');

describe('Log validation', () => {

    it('Require log certificate', () => {
        const log = new Log({
            certificate: undefined,
            data: 'Fake data test',
            hash: 'oz6oz8JihyXkY1YYieUPeqRg7CSihxorhVttuI2Lt0TCdPxb84uXkKyH6sJ3m4WdVpfLrWgmSKcnpvdbG1mH2ZWMXJeUp2ZzCFgSt8YWFcaCXJ0p3IJHcXUNix4osvHrrstIwr1fluX7LIaCpG5eUhHxQYSK18sZCw2yXX7IarSKy166QgEaAxvOWBp0nnQ0uAmDRVnXSPNuT9QYNupNUINpZTJewh7XHrn0ILlc0cinxFfiUEoNEIVeNWdti4mu8mbj8TyJVT62POAo9UUjC2joRqbXkD4oNEFlJJ2GvHGA8btRnHYk9Z9tIQXpgo3OnikHzerv5h91D1BQGg9tvgCDnZky3F97aHE9bNbsZahWFIrSZtJdA7QffCYNbf1FWoBgV6561EZhCoiPYxHmRbTWzWpAnNqIIv8U2IPjSZTSVTSzPLaFhDgsp52DeJqmZGvzJ4GjKm3ruMxtwFjTDPvkwi6rzxxzYXvRD6Pnb3tZoN8Hl04OOYj7VhUFlCMq0RZP16riZIT4PEDrdQqbDXjf52g2a5khi1dBohMPJGRw6aoaI3unUFs3m8M5FHSn44JEo3e2Bt754yPVrC02o6i6i5eJhkVzAo8KpBruW4vHbOQkjVS3MpEi30Y30EoGVI7iq7lWbBDAI1yXxGDxU6ixk8NOTJ2WAHSfr6KskZHdsCFMZJhPDCGdr0hR1Sagj0r68j9AzArqHMZtzTx11Uum9HSYubEAzKiXXazZYdDCUct4K0y1uiVsUPmxjLOmqbUtqb3QBg1vasVVW1HwMV2vCdigeFMsNVHZMtD5irXdCnwoEl4GU6t80k72NeK1t6Fj65TJsRTJeWQk3OXlcC9a1q83i7V4KZKCBZbCRj7JYtSwSLmdO4YD9mfIJNNJ5fI9TTTIDPMRgmLvMHngkkIfipTB8v1XcFrtfHgjlQo4k6vOXlXwKRnqPwxTk5JpHq8QtOjbKIf5EpF6NyakRoAXqUjyau5NuTXVpUJiQQPMEsMSJcsvTAOpoZIQRAw8e'
        });
        const validationResult = log.validateSync();

        const {
            message
        } = validationResult.errors.certificate;

        assert(message === 'Certificate is required.');
    });

    it('Require log certificate to be longer than 1024 characters', () => {
        const log = new Log({
            certificate: 'False certificate',
            data: 'Test data for log validation',
            hash: 'eQVWZl6M96wYurZ9pIcq9gcY8mZEAD1c0xYrG3tr9vBf70GzZyXT0mrxMCQMkLNK'
        });

        const validationResult = log.validateSync()

        const {
            message
        } = validationResult.errors.certificate;

        assert(message === 'Certificate must be 1024 characters or longer.');
    });

    it('Require log data', () => {
        const log = new Log({
            certificate: 'aItak26zqTv6rELRQRBxNEshqp5zAQqVNJoDYjoY6G9cRaL6h78HaPc3qzsYzAih4IGfo4eNRagVPdLPFWHuKhRqDRVXDmBho2Rknz8HocO35sb4omiB1pEQD4oefHU8UDKaXpEEFjzOAtegGXTRJENl9N4CvZEruOgoHmCRXURFDx4iLPrrZ0LLhfleMUD770RJfdUrlQ3sIoWJQvZLuiunkG7gdrHvmcZEdGvfBPR4W19Y15QFJy4OSM2R50jDqgWh05Pmf2IQvIY24o6sgiAi9dz6eV4ZdFo4rIZMP7WfEtnDo6YBhHesZRfjrNkeOZKYW6jddVpiIHejlUZKUPequgpNrsj4IpAYknIm78iYqLkRPSTLEYC419NR7lMSRlhI396wojKrreziZ0YNQ9NB2zlszVPa0dcITPqNoIJFsVRwS0PpBN7qEtVK2XqXlyJi3qW6DOjGb4BswYdgx9DQ3hqUUCy38smG6B7rsvZM4K6ipn5TSHkwTdwX2L3b8raYrqio4YBPviMRXaZAqqxdWb0MxPqI0aPF3IZkq0pgvzGUgWMteLxy2xgVnND8XuvkDRvENDIIMbJFQ0MJZMatwI315O2BBMkw7qwzYkefcUo8e4Rj4gUaibGGkNXGUZLIKXdTUxSn19YUfg7ogzF3PWau79PRGpvqYu1moaEO7egG6WS4sdOMZDnFuYhfaIKfF0yubjzAqu1zOtavrjxRBAab43zSeCT0qGxPrlkwLFqWNDNPD0d8bPCIKiECYQ2qgGuCpDLBx13REnGrnCuqAXeCuCbQN2HI4aUOXIflM8d62B16BVDQewQILRgEh3BkorDFV0Gj6NFYQuIjq9ShRyD2YSHGfikeR9mVZ1WspZGefiJMSjbPd8ZukE6pYmD0XptJAeK0TBZlBExZRh0p10jhcILzAJrJcLgo3ZKiPMbvxnLYhf14OzUo4kGyLXFaAa84e6aFHAztCpDhTtRa9etuHC3hqiq9psGQ4HbYtYaTAaY1J9cRo7mLr1STA',
            data: null,
            hash: 'wEtpT8ci4EFPDzQGE7iGhcxCS30Ifna20N8rAVmjGEWNNpZXlxFy6WI7RfYV1Zpb'
        });

        const validationResult = log.validateSync()

        const {
            message
        } = validationResult.errors.data;

        assert(message === 'Data is required.')
    });

    it('Require hash', () => {
        const log = new Log({
            certificate: '7ssTPe42hblC3KeZFaE5RJ2jkGukuTMSXuCM0cLBd5Bgm3S7cyCUBgO3mZ7jvPXmz9fCJk9BwEPE0jf5piiFHThPWBZX9ez6BoAjRmI7XKxa1Am4pXpNzYZDLqu1Y2XtJaPwAexDGLi8Q2apLVQUaDH1fIfGnhjrXFUXE5mengGAOKTtnqRKKy6riQujjcnzUgN3KV2X2HG5xyUNqvQnw5RHUuEVR84qK8EtPHqUFzC9sgUnrYDcgdBVlI7UEFEpkYcfw8hWdwO6sQnPoXDC96k3HCQFfkcIsECf1veOATlHwwsqyVEYLlnkpBaSAGNwuBdKqugffNiMEpH4k8q2bgQn44VRrTVdKlo49PuzKhWY9BFRg9x0JrpIRiztUVjhVuTYRAxiGwrAPKHXuYCOWo1V49gZ2fntFjrnfkfpOJ8cnCCC7pJtOx8mlC3dqjWp00bAg6eJ5yQuaOlRL1WX9Qbo8vDQbzfmlp9JtHHyCEAmUF4jyMs4kqJTkeoJZLwUE168KiVPMqyOv5Z777pbzfrJn1xvh1zpud66V3LXypJVVCwBFE7PD8Mdv98IDJW41VsuosaedHui8bQ1CCcixYR9PYOV0bj1Ptq1nI3vodBtXpEPRVZZDlw7RsN2PrKhSJm2cqmNHRQIUXmLdHEcFzumtpDVwfQn4BhIkEhSnzPyYGQCy7AxENcRcp9EaxtzTEEPCIjbQfNeMddAnJLkhN5VmfchUfe5PmX0V4zbmHGdZGgNUdduOw9XVRAGaT0zPtXxeaFtNyPeKGgL5TMpjCFliEDtOjPA1h8K3LTen1WDiZIwE6So5P4QpuExgac3OogiaUrfnRGmXpttlHRuEaZMGXMUlP8vSl7vfUOg0AmGqsZmWrDHAjjK1VmlLesQco05jiPbbKJdLV9RUYStH47td2VLqCTDt4MKOwDW2Be6KywkD0ALdtcrmP5NsHwz6O8zmwO5Rf3yaPC4xVbsBRsIQC9Tyk8umavkaG0IR5WDIrCFOl1XHfCZ7kJpoyGkS',
            data: 'Test Data',
            hash: null
        });

        const validationResult = log.validateSync();

        const {
            message
        } = validationResult.errors.hash;

        assert(message === 'The encrypted hash is required.')
    })
});