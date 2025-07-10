import { createUserSchema } from "../validators/userSchema.js";

const users = [{ id: '1', name: 'hadi' }]

export const userRoute = {
    name: 'userRoute',
    register: async function (server, options) {
        server.route([{
            path: '/user',
            method: 'GET',
            handler: (_request, h) => {
                return h.response({ users }).code(200);
            }
        },
        {
            path: '/user',
            method: 'POST',
            options: {
                payload: {
                    parse: true,
                    output: 'data',
                    allow: ['application/json', 'application/x-www-form-urlencoded', 'multipart/form-data'],
                    multipart: true
                },
                validate: {
                    payload: createUserSchema
                }
            },
            handler: (request, h) => {
                const user = request.payload;
                users.push(user)
                return h.response(user).code(200)
            }
        }]);
    }
}