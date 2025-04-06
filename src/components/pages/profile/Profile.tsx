import React, { useState } from "react";
import styles from "./Profile.module.css";
import Header from "../../header/Header";

const Profile: React.FC = () => {
    const [name, setName] = useState("Арсений");
    const [isEditingName, setIsEditingName] = useState(false);
    const [email, setEmail] = useState("");
    const [birthDay, setBirthDay] = useState("15 Апреля");
    const [birthYear, setBirthYear] = useState("");

    const handleSaveEmail = () => {
        // сохранить email
    };

    const handleSaveBirth = () => {
        // сохранить дату рождения
    };

    return (
        <div>
            <Header/>
            <div className={styles.container}>
                <h1>Личные данные</h1>

                <div className={styles.section}>
                    <div className={styles.label}>Имя</div>
                    <div className={styles.inputGroup}>
                        <input
                            disabled
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button className={styles.button} onClick={() => setIsEditingName(true)}>
                            Изменить
                        </button>
                    </div>

                    <div className={styles.label}>Номер телефона</div>
                    <div className={styles.inputGroup}>
                        <input
                            disabled
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button className={styles.button} onClick={() => setIsEditingName(true)}>
                            Изменить
                        </button>
                    </div>

                    <div className={styles.label}>Почта</div>
                    <div className={styles.inputGroup}>
                        <input
                            disabled
                            className={styles.input}
                            value={email}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button className={styles.button} onClick={() => setIsEditingName(true)}>
                            Изменить
                        </button>
                    </div>


                </div>

                <h1>История заказов</h1>
                <p style={{marginBottom: 20, color: '#555'}}>20 заказов за последние 90 дней</p>
                <table className={styles.orderTable}>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Время заказа</th>
                        <th>Сумма</th>
                        <th>Способ оплаты</th>
                        <th>Чек</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <td>163</td>
                        <td>2 апр. 2025 г., 15:54</td>
                        <td>923 ₽</td>
                        <td>•••• 1234</td>
                        <td><span className={styles.viewCheck}>Посмотреть</span></td>
                    </tr>
                    <tr>
                        <td>107</td>
                        <td>18 мар. 2025 г., 15:25</td>
                        <td>617 ₽</td>
                        <td>•••• 4321</td>
                        <td><span className={styles.viewCheck}>Посмотреть</span></td>
                    </tr>
                    <tr>
                        <td>477</td>
                        <td>15 мар. 2025 г., 21:04</td>
                        <td>703 ₽</td>
                        <td>•••• 5678</td>
                        <td><span className={styles.viewCheck}>Посмотреть</span></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Profile;