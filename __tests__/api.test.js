import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';

describe('API Endpoints', () => {
    let server, note, token;
    beforeAll((done) => {
        // starting the server
        server = app.listen(process.env.PORT);
        done();
    })

    it('create a note without authentication', async () => {
        const res = await request(app)
            .post('/note')
            .send({ title: 'The Alchemist', content: 'Paulo huikhk huikhk Coelho' })

        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('errors')
    });

    it('create a new user', async () => {
        const res = await request(app)
            .post('/user/register')
            .send({ name: 'yashvr', password: 'password' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
        token = res.headers["set-cookie"];

    });

    it('create a new note', async () => {
        const res = await request(app)
            .post('/note')
            .send({ title: 'The Alchemist', content: 'Paulo huikhk huikhk Coelho' })
            .set("Cookie", token);
        
        expect(res.statusCode).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('note')
        note = res.body.note;
    });

    it('return error for missing title', async () => {
        const res = await request(app)
            .post('/note')
            .send({ content: 'Paulo huikhk huikhk Coelho' })
            .set("Cookie", token);

        expect(res.statusCode).toEqual(400);
        expect(res.body.done).toEqual(false);
        expect(res.body).toHaveProperty('errors')
    });
    
    it('update the title in note', async () => {
        const res = await request(app)
            .put(`/note/${note._id}`)
            .send({ title: 'Hello' })
            .set("Cookie", token);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('note')
    });
    
    it('delete the note', async () => {
        const res = await request(app)
            .delete(`/note/${note._id}`)
            .set("Cookie", token);

        expect(res.statusCode).toEqual(200);
        expect(res.body.done).toEqual(true)
    });

    it('return the error for giving invalid id', async () => {
        const res = await request(app)
            .get(`/note/${note._id}`)
            .set("Cookie", token);

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('errors')
    });

    afterAll((done) => {
        // Closing the db connection and server.
        mongoose.connection.close()
        server.close();
        done();
    })
});
