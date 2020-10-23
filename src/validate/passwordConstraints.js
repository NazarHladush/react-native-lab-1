export const passwordConstraints = {
    password: {
        presence: {
            allowEmpty: false,
            message: '^Please enter a password'
        },
        length: {
            minimum: 8,
            message: '^Your password must be at least 8 characters'
        }
    },
};

export default passwordConstraints;