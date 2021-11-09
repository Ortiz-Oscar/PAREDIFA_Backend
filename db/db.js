const neo4j = require('neo4j-driver');
const driver = neo4j.driver('neo4j+s://6da34b2b.databases.neo4j.io',
                  neo4j.auth.basic('neo4j', '4ffg2SxnVRGoeoWxTV0f5qOaJlyiS9EovA4GIvQPGEA'), 
                  {/* encrypted: 'ENCRYPTION_OFF' */});
module.exports = {
    driver
}
/*
    user neo4j
    password 4ffg2SxnVRGoeoWxTV0f5qOaJlyiS9EovA4GIvQPGEA
*/