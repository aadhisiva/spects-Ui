import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Select, Spin, Table, } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import styles from "./Taluka.module.scss";
import classNames from 'classnames';
import "./Taluka.custom.scss";
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { GET_APIS, POSTAPIS_WITH_AUTH } from '../../../api/apisSpectacles';
import { NotificationError, NotificationSuccess } from '../../../components/common/Notifications/Notifications';
import SelectRowsPerPage from '../../../components/common/SelectItems/SelectRowsPerPage';
import { ModalModify } from '../../../components/common/ModalModify';
import Search from 'antd/es/input/Search';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useFetchUserData } from '../../../utilities/userDataHook';

interface DataType {
    key: string,
    name: string;
    mobile_number: string;
    district: string;
    taluka: string;
    sub_centre: string;
    village: string;
    rural_urban: string;
};

export const TalukaTable: React.FC = () => {
    // translation
    const { t } = useTranslation();
    // loading
    const [loading, setLoading] = useState(true);
    const [visible, setVisisble] = useState(false);
    // table data
    const [originalTableData, setOriginalTableData] = useState<DataType[]>([]);
    const [copyOfOriginalTableData, setCopyOfOriginalTableData] = useState<DataType[]>([]);

    const [formData, setFormData] = useState({});
    const [editmode, setEditMode] = useState('');
    const [queryString, setQueryString] = useState<string>("");
    const [editId, setEditId] = useState([]);
    // antd table content
    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // select values
    const [rural_urban, setRuralOrUrban] = useState("");
    const [talukaOption, setTalukaOption] = useState("");
    const [districtOption, setDistrict] = useState("");
    // selected values
    const [districtSelect, setDistrictSelect] = useState<DataType[]>([]);
    const [talukaSelect, setTalukaSelect] = useState<DataType[]>([]);

    // auth user
    const [userData] = useFetchUserData()
    const token = userData?.userData?.token;
    const type = userData?.userData?.type;
    // login data
    const checkUserLogin = type == "district_officer";
    const unique_id: any = { unique_id: userData?.userData?.unique_id, type: userData?.userData?.type };

    const GetTablData = async () => {
        if (checkUserLogin) {
            let { data } = await POSTAPIS_WITH_AUTH(`getUser_data`, unique_id, token);
            let uniqueBody: any = Array.from(new Set(data?.map((obj: any) => obj.district)));
            let bodyData: any = {
                districts: uniqueBody
            };
            let result = await POSTAPIS_WITH_AUTH(`talukas_data`, bodyData, token);
            let uniqueData: any = _.uniqBy(result?.data, 'taluka');
            if (result.code == 200) {
                setLoading(false);
                setOriginalTableData(uniqueData)
                setCopyOfOriginalTableData(uniqueData)
            } else {
                NotificationError(result.message)
            }
        } else {
            let result = await GET_APIS(`talukas_data`, token);
            if (result.code == 200) {
                let uniqueData: any = _.uniqBy(result?.data, 'taluka');
                setLoading(false);
                setOriginalTableData(uniqueData)
                setCopyOfOriginalTableData(uniqueData)
            } else {
                NotificationError(result.message)
            }
        }

    };

    useEffect(() => {
        (async () => {
            await GetTablData();
        })();
    }, []);

    const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
        setCurrentPage(Number(pagination?.current));
        setRowsPerPage(Number(pagination.pageSize));
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<DataType>);
    };
    const columns: ColumnsType<DataType> = [
        {
            title: t('TABLE_NAME'),
            dataIndex: 'name',
            key: 'name',
            filteredValue: [queryString],
            onFilter: (value: any, record) => {
                return (
                    String(record.name).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.mobile_number).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.district).toLowerCase().includes(value.toLowerCase())
                );
            },
            sorter: (a, b) => a.name?.length - b.name?.length,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
            render: (_, record) => {
                return !_ ? "N/A" : _;
            }
        },
        {
            title: t('TABLE_MOBILE'),
            dataIndex: 'mobile_number',
            key: 'mobile_number',
            sorter: (a, b) => a.mobile_number?.length - b.mobile_number?.length,
            sortOrder: sortedInfo.columnKey === 'mobile_number' ? sortedInfo.order : null,
            ellipsis: true,
            render: (_, record) => {
                return !_ ? "N/A" : _;
            }
        },
        {
            title: t('TABLE_DISTRICT'),
            dataIndex: 'district',
            key: 'district',
            sorter: (a, b) => a.district.length - b.district.length,
            sortOrder: sortedInfo.columnKey === 'district' ? sortedInfo.order : null,
            ellipsis: true,
            render: (_, record) => {
                return _.replace(/\W/g, "").replace(/\d/g, "");
            }
        },
        {
            title: t('TABLE_TALUKA'),
            dataIndex: 'taluka',
            key: 'taluka',
            sorter: (a, b) => a.taluka.length - b.taluka.length,
            sortOrder: sortedInfo.columnKey === 'taluka' ? sortedInfo.order : null,
            ellipsis: true,
            render: (_, record) => {
                return _.replace(/\W/g, "").replace(/\d/g, "");
            }
        },
        {
            title: t('TABLE_ACTION'),
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

    useEffect(() => {
        let filterData = originalTableData;
        // filter rural/urban
        if (rural_urban) {
            filterData = filterData.filter(obj => obj.rural_urban === rural_urban);
        };
        // filter rural/urban and district
        if (rural_urban && districtOption) {
            filterData = filterData.filter(obj => obj.rural_urban === rural_urban
                && obj.district === districtOption);
        };
        // filter rural/urban and district and taluka
        if (rural_urban && districtOption && talukaOption) {
            filterData = filterData.filter(obj => obj.rural_urban === rural_urban
                && obj.district === districtOption && obj.taluka === talukaOption);
        };
        setCopyOfOriginalTableData(filterData);
    }, [rural_urban, districtOption, talukaOption])

    const onSave = async (values: any) => {
        setLoading(true);
        setVisisble(false);
        delete values?.district;
        delete values?.rural_urban;
        let body: any = { ...values, ...{ unique_id: editId } };
        let result = await POSTAPIS_WITH_AUTH("update_taluka_data", body, token);
        if (result.code == 200) {
            await GetTablData();
            setLoading(false);
        } else {
            NotificationError("Update Failed")
        }
        setVisisble(false);
    };

    const handleModifyForm = (row: any) => {
        setVisisble(true);
        setEditId(row.user_unique_id)
        setFormData(row);
        setEditMode("Edit")
    };

    const FormOpen = () => {
        return <ModalModify
            editMode={editmode ? true : false}
            state={formData}
            setRuralOrUrban={(e) => setRuralOrUrban(e)}
            visible={visible}
            onCancel={() => setVisisble(false)}
            onSave={onSave}
        />
    };
    const handleCh = (value: string) => {
        NotificationSuccess("success");
        setRowsPerPage(Number(value))
    };

    const handleClickClearFilters = () => {
        setDistrict("");
        setRuralOrUrban("");
        setTalukaOption("");
    };

    const handleRuralOrUrban = (value: string) => {
        if (value !== rural_urban) {
            setRuralOrUrban(value);
            let reset = copyOfOriginalTableData.filter(obj => obj.rural_urban === value);
            setDistrictSelect(reset);
        };
    };

    const handleSelectedDistrict = (value: string) => {
        if (value !== districtOption) {
            setDistrict(value);
            let reset = districtSelect.filter(obj => obj.district === value);
            setTalukaSelect(reset);
        };
    };

    const handleSelectedTaluka = (value: string) => {
        if (value !== talukaOption) {
            setTalukaOption(value);
        };
    };
    const renderTalukaData = () => (
        <>
            {visible ? FormOpen() : ("")}
            <div className={classNames(styles.talukaPage, "taluka-page-list")}>
                <div className={styles.table}>
                    <Row>
                        <Col sm={3} xs={24} className={styles.statisticsContainer}>
                            <div className={styles.statistics}>
                                <span className={styles.title}>{t("FILTERS")}</span>
                            </div>
                        </Col>
                    </Row>
                    <Row className={styles.selectItemsContainer}>
                        <Col sm={6} xs={24}>
                            <div className={styles.selecttypes}>
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="Rural/Urban"
                                    onChange={handleRuralOrUrban}
                                >
                                    <Select.Option value="Rural">Rural</Select.Option>
                                    <Select.Option value="Urban">Urban</Select.Option>
                                </Select>
                            </div>
                        </Col>
                        <Col sm={6} xs={24}>
                            <div className={styles.selecttypes}>
                                <Select
                                    style={{ width: '100%' }}
                                    searchValue=''
                                    placeholder="Select District"
                                    disabled={rural_urban ? false : true}
                                    onChange={handleSelectedDistrict}
                                >
                                    {(Array.from(new Set(districtSelect.map(obj => obj.district))) || [])?.map((obj: any, i) => (
                                        <Select.Option key={String(i)} value={`${obj}`}>{obj.replace(/\W/g, "").replace(/\d/g, "")}</Select.Option>
                                    ))}
                                </Select>
                            </div>
                        </Col>
                        <Col sm={6} xs={24}>
                            <div className={styles.selecttypes}>
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="Select Taluka"
                                    disabled={districtOption ? false : true}
                                    onChange={handleSelectedTaluka}
                                >
                                    {(talukaSelect || [])?.map((obj: any, i) => (
                                        <Select.Option key={String(i)} value={`${obj.taluka}`}>{obj.taluka.replace(/\W/g, "").replace(/\d/g, "")}</Select.Option>
                                    ))}
                                </Select>
                            </div>
                        </Col>
                        <Col sm={6} xs={24}>
                            <div className={styles.selecttypes}>
                                <Button type="primary" onClick={handleClickClearFilters}>
                                    {t("CLEAR_FILTERS")}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    {/* search and select rows */}
                    <Row>
                        <Col sm={4} xs={12} className={styles.slectRows}>
                            <SelectRowsPerPage
                                handleCh={handleCh}
                            />
                        </Col>
                        <Col sm={12} xs={12} className={styles.headerRow}>
                            <span>{t("TALUKA_HEALTH_OFFICER")}</span>
                        </Col>
                        <Col sm={8} xs={12} className={styles.searchContainer}>
                            <Search
                                allowClear
                                placeholder="input search"
                                enterButton
                                onSearch={(e) => setQueryString(e)}
                            />

                        </Col>
                    </Row>
                    <Table
                        style={{ tableLayout: 'auto' }}
                        columns={columns}
                        dataSource={copyOfOriginalTableData}
                        pagination={{
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                            current: currentPage,
                            pageSize: rowsPerPage,
                            total: copyOfOriginalTableData.length

                        }}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </>
    )

    return (
        <>
            {<Spin spinning={loading}>{renderTalukaData()}</Spin>}
        </>
    )
}
