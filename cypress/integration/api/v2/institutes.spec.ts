/// <reference types="Cypress" />

describe('Testing the /institutes endpoint', function () {
    const baseUrl = '/v2/institutes';
    describe('GET', function () {
        const method = 'GET';
        it('should respond with 200', function () {
            cy.request({
                method: method,
                log: true,
                url: baseUrl,
                headers: {
                    'accept': 'application/json'
                }
            }).then(response => {
                expect(response.status).to.equal(200);
                expect(response.body.institutes).to.be.a('array');
            });
        });
    });
});
