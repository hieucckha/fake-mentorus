import React, { useState } from "react";
import { Button, Form, Input, Modal, Radio } from "antd";

interface ModalProps {
	handleCancel: () => void;
	openModal: boolean;
}
type LayoutType = Parameters<typeof Form>[0]["layout"];
const AdminEditUser: React.FC<ModalProps> = ({ handleCancel, openModal }) => {
	const [form] = Form.useForm();
	const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");

	const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
		setFormLayout(layout);
	};

	const formItemLayout =
		formLayout === "horizontal"
			? { labelCol: { span: 4 }, wrapperCol: { span: 14 } }
			: null;

	
    
	return (
		<>
			<Modal
				title="Edit User"
				open={openModal}
				onOk={()=>{
                    console.log(form.getFieldsValue());
                    form.validateFields().then(() => form.submit())
                    handleCancel();
                }}
				onCancel={handleCancel}
			>
				<Form
					{...formItemLayout}
					layout={formLayout}
					form={form}
					initialValues={{ layout: formLayout }}
					onValuesChange={onFormLayoutChange}
					style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}
                    onFinish={(values) => console.log(values)}
				>
				
					<Form.Item label="First Name" name='firstName'>
						<Input className='w-full rounded text-sm border-gray-200 font-si ' placeholder="van A" />
					</Form.Item>
					<Form.Item label="Last Name" name='lastName' >
						<Input className='rounded text-sm border-gray-200' placeholder="Nguyen" />
					</Form.Item>
                    <Form.Item label="Student ID" name='studentId' >
						<Input className='rounded text-sm border-gray-200' placeholder="13465443" />
					</Form.Item>
					
				</Form>
			</Modal>
		</>
	);
};

export default AdminEditUser;
