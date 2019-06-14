
class SchemaValidator {
  validate(name){
    const type = schemaBuilded._typeMap[name];
    var fields = type.getFields();
    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      //const { resolve = defaultFieldResolver } = field;
      console.log("field.name: " + fieldName)
      console.log("field.safe: " + field.safe)
      
      if (!field.safe){
        throw new Error(`The type ${type.name}.${fieldName} haven't directive @auth. `);
      }
    });
  }
}

module.exports = SchemaValidator;