// Description
//   A hubot script to provide the dadliest responses.
//
// Configuration:
//   None
//
// Commands:
//   None
//
// Notes:
//   This bot will respond to any message containing something
//   like "i am hungry"
//
// Author:
//   Collin Driscoll <cdriscoll@akitabox.com>
module.exports = (robot) => {
    const intensifiers = [
        'amazingly',
        'astoundingly',
        'awfully',
        'awful',
        'barely',
        'bloody',
        'crazy',
        'dead',
        'dreadfully',
        'colossally',
        'especially',
        'exceptionally',
        'excessively',
        'extremely',
        'extraordinarily',
        'fantastically',
        'frightfully',
        'fully',
        'Hella',
        'holy',
        'incredibly',
        'insanely',
        'literally',
        'mad',
        'mightily',
        'moderately',
        'most',
        'outrageously',
        'phenomenally',
        'quite',
        'radically',
        'rather',
        'real',
        'really',
        'remarkably',
        'right',
        'sick',
        'so',
        'somewhat',
        'strikingly',
        'super',
        'supremely',
        'surpassingly',
        'terribly',
        'terrifically',
        'too',
        'totally',
        'uncommonly',
        'unusually',
        'veritable',
        'very',
        'wicked',
    ];

    robot.hear(/\b(?:I'm|I\s+am|im)\s+(\w+)(?:\s+(\w+))?/i, (res) => {
        let capitalize = (str) => {
            if (str == undefined) return undefined;
            return str[0].toUpperCase() +
                str.substr(1, str.length - 1).toLowerCase();
        };

        let firstWord = capitalize(res.match[1]);
        let secondWord = capitalize(res.match[2]);

        if (
            secondWord == undefined
            || intensifiers.indexOf(firstWord.toLowerCase()) < 0
        ) {
            res.reply(`Hi ${firstWord}, I'm ${robot.name}!`);
        } else {
            res.reply(`Hi Mr(s) ${secondWord}, can I call you ${firstWord}?`);
        }
    });
  };
