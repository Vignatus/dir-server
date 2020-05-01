import {get, param} from '@loopback/rest';
import * as child from 'child_process';

export class DisplayController {
  constructor() {}

  @get('/display', {
    responses: {
      '200': {
        description: 'Display the directory',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'string', title: 'FileNames'
              },
            },
          },
        },
      },
    },
  })
  async display(
    @param.query.number('items', {required: true}) items: number,
  ): Promise<Array<string>> {
    let result: string = await this.execShellCommand("dir");
    let fileNames = this.extractFileNames(result);
    // Returning only the queried number
    return fileNames.slice(0, items);
  }

  execShellCommand(cmd: string): Promise<string> {
    return new Promise((resolve, reject) => {
      child.exec(cmd, (error, stdout, stderr) => {
        if (error) {
          console.warn(error);
        }
        resolve(stdout ? stdout : stderr);
      });
    });
  }

  extractFileNames(input: string): Array<string> {
    // Splitting string into lines
    let initialArray = input.split("\n");
    let result: Array<string> = [];
    for (let i = 0; i < initialArray.length; i++) {
      let element = initialArray[i];
      // Regex to test if the line start with a date
      let regex: RegExp = /^(?:0?[1-9]|[12][0-9]|3[01])[\/\-](?:0?[1-9]|1[012])[\/\-]\d{4}/
      if (regex.test(element)) {
        let lineSplit = element.split(" ");
        // Filtering for files only
        if (lineSplit.length < 7 || lineSplit[6] == "<DIR>") continue;
        let fileName = lineSplit[lineSplit.length - 1];
        // Removing the \r at suffix
        result.push((fileName.split("\r"))[0]);
      }
    }
    return result;
  }
}
