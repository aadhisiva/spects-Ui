import React, { useState, useEffect, FC } from 'react'
import classNames from 'classnames'
import styles from "./customCaptch.module.scss";
import { Form, Input, Button } from 'antd';
import { t } from 'i18next';
import { ReloadOutlined } from '@ant-design/icons';

type ICustomCaptch = {
    setFreshCaptch?: any,
    setCaptchaValue?: any,
    captch?: string,
    captchValue?: string;
}
export const CustomCaptch: FC<ICustomCaptch> = ({
    setFreshCaptch,
    setCaptchaValue,
    captch,
    captchValue,
}) => {

    //storing all captcha characters in array
    let allCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
        'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
        'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    function getCaptcha() {
        let subCaptch = "";
        for (let i = 0; i < 6; i++) {
            //getting 6 random characters from the array
            let randomCharacter = allCharacters[Math.floor(Math.random() * allCharacters.length)];
            //passing 6 random characters inside captcha innerText
            subCaptch += ` ${randomCharacter}`;
        }
        setFreshCaptch(subCaptch);
    };

    // reaload capth or refresh captch
    const handleRefreshCaptch = () => {
        removeContent();
        getCaptcha();
    };

    // intial render createCaptch
    useEffect(() => {
        getCaptcha();
    }, [])

    function removeContent() {
        setCaptchaValue("");
        setFreshCaptch("");
    };

    return (
        <div className={classNames(styles.otpValidatePage, 'otp-validate-page')}>
            <div className={styles.wrapper}>
                <Form.Item
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 12 }}
                    label={t("Captch")}
                    name={"Captch"}
                >
                    <Input
                        type={"text"}
                        className={styles.inputArea}
                        placeholder={"Enter below captcha"}
                        value={captchValue}
                        onChange={(e) => setCaptchaValue(e.target.value)}
                        maxLength={6}
                        spellCheck={false}
                        required
                    />
                </Form.Item>
                <div className={styles.captchaArea}>
                    <div className={styles.captchaImg}>
                        <img src={require("./captcha-bg.png")} alt="Captch Background" />
                        <span className={styles.captcha}>{captch}</span>
                    </div>
                    <p className={styles.reloadBtn} onClick={handleRefreshCaptch}><ReloadOutlined /></p>
                </div>
            </div>
        </div>
    )
}
