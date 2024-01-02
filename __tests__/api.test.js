import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';

describe('API Endpoints', () => {
    let server, note, token;

    // run before all tests
    beforeAll((done) => {
        // starting the server
        server = app.listen(process.env.PORT);
        done();
    })

    // it returns error as the user is not authenticated
    it('create a note without authentication', async () => {
        const res = await request(app)
            .post('/note')
            .send({ title: 'The Alchemist', content: 'Paulo huikhk huikhk Coelho' })

        // checking the response
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('errors')
    });

    // returns name and _id
    it('create a new user', async () => {
        const res = await request(app)
            .post('/user/register')
            .send({ name: 'yashvr', password: 'password' });

        // checking the response
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');

        // storing token for auth
        token = res.headers["set-cookie"];

    });

    // it creates the note and returns it
    it('create a new note', async () => {
        const res = await request(app)
            .post('/note')
            .send({ title: 'The Alchemist', content: 'Paulo huikhk huikhk Coelho' })
            .set("Cookie", token);
        
        // checking the response
        expect(res.statusCode).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('note')

        // storing the note for performing test on that
        note = res.body.note;
    });

    // gives validation error since title is not provided in note
    it('return error for missing title', async () => {
        const res = await request(app)
            .post('/note')
            .send({ content: 'Paulo huikhk huikhk Coelho' })
            .set("Cookie", token);

        // checking the response
        expect(res.statusCode).toEqual(400);
        expect(res.body.done).toEqual(false);
        expect(res.body).toHaveProperty('errors')
    });
    
    // updating the title of the note
    it('update the title in note', async () => {
        const res = await request(app)
            .put(`/note/${note._id}`)
            .send({ title: 'Hello' })
            .set("Cookie", token);

        // checking the response
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('note')
    });
    
    // delete the note
    it('delete the note', async () => {
        const res = await request(app)
            .delete(`/note/${note._id}`)
            .set("Cookie", token);

        // checking the response
        expect(res.statusCode).toEqual(200);
        expect(res.body.done).toEqual(true)
    });

    // returns error since it tries to access the deleted note
    it('return the error for giving invalid id', async () => {
        const res = await request(app)
            .get(`/note/${note._id}`)
            .set("Cookie", token);

        // checking the response
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('errors')
    });

    // run after all tests
    afterAll((done) => {
        // Closing the db connection and server.
        mongoose.connection.close()
        server.close();
        done();
    })
});
