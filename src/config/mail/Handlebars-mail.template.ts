import handlebars from 'handlebars';

export interface ITemplateVariable {
  [key: string]: string | number
}

export interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariable;
}

export class HandlebarsTemplate {

  async parser({
     template,
     variables
  }: IParseMailTemplate) {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}