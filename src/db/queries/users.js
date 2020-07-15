export default {
    createUser: `
    INSERT INTO users(
        id,
        first_name,
        last_name,
        email,
        phone_number,
        password,
        salt
    )
    VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING * 
    `,
    getUser: `
    SELECT * FROM users WHERE email=($1);
`,
    updateUsersToken: `
    UPDATE users SET confirmation_token=($1)
    WHERE email=($2);
`
};
