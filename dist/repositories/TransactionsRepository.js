"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction_1 = __importDefault(require("../models/Transaction"));
var Type;
(function (Type) {
    Type["INCOME"] = "income";
    Type["OUTCOME"] = "outcome";
})(Type || (Type = {}));
var TransactionsRepository = /** @class */ (function () {
    function TransactionsRepository() {
        this.transactions = [];
    }
    TransactionsRepository.prototype.all = function () {
        // TODO
        return this.transactions;
    };
    TransactionsRepository.prototype.calculateBalance = function (operator) {
        return this.transactions
            .filter(function (t) { return t.type === operator; })
            .reduce(function (acc, tr) { return acc + tr.value; }, 0);
    };
    TransactionsRepository.prototype.getBalance = function () {
        // TODO
        var income = this.calculateBalance(Type.INCOME);
        var outcome = this.calculateBalance(Type.OUTCOME);
        var total = income - outcome;
        var balance = { income: income, outcome: outcome, total: total };
        return balance;
    };
    TransactionsRepository.prototype.create = function (_a) {
        var title = _a.title, value = _a.value, type = _a.type;
        // TODO
        var transaction = new Transaction_1.default({ title: title, value: value, type: type });
        var total = this.getBalance().total;
        if (type === Type.OUTCOME && total < value) {
            throw Error('Cannot create outcome transaction without a valid balance');
        }
        this.transactions.push(transaction);
        return transaction;
    };
    return TransactionsRepository;
}());
exports.default = TransactionsRepository;
