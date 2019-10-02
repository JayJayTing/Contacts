import { Table, Button, Divider, Form } from "antd";
import React, { useState } from "react";
import axios from "axios";
import InputForm from "./InputForm";
import { Record } from "immutable";
import { ip } from "./helper";
//const ip = "http://192.168.2.41";

class ContactTable extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		filteredInfo: null,
		sortedInfo: null,
		data: null
	};

	handleChange = (pagination, filters, sorter) => {
		console.log("Various parameters", pagination, filters, sorter);
		this.setState({
			filteredInfo: filters,
			sortedInfo: sorter
		});
	};
	componentDidMount = () => {
		console.log(this.state);
		axios
			.get(`http://192.168.2.41:3001/contacts`)
			.then(res => {
				this.setState({ ...this.state, data: res.data });
				console.log(res.data);
			})

			.catch(err => console.log(err));
	};
	clearFilters = () => {
		this.setState({ filteredInfo: null });
	};

	clearAll = () => {
		this.setState({
			filteredInfo: null,
			sortedInfo: null
		});
	};

	setAgeSort = () => {
		this.setState({
			sortedInfo: {
				order: "descend",
				columnKey: "age"
			}
		});
	};
	handleAdd = () => {
		const { count, dataSource } = this.state;
		const newData = {
			key: count,
			name: `Edward King ${count}`,
			age: 32,
			address: `London, Park Lane no. ${count}`
		};
		this.setState({
			dataSource: [...dataSource, newData],
			count: count + 1
		});
	};

	render() {
		let { sortedInfo, filteredInfo } = this.state;
		sortedInfo = sortedInfo || {};
		filteredInfo = filteredInfo || {};
		const columns = [
			{
				title: "First Name",
				dataIndex: "first_name",
				key: "first_name",
				// filters: [{ text: "Joe", value: "Joe" }, { text: "Jim", value: "Jim" }],
				// filteredValue: filteredInfo.first_name || null,
				onFilter: (value, record) => record.first_name.includes(value),
				sorter: (a, b) => a.first_name.localeCompare(b.first_name),
				sortOrder: sortedInfo.columnKey === "first_name" && sortedInfo.order
			},
			{
				title: "Last Name",
				dataIndex: "last_name",
				key: "last_name",
				onFilter: (value, record) => record.last_name.includes(value),
				sorter: (a, b) => a.last_name.localeCompare(b.last_name),
				sortOrder: sortedInfo.columnKey === "last_name" && sortedInfo.order
			},
			{
				title: "email",
				dataIndex: "email",
				key: "email"
			},

			{
				title: "Gender",
				dataIndex: "gender",

				width: "20%",
				onFilter: (value, record) => record.gender.includes(value),
				sorter: (a, b) => a.gender.localeCompare(b.gender),
				sortOrder: sortedInfo.columnKey === "gender" && sortedInfo.order
			},
			{
				title: "Phone",
				dataIndex: "phone_number",
				key: "phone_number"
			},
			{
				title: "Avatar",
				dataIndex: "avatar",
				key: "avatar",
				render: (text, record) => <img src={record.avatar}></img>
			},
			{
				title: "Action",
				key: "action",
				render: (text, record) => (
					<span>
						<Button
							onClick={() => {
								console.log(record);
								axios
									.get(`${ip}:3001/delete/${record.id}`)
									.then(() => {
										axios.get(`${ip}:3001/contacts`).then(res => {
											this.setState({ ...this.state, data: res.data });
										});
									})

									.catch(err => console.log(err));
							}}
						>
							Delete
						</Button>
					</span>
				)
			}
		];
		return (
			<div>
				<Table
					columns={columns}
					dataSource={this.state.data}
					onChange={this.handleChange}
				/>
				<InputForm></InputForm>,
			</div>
		);
	}
}

export default ContactTable;
