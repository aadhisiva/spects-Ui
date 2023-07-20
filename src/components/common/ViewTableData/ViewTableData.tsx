import React from 'react'
import { Col, Form, Modal, Row } from 'antd';
import { ReUseInputFeild } from '../ReUseInputFeild';
import { useLocation } from 'react-router';

type mofdifyModalI = {
    state: any;
    visible: boolean;
    onCancel?: () => void;
    editMode?: boolean,
    districtsData?: any[],
    setRuralOrUrban?: (e: any) => void
}
export const ViewTableData: React.FC<mofdifyModalI> = ({
    state,
    visible,
    onCancel,
}
) => {
    const [form] = Form.useForm();

    form.setFieldsValue({
        refractionist_name: state.refractionist_name,
        name: state.name,
        phone_number: state.phone_number,
        district: state.district,
        taluka: state.taluka,
        sub_centre: state.sub_centre,
        village: state.village,
        status: state.status,
        details: state.details,
        type: state.type,
        left_eye_sph: state.left_eye_sph_plus? "+" +state.left_eye_sph_plus : "-" + state.left_eye_sph_minus,
        left_eye_cyl: state.left_eye_cyl_plus? "+" +state.left_eye_cyl_plus : "-" + state.left_eye_cyl_minus,
        left_eye_axis: state.left_eye_axis,
        left_eye_va: state.left_eye_va,
        right_eye_sph: state.right_eye_sph_plus? "+" +state.right_eye_sph_plus : "-" + state.right_eye_sph_minus,
        right_eye_cyl: state.right_eye_cyl_plus? "+" +state.right_eye_cyl_plus : "-" + state.right_eye_cyl_minus,
        right_eye_axis: state.right_eye_axis,
        right_eye_va: state.right_eye_va,
        near_eye_sph: state.near_vision_sph,
        near_eye_cyl: state.near_vision_cyl,
        near_eye_axis: state.near_vision_axis,
        near_eye_va: state.near_vision_va,
    });
    return (
        <div>
            <Modal
                open={visible}
                title={"View Details"}
                cancelText="Cancel"
                onCancel={onCancel}
                centered
                width={1000}
                onOk={() => {
                    form
                        .validateFields()
                        .then(onCancel)
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                >
                    <Row justify={"space-evenly"}>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                name={"refractionist_name"}
                                label={"Refractionist Name"}
                                readOnly={true}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                name={"name"}
                                label={"Name"}
                                readOnly={true}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                name={"phone_number"}
                                label={"Phone Number"}
                                readOnly={true}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                name={"type"}
                                label={"Type"}
                                readOnly={true}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                name={"details"}
                                label={"Details"}
                                readOnly={true}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                name={"district"}
                                label={"District"}
                                readOnly={true}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                name={"taluka"}
                                label={"Taluka"}
                                readOnly={true}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                name={"sub_centre"}
                                label={"Sub Centre"}
                                readOnly={true}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                tabIndex={1}
                                name={"status"}
                                label={"Status"}
                                readOnly={true}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                tabIndex={1}
                                name={"left_eye_sph"}
                                label={"Left Eye Sph"}
                                readOnly={true}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                tabIndex={1}
                                name={"left_eye_cyl"}
                                label={"Left Eye Sph Cyl"}
                                readOnly={true}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                tabIndex={1}
                                name={"left_eye_axis"}
                                label={"Left Eye Axis"}
                                readOnly={true}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                tabIndex={1}
                                name={"left_eye_va"}
                                label={"Left Eye Va"}
                                readOnly={true}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                tabIndex={1}
                                name={"right_eye_sph"}
                                label={"Right Eye Sph"}
                                readOnly={true}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                tabIndex={1}
                                name={"right_eye_cyl"}
                                label={"Right Eye Cyl"}
                                readOnly={true}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                tabIndex={1}
                                name={"right_eye_axis"}
                                label={"Right Eye Axis"}
                                readOnly={true}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                tabIndex={1}
                                name={"right_eye_va"}
                                label={"Right Eye Va"}
                                readOnly={true}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                tabIndex={1}
                                name={"near_eye_sph"}
                                label={"Near Vision Sph"}
                                readOnly={true}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                tabIndex={1}
                                name={"near_eye_cyl"}
                                label={"Near Vision Cyl"}
                                readOnly={true}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                tabIndex={1}
                                name={"near_eye_axis"}
                                label={"Near Vision Axis"}
                                readOnly={true}
                            />
                        </Col>
                        <Col sm={7} xs={24}>
                            <ReUseInputFeild
                                tabIndex={1}
                                name={"near_eye_va"}
                                label={"Near Vision Va"}
                                readOnly={true}
                            />
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
};