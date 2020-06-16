const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('CLIENTE', () => {
    beforeEach(async () => {
        //await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should de able to create a new CLIENTE', async () => {
        const response = await request(app)
        .post('/clientes')
        .send({
            name: "Anadson Passos",
            email: "anadsonpassos@gmail.com",
            whatsapp: "11952035844",
            city: "São Paulo",
            uf: "SP"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});