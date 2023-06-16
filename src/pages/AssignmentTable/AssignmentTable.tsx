import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Form, Input, Row, Select, Table, message, notification } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import styles from "./AssignmentTable.module.scss";
import classNames from "classnames";
import "./AssignmentTable.custom.scss";
import { useNavigate } from 'react-router';
import { TitleBarComponent } from '../../components/common/titleBar';
import { Option } from 'antd/es/mentions';
import { SearchOutlined } from "@ant-design/icons";
import DummyData from "../dommy.json";
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { NotificationInfo, NotificationSuccess } from '../../components/common/Notifications/Notifications';
import { ModalModify } from '../../components/common/ModalModify';
import { SelectItems } from '../../components/common/SelectItems';
import SelectRowsPerPage from '../../components/common/SelectItems/SelectRowsPerPage';

interface DataType {
    key: string,
    designation: string;
    name: string;
    contact_number: string;
    district: string;
    taluka: string;
    sub_center: string;
};

export const AssignmentTable: React.FC = () => {
    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [tableData, setTableData] = useState<DataType[]>(DummyData);
    const [visible, setVisisble] = useState(false);
    const [formData, setFormData] = useState({});
    const [selctedData, setSelectedData] = useState({
        designation: "",
        district: "",
        taluka: "",
        sub_center: ""
    })
    const selectDataTypes = ["district", "taluka", "Sub center", "state", "admin"];
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [queryString, setQueryString] = useState<string>("");
    const navigate = useNavigate();

    const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setCurrentPage(Number(pagination?.current));
        setRowsPerPage(Number(pagination.pageSize));
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<DataType>);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
            filteredValue: [queryString],
            onFilter: (value: any, record) => {
                return (
                    String(record.designation).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.name).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.contact_number).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.district).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.sub_center).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.taluka).toLowerCase().includes(value.toLowerCase())
                );
            },
            sorter: (a, b) => a.designation.length - b.designation.length,
            sortOrder: sortedInfo.columnKey === 'designation' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Contact Number',
            dataIndex: 'contact_number',
            key: 'contact_number',
            sorter: (a, b) => a.contact_number.length - b.contact_number.length,
            sortOrder: sortedInfo.columnKey === 'contact_number' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'District',
            dataIndex: 'district',
            key: 'district',
            sorter: (a, b) => a.district.length - b.district.length,
            sortOrder: sortedInfo.columnKey === 'district' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Taluka',
            dataIndex: 'taluka',
            key: 'taluka',
            sorter: (a, b) => a.taluka.length - b.taluka.length,
            sortOrder: sortedInfo.columnKey === 'taluka' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Sub Center',
            key: 'sub_center',
            dataIndex: 'sub_center',
            sorter: (a, b) => a.sub_center.length - b.sub_center.length,
            sortOrder: sortedInfo.columnKey === 'sub_center' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Button onClick={() => handleModifyForm(record)} type='primary'>
                        Modify
                    </Button>
                )
            }
        },
    ];

    const handleClick = (path: string) => {
        navigate(path)
    };

    const onSave = (values: object) => {
        console.log('Received values of form: ', values);
        setVisisble(false);
    };


    const handleModifyForm = (row: object) => {
        setVisisble(true);
        setFormData(row);

    };
    const FormOpen = () => {
        return <ModalModify
            state={formData}
            visible={visible}
            onCancel={() => setVisisble(false)}
            onSave={onSave}
        />
    };
    const handleCh = (value: string) => {
        NotificationSuccess("success");
        setRowsPerPage(Number(value))
    };

    const onFinish = (values: string) => {
        console.log(values);
        NotificationSuccess(`Success`);
    };
    // console.log("formData", formData)
    const onHandleSelectItemChange = (type: string, value: string) => {
        setSelectedData((prev) => ({
            ...prev,
            [type]: value
        }))
    };
    const handleSearchSelectedItem = () => {
        if (selctedData.designation == "") NotificationInfo(`Please Select designation`);
        else if (selctedData.district == "") NotificationInfo(`Please Select district`);
        else if (selctedData.taluka == "") NotificationInfo(`Please Select taluka`);
        else if (selctedData.taluka == "") NotificationInfo(`Please Select sub_center`)
        else {
            return NotificationSuccess(`Success`)
        }

    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const handleSearchQueryString = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryString(e.target.value);
    };

    return (
        <>
            {visible ? FormOpen() : ("")}
            <TitleBarComponent title={"Assignment List"} image={true} />
            <div className={classNames(styles.assignmentTable, "assignment-page-list")}>
                <div className={styles.table}>
                    <Row>
                        <Col sm={3} xs={24} className={styles.statisticsContainer}>
                            <div className={styles.statistics}>
                                <span className={styles.title}>Filters</span>
                            </div>
                        </Col>
                    </Row>
                    <Form
                        name="nest-messages"
                        onFinish={onFinish}
                        validateMessages={validateMessages}
                    >
                        <Row className={styles.selectItemsContainer}>
                            <Col sm={6} xs={24}>
                                <SelectItems
                                    placeholder="Select Designation"
                                    name="designation"
                                    selectItems={selectDataTypes}
                                    hasFeedback={!selctedData.designation ? false : true}
                                    onChange={(value) => onHandleSelectItemChange('designation', value)}
                                />
                            </Col>
                            <Col sm={6} xs={24}>
                                <SelectItems
                                    placeholder="Select District"
                                    name="district"
                                    selectItems={selectDataTypes}
                                    hasFeedback={!selctedData.district ? false : true}
                                    onChange={(value) => onHandleSelectItemChange('district', value)}
                                />
                            </Col>
                            <Col sm={6} xs={24}>
                                <SelectItems
                                    placeholder="Select Taluka"
                                    name="taluka"
                                    selectItems={selectDataTypes}
                                    hasFeedback={!selctedData.taluka ? false : true}
                                    onChange={(value) => onHandleSelectItemChange('taluka', value)}
                                />
                            </Col>
                            <Col sm={6} xs={24}>
                                <SelectItems
                                    placeholder="Select Sub Center"
                                    name="sub_center"
                                    selectItems={selectDataTypes}
                                    hasFeedback={!selctedData.sub_center ? false : true}
                                    onChange={(value) => onHandleSelectItemChange('sub_center', value)}
                                />
                            </Col>
                            <Col sm={6} xs={24}>
                                <div className={styles.selecttypes}>
                                    <Button type="primary" htmlType="submit">
                                        Search
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>

                    {/* search and select rows */}
                    <Row>
                        <Col sm={18} xs={12} className={styles.slectRows}>
                            <SelectRowsPerPage
                                handleCh={handleCh}
                            />
                        </Col>
                        <Col sm={6} xs={12} className={styles.searchContainer}>
                            <Form.Item name="q">
                                <Input
                                    placeholder="ID, Title, Content, etc."
                                    allowClear
                                    prefix={<SearchOutlined />}
                                    onChange={(e) => handleSearchQueryString(e)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Table
                        style={{ tableLayout: 'auto' }}
                        columns={columns}
                        dataSource={tableData}
                        pagination={{
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                            current: currentPage,
                            pageSize: rowsPerPage,
                            total: tableData.length

                        }}
                        onChange={handleChange}
                    />
                    <Button type='primary' onClick={(e) => handleClick("/beneficiary-list")}>Next</Button>
                </div>
            </div>
        </>
    )
}
