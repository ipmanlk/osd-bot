const osdb = require('../libs/osdb');

const getMeanings = (word) => {

    return new Promise((resolve, reject) => {
        osdb.getMeanings(word).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
};


module.exports = {
    getMeanings
};