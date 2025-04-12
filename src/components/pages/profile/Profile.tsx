import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import EditableField from "../../editableField/EditableField";
import UserService from "../../../api/services/userService";
import { User } from "../../../api/models/dto/user";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await UserService.getMe();
                setUser(response.data);
            } catch (error) {
                toast.error("Не удалось загрузить данные пользователя");
                console.error("Ошибка при загрузке данных пользователя", error);
            }
        };

        fetchUser();
    }, []);

    const handleFieldChange = async (key: keyof User, newValue: string) => {
        if (!user) return;

        const oldValue = user[key] as string;

        if (newValue === oldValue) return;

        try {
            await UserService.updateMe({ [key]: newValue });
            setUser({ ...user, [key]: newValue });
            toast.success("Изменения сохранены");
        } catch (error) {
            toast.error("Не удалось сохранить изменения");
            // ничего не делаем — поле вернётся в старое значение через EditableField
        }
    };

    if (!user) return <div className={styles.container}>Загрузка...</div>;

    return (
        <div>
            <ToastContainer/>
            <div className={styles.container}>
                <h1>Личные данные</h1>

                <div className={styles.section}>
                    <EditableField
                        label="Имя"
                        value={user.firstName}
                        onSave={(val) => handleFieldChange("firstName", val)}
                    />

                    <EditableField
                        label="Фамилия"
                        value={user.lastName}
                        onSave={(val) => handleFieldChange("lastName", val)}
                    />

                    <EditableField
                        label="Почта"
                        value={user.email}
                        onSave={(val) => handleFieldChange("email", val)}
                    />

                    <EditableField
                        label="Номер телефона"
                        value={user.phone}
                        onSave={(val) => handleFieldChange("phone", val)}
                    />
                </div>

                <h1>История заказов</h1>
                <p style={{ marginBottom: 20, color: "#555" }}>
                    20 заказов за последние 90 дней
                </p>
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
                        <td>
                            <span className={styles.viewCheck}>Посмотреть</span>
                        </td>
                    </tr>
                    <tr>
                        <td>107</td>
                        <td>18 мар. 2025 г., 15:25</td>
                        <td>617 ₽</td>
                        <td>•••• 4321</td>
                        <td>
                            <span className={styles.viewCheck}>Посмотреть</span>
                        </td>
                    </tr>
                    <tr>
                        <td>477</td>
                        <td>15 мар. 2025 г., 21:04</td>
                        <td>703 ₽</td>
                        <td>•••• 5678</td>
                        <td>
                            <span className={styles.viewCheck}>Посмотреть</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Profile;