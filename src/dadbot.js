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

        let lowerCase = (str) => {
            if (str == undefined) return undefined;
            return str.toLowerCase();
        };

        let isIntensifier = (str) =>
            intensifiers.indexOf(str.toLowerCase()) >= 0;

        let firstWord = lowerCase(res.match[1]);
        let secondWord = lowerCase(res.match[2]);

        // caught something like "i am very very tired"
        if (isIntensifier(firstWord) && firstWord == secondWord) {
            let message = res.message.text.
                substr(res.match.index).
                toLowerCase();
            message = message.substr(message.indexOf(firstWord));
            let wordStack = message.split(/\s+/i).reverse();
            // trim off our current firstWord and secondWord
            wordStack.pop();
            wordStack.pop();
            // consume to end of string looking for a terminator
            while (firstWord == secondWord && wordStack.length > 0) {
                secondWord = wordStack.pop();
            }

            // no terminator found, use basic response
            if (firstWord == secondWord) {
                secondWord = undefined;
            }
        }

        firstWord = capitalize(firstWord);
        secondWord = capitalize(secondWord);

        if (secondWord == undefined || !isIntensifier(firstWord)
        ) {
            res.reply(`Hi ${firstWord}, I'm ${robot.name}!`);
        } else {
            res.reply(`Hi Mr(s) ${secondWord}, can I call you ${firstWord}?`);
        }
    });
  };
