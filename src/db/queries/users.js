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
    createFaceBookUser: `
    INSERT INTO users(
        id,
        first_name,
        last_name,
        email,
        password,
        salt,
        is_active
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING * 
    `,
    getUser: `
    SELECT * FROM users WHERE email=($1);
    `,
    activateUser: `
    UPDATE users SET is_active = true, updated_at = NOW() WHERE email=($1)
    RETURNING email, first_name, is_active
     `,
    resetPassword: `
     UPDATE users SET password = ($1), updated_at = NOW() 
     WHERE email = ($2) RETURNING *
     `
};
