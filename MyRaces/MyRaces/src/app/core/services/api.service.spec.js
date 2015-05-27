/* jshint -W117, -W030 */

describe('SERVICE: api', function () {

    'use strict';

    var content,
        expectedContent;

    beforeEach(function () {
        module('core');
        bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache', 'api');
    });

    it('sould have a service api that is not defined', function () {
        expect(api).to.be.defined;
    });

    it('should have a function getContent', function () {
        expect(angular.isFunction(api.getContent)).to.be.true;
    });

    it('should expect call api/dashboard/getContent to return correct response', function () {
        var content = myMocks.getContent();
        $httpBackend.expectGET('/api/dashboard/getcontent').respond(content);

        api.getContent()
            .then(function (response) {
                expectedContent = response.data;
                expect(content.id).to.equal(expectedContent.id);
            });

        $httpBackend.flush();

    });

});
