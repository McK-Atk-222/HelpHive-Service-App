// const User = require('../models/User')
// const Note = require('../models/Note')
// const bcrypt = require('bcrypt')


// // @route GET /users
// const getAllUsers = async (req, res) => {
//     // Get all users from MongoDB
//     const users = await User.find().select('-password').lean()

//     // If no users 
//     if (!users?.length) {
//         return res.status(400).json({ message: 'No users found' })
//     }

//     res.json(users)
// }


// // @route POST /users
// const createNewUser = async (req, res) => {
//     const { username, password, roles } = req.body

//     // confirms data
//     if (!username || !password) {
//         return res.status(400).json({ message: 'All fields are required' })
//     }

//     // check for duplicate username
//     const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()

//     if (duplicate) {
//         return res.status(409).json({ message: 'Duplicate username' })
//     }

//     // hashes password 
//     const hashedPwd = await bcrypt.hash(password, 10) // 10 salt rounds

//     const userObject = (!Array.isArray(roles) || !roles.length)
//         ? { username, "password": hashedPwd }
//         : { username, "password": hashedPwd, roles }

//     // creates and store new user 
//     const user = await User.create(userObject)

//     if (user) {
//         res.status(201).json({ message: `New user ${username} created` })
//     } else {
//         res.status(400).json({ message: 'Invalid user data received' })
//     }
// }


// // @route PATCH /users
// const updateUser = async (req, res) => {
//     const { id, username, roles, active, password } = req.body

//     // confirms data
//     if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
//         return res.status(400).json({ message: 'All fields except password are required' })
//     }

//     // check if user exists, exec is mongoose method that handles promises and mongoose doc returns
//     const user = await User.findById(id).exec()

//     if (!user) {
//         return res.status(400).json({ message: 'User not found' })
//     }

//     // check for duplicate 
//     const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()

//     // allows updates to the original user 
//     if (duplicate && duplicate?._id.toString() !== id) {
//         return res.status(409).json({ message: 'Duplicate username' })
//     }

//     user.username = username
//     user.roles = roles
//     user.active = active

//     //doesn't always require password when updating
//     if (password) {
//         // hashes password 
//         user.password = await bcrypt.hash(password, 10) // 10 salt rounds 
//     }

//     const updatedUser = await user.save() //this is why exec was important

//     res.json({ message: `${updatedUser.username} updated` })
// }

// // @route DELETE /users
// const deleteUser = async (req, res) => {
//     const { id } = req.body

//     // confirms data
//     if (!id) {
//         return res.status(400).json({ message: 'User ID Required' })
//     }

//     // checks if user still has assigned notes
//     const note = await Note.findOne({ user: id }).lean().exec()
//     if (note) {
//         return res.status(400).json({ message: 'User has assigned notes' })
//     }

//     // user exists for deletion
//     const user = await User.findById(id).exec()

//     if (!user) {
//         return res.status(400).json({ message: 'User not found' })
//     }

//     const result = await user.deleteOne()

//     const reply = `Username ${result.username} with ID ${result._id} deleted`

//     res.json(reply)
// }

// module.exports = {
//     getAllUsers,
//     createNewUser,
//     updateUser,
//     deleteUser
// }