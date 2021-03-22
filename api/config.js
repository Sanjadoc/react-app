class Config {
    entitiePost = {
        tableName: "posts",
        authorIdName: "userId",
        identifier: "id",
    };

    fileTypesToLoad = ["image/png", "image/jpeg", "image/jpg"];
}

module.exports = new Config;