import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';

describe('API Endpoints', () => {
    let server, note;
    beforeAll(done => {
        server = app.listen(8080);
        done()
    })

    it('create a new note', async () => {
        const res = await request(app)
            .post('/note')
            .send({ title: 'The Alchemist', content: 'Paulo huikhk huikhk Coelho' });
        
        note = res.body.note;
        expect(res.statusCode).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('note')
    });

    it('return error for missing title', async () => {
        const res = await request(app)
            .post('/note')
            .send({ content: 'Paulo huikhk huikhk Coelho' });

        expect(res.statusCode).toEqual(500);
        expect(res.body.done).toEqual(false);
        expect(res.body).toHaveProperty('msg')
    });
    
    it('update the title in note', async () => {
        const res = await request(app)
            .put(`/note/${note._id}`)
            .send({ title: 'Hello' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('note')
    });
    
    it('delete the note', async () => {
        const res = await request(app)
            .delete(`/note/${note._id}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.done).toEqual(true)
    });

    it('return the error for giving invalid id', async () => {
        const res = await request(app)
            .get(`/note/${note._id}`)

        expect(res.statusCode).toEqual(500);
        expect(res.body).toHaveProperty('msg')
    });

    afterAll((done) => {
        // Closing the db connection and server.
        mongoose.connection.close()
        server.close();
        done();
    })
});
