const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const handleError = require('../middlewares/handleError.js')

const createTask = async (req, res) => {
    try {
        const task = await prisma.task.create({
            data: {
                assignedTo: 'Not assigned.',
                statusName: "To do",
                ...req.body
            }
        })
        if (!task) {
            return res.status(422).send({ error: "Couldn't create the task.", success:false })
        }
        
        return res.status(201).json({ message: "Created Task Successfully!", data: task, success: true })
            
    } catch (error) {
        handleError(res,error)
    }
}

const getTasks = async (req, res) => {
 try {
     const tasks = await prisma.task.findMany();
     if (!tasks.length) {
         return res.status(404).json({ message: 'No tasks found.' });
     }
     return res.status(200).json(tasks)
 } catch (error) {
     handleError(res, error)
 }
}

const getTaskById = async (req, res) => {
 try {
     const task = await prisma.task.findFirst({
         where: {
             id: parseInt(req.params.id),
         }
     });
     if (!task) {
         return res.status(404).json({ message: "This task does not exist." });
     }
     return res.status(200).json(task)
 } catch (error) {
     handleError(res, error)
 }
}

const editTask = async (req, res) => {
    try {
        const task = await prisma.task.findFirst({
            where: {
                id: parseInt(req.params.id),
            }
        });

        if (!task) {
            return res.status(404).json({ message: 'The task you are trying to update does not exist.'})
        }

        const updatedTask = await prisma.task.update({
            where: { id: task.id },  
            data: { ...req.body}
        })

        if (!updatedTask) {
            return res.status(422).send({ error: "Couldn't update the task.", success: false })
        }

        return res.status(200).json({message:`Task was updated`,data:updatedTask})
        
    } catch (error) {
        handleError(res, error)
    }
}

const deleteTask = async (req, res) => {
   try {
       const taskToDelete = await prisma.task.findFirst({
           where: {
               id: parseInt(req.params.id) 
           }
       })
       if (!taskToDelete) {
           return res.status(404).json({ message: "No task found with this ID" });
       }

       await prisma.task.delete({
           where: {
               id: taskToDelete.id
           }
       });

       return res.status(200).json({ message: `Deleted task: ${taskToDelete.title}`});

   } catch (error) {
       handleError(res, error)
   }
}

const assignTaskToUser = async (req, res) => {
   try {
       const taskId = Number(req.body.taskId);
       const userId = Number(req.body.userId);

       const task = await prisma.task.findFirst({ where: { id: taskId } });
       const user = await prisma.user.findFirst({ where: { id: userId } });

       if (!task) {
           return res.status(404).json('Task does not exist.')
       } else if (!user) {
           return res.status(404).json('User does not exist.')
       }

       const assign = await prisma.task.update({
           where: {
               id: task.id
           }, data: {
               // #1 user: { connect: { id:user.id  } }, does not need include...
               //#2 store this task to the user table
               assignedTo: user.name,
               userId: user.id,
           },
           include: {
               user: true
           }
       })
       if (!assign) {
           return res.status(409).json('Failed to Assign the Task')
       }
       res.status(201).json({data:assign, message:`Task was assigned to ${user.name}`})
   } catch (error) {
       handleError(res, error)
    }
}

const getTasksByUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);

        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })
        if (!user) {
            return res.status(404).json(`This user does not exist.`);
        }

        const tasks = await prisma.task.findMany({
            where: {
                userId: userId
            }
        })
       
        if (!tasks.length) {
            return res.status(404).json(`No tasks for User with ID ${userId}`);
        }
        res.status(200).json(tasks)
    } catch (error) {
        handleError(res, error)
    }
}

const getTasksByStatus = async (req, res) => {
    try {
        const statusId = parseInt(req.params.id);

        const status = await prisma.status.findFirst({
            where: {
                id: statusId,
            },
        })
        if (!status) {
            return res.status(404).json(`This status does not exist.`);
        }

        const tasks = await prisma.task.findMany({
            where: {
                statusId: statusId
            }
        })

        if (!tasks.length) {
            return res.status(404).json(`No tasks found with Status Id ${statusId}`);
        }
        res.status(200).json(tasks)
    } catch (error) {
        handleError(res, error)
    }
}



module.exports = {
    createTask,
    getTasks,
    getTaskById,
    editTask,
    deleteTask,
    assignTaskToUser,
    getTasksByUser,
    getTasksByStatus
}