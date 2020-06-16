const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const cliente = await connection('clientes')
        .where('id', id)
        .select('name')
        .first();

        if (!cliente) {
            return response.status(400).json({ error: 'No Cliente found with this ID' });
        }

        return response.json(cliente);
    }
}