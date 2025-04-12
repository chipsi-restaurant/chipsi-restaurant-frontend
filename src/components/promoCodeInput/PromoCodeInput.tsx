import React, { useState } from "react";
import styles from "./PromoCodeInput.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PromoCodeInputProps {
    total: number;
    onApplyDiscount: (discount: number) => void;
}

const PromoCodeInput: React.FC<PromoCodeInputProps> = ({ total, onApplyDiscount }) => {
    const [code, setCode] = useState("");
    const [applied, setApplied] = useState(false);

    const handleApply = () => {
        const trimmed = code.trim().toLowerCase();

        if (trimmed === "food10") {
            const discount = total * 0.1;
            onApplyDiscount(discount);
            toast.success("Промокод применён. Скидка 10%!");
            setApplied(true);
        } else {
            onApplyDiscount(0);
            toast.error("Неверный промокод");
        }
    };

    const handleCancel = () => {
        setCode("");
        setApplied(false);
        onApplyDiscount(0);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.inputGroup}>
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Введите промокод"
                    className={styles.input}
                    disabled={applied}
                />
                <button onClick={handleApply} className={styles.button} disabled={applied}>
                    Применить
                </button>
                {applied && (
                    <button onClick={handleCancel} className={styles.cancelButton}>
                        Отменить
                    </button>
                )}
            </div>
        </div>
    );
};

export default PromoCodeInput;
