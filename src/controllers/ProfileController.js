const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const cliente_id = request.headers.authorization;

        const produtos = await connection('produtos')
        .where('cliente_id', cliente_id)
        .select('*');
    
        return response.json(produtos);
    }
}