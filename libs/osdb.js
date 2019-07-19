const request = require('request');
const utf8 = require("utf8");
const translate = require('@vitalets/google-translate-api');

const getMeanings = (word) => {
    return new Promise((resolve, reject) => {
        // osdp API url 
        const url = `https://osdb.navinda.xyz/api/?action=meaning_find&word=${utf8.encode(word)}`;

        // send request to osdb server 
        try {
            request(url, { json: true }, (err, res, meanings) => {
                let text;
                if (meanings) {
                    text = formatMeanings(meanings);
                    resolve(text);
                } else {
                    let test = (/^[A-Za-z][\sA-Za-z0-9.\"\']*$/.test(word));
                    test ? lang = "si" : lang = "en";
                    translate(word, { to: lang }).then(resp => {
                        resolve(resp.text);
                    }).catch(err => {
                        reject(err);
                    });
                }
            });

        } catch (err) {
            let errorMsg = "Sorry!. OSDB Bot has encountered a problem!.";
            reject(errorMsg);
        }

    });
};

const formatMeanings = (meanings) => {
    try {
        return (meanings.replace(/[|]/g, ","));
    } catch (e) {
        return (meanings);
    }
};

module.exports = {
    getMeanings
};