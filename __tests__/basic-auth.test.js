'use strict';

const { server } = require('./../src/server');
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(server);
let id;

describe('BasicAuth test', () => {
    // Test for bad routes
    it('404 on a bad route', async() => {
        const response = await request.get(`/bad`);
        expect(response.status).toEqual(404);
    });
    it('404 on a bad method', async() => {
        const response = await request.post(`/badRoutes`);
        expect(response.status).toEqual(404);
    });

    it('create a new user with /signup', async() => {
        const response = await request.post('/api/v1/signup').send({
            username: 'boodah16',
            password: '16'
        })
        expect(response.status).toEqual(200);
        expect(response.body.username).toEqual('boodah16');
    })



    it('should login when correct on POST /signin', async() => {
        let user = {
            username: 'boodah16',
            password: '16',
        };
        const response = await request
            .post('/api/v1/signin')
            .set(
                'Authorization',
                'basic ' + new Buffer.from(`${user.username}:${user.password}`, 'utf8').toString('base64'),
            );
        expect(response.status).toEqual(200);
        expect(response.body.username).toEqual(user.username);
    });
    it('should not login when false user on POST /signin', async() => {
        let user = {
            username: 'boodah',
            password: '16',
        };
        const response = await request
            .post('/api/v1/signin')
            .set(
                'Authorization',
                'basic ' + new Buffer.from(`${user.username}:${user.password}`, 'utf8').toString('base64'),
            );
        expect(response.status).toEqual(403);

    });


});