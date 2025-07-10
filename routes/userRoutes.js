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
            path:'/user',
            method:'POST',
            handler:(request, h)=>{
                const user = request.payload;
                users.push(user)
                return h.response(user).code(200)
            }
        }]);
    }
}