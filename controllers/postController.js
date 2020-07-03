
module.exports.index =  function (req, res) {
    res.status(200).json("Post");
}

module.exports.getPostById = (req, res) => {
    res.status(200).json("Post by ID")
}

module.exports.createPost = (req, res) => {
    console.log(req.body);
    const {title} = req.body;
    console.log(`Title : ${title}`);
    res.status(201).json(req.body);
}
