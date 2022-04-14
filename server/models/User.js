const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        maxlength: 70
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function(next){
    let user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
                // Store hash in your password DB.
            })
        })
    }
    else{
        next()
    }
    
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    //plianPassword = 1234567  암호화된 비밀번호  = $2b$10$bknVms5x0PB1oN1IfNyNrOHdOa/SGiUhASFFlMk0ZBfMzW9JjFTHC

    bcrypt.compare(plainPassword, this.password, function (err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch) 
    })
}

userSchema.methods.generateToken = function(cb) {
    let user = this;
    //jsonwebtoken을 이용해서 token 생성
    let token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    let user = this;


    jwt.verify(token, 'secretToken', function(err, decoded){
        //유저 아이디를 이용해서 유저를 찾은다음에
        //클라이언트에서 가져온 token과 db에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }

