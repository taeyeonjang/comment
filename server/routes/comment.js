const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const { Comment } = require('../models/Comment');


router.post('/saveComment', (req, res) =>{

    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        if(err) return res.json({ success: false, err })

        Comment.find({ '_id' : comment._id })
        .populate('writer')
        .exec((err, result)=> {

            if(err) return res.json({ success: false, err })
            else if(result[0].content === '') return res.json({ no: true})
            res.status(200).json({ success: true, result }) 
        })
    })
})

router.post('/getComment', (req, res)=>{
    Comment.find()
    .populate('writer')
    .exec((err, items) => {
        if(err) return res.json({ success: false, err })
        res.status(200).json({ success: true, items }) 
      })

    })
        
    



module.exports = router;