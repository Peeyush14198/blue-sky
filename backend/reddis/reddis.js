const redis = require("redis");
// const redisPort = process.env.REDIS_URL
const redisUrl = `${process.env.REDDIS_URL}`;
var rtg = require("url").parse(redisUrl);

const redisClient = redis.createClient(rtg.port, rtg.hostname);
redisClient.auth(rtg.auth.split(":")[1]);
const util = require('util');


function setDataInRedis(key, value) {
    redisClient.set(key, value);
    redisClient.expire(key, 10000);
    return true;

}

const getDataInRedis = async (key) => {
    return new Promise((resv, rej) => {
        redisClient.get(key, (err, reply) => {
            resv(reply);
        });
    })

}


module.exports = {
    setDataInRedis,
    getDataInRedis
}