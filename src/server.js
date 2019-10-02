const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");

const { ip } = require("./helper");
//--------------------middleware setup--------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: `${ip}:3000`, credentials: true }));
app.set("trust proxy", 1); // trust first proxy
//--------------------------------------------------------------------------
const server = require("http").createServer(app);

const PORT = 3001;
//these functions are from ./database.js
const { getAllContacts, deleteContact, addContact } = require("./database");

server.listen(PORT, () => {
	console.log(`listening on Port ${PORT}`);
});

app.get("/contacts", (req, res) => {
	getAllContacts().then(result => {
		res.send(result);
	});
});

app.get("/delete/:id", (req, res) => {
	deleteContact(req.params.id).then(result => {
		res.send(result);
	});
});

app.post("/addContact", (req, res) => {
	let firstName = req.body.firstName;
	let lastName = req.body.lastName;
	let email = req.body.email;
	let gender = req.body.gender;
	let phoneNumber = req.body.phoneNumber;
	let avatar = req.body.avatar;
	console.log(
		"addContact: ",
		firstName,
		lastName,
		email,
		gender,
		phoneNumber,
		avatar
	);
	addContact(firstName, lastName, email, gender, phoneNumber, avatar).then(
		results => {
			res.send(results);
		}
	);
});
