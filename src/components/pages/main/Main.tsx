import React, { useEffect, useRef, useState } from "react";
import styles from "./Main.module.css";

import 'react-loading-skeleton/dist/skeleton.css';
import ProductCard from "../../productCard/ProductCard";
import { Skeleton } from "@mui/material";
import MenuService from "../../../api/services/menuService";
import { MenuItem } from "../../../api/models/dto/menuItem";
import CategoryService from "../../../api/services/categoryService";
import { Category } from "../../../api/models/dto/category";
import Header from "../../header/Header";
import CategoryNav from "../../categoryNav/CategoryNav";

const Main: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [itemsByCategory, setItemsByCategory] = useState<Record<number, MenuItem[]>>({});
    const [loading, setLoading] = useState(true);
    const [isSticky, setIsSticky] = useState(false);
    const sentinelRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsSticky(!entry.isIntersecting);
            },
            { rootMargin: "0px", threshold: 0 }
        );

        const sentinelEl = sentinelRef.current;
        if (sentinelEl) {
            observer.observe(sentinelEl);
        }

        return () => {
            if (sentinelEl) {
                observer.unobserve(sentinelEl);
            }
        };
    }, []);

    const scrollToCategory = (id: number) => {
        const el = document.getElementById(`category-${id}`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <Header />
            <div ref={sentinelRef} />

            <CategoryNav
                categories={categories}
                isSticky={isSticky}
                onSelect={scrollToCategory}
            />

            <div className={styles.container}>
                {categories.map((cat) => (
                    <section
                        key={cat.id}
                        id={`category-${cat.id}`}
                        className={styles.categoryBlock}
                    >
                        <h1 style={{ padding: "16px" }}>{cat.name}</h1>
                        <div className={styles.cardGrid}>
                            {loading
                                ? Array(3)
                                    .fill(0)
                                    .map((_, idx) => (
                                        <Skeleton key={idx} height={400} width={320} />
                                    ))
                                : (itemsByCategory[cat.id] || []).map((item) => (
                                    <ProductCard
                                        key={item.id}
                                        title={item.name}
                                        description={item.description}
                                        price={item.price}
                                        imageUrl={item.imageUrl}
                                    />
                                ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default Main;