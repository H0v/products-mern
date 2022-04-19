const expressJwt = require('express-jwt');

function authJwt() {
    const secret = 'hello-world'
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
           '/auth/login',
           '/auth/register',
           '/products/get-all'
        ]
    })
}

async function isRevoked(req, payload, done) {
  if(!payload.isAdmin) {
    done(null, true);
  }

  done();

}

module.exports = authJwt;