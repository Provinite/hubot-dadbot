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
            if (!str) return str;
            let words = str.split(/\s+/);
            let result = '';
            for (word of words) {
                result += word[0].toUpperCase() +
                    word.substr(1, word.length - 1).toLowerCase() +
                    ' ';
            }
            return result.trim();
        };

        let lowerCase = (str) => {
            if (!str) return str;
            return str.toLowerCase();
        };

        let isIntensifier = (str) =>
            str ? intensifiers.indexOf(str.toLowerCase()) >= 0 : false;

        let dadlyResponse = (terminator) => {
            res.reply(`Hi ${capitalize(terminator)}, I'm ${robot.name}!`);
        };

        let dadliestResponse = (intensifier, terminator) => {
            res.reply(
                `Hi Mr(s) ${capitalize(terminator)}, can I call you ` +
                `${capitalize(intensifier)}?`
            );
        };

        let intensifier = lowerCase(res.match[1]);
        let terminator = lowerCase(res.match[2]);

        // single-word situation, eg "I am tired"
        if (!terminator) {
            terminator = intensifier;
            intensifier = undefined;
        }

        // caught something like "i am so very", start looking for a terminator
        if (isIntensifier(intensifier) && isIntensifier(terminator)) {
            // get the user's entire message, ignoring the part before our match
            let message = res.message.text.
                substr(res.match.index).
                toLowerCase();

            // ignore the leading "i am/im/i'm"
            message = message.substr(message.indexOf(intensifier));

            let wordStack = message.split(/\s+/).reverse();

            // trim off the stuff we've already looked at
            wordStack.pop();
            wordStack.pop();

            // consume to end of string looking for a terminator
            while (isIntensifier(terminator) && wordStack.length > 0) {
                intensifier += ' ' + terminator;
                terminator = wordStack.pop();
            }

            // no terminator found, use basic response with first word only
            if (isIntensifier(terminator)) {
                terminator = res.match[1];
                intensifier = undefined;
            }
        }

        if (intensifier == undefined) {
            dadlyResponse(terminator);
        } else {
            dadliestResponse(intensifier, terminator);
        }
    });
  };
