require("dotenv").config();
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");

const pool = new Pool(dbParams);

pool.connect();

const getAllContacts = function() {
	return pool
		.query(`SELECT * FROM contacts;`)
		.then(res => res.rows)
		.catch(err => console.error(null, err.stack));
};

exports.getAllContacts = getAllContacts;

const deleteContact = function(id) {
	return pool
		.query(`DELETE FROM contacts WHERE id = $1`, [id])
		.then(res => res.rows)
		.catch(err => console.error(null, err.stack));
};

exports.deleteContact = deleteContact;

const addContact = (
	firstName,
	lastName,
	email,
	gender,
	phoneNumber,
	avatar
) => {
	return pool
		.query(
			`INSERT INTO contacts (first_name, last_name, email, gender, avatar, phone_number) values ($1, $2, $3, $4, $5, $6);`,
			[firstName, lastName, email, gender, avatar, phoneNumber]
		)
		.then(res => res.rows)
		.catch(err => console.error(null, err.stack));
};
exports.addContact = addContact;
