import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Row, Select, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import styles from "./ReportsTable.module.scss";
import classNames from "classnames";
import "./ReportsTable.custom.scss";
import { useNavigate } from 'react-router';
import { TitleBarComponent } from '../../components/common/titleBar';
import { Option } from 'antd/es/mentions';
import { SearchOutlined } from "@ant-design/icons";
// import DummyData from "../dommy.json";
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { NotificationError, NotificationSuccess } from '../../components/common/Notifications/Notifications';
import { ModalModify } from '../../components/common/ModalModify';
import { SelectItems } from '../../components/common/SelectItems';
import SelectRowsPerPage from '../../components/common/SelectItems/SelectRowsPerPage';
import { GET_APIS, LOGIN_APIS } from '../../components/api/apisSpectacles';
import Search from 'antd/es/input/Search';
import { ViewTableData } from '../../components/common/ViewTableData';
import { findLoginName } from '../../utilities/reUsableFun';

const { RangePicker } = DatePicker;
interface DataType {
    key: string,
    type: string;
    refractionist_name: string,
    details: string;
    district: string;
    taluka: string;
    sub_centre: string;
    village: string;
    status: string;
    school_institute_name: string,
    phone_number: string,
    name: string
};

interface publilceObjType {
    district: string,
    name: string,
    details: string,
    phone_number: string,
    refractionist_name: string,
    status: string,
    sub_centre: string,
    taluka: string,
    type: string,
    village: string
}


export const ReportsTable: React.FC = () => {
    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [visible, setVisisble] = useState(false);
    const [formData, setFormData] = useState({});
    // select items
    const [selcteDates, setSelecteDates] = useState("");
    const [refraDeatilsSelect, setRefraDetailsSelect] = useState<publilceObjType[]>([]);
    const [statusSelect, setStatusSelect] = useState<publilceObjType[]>([]);
    const [talukaSelect, setTalukaSelect] = useState<publilceObjType[]>([]);
    const [villageSelect, setVillageSelect] = useState<publilceObjType[]>([]);
    const [subCentreSelect, setSubCentreSelect] = useState<publilceObjType[]>([]);
    const [districtSelect, setDistrictSelect] = useState<publilceObjType[]>([]);

    /** data */
    const [originalTableData, setOriginalTableData] = useState<DataType[]>([]);
    const [copyOfOriginalTableData, setCopyOfOriginalTableData] = useState<DataType[]>([]);

    /** Fitler actions */
    const [talukaOption, setTalukaOption] = useState("");
    const [refraType, setRefraTypes] = useState("");
    const [refraDeatils, setRefraDetails] = useState("");
    const [districtOption, setDistrictOption] = useState("");
    const [villageOption, setVillageOption] = useState("");
    const [subCentreOption, setSubCentreOption] = useState("");
    const [statusOption, setStatusOption] = useState("");

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [queryString, setQueryString] = useState<string>("");

    const [loginBY, setLoginBy] = useState(findLoginName());
    /* naviagte */
    const navigate = useNavigate();
    const checkUserLogin = loginBY?.type;
    /* custom pagination */
    const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
        setCurrentPage(Number(pagination?.current));
        setRowsPerPage(Number(pagination.pageSize));
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<DataType>);
    };
    /* first rendering only  */
    useEffect(() => {
        (async () => {
            let {data} = await LOGIN_APIS(`getUser_data`, loginBY);
            if (checkUserLogin == "District Officer") {
                let result = await GET_APIS('reports_data');
                if (result.code) {
                    let resultFilter = (result?.data || []).filter((obj: any) => obj.district === data[0].district || obj.district === data[1].district);
                    setOriginalTableData(resultFilter)
                    setCopyOfOriginalTableData(resultFilter)
                } else {
                    NotificationError(result.message);
                }
            } else if(checkUserLogin == "Taluka"){
                let result = await GET_APIS('reports_data');
                if (result.code) {
                    let resultFilter = (result?.data || []).filter((obj: any) => obj.taluka === data[0].taluka || obj.taluka === data[1].taluka);
                    setOriginalTableData(resultFilter)
                    setCopyOfOriginalTableData(resultFilter)
                } else {
                    NotificationError(result.message);
                }
            }else {
                let result = await GET_APIS('reports_data');
                if (result.code) {
                    setOriginalTableData(result?.data)
                    setCopyOfOriginalTableData(result?.data)
                } else {
                    NotificationError(result.message);
                }
            }
        })()
    }, [])

    // filter operation
    useEffect(() => {
        // filter logic
        let filterdData = originalTableData;
        if (refraType) {
            filterdData = filterdData?.filter(obj => refraType !== 'all' ? obj.type === refraType : obj);
        }
        // filter types and district
        if (refraType && districtOption) {
            filterdData = filterdData?.filter(obj => refraType !== 'all' ? obj.type === refraType : obj
                && obj.district === districtOption);
        }
        // filter types and district and taluka
        if (refraType && districtOption && talukaOption) {
            filterdData = filterdData?.filter(obj => refraType !== 'all' ? obj.type === refraType : obj
                && obj.district === districtOption && obj.taluka === talukaOption);
        }
        // filter types and district and taluka and sub centre
        if (refraType && districtOption && talukaOption && subCentreOption) {
            filterdData = filterdData?.filter(obj => refraType !== 'all' ? obj.type === refraType : obj
                && obj.district == districtOption && obj.taluka === talukaOption && obj.sub_centre === subCentreOption);
        }
        // filter types and district and taluka and sub centre and village
        if (refraType && districtOption && talukaOption && subCentreOption && villageOption) {
            filterdData = filterdData?.filter(obj => refraType !== 'all' ? obj.type === refraType : obj
                && obj.district === districtOption && obj.taluka === talukaOption
                && obj.sub_centre === subCentreOption && obj.village === villageOption);
        }
        // filter types and district and taluka and sub centre and village and status
        if (refraType && districtOption && talukaOption && subCentreOption && villageOption && statusOption) {
            filterdData = filterdData?.filter(obj => refraType !== 'all' ? obj.type === refraType : obj
                && obj.district === districtOption && obj.taluka === talukaOption
                && obj.sub_centre === subCentreOption && obj.village === villageOption && statusOption !== 'all' ? obj.status === statusOption : obj);
        }
        // filter types and details and district and taluka and sub centre and village and status
        if (refraType && districtOption && talukaOption && subCentreOption && villageOption && statusOption && refraDeatils) {
            filterdData = filterdData?.filter(obj => refraType !== 'all' ? obj.type === refraType : obj
                && obj.district === districtOption && obj.taluka === talukaOption
                && obj.sub_centre === subCentreOption && obj.village === villageOption && statusOption !== 'all' ? obj.status === statusOption : obj
            && obj.details == refraDeatils);
        }

        setCopyOfOriginalTableData(filterdData);
    }, [talukaOption, refraType, refraDeatils, districtOption, villageOption, subCentreOption, statusOption]);


    const columns: ColumnsType<DataType> = [
        {
            title: 'Refractionist Name',
            dataIndex: 'refractionist_name',
            key: 'refractionist_name',
            filteredValue: [queryString],
            onFilter: (value: any, record) => {
                return (
                    String(record.type).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.refractionist_name).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.name).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.phone_number).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.district).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.details).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.status).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.taluka).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.sub_centre).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.village).toLowerCase().includes(value.toLowerCase())
                );
            },
            sorter: (a, b) => a.refractionist_name.length - b.refractionist_name.length,
            sortOrder: sortedInfo.columnKey === 'refractionist_name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Deatils',
            dataIndex: 'details',
            key: 'details',
            sorter: (a, b) => a.details?.length - b.details?.length,
            sortOrder: sortedInfo.columnKey === 'details' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name?.length - b.name?.length,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Contact Number',
            dataIndex: 'phone_number',
            key: 'phone_number',
            sorter: (a, b) => a.phone_number?.length - b.phone_number?.length,
            sortOrder: sortedInfo.columnKey === 'phone_number' ? sortedInfo.order : null,
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
            title: 'Sub Centre',
            dataIndex: 'sub_centre',
            key: 'sub_centre',
            sorter: (a, b) => a.sub_centre.length - b.sub_centre.length,
            sortOrder: sortedInfo.columnKey === 'sub_centre' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Village/Ward',
            dataIndex: 'village',
            key: 'village',
            sorter: (a, b) => a.village.length - b.village.length,
            sortOrder: sortedInfo.columnKey === 'village' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            sorter: (a, b) => a.status.length - b.status.length,
            sortOrder: sortedInfo.columnKey === 'status' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Button onClick={() => handleModifyForm(record)} type='primary'>
                        view
                    </Button>
                )
            }
        },
    ];
    /* viewFormData */
    const handleModifyForm = (row: object) => {
        setVisisble(true);
        setFormData(row);

    };
    /* form Open */
    const FormOpen = () => {
        return <ViewTableData
            state={formData}
            visible={visible}
            onCancel={() => setVisisble(false)}
        />
    };

    const handleCh = (value: string) => {
        NotificationSuccess("success");
        setRowsPerPage(Number(value))
    };

    const onChangeDate = (va: any, da: any) => {
        setSelecteDates(da)
    };

    const handleClickClearFilters = () => {
        setDistrictOption("");
        setTalukaOption("");
        setRefraDetails("");
        setRefraTypes("");
        setSubCentreOption("");
        setStatusOption("");
        setSelecteDates("");
    };

    const handleRefraTypes = (value: string) => {
        if (value !== refraType) {
            setRefraTypes(value);
            let reset = copyOfOriginalTableData.filter(obj => value !== 'all' ? obj.type == value : obj);
            setDistrictSelect(reset)
        };
    };

    const handleRefraDetails = (value: string) => {
        if (value !== refraDeatils) {
            setRefraDetails(value);
        };
    };

    const handleDistrictOption = (value: string) => {
        if (value !== districtOption) {
            setDistrictOption(value);
            let reset = districtSelect.filter(obj => obj.district == value);
            setTalukaSelect(reset);
        }
    };

    const handleTalukaOption = (value: string) => {
        if (value !== talukaOption) {
            setTalukaOption(value);
            let reset = talukaSelect.filter(obj => obj.taluka == value);
            setSubCentreSelect(reset);
        }
    };

    const handleSubCentreOption = (value: string) => {
        if (value !== subCentreOption) {
            setSubCentreOption(value);
            let reset = subCentreSelect.filter(obj => obj.sub_centre == value);
            setVillageSelect(reset);
        }
    };

    const handleVillageOption = (value: string) => {
        if (value !== villageOption) {
            setVillageOption(value);
            let reset = villageSelect.filter(obj => obj.village == value);
            setStatusSelect(reset);
        }
    };

    const handleStatusOption = (value: string) => {
        if (value !== statusOption) {
            setStatusOption(value);
            let reset = villageSelect.filter(obj => value !== 'all' ? obj.status == value : obj);
            setRefraDetailsSelect(reset);
        };
    };

    return (
        <>
            {visible ? FormOpen() : ("")}
            <TitleBarComponent title={"Reports List"} image={true} />
            <div className={classNames(styles.reportsTable, "report-page-list")}>
                <div className={styles.table}>
                    <Row>
                        <Col sm={3} xs={24} className={styles.statisticsContainer}>
                            <div className={styles.statistics}>
                                <span className={styles.title}>Filters</span>
                            </div>
                        </Col>
                    </Row>
                    <Row className={styles.selectItemsContainer}>
                        <Col sm={6} xs={24}>
                            <div className={styles.selecttypes}>
                                <Form.Item>
                                    <Select
                                        placeholder="Types"
                                        onChange={(value) => handleRefraTypes(value)}
                                    >
                                        <Option value="all">All</Option>
                                        <Option value="school">School</Option>
                                        <Option value="otherBenificiary">Benificiary</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={6} xs={24}>
                            <div className={styles.selecttypes}>
                                <Form.Item>
                                    <Select
                                        disabled={refraType ? false : true}
                                        placeholder="District"
                                        onChange={handleDistrictOption}
                                    >
                                        {
                                            (Array.from(new Set(districtSelect.map((item: any) => item.district))) || []).map((obj, i) => (
                                                <Option key={String(i)} value={obj}>{obj}</Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={6} xs={24}>
                            <div className={styles.selecttypes}>
                                <Form.Item>
                                    <Select
                                        disabled={districtOption ? false : true}
                                        placeholder="taluka"
                                        onChange={handleTalukaOption}
                                    >
                                        {
                                            (Array.from(new Set(talukaSelect.map((item: any) => item.taluka))) || []).map((obj, i) => (
                                                <Option key={String(i)} value={obj}>{obj}</Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={6} xs={24}>
                            <div className={styles.selecttypes}>
                                <Form.Item>
                                    <Select
                                        disabled={talukaOption ? false : true}
                                        placeholder="sub_centre"
                                        onChange={handleSubCentreOption}
                                    >
                                        {
                                            (Array.from(new Set(subCentreSelect.map((item: any) => item.sub_centre))) || []).map((obj, i) => (
                                                <Option key={String(i)} value={obj}>{obj}</Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={6} xs={24}>
                            <div className={styles.selecttypes}>
                                <Form.Item>
                                    <Select
                                        disabled={subCentreOption ? false : true}
                                        placeholder="village/Ward"
                                        onChange={handleVillageOption}
                                    >
                                        {
                                            (Array.from(new Set(villageSelect.map((item: any) => item.village))) || []).map((obj, i) => (
                                                <Option key={String(i)} value={obj}>{obj}</Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={6} xs={24}>
                            <div className={styles.selecttypes}>
                                <Form.Item
                                    name={"From and To Date"}
                                    // hasFeedback={!selctedData.dates ? false : true}
                                    rules={[{ required: true }]}>
                                    <RangePicker
                                        disabled={villageOption ? false : true}
                                        format="YYYY-MM-DD"
                                        placeholder={['From Date', 'To Date']}
                                        onChange={onChangeDate}
                                    />
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={6} xs={24}>
                            <div className={styles.selecttypes}>
                                <Form.Item>
                                    <Select
                                        placeholder="status"
                                        disabled={selcteDates ? false : true}
                                        onChange={handleStatusOption}
                                    >
                                        <Option value="all">All</Option>
                                        <Option value="order_pending">Order Pending</Option>
                                        <Option value="ready_to_deliver">Ready To Deliver</Option>
                                        <Option value="delivered">Delivered</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={6} xs={24}>
                            <div className={styles.selecttypes}>
                                <Form.Item>
                                    <Select
                                        disabled={statusOption ? false : true}
                                        placeholder="Details"
                                        onChange={handleRefraDetails}
                                    >
                                        {
                                            (Array.from(new Set(refraDeatilsSelect.map((item: any) => item.details))) || []).map((obj, i) => (
                                                <Option key={String(i)} value={obj}>{obj}</Option>
                                            ))
                                        }
                                        {refraType !== 'school' ? (
                                            <>
                                                {/* <Option value="rc">Rc</Option>
                                            <Option value="aadhar">Aadhar</Option> */}
                                            </>
                                        ) : ("")}
                                        {/* <Option value="all">All</Option> */}
                                    </Select>
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={6} xs={24}>
                            <div className={styles.selecttypes}>
                                <Button type="primary" onClick={handleClickClearFilters}>
                                    Clear Filters
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    {/* search and select rows */}
                    <Row>
                        <Col sm={18} xs={12} className={styles.slectRows}>
                            <SelectRowsPerPage
                                handleCh={handleCh}
                            />
                        </Col>
                        <Col sm={6} xs={12} className={styles.searchContainer}>
                            <Search
                                allowClear
                                placeholder="input search"
                                enterButton
                                onSearch={(e) => setQueryString(e)}
                            />
                        </Col>
                    </Row>
                    <Table
                        columns={columns}
                        dataSource={copyOfOriginalTableData}
                        pagination={{
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                            current: currentPage,
                            pageSize: rowsPerPage,
                            total: copyOfOriginalTableData?.length || 0

                        }}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </>
    );
}; 
