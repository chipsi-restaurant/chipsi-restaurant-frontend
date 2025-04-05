import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";

import 'react-loading-skeleton/dist/skeleton.css';
import ProductCard from "../../productCard/ProductCard";
import {Skeleton} from "@mui/material";
import MenuService from "../../../api/services/menuService";
import {MenuItem} from "../../../api/models/dto/menuItem";
import CategoryService from "../../../api/services/categoryService";
import {Category} from "../../../api/models/dto/category";
import Header from "../../header/Header";

const Main: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [itemsByCategory, setItemsByCategory] = useState<Record<number, MenuItem[]>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const catRes = await CategoryService.getAll(false);
                const loadedCategories = catRes.data;
                setCategories(loadedCategories);

                const groupedItems: Record<number, MenuItem[]> = {};

                for (const cat of loadedCategories) {
                    try {
                        const { data } = await MenuService.getAll(cat.id);
                        groupedItems[cat.id] = data;
                    } catch {
                        groupedItems[cat.id] = [];
                    }
                }

                setItemsByCategory(groupedItems);
            } catch (error) {
                console.error("Ошибка при загрузке:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Header/>
            <div className={styles.container}>
                {categories.map((cat) => (
                    <section key={cat.id} className={styles.categoryBlock}>
                        <h2>{cat.name}</h2>
                        <div className={styles.cardGrid}>
                            {loading
                                ? Array(3).fill(0).map((_, idx) => (
                                    <Skeleton key={idx} height={400} width={320}/>
                                ))
                                : (itemsByCategory[cat.id] || []).map((item) => (
                                    <ProductCard
                                        key={item.id}
                                        title={item.name}
                                        description={item.description}
                                        price={item.price}
                                        imageUrl={item.imageUrl}
                                    />
                                ))
                            }
                        </div>
                    </section>
                ))}
            </div>
        </div>

    );
};

export default Main;