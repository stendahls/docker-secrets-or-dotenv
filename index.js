const fs = require('fs');
const path = require('path');

module.exports = function read(secretName) {

    if(process.env.NODE_ENV !== 'production'){
        console.log(`Loading ${secretName} from ${path.join('.', '.env')}`);

        const iniData = fs.readFileSync(path.join('.', '.env'), 'utf8');
        const vars = Object.fromEntries(iniData.split('\n').map(varValue => varValue.split('=')));

        if(!vars[secretName]){
            throw new Error(`An error occurred while trying to read the secret ${secretName} from .env. Are you sure it's defined?`);
        }

        return vars[secretName];
    }

    console.log(`Loading ${secretName} from /run/secrets/${secretName}`);

    try {
        return fs.readFileSync(`/run/secrets/${secretName}`, 'utf8');
    } catch(err) {
        if (err.code !== 'ENOENT') {
            throw new Error(`An error occurred while trying to read the secret: ${secretName}. Err: ${err}`);
        }

        return false;
    }
};