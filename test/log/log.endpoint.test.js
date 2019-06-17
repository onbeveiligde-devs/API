const assert = require('assert');
const request = require('supertest');
const {
    app
} = require('../../app');
const Log = require('../../src/models/db/Log');