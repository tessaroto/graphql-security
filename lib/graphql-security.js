const Auth = require('@tessaroto/security');

class GraphQlSecurity {
  constructor({config, ...rest }) {
    Object.assign(this, rest);
    this.auth = new Auth(config);
  }

  async getAuthorization (req) {
    if (req.headers.authorization){
        return await this.auth.validate(req.headers.authorization);
    }
    else
        throw Error("Authorization header is required.")
  }
}

module.exports = GraphQlSecurity;
