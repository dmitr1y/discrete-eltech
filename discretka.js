var debug = require('debug')('discretka');

getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

function integerDivision(x, y) {
    return (x - x % y) / y;
}

function emptyTable(table) {
    for (i = 0; i < table.length; i++) {
        for (j = 0; j < table[0].length; j++) {
            table[i][j] = "";
        }
    }
}

function badTableSize(arr) {
    if (arr.length < 6 || arr.length > 8) {
        return true
    } else return false;
}

var nod = {
    solve: function (a, b, s) {
        if (s !== "no-debug")
            debug("nod. (solve) Requested with a=" + a + ", b=" + b);
        generated = false;
        if (a === undefined && b === undefined) {
            a = getRandomInt(4, 400);
            b = getRandomInt(4, 400);
            generated = true;
        }
        result = {input: [a, b], table: [[a, b], ["", ""]]};
        while (b !== 0) {
            div = integerDivision(a, b);
            mod = a % b;
            result.table[1].push(div);
            result.table[0].push(mod);
            a = b;
            b = mod;
        }
        result.output = a;
        if (badTableSize(result.table[0]) && generated) {
            this.solve();
        }
        if (s !== "no-debug")
            debug("nod. (solve) Successful: " + JSON.stringify(result.input) + "=" + result.output);
        return result;
    },
    create: function (a, b, s) {
        if (s !== "no-debug")
            debug("nod. (create) Requested...");
        result = this.solve();
        emptyTable(result.table);
        delete result.output;
        if (s !== "no-debug")
            debug("nod. (create) Generated task: %s", JSON.stringify(result.input));
        return result;
    },
    isMituralEasy: function (a, b) {
        data = this.solve(a, b, "no-debug");
        return data.output === 1;
    },
    properties: ['input', 'output', 'table']
};

var euclidex = {
    build_table: function (result, sign) {
        if (sign === "+") {
            result.table.push([0, 1], [1, 0]);
            for (i = 2; i < result.table[0].length; i++) {
                add_to_3 = result.table[2][i - 2] + result.table[2][i - 1] * result.table[1][i];
                add_to_4 = result.table[3][i - 2] + result.table[3][i - 1] * result.table[1][i];
                result.table[2].push(add_to_3);
                result.table[3].push(add_to_4);
            }
        } else {
            result.table.push([1, 0], [0, 1]);
            for (i = 2; i < result.table[0].length; i++) {
                add_to_3 = result.table[2][i - 2] - result.table[2][i - 1] * result.table[1][i];
                add_to_4 = result.table[3][i - 2] - result.table[3][i - 1] * result.table[1][i];
                result.table[2].push(add_to_3);
                result.table[3].push(add_to_4);
            }
        }

        delete result.output;
        //debug("euclidex. (solve) Successful: %s", JSON.stringify(result.input));
        return result;
    },
    solve: function (a, b, sign) {
        //debug("euclidex. (solve) Requested with a = %s, b = %s and special %s", a, b, sign);
        if (a === undefined && b === undefined) {
            do {
                a = getRandomInt(4, 400);
                b = getRandomInt(4, 400);
                result = nod.solve(a, b, "no-debug");
                if (sign === ">") {
                    abiggerthenb = a > b;
                } else abiggerthenb = true;
                if (result.output === 1 && !badTableSize(result.table[0]) && abiggerthenb) break;
            } while (true);
            return this.build_table(result, sign);
        } else {
            result = nod.solve(a, b, "no-debug");
            if (result.output === 1) {
                return this.build_table(result, sign);
            } else {
                debug("euclidex. (solve) Error: isMituralEasy = false.");
                return {"error_message": "Числа не взаимно простые."};
            }
        }
    },
    create: function () {
        debug("euclidex. (create) Requested...");
        result = this.solve();
        emptyTable(result.table);
        debug("euclidex. (create) Generated task: %s", JSON.stringify(result.input));
        return result;
    },
    properties: ['input', 'table']
};

var axby1 = {
    solve: function (a, b) {
        result = euclidex.solve(a, b);
        j = result.table[0].length - 2;
        result.output = [];
        result.output.push(result.table[2][j], result.table[3][j]);
        return result;
    },
    create: function () {
        result = this.solve();
        delete result.output;
        emptyTable(result.table);
        return result;
    },
    properties: ['input', 'table', 'output']
};

var fraction = {
    solve: function (a, b) {
        result = nod.solve(a, b);
        delete result.output;
        result.output = result.table[1].slice(2);
        if (result.output[0] === 0)
            result.output = result.output.slice(1);
        return result;
    },
    create: function (a, b) {
        result = this.solve();
        emptyTable(result.table);
        return result;
    },
    properties: ['input', 'table']
};

var convergents = {
    solve: function (a, b) {
        return euclidex.solve(a, b, "+");
    },
    create: function () {
        return euclidex.create();
    },
    properties: ['input', 'table']
};

var inverse = {
    solve: function (a, b) {
        obj = euclidex.solve(a, b, ">");
        obj.table.splice(2, 1);
        inverse_element = obj.table[2][obj.table[2].length - 2];
        obj.output = inverse_element > 0 ? inverse_element : inverse_element + obj.table[0][0];
        return obj;
    },
    create: function () {
        result = this.solve();
        delete result.output;
        emptyTable(result.table);
        return result;
    },
    properties: ['input', 'output']
};

var diophantine = {
    solve: function (a, b, c) {
        console.log('diophantine');
        if (a === undefined, b === undefined) {
            do {
                a = getRandomInt(3, 200);
                b = getRandomInt(3, 200);
                result = nod.solve(a, b, "no-debug");
                if (result.output > 1 && !badTableSize(result.table[0])) {
                    a = result.input[0];
                    b = result.input[1];
                    break;
                }
            } while (true);
        } else result = nod.solve(a, b, "no-debug");
        console.log(result);
        d = result.output; // nod
        c = c === undefined ? d * getRandomInt(3, 20) : c;
        a1 = a / result.output;
        b1 = b / result.output;
        c1 = c / result.output;
        before_table = result.table;
        var swape = euclidex.solve(a1, b1);
        //magic
        result.table[0] = before_table[0];
        result.table[1] = before_table[1];
        result.input[0] = a;
        result.input[1] = b;
        result.input.push(c);
        x = [result.table[2][result.table[2].length - 2] * c1, b / d];
        y = [result.table[3][result.table[3].length - 2] * c1, -a / d];
        result.output = {
            nod: d,
            a: a1,
            b: b1,
            c: c1,
            x: x,
            y: y
        };
        return result;

    },
    create: function () {
        result = this.solve();
        delete result.output;
        emptyTable(result.table);
        return result;
    },
    properties: ['input', 'table', 'output']
};

var fastdegree = {
    solve: function (a, b) {
        result = {};
        a = a === undefined ? a = getRandomInt(2, 7) : a;
        b = b === undefined ? b = getRandomInt(5, 16) : b;

        result.input = [a, b];
        result.table = [[], []];
        result.output = Math.pow(a, b);

        b_binary = b.toString(2);
        c = 1;
        for (i = 0; i < b_binary.length; i++) {
            result.table[0].push(parseInt(b_binary[i]));
            if (b_binary[i] === '1')
                c = c * c * a;
            else
                c = c * c;
            result.table[1].push(c);
        }
        return result;
    },
    create: function () {
        result = this.solve();
        delete result.output;
        emptyTable(result.table);
        return result;
    },
    properties: ['input', 'table', 'output']
};

var conversion = {
    solve: function (a, b, c) {
        a = a === undefined ? getRandomInt(1000, 7000) : a;
        b = b === undefined ? getRandomInt(3, 10) : b;
        c = c === undefined ? getRandomInt(3, 10) : c;
        while (b === c) c = getRandomInt(3, 10);
        a = a.toString(b);
        result = {};
        result.input = [parseInt(a), b, c];
        result.table = [[], []];
        for (i = 0; i < a.length; i++) {
            ai = parseInt(a[i]);
            if (i) {
                number = parseInt((parseInt(result.table[1][i - 1], c) * b + ai).toString(c));
            } else number = parseInt(ai.toString(c));
            result.table[0].push(ai);
            result.table[1].push(number);
        }
        result.output = parseInt(parseInt(a, b).toString(c));
        return result;
    },
    create: function () {
        result = this.solve();
        delete result.output;
        emptyTable(result.table);
        return result;
    },
    properties: ['input', 'table', 'conversion']
};

var horner = {
    solve: function (array, b) {
        result = {};
        if (array === undefined) {
            array = [];
            n = getRandomInt(4, 6);
            random = 0;
            for (i = 0; i < n; i++) {
                if (!i) {
                    firstIsNull = true;
                    do {
                        random = getRandomInt(-10, 10);
                        if (random) firstIsNull = false;
                    } while (firstIsNull);
                } else random = getRandomInt(-10, 10);
                array.push(random);
            }
        }
        if (b === undefined) {
            do {
                b = getRandomInt(-10, 10);
            } while (b === 0)
        }
        result.input = [array, b];
        array_space = [""];
        array_space = array_space.concat(array);
        result.table = [array_space, [b]];
        for (i = 1; i < array_space.length; i++) {
            if (i !== 1) {
                number = result.table[1][i - 1] * b + array_space[i];
            } else number = array_space[i];
            result.table[1].push(number);
        }
        if (result.table[1][result.table[1].length - 1] > 50 || result.table[1][result.table[1].length - 1] < -50)
            this.solve();
        return result;
    },
    create: function () {
        result = this.solve();
        emptyTable(result.table);
        return result;
    },
    properties: ['input', 'table']
};

var pem = {
    solve: function (a, b) {
        result = nod.solve(a, b);
        result = euclidex.build_table(result);
        return result.table;
    }
};

module.exports.getRandomInt = getRandomInt;
module.exports.nod = nod;
module.exports.euclidex = euclidex;
module.exports.axby1 = axby1;
module.exports.convergents = convergents;
module.exports.inverse = inverse;
module.exports.diophantine = diophantine;
module.exports.fastdegree = fastdegree;
module.exports.conversion = conversion;
module.exports.horner = horner;
module.exports.fraction = fraction;
module.exports.pem = pem;
