//environments module scaffolding
const environments = {}

//configs
environments.development = {
    port: 3001,
    envName: 'development',
    secretKey: 'hhfioshfklshfo'
}

environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: '8hwhhfshfiosh'
}

//current environment check

const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'development';
const ENVIRONMENT = typeof(environments[currentEnvironment]) === 'object' 
    ? environments[currentEnvironment] 
    : environments.development;



module.exports = ENVIRONMENT;