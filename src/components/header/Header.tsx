import React, { useState } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import {
    FaUser as UserIconRaw,
    FaShoppingBasket as BasketIconRaw,
    FaSearch as SearchIconRaw,
} from "react-icons/fa";
import AddressPopup from "../addressPopup/AddressPopup";

const SearchIcon = SearchIconRaw as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const UserIcon = UserIconRaw as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const BasketIcon = BasketIconRaw as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const Header: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <img src={logo} alt="Логотип" className={styles.logo} />
                <div className={styles.search}>
                    <SearchIcon className={styles.searchIcon} />
                    <input type="text" placeholder="Поиск" />
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.deliveryWrapper}>
                    <div className={styles.delivery} onClick={() => setShowPopup(!showPopup)}>
                        <span>Укажите адрес доставки</span>
                        <div className={styles.time}>от 45 мин</div>
                    </div>
                    {showPopup && (
                        <div className={styles.popupWrapper}>
                            <AddressPopup onClose={() => setShowPopup(false)} />
                        </div>
                    )}
                </div>

                <div className={styles.profile}>
                    <UserIcon className={styles.icon} />
                    <p>Профиль</p>
                </div>

                <div className={styles.basket}>
                    <BasketIcon className={styles.icon} />
                    <p>Корзина</p>
                </div>


                <div className={styles.basketInfo}>
                    <span>0 ₽</span>
                    <small>0 шт.</small>
                </div>
            </div>
        </header>
    );
};

export default Header;