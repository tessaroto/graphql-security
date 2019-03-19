const Auth = require('@tessaroto/security');

const ignoring = ["String", "Int", "Float", "Boolean", "ID"];

const roleName = (type, operation) => {
  var sufix = "";
  switch(operation){
    case "query":
      sufix = "read";
      break;
    case "mutation":
      sufix = "write";
      break;
    case "subscription":
      sufix = "sub";
      break;
  }

  const name = type.toString()
            .replace(/[\[|\]]/g, "")
            .replace("_", "-")
            .split(/(?=[A-Z])/).join('-').toLowerCase();

  return `${name}-${sufix}`;
}

class GraphQlSecurity {
  constructor({config, ...rest }) {
    Object.assign(this, rest);
    this.auth = new Auth(config);
  }

  async getAuthorization (context) {
    if (context.authorization) 
        return context.authorization;

    if (context.headers.authorization){
        context.authorization = await this.auth.validate(context.headers.authorization);
        return context.authorization;
    }
    else
        throw Error("Authorization header is required.")
  }

  async middleware (resolve, root, args, context, info) {
    const returnType = info.returnType.toString();

    if (!ignoring.includes(returnType)){
        const role = roleName(returnType, info.operation.operation)

        let authorization = await this.getAuthorization(context);

        if (!await authorization.hasRole(role)) {
            throw Error(`The user: ${authorization.user.username} haven't the role: ${role}.`)
            return null;
        }
    }

    const result = await resolve(root, args, context, info)

    return result
    }

}

module.exports = GraphQlSecurity;


