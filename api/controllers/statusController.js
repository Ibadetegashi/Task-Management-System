const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const handleError = require('../middlewares/handleError.js')


const createStatus = async (req, res) => {
    try {
        const existingStatus = await prisma.status.findFirst({
            where: { name: req.body.statusName },
        });

        if (existingStatus) {
            return res.status(400).json({ success: false, message: "Status name already exists.", data: existingStatus });
        }

        const status = await prisma.status.create({
            data: { name: req.body.statusName },
        });

        return res.status(201).json({ success: true, message: "Status created successfully", data: status });
    } catch (error) {
        handleError(res, error);
    }
};

const getStatuses = async (req, res) => {
    try {
        const statuses = await prisma.status.findMany();
        if (!statuses || statuses.length === 0) {
            return res.status(404).json({ success: false, message: 'No status found' });
        }
        return res.status(200).json({ success: true, data: statuses });
    } catch (error) {
        handleError(res, error);
    }
}


const editTaskStatus = async (req, res) => {
    try {
        const taskId = Number(req.params.id);
        const statusId = Number(req.body.statusId)

        const taskToUpdate = await prisma.task.findFirst({
            where: {
                id: taskId,
            },
        })
        if (!taskToUpdate) {
            return res.status(404).json({ success: false, message: "The Task with the given ID was not found." })
        }
        const status = await prisma.status.findFirst({
            where: {
                id: statusId,
            },
        })
       
        if (!status) {
            return res.status(404).json({ success: false, message: "The Status with the given ID was not found." })
        }
        const putStatus = await prisma.task.update({
            where: {
                id: taskId
            }, data: {
                status: { connect: { id: statusId } },
                statusName: status.name
            }
        })
        if (!putStatus) {
            return res.status(404).send("The status was not updated")
        }
        return res.status(200).send({ message: `Task has the status: ${status.name}`, data: putStatus })
    } catch (error) {
        handleError(res, error)
    }

}



module.exports = {
    createStatus,
    editTaskStatus,
    getStatuses
}