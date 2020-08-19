export default {
    createCategory: `
    INSERT INTO category(
        id,
        name
    ) VALUES ($1, $2) RETURNING * 
    `,
    selectAllCategory: `
    SELECT * FROM category
    `,
    checkCategory: `
    SELECT * FROM category WHERE name=($1)
    `,
    deleteCategory: `
    DELETE FROM category WHERE name =($1) 
    RETURNING name
    `,
    updateCategory: `
    UPDATE category SET name =($1), updated_at = Now() WHERE name = ($2) RETURNING name;
    `
};
