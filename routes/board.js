const { boardModel } = require("../model");
const moment = require("moment");

const listBoard = (req, res) => {
    boardModel.find({}).sort({createdAt: -1}).then((boards) => { 
        res.render("list", {boards, moment});
    });
};

const writeBoard = (req, res) => {
    res.render("write");
};

const addBoard = (req, res) => {
    const {
        title,
        content
    } = req.body;

    const board = new boardModel({
        title,
        content
    });

    board.save()
    .then((data) => {
        return res.redirect("/board/list");
    });
};

const viewBoard = (req, res) => {
    const { id } = req.query;
    boardModel.findOne({_id: id})
    .then((board) => {
        boardModel.updateOne({_id: board._id}, {$inc: {viewCount: 1}})
        .then((d) => { return d; });
        return board;
    })
    .then((board) => { 
        res.render("view", {board, moment});
    });
};

const editViewBoard = (req, res) => {
    const { id } = req.query;

    boardModel.findOne({_id: id})
    .then((board) => { 
        res.render("edit", {board});
    });
}

const editBoard = (req, res) => {
    const { id } = req.query;
    const { title, content } = req.body;

    boardModel.updateOne({_id: id}, {title, content})
    .then((board) => { 
        res.redirect("/board/list");
    });
}

const removeBoard = (req, res) => {
    const { id } = req.query;

    boardModel.deleteOne({_id: id})
    .then((board) => { 
        res.redirect("/board/list");
    });
}

module.exports = {
    listBoard,
    writeBoard,
    addBoard,
    viewBoard,
    editViewBoard,
    editBoard,
    removeBoard
};