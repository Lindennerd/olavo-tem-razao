const olavoOptions = require('../generator');

function OlavosMind() {

    function getPlural(word) {
        if (word === "trabalha(m)") return "trabalham";
        if (word === "é/são") return "são";
        if (word === "conspira(m)") return "conspiram";
        if (word === "doa(m)") return "doam";
        if (word === "está(ão)") return "estão";
        if (word === "apoia(m)") return "apoiam";
    }

    function getSingular(word) {
        if (word === "trabalha(m)") return "trabalha";
        if (word === "é/são") return "é";
        if (word === "conspira(m)") return "conspira";
        if (word === "doa(m)") return "doa";
        if (word === "está(ão)") return "está";
        if (word === "apoia(m)") return "apoia";
    }

    function getMasculino(word) {
        if (word === "as/os") return "os";
        if (word === "pelos(as)") return "pelos";
        if (word === "às(aos)") return "aos";
        if (word === "das(os)") return "dos";
    }

    function getFeminino(word) {
        if (word === "as/os") return "as";
        if (word === "pelos(as)") return "pelas";
        if (word === "às(aos)") return "às";
        if (word === "das(os)") return "das";
    }

    function createPhrase(who, are, workingWith, todo) {
        var regExp = /(^.*?\s).*(\s.*$)/;
        var words = regExp.exec(are).map(function(val, index) {
            return val.trimLeft().trimRight();
        });
        
        are = are.replace(words[1], who.plural === 1
            ? getPlural(words[1])
            : getSingular(words[1]));

        are = are.replace(words[words.length -1], workingWith.gender === "M"
            ? getMasculino(words[words.length -1])
            : getFeminino(words[words.length -1]));

        return [who.text, are, workingWith.text, todo].join(" ");
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function generateTheory(whoInd, areInd, workingWithInd, todoInd) {
        var whoIndex = whoInd
            ? whoInd
            : getRandomInt(0, olavoOptions.who.length);

        var areIndex = areInd
            ? areInd
            : getRandomInt(0, olavoOptions.are.length);

        var workingWithIndex = workingWithInd
            ? workingWithInd
            : getRandomInt(0, olavoOptions.workingWith.length);

        var todoIndex = todoInd
            ? todoInd
            : getRandomInt(0, olavoOptions.todo.length);

        var olavoTheory = createPhrase(
            olavoOptions.who[whoIndex],
            olavoOptions.are[areIndex],
            olavoOptions.workingWith[workingWithIndex],
            olavoOptions.todo[todoIndex]);

        return olavoTheory;
    }


    return {
        generateTheory
    }
};

module.exports = new OlavosMind();