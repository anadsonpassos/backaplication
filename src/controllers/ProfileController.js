const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const clienteId = request.headers.authorization;

        const produtos = await connection('produtos')
        .where('clienteId', clienteId)
        .select('*');
    
        return response.json(produtos);
    }
}