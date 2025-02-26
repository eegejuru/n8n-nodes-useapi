"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const UseApi_node_1 = require("./nodes/UseApi/UseApi.node");
const Gen3Turbo_node_1 = require("./nodes/runwayml/Gen3Turbo.node");

exports.nodes = [
    UseApi_node_1.UseApi,
    Gen3Turbo_node_1.Gen3Turbo,
];
