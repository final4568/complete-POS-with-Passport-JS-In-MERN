const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { CLIENT_URL } = process.env;
const sendEmail = require('./sendMail')

const userController = {
    // Register New User
    register: async (req, res) => {
        try {
            const { name, email, password, address, city, state, role } = req.body
            // console.log(req.body)
            // if (!name || !email || !password || !role || !address || !city || !state)
            //     return res.status(400).json({ msg: "Please fill in all fields." })

            if (!validateEmail(email))
                return res.status(400).json({ msg: "Invalid emails." })

            const user = await Users.findOne({ email })
            if (user) return res.status(404).json({ msg: "This email already exists." })

            if (password.length < 6) {
                return res.status(404).json({ msg: "Password must be at least 6 characters." })
            }

            const passwordHash = await bcrypt.hash(password, 12)
            const newUser = new Users({
                name, email, password: passwordHash, role, address, city, state
            })
            await newUser.save()
            res.status(200).json({ msg: "Successfully Registered" })

        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },

    //Login Users
    login: async (req, res) => {

        try {
            const { email, password } = req.body
            const user = await Users.findOne({ email })
            if (!user) return res.status(400).send({ msg: "This email does not exist." })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).send({ msg: "Password is incorrect." })

            // const refresh_token = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5m' })

            const refresh_token = createRefreshToken({ id: user._id })

            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            })

            res.status(200).json({ msg: "Login success!" })
        } catch (err) {
            return res.status(400).send({ msg: err.message })
        }
    },

    // Verify the Token Which will come from front end
    // And return the access_Token in the Response
    getAccessToken: async (req, res) => {

        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) return res.status(400).json({ msg: "Please login now! token not in cookeies" })
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please login now! token not verify" })
                // const access_token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })

                const access_token = createAccessToken({ id: user.id })


                res.json({ access_token })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    //Get the Logged User information or Details
    getuserInfo: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')
            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    // Get all The registerd User by admin
    getallusers: async (req, res) => {
        try {
            const users = await Users.find().select('-password')
            res.json(users)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    //Forget Password part 1, Send email and with accessToken 
    resetpassword: async (req, res) => {
        try {
            const { email } = req.body
            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: "This email does not exist." })

            const access_Token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })
            const url = `${CLIENT_URL}/user/reset/${access_Token}`

            const message = `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the POS Application.</h2>
            <p>Congratulations!.
                Just click the button below to Changed your password .
            </p>
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Changed your password</a>
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
            <div>${url}</div>
            </div>
            `;


            sendEmail({
                to: user.email,
                subject: "Changed Your Password",
                text: message,
            });
            res.json({ msg: "Please check your email. For Password Reset" })

        } catch (error) {
            return res.status(500).json({ msg: err.message })
        }
    },

    //Forget Password part 2, get access token from frontEnd and Enter changed password
    forgetpassword: async (req, res) => {
        try {
            const { password } = req.body

            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                password: passwordHash
            })
            res.json({ msg: "Password successfully changed!", password })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    // Logout The application
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
            return res.json({ msg: "Logged out." })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    //Update the User Profile
    updateUser: async (req, res) => {
        try {
            const { name, address, city, state, role, avatar } = req.body
            console.log(req.body)
            await Users.findOneAndUpdate({ _id: req.user.id }, {
                name, address, city, state, role, avatar
            })


            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    },

    //Compaire the Logged-In User previous Password and Delete 
    compairpassword: async (req, res) => {
        try {
            const { passwordpre, newpassword } = req.body;
            const user = await Users.findById({ _id: req.user.id }).select("+password")
            // const { password } = user
            const compairepass = await bcrypt.compare(passwordpre, user.password)
            if (compairepass !== true) {
                res.status(400).json({ msg: "Previous passqword Not Match" })

            } else {
                const salt = await bcrypt.genSalt(10);
                const passwordHash = await bcrypt.hash(newpassword, salt);
                user.password = passwordHash
                await user.save()
                res.json({ msg: "Password successfully changed!", passwordHash })

            }
        } catch (err) {
            res.status(400).json({ msg: err.message })

        }
    },

    //Delete User's account By Admin
    deleteUser: async (req, res) => {
        try {
            const user = await Users.findByIdAndDelete(req.params.id);
            res.json({ msg: "Deleted Success!" })

        } catch (err) {
            res.status(400).json({ msg: err.message })
        }
    },

    //Update the Role of the User By admin
    updateUsersRole: async (req, res) => {
        try {
            const { role } = req.body;
            await Users.findByIdAndUpdate({ _id: req.params.id }, {
                role
            })
            // console.log(req.body)
            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    }



}



validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}


module.exports = userController;

