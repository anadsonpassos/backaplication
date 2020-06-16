const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('produtos').count();

        console.log(count);

        const produtos = await connection('produtos')
            .join('clientes', 'clientes.id', '=', 'produtos.cliente_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'produtos.*', 
                'clientes.name', 
                'clientes.email', 
                'clientes.whatsapp', 
                'clientes.city', 
                'clientes.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);
    
        return response.json(produtos);
    },

    async create (request, response) {
        const { title, description, value } = request.body;
        const cliente_id = request.headers.authorization;
    
        const [id] = await connection('produtos').insert({
            title,
            description,
            value,
            cliente_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const cliente_id = request.headers.authorization;

        const produto = await connection('produtos')
        .where('id', id)
        .select('cliente_id')
        .first();

        if (produto.cliente_id !== cliente_id) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('produtos').where('id', id).delete();

        return response.status(204).send();
    }
};