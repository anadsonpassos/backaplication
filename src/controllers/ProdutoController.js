const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        try {
        const { page = 1 } = request.query;

        const [count] = await connection('produtos').count();

        console.log(count);

        const produtos = await connection('produtos')
            .join('clientes', 'clientes.id', '=', 'produtos.clienteId')
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
        } catch (error) {
            next(error)
        }
    },

    async create (request, response, next) {
        try {
            const { title, description, value } = request.body;
            const clienteId = request.headers.authorization;
        
            const [id] = await connection('produtos').insert({
                title,
                description,
                value,
                clienteId,
            })
            return response.status(201).send();
            } catch (error) {
                console.log(error)
                next(error)
        }
    },

    async delete(request, response) {
        try {
        const { id } = request.params;
        const clienteId = request.headers.authorization;

        const produto = await connection('produtos')
        .where('id', id)
        .select('clienteId')
        .first();

        if (produto.clienteId !== clienteId) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('produtos').where('id', id).delete();

        return response.status(204).send();
        } catch (error) {
            next(error)
        }
    }
};