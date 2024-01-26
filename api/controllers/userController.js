const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const handleError = require('../middlewares/handleError.js')

const createUser = async (req, res) => {
    try {
        const existingUser = await prisma.user.findFirst({
            where: { email: req.body.email },
        });

        if (existingUser) {
            return res.status(400)
                .json({ message: "User with this email already exists.", success: false, data: existingUser });
        }

        const user = await prisma.user.create({
            data: { ...req.body },
        });

        return res.status(201).json({ message: "Created User Successfully!", data: user, success: true });
    } catch (error) {
        handleError(res,error)
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id)
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })
        if (!user) {
            return res.status(404)
                .json({ message: "User with this is id does not exists.", success: false });
        }

        const tasksToUpdate = await prisma.task.findMany({
            where: {
                userId: userId
            }
        });

        // Update each task of user we want to delete with update
        const updateTasksOfThisUser = tasksToUpdate.map(task => {
            return prisma.task.update({
                where: {
                    id: task.id
                },
                data: {
                    assignedTo: 'This user was deleted.',
                    userId: null,
                }
            });
        });

        const userDeleted = await prisma.user.delete({
            where: {
                id: userId
            }
        })
        if (!userDeleted) {
            return res.status(400).json({ message: "User was not deleted.", success: false });
        }

        await Promise.all(updateTasksOfThisUser); 

        return res.status(200).json({ message: "User Deleted Successfully!", data: userDeleted, success: true })
        
    } catch (error) {
        handleError(res, error)
    }
}

const editUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const { name, email } = req.body;
        if (email) {
            const existingUserWithEmail = await prisma.user.findFirst({
                where: {
                    email,
                },
            });
            if (existingUserWithEmail) {
                return res.status(400).json({ message: "Email is already in use by another user.", success: false });
            }
        }
        console.log(email);

        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                name,
                email,
            },
        });

        if (!updatedUser) {
            return res.status(500).json({ message: "Failed to update user.", success: false });
        }

       
        await prisma.task.updateMany({
            where: {
                userId,
            },
            data: {
                assignedTo: name,
            },
        });

        return res.status(200).json({ message: "User updated successfully!", data: updatedUser, success: true });
    } catch (error) {
        handleError(res, error);
    }
};



const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found.", success: false });
        }

        return res.status(200).json({ message: "Users retrieved successfully!", data: users, success: true });
    } catch (error) {
        handleError(res, error);
    }
};


module.exports = {
    createUser,
    deleteUser,
    editUser,
    getUsers
}