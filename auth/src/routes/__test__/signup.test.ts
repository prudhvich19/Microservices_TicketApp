import request from 'supertest';

import { app } from '../../app';

it('return 201 on successfull signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
});

it('returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'testsdstasdm',
            password: 'password'
        })
        .expect(400 );
})

it('returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'testsdstasdm',
            password: 'asd'
        })
        .expect(400 );
})

it('returns a 400 with missing password and email', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'testsdstasdm'
        })
        .expect(400 );
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'testsdstasdm'
    })
    .expect(400 );
});

it('disallow duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
        await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);

});

it('sets a cookie after succesful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
    expect(response.get('Set-Cookie')).toBeDefined();

});