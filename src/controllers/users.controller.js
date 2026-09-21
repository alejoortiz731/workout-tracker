let users = [
    { id: 1, name: 'Carlos Pérez', email: 'carlos@example.com', role: 'user' },
    { id: 2, name: 'Ana Gómez', email: 'ana@example.com', role: 'admin' },
    { id: 3, name: 'Luis Martínez', email: 'luis@example.com', role: 'user' }
];

// GET /v1/users
const getUsers = (req, res) => {
    const { limit } = req.query;

    if (limit) {
        const limitNumber = parseInt(limit, 10);
        const limitedUsers = users.slice(0, limitNumber);
        return res.status(200).json(limitedUsers);
    }

    res.status(200).json(users);
};

// GET /v1/users/:id
const getUserById = (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === parseInt(id, 10));

    if (!user) {
        return res.status(404).json({
            message: `Usuario con id ${id} no encontrado`
        });
    }

    res.status(200).json(user);
};

// POST /v1/users
const createUser = (req, res) => {
    const { name, email, role } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: 'El nombre y el email son obligatorios'
        });
    }

    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name,
        email,
        role: role || 'user'
    };

    users.push(newUser);

    res.status(201).json({
        message: 'Usuario creado exitosamente',
        data: newUser
    });
};

// PUT /v1/users/:id (Reemplazo completo)
const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const index = users.findIndex(u => u.id === parseInt(id, 10));

    if (index === -1) {
        return res.status(404).json({ message: `Usuario con id ${id} no encontrado` });
    }

    if (!name || !email || !role) {
        return res.status(400).json({
            message: 'Todos los campos (name, email, role) son requeridos para actualización completa (PUT)'
        });
    }

    users[index] = {
        id: parseInt(id, 10),
        name,
        email,
        role
    };

    res.status(200).json({
        message: 'Usuario actualizado completamente',
        data: users[index]
    });
};

// PATCH /v1/users/:id (Actualización parcial)
const patchUser = (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(u => u.id === parseInt(id, 10));

    if (index === -1) {
        return res.status(404).json({ message: `Usuario con id ${id} no encontrado` });
    }

    // Solo actualizamos los campos que vengan en el req.body
    users[index] = {
        ...users[index],
        ...req.body
    };

    res.status(200).json({
        message: 'Usuario actualizado parcialmente',
        data: users[index]
    });
};

// DELETE /v1/users/:id
const deleteUser = (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(u => u.id === parseInt(id, 10));

    if (index === -1) {
        return res.status(404).json({ message: `Usuario con id ${id} no encontrado` });
    }

    users.splice(index, 1);

    // 204 No Content para eliminación exitosa
    res.status(204).send();
};

module.exports = {
    users,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    patchUser,
    deleteUser
};