const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true
    },
    phoneno: {
        type: Number,
        unique: true,
        required: true
    },
    fullname: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true
    },
    district: {
        type: String,
        uppercase: true,
        required: true
    },
    state: {
        type: String,
        uppercase: true,
        required: true
    },
    professionalexpinyr: {
        type: Number,
        required: true
    },
    professionalexpinmon: {
        type: Number,
        required: true
    },
    skillarea: {
        type: String,
        required: true
    },
    actualskill: {
        type: String,
        required: true
    },
    readytoallocate: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', orderSchema);