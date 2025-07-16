import { useState } from "react";
import { motion } from "framer-motion";
import "./Hero.css";
import FilterCategory from "../filterCategory/FilterCategory";
import exchangeIcon from "../../assets/exchange-icon.png";

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="hero-button-icon"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

export default function Hero({ onFilterChange }) {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");

  const categorias = ["Todos", "Livros", "Eletrônicos", "Roupas", "Casa e Jardim", "Esportes", "Brinquedos"];

  const handleCategoriaClick = (categoria) => {
    setCategoriaAtiva(categoria);
    if (onFilterChange) {
      onFilterChange(categoria.toLowerCase());
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const filterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const filterItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="hero-section">
      <div className="hero-container">
        <div className="hero-grid">
          <div className="hero-text-column">
            <motion.h1 className="hero-title" variants={textVariants} initial="hidden" animate="visible" custom={1}>
              Sua plataforma de trocas, simples e inteligente.
            </motion.h1>

            <motion.p className="hero-subtitle" variants={textVariants} initial="hidden" animate="visible" custom={2}>
              Dê uma nova vida aos seus itens parados. No Skambo, você troca o que não usa mais por algo que realmente
              precisa. Rápido, seguro e divertido!
            </motion.p>

            <motion.button
              className="hero-button"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              Explorar Itens
              <ArrowIcon />
            </motion.button>
          </div>

          <motion.div
            className="hero-visual-column"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <div className="hero-visual-wrapper">
              <motion.div
                className="hero-visual-shape hero-visual-shape-1"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
              />
              <motion.div
                className="hero-visual-shape hero-visual-shape-2"
                animate={{ scale: [1, 0.9, 1], rotate: [0, -90, 0] }}
                transition={{ duration: 20, ease: "easeInOut", repeat: Infinity, delay: 2 }}
              />
              <motion.div
                className="hero-visual-icon-wrapper"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <img
                  src={exchangeIcon || "/placeholder.svg?height=80&width=80"}
                  alt="Ícone de troca"
                  className="hero-visual-icon-img"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="filtro-categorias"
          variants={filterVariants}
          initial="hidden"
          animate="visible"
        >
          {categorias.map((cat) => (
            <motion.div key={cat} variants={filterItemVariants}>
              <FilterCategory ativo={categoriaAtiva === cat} onClick={() => handleCategoriaClick(cat)}>
                {cat}
              </FilterCategory>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
