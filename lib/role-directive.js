const { defaultFieldResolver } = require("graphql");
const { SchemaDirectiveVisitor } =  require("graphql-tools");

const getRoleName = (args, typeName, fieldName)=>{
  const { role } = args;
  let roleName;

  if (role)
    roleName = role;
  else {
    let prefix;
    if (fieldName)
      prefix = `${typeName}-${fieldName}`.toLowerCase();
    else
      prefix = `${typeName}`.toLowerCase();
    
    if (typeName.toLowerCase() == "mutation") 
      roleName = `${prefix}-write`
    else
      roleName = `${prefix}-read`

  }
  return roleName;
}

class RoleDirective extends SchemaDirectiveVisitor {
  
  visitObject(type) {


    const fields = type.getFields();
    const { role } = this.args;

    if (!role)
      throw new Error(`Role name is null for ${objectType.name}`);

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;
      field.safe = true
      field.resolve = async function (...args) {
        const context = args[2];

        if (!context.authorization.hasRole(role))
          throw new Error(`not authorized 2 ${type.name}.${field.name} role: ${role}`);

        return await resolve.apply(this, args);
      };
    });
  }

  visitFieldDefinition(field, details) {
    
    const objectType = details.objectType;
    const { resolve = defaultFieldResolver } = field;
    const { role } = this.args;

    if (!role)
      throw new Error(`Role name is null for ${objectType.name}.${field.name}`);

    field.resolve = async function (...args) {

      const context = args[2];

      if (!context.authorization.hasRole(role))
        throw new Error(`not authorized 2 ${objectType.name}.${field.name} role: ${role}`);
      return await resolve.apply(this, args);
    };
  }

  visitInputFieldDefinition(field) {
  }
}

module.exports = RoleDirective;
