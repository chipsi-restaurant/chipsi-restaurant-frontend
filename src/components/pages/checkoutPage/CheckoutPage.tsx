import React, { useState } from "react";
import { useSelector } from "react-redux";
import PromoCodeInput from "../../promoCodeInput/PromoCodeInput";
import styles from "./CheckoutPage.module.css";
import { ToastContainer } from "react-toastify";
import DeliveryAddressSelector from "../../deliverySelector/DeliveryAddressSelector";

type CartItem = {
    id: number;
    title: string;
    quantity: number;
    price: number;
    imageUrl: string;
};

interface RootState {
    cart: {
        items: CartItem[];
    };
}

const CheckoutPage: React.FC = () => {
    const items = useSelector((state: RootState) => state.cart.items);
    const [discount, setDiscount] = useState(0);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const finalTotal = total - discount;
    const [isOpen, setIsOpen] = useState(false); // для открытия модального окна выбора адреса
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null); // храним выбранный адрес
    const [userInfo, setUserInfo] = useState({
        name: "Иван Иванов",
        email: "ivan@example.com",
        phone: "+7 123 456 78 90",
    }); // Пример информации о пользователе

    const handlePay = () => {
        if (!selectedAddress) {
            alert("Пожалуйста, выберите адрес доставки.");
            return;
        }
        alert(`Оплата прошла успешно! Доставка по адресу: ${selectedAddress}`);
    };

    return (
        <div className={styles.page}>
            <ToastContainer/>
            <h1 className={styles.title}>Оплата заказа</h1>

            <div className={styles.checkoutContainer}>
                {/* Левая часть: Корзина */}
                <div className={styles.cartSection}>
                    <h2>Корзина</h2>

                    {items.length === 0 ? (
                        <p className={styles.empty}>Ваша корзина пуста</p>
                    ) : (
                        <>
                            <ul className={styles.itemList}>
                                {items.map((item) => (
                                    <li key={item.id} className={styles.item}>
                                        <img src={item.imageUrl} alt={item.title} className={styles.image}/>
                                        <div className={styles.info}>
                                            <h3>{item.title}</h3>
                                            <p>{item.quantity} × {item.price} ₽</p>
                                            <p className={styles.itemTotal}>
                                                = {item.quantity * item.price} ₽
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <PromoCodeInput total={total} onApplyDiscount={setDiscount}/>

                            <div className={styles.summary}>
                                <p>Сумма заказа: {total} ₽</p>
                                <p>Скидка: -{discount} ₽</p>
                                <p className={styles.total}>Итого к оплате: {finalTotal} ₽</p>
                                <button className={styles.payBtn} onClick={handlePay}>
                                    Оплатить
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Правая часть: Информация о пользователе и выбор адреса */}
                <div className={styles.userInfoSection}>
                    <h2>Информация о пользователе</h2>
                    <div className={styles.userInfo}>
                        <p><strong>Имя:</strong> {userInfo.name}</p>
                        <p><strong>Email:</strong> {userInfo.email}</p>
                        <p><strong>Телефон:</strong> {userInfo.phone}</p>
                    </div>

                    <h3>Адрес доставки</h3>
                    {/* Отображаем выбранный адрес или сообщение о его отсутствии */}
                    <div className={styles.selectedAddressContainer}>
                        {selectedAddress ? (
                            <div className={styles.selectedAddress}>
                                <p>{selectedAddress}</p>
                                <button
                                    className={styles.changeAddressBtn}
                                    onClick={() => setIsOpen(true)} // Открытие модального окна для выбора нового адреса
                                >
                                    Изменить
                                </button>
                            </div>
                        ) : (
                            <button
                                className={styles.selectAddressBtn}
                                onClick={() => setIsOpen(true)} // Открытие модального окна для выбора адреса
                            >
                                Выбрать адрес доставки
                            </button>
                        )}
                    </div>

                    {/* Модальное окно выбора адреса */}
                    <DeliveryAddressSelector setAddress={setSelectedAddress}  open={isOpen} onClose={() => setIsOpen(false)} />
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
