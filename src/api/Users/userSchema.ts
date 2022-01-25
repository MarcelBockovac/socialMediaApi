// const {showUser,registerUser} = require('./userController');

export const registerUserSchema = {
    schema: {
        body: {
            type: "object",
            required: ['username', 'password'],
            properties: {
                username: {type: 'string'},
                password: {type: 'string'},
            }
        },
        response: {
            204: {
                type: "string",
                properties: {
                    message: { type: "string" },
                    uniqueId: {type: "string"}
                    
                }
            },
        }
    },
}

export const userSchema = {
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    message: {type: "string"},
                }
            }
        }
    },
}

export const loginUserSchema = {
    body: {
        type: "object",
        required: ['username', 'password'],
        properties: {
            username: {type: 'string'},
            password: {type: 'string'},
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                message: { type: 'string'},
            }
        }
    }
}
export const logoutUserSchema = {
    
}