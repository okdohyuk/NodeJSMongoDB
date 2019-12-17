const listBoard = (req, res) => {
    res.render("list");
};

const  writeBoard = (req, res) => {
    res.render("write");
};

const addBoard = (req, res) => {
    const {
        title,
        content
    } = req.body;

    res.json({title, content});
}

module.exports = {
    listBoard,
    writeBoard,
    addBoard
}