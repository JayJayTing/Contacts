import {
	Form,
	Input,
	Tooltip,
	Icon,
	Cascader,
	Select,
	Row,
	Col,
	Checkbox,
	Button,
	AutoComplete
} from "antd";
import axios from "axios";
import React, { useState } from "react";
import { ip } from "./helper";
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const width = 500;

class RegistrationForm extends React.Component {
	state = {
		confirmDirty: false,
		autoCompleteResult: []
	};

	handleSubmit = e => {
		this.props.form.validateFieldsAndScroll((err, values) => {
			console.log(e);
			if (!err) {
				console.log("Received values of form: ", values);
				axios
					.post(`${ip}:3001/addContact`, {
						firstName: values.firstName,
						lastName: values.lastName,
						email: values.email,
						gender: values.gender,
						phoneNumber: values.phoneNumber,
						avatar: values.avatar
					})
					.then();
			}
		});
	};

	handleConfirmBlur = e => {
		const { value } = e.target;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	};

	compareToFirstPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && value !== form.getFieldValue("password")) {
			callback("Two passwords that you enter is inconsistent!");
		} else {
			callback();
		}
	};

	validateToNextPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && this.state.confirmDirty) {
			form.validateFields(["confirm"], { force: true });
		}
		callback();
	};

	handleWebsiteChange = value => {
		let autoCompleteResult;
		if (!value) {
			autoCompleteResult = [];
		} else {
			autoCompleteResult = [".com", ".org", ".net"].map(
				domain => `${value}${domain}`
			);
		}
		this.setState({ autoCompleteResult });
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const { autoCompleteResult } = this.state;

		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 }
			}
		};
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0
				},
				sm: {
					span: 16,
					offset: 8
				}
			}
		};
		const prefixSelector = getFieldDecorator("prefix", {
			initialValue: "86"
		})(
			<Select style={{ width: 70 }}>
				<Option value="86">+86</Option>
				<Option value="87">+87</Option>
			</Select>
		);

		const websiteOptions = autoCompleteResult.map(website => (
			<AutoCompleteOption key={website}>{website}</AutoCompleteOption>
		));

		return (
			<Form {...formItemLayout} onSubmit={this.handleSubmit}>
				<Form.Item label="First Name">
					{getFieldDecorator("firstName", {
						rules: [
							{
								required: true,
								message: "Please input your First Name!",
								whitespace: true
							}
						]
					})(<Input style={{ width: width }} />)}
				</Form.Item>
				<Form.Item label="LastName">
					{getFieldDecorator("lastName", {
						rules: [
							{
								required: true,
								message: "Please input your Last Name!",
								whitespace: true
							}
						]
					})(<Input style={{ width: width }} />)}
				</Form.Item>

				<Form.Item label="E-mail">
					{getFieldDecorator("email", {
						rules: [
							{
								type: "email",
								message: "The input is not valid E-mail!"
							},
							{
								required: true,
								message: "Please input your E-mail!"
							}
						]
					})(<Input style={{ width: width }} />)}
				</Form.Item>

				<Form.Item label="Gender">
					{getFieldDecorator("gender", {
						rules: [
							{
								required: true,
								message: "Please input your gender",
								whitespace: true
							}
						]
					})(<Input style={{ width: width }} />)}
				</Form.Item>

				<Form.Item label="Avatar">
					{getFieldDecorator("avatar", {
						rules: [
							{
								required: true,
								message: "Please input the url of the avatar!",
								whitespace: true
							}
						]
					})(<Input style={{ width: width }} />)}
				</Form.Item>
				<Form.Item label="Phone Number">
					{getFieldDecorator("phoneNumber", {
						rules: [
							{ required: true, message: "Please input your phone number!" }
						]
					})(<Input addonBefore={prefixSelector} style={{ width: width }} />)}
				</Form.Item>
				<Form.Item {...tailFormItemLayout}>
					<Button type="primary" htmlType="submit">
						Add
					</Button>
				</Form.Item>
			</Form>
		);
	}
}

const InputForm = Form.create({ name: "register" })(RegistrationForm);

export default InputForm;
