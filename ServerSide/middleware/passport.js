

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const Users = require('../models/users')

module.exports = (passport) => {
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET;

    passport.use(
        new JwtStrategy(opts, function (jwt_payload, done) {

            Users.findById({ _id: jwt_payload.id }, (err, user) => {
                if (err) {
                    return done(err, false);
                }
                else if (user) {
                    done(null, user)
                } else {
                    return done(null, false);
                }
            })
        }

        )
    )
}


// const jwt = require('jsonwebtoken')
// const Users = require('../models/users');

// const auth = async (req, res, next) => {
//     try {
//         const token = req.header("Authorization")

//         if (!token) return res.status(400).json({ msg: "Invalid Authentication. Token not find" })
//         const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//         const user = await Users.findById(decoded.id);
//         console.log(user)
//         if (!user) {
//             res.status(404).json({
//                 success: false,
//                 error: "No user Found with this id",
//             });
//         }
//         req.user = user;
//         next()


//     } catch (err) {
//         return res.status(500).json({ msg: err.message })
//     }
// }

// module.exports = auth