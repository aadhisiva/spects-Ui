import React from 'react'
import styles from "./SelectItems.module.scss";
import classNames from 'classnames';
import "./SelectItems.custom.scss";
import { Col, Select } from 'antd';

type SelectRowsPerPageI = {
    handleCh: (v: any) => void;
}

const SelectRowsPerPage: React.FC<SelectRowsPerPageI> = ({
    handleCh
}) => {
    return (
        <div className={classNames(styles.selectTypesPage, "selectType-page")}>
            <Select
                defaultValue="10/page"
                style={{ width: 120 }}
                onChange={handleCh}
                options={[
                    { value: 10, label: '10/page' },
                    { value: 25, label: '25/page' },
                    { value: 50, label: '50/page' },
                    { value: 100, label: '100/page' },
                ]}
            />
        </div>
    )
}

export default SelectRowsPerPage;
