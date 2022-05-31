import handlebars from 'handlebars';
import fs from 'fs';

export interface ITemplateVariable {
  [key: string]: string | number
}

export interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

export class HandlebarsTemplate {

  async parser({
     file,
     variables
  }: IParseMailTemplate) {
    //lendo arquivo
    const templateFileContent = await fs.promises.readFile(file, { encoding: 'utf-8' })
    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}